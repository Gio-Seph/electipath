from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import logging

from activities.models import ActivityResult
from survey.models import SurveyResult

logger = logging.getLogger(__name__)


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

            selected_elective = survey_result.selected_elective

            # ✅ Get activity performance safely
            activity_results = ActivityResult.objects.filter(user=user)

            if not activity_results.exists():
                return Response({
                    "recommended_elective": selected_elective,
                    "avg_performance": 0,
                    "message": "No activity data yet. Recommendation based on survey only."
                })

            # Calculate average performance score using the method (not a DB field)
            performance_scores = [activity.calculate_performance_score() for activity in activity_results]
            avg_score = sum(performance_scores) / len(performance_scores) if performance_scores else 0

            # ✅ Simple rule-based recommendation fallback
            recommendation_map = {
                "Mobile Development": "Mobile Development",
                "Multimedia & Game Development": "Multimedia & Game Development",
                "IT Business Analytics": "IT Business Analytics",
            }

            final_recommendation = recommendation_map.get(
                selected_elective,
                selected_elective or "Undecided"
            )

            return Response({
                "recommended_elective": final_recommendation,
                "avg_performance": round(avg_score, 2),
                "message": "Recommendation generated successfully."
            })

        except Exception as db_error:
            # ✅ REAL ERROR ONLY (NO FAKE MIGRATION MESSAGE)
            logger.error(f"Recommendation generation failed: {str(db_error)}")
            return Response(
                {"error": "Recommendation calculation failed. Please check activity data."},
                status=500
            )
