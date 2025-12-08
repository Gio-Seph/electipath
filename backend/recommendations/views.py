from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from collections import defaultdict
import logging

from activities.models import ActivityResult
from survey.models import SurveyResult

logger = logging.getLogger(__name__)

# Mapping between full names and codes
ELECTIVE_NAME_TO_CODE = {
    "Mobile Development": "MobileDev",
    "Multimedia & Game Development": "MMGD",
    "IT Business Analytics": "ITBA",
}

ELECTIVE_CODE_TO_NAME = {v: k for k, v in ELECTIVE_NAME_TO_CODE.items()}


class GenerateRecommendationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user

            # ✅ Get latest survey result (safe)
            survey_result = SurveyResult.objects.filter(user=user).order_by("-id").first()
            if not survey_result:
                return Response(
                    {"error": "No survey data found for this user."},
                    status=400
                )

            # Get survey scores (should be a dict like {"MobileDev": 85, "ITBA": 72, "MMGD": 90})
            survey_scores = survey_result.elective_scores or {}
            
            # Ensure all electives have scores (default to 0 if missing)
            all_electives = ["MobileDev", "ITBA", "MMGD"]
            survey_scores = {e: survey_scores.get(e, 0) for e in all_electives}

            # ✅ Get activity performance safely
            activity_results = ActivityResult.objects.filter(user=user)
            activities_completed = activity_results.count()

            # Calculate activity scores by elective
            activity_scores_by_elective = defaultdict(list)
            for activity in activity_results:
                elective_code = activity.elective  # Should be "MobileDev", "ITBA", or "MMGD"
                score = activity.calculate_performance_score()
                activity_scores_by_elective[elective_code].append(score)

            # Calculate average activity scores per elective
            activity_scores = {}
            for elective in all_electives:
                scores = activity_scores_by_elective.get(elective, [])
                activity_scores[elective] = sum(scores) / len(scores) if scores else 0

            # Combine survey (60%) and activity (40%) scores
            survey_weight = 0.6
            activity_weight = 0.4
            final_scores = {}
            for elective in all_electives:
                survey_score = survey_scores.get(elective, 0)
                activity_score = activity_scores.get(elective, 0)
                final_scores[elective] = round(
                    (survey_score * survey_weight) + (activity_score * activity_weight),
                    1
                )

            # Determine recommended elective (highest final score)
            recommended_elective = max(final_scores.items(), key=lambda x: x[1])[0]

            # Calculate confidence score based on gap between top and second score
            sorted_scores = sorted(final_scores.values(), reverse=True)
            top_score = sorted_scores[0]
            second_score = sorted_scores[1] if len(sorted_scores) > 1 else 0
            gap = top_score - second_score
            # Confidence: 50% base + gap * 2 (max 100%)
            confidence_score = min(100, round(50 + gap * 2))

            # Convert selected_elective to code format if needed
            selected_elective_code = survey_result.selected_elective
            if selected_elective_code in ELECTIVE_NAME_TO_CODE:
                selected_elective_code = ELECTIVE_NAME_TO_CODE[selected_elective_code]

            return Response({
                "recommended_elective": recommended_elective,
                "final_scores": final_scores,
                "breakdown": {
                    "survey_scores": survey_scores,
                    "activity_scores": activity_scores,
                },
                "confidence_score": confidence_score,
                "activities_completed": activities_completed,
            })

        except Exception as db_error:
            # ✅ REAL ERROR ONLY (NO FAKE MIGRATION MESSAGE)
            logger.error(f"Recommendation generation failed: {str(db_error)}")
            import traceback
            logger.error(traceback.format_exc())
            return Response(
                {"error": "Recommendation calculation failed. Please check activity data."},
                status=500
            )
