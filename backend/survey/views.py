from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F, Avg, Count
from django.contrib.auth.models import User

from .models import SurveyResult, ElectiveRecommendation
from .serializers import SurveyResultSerializer
from activities.models import ActivityResult


class SurveyResultView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SurveyResultSerializer(data=request.data, context={"request": request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SurveyResultMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            survey = SurveyResult.objects.get(user=user)
            serializer = SurveyResultSerializer(survey)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except SurveyResult.DoesNotExist:
            return Response(
                {"detail": "No survey result found."},
                status=status.HTTP_404_NOT_FOUND
            )
    
    def delete(self, request):
        """Allow user to delete their survey result to retake the survey"""
        user = request.user
        try:
            survey = SurveyResult.objects.get(user=user)
            survey.delete()
            return Response(
                {"detail": "Survey result deleted successfully. You can now retake the survey."},
                status=status.HTTP_200_OK
            )
        except SurveyResult.DoesNotExist:
            return Response(
                {"detail": "No survey result found to delete."},
                status=status.HTTP_404_NOT_FOUND
            )


class LeaderboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get top 10 users by completion time (fastest first)
        leaderboard = SurveyResult.objects.select_related('user').filter(
            completion_time__isnull=False  # Only include completed surveys
        ).order_by(
            'completion_time',     # Faster completion = better rank
            'date_completed'       # Earlier completion = tiebreaker
        )[:10]
        
        leaderboard_data = []
        for rank, result in enumerate(leaderboard, 1):
            # Format completion time for display
            completion_seconds = result.completion_time.total_seconds()
            minutes = int(completion_seconds // 60)
            seconds = int(completion_seconds % 60)
            
            leaderboard_data.append({
                'rank': rank,
                'username': result.user.username,
                'completion_time_display': f"{minutes}:{seconds:02d}",
                'completion_time_seconds': completion_seconds,
                'selected_elective': result.selected_elective,
                'date_completed': result.date_completed,
                'is_current_user': result.user == request.user
            })
        
        return Response(leaderboard_data, status=status.HTTP_200_OK)


class GenerateRecommendationView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            user = request.user
            
            # Get survey results
            try:
                survey = SurveyResult.objects.get(user=user)
                survey_scores = survey.elective_scores
            except SurveyResult.DoesNotExist:
                return Response(
                    {"detail": "Please complete the interest survey first."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Get activity results
            activities = ActivityResult.objects.filter(user=user, completed=True)
            
            # Calculate activity scores per elective
            activity_scores = {}
            for elective in ['MobileDev', 'ITBA', 'MMGD']:
                elective_activities = activities.filter(elective=elective)
                
                if elective_activities.exists():
                    # Score based on:
                    # 1. Completion rate (did they finish activities?)
                    # 2. Time efficiency (faster = more engaged)
                    # 3. Engagement score (interactions, quality)
                    
                    total_activities = 3  # Each elective has 3 activities
                    completed_count = elective_activities.count()
                    completion_rate = (completed_count / total_activities) * 100
                    
                    # ============================================================================
                    # ENHANCED ACTIVITY ANALYSIS FOR RECOMMENDATION
                    # Uses comprehensive performance metrics from activity analysis
                    # ============================================================================
                    
                    # 1. Completion Rate (30% weight)
                    # Did they finish all activities for this elective?
                    completion_rate = (completed_count / total_activities) * 100
                    
                    # 2. Overall Performance Score (40% weight)
                    # Uses calculate_performance_score() which combines:
                    #   - Completion status (30%)
                    #   - Engagement score (30%)
                    #   - Time efficiency (20%)
                    #   - Improvement rate (20%)
                    performance_scores = [a.calculate_performance_score() for a in elective_activities]
                    avg_performance = sum(performance_scores) / len(performance_scores) if performance_scores else 0
                
                # 3. Time Efficiency (20% weight)
                # How efficiently did they complete activities (optimal time range)
                avg_time_efficiency = elective_activities.aggregate(
                    Avg('time_efficiency')
                )['time_efficiency__avg']
                
                # Fallback: Calculate time efficiency if not stored
                if avg_time_efficiency is None or avg_time_efficiency == 0:
                    # Calculate from completion time
                    avg_time = elective_activities.aggregate(
                        Avg('completion_time')
                    )['completion_time__avg']
                    if avg_time:
                        time_minutes = avg_time.total_seconds() / 60
                        # Optimal: 3-7 minutes = 100, outside range = lower
                        if 3 <= time_minutes <= 7:
                            avg_time_efficiency = 100
                        elif time_minutes < 3:
                            avg_time_efficiency = 70 + (time_minutes - 1) * 10
                        elif time_minutes <= 10:
                            avg_time_efficiency = 100 - (time_minutes - 7) * 5
                        else:
                            avg_time_efficiency = max(40, 85 - (time_minutes - 10) * 3)
                    else:
                        avg_time_efficiency = 50  # Default
                else:
                    avg_time_efficiency = avg_time_efficiency
                
                # 4. Improvement Rate (10% weight)
                # Did they improve when retrying activities?
                avg_improvement = elective_activities.aggregate(
                    Avg('improvement_rate')
                )['improvement_rate__avg']
                
                if avg_improvement is None:
                    avg_improvement = 0
                
                improvement_score = min(100, max(0, avg_improvement * 2))  # Scale to 0-100
                
                # 5. Engagement Quality (bonus consideration)
                # Average engagement score for additional insight
                avg_engagement = elective_activities.aggregate(
                    Avg('engagement_score')
                )['engagement_score__avg'] or 0
                
                # Combined activity score using enhanced metrics
                activity_score = (
                    completion_rate * 0.30 +           # 30% - Did they complete activities?
                    avg_performance * 0.40 +           # 40% - Overall performance (comprehensive)
                    avg_time_efficiency * 0.20 +        # 20% - Time efficiency
                    improvement_score * 0.10            # 10% - Improvement over attempts
                )
                
                # Add engagement bonus (up to 5 points) if engagement is very high
                if avg_engagement > 80:
                    activity_score += min(5, (avg_engagement - 80) / 4)  # Bonus for high engagement
                
                activity_scores[elective] = round(activity_score, 2)
            else:
                # No activities completed for this elective
                activity_scores[elective] = 0
        
        # Normalize survey scores to 0-100 scale
        max_survey = max(survey_scores.values()) if survey_scores.values() else 1
        normalized_survey = {
            k: (v / max_survey) * 100 if max_survey > 0 else 0 
            for k, v in survey_scores.items()
        }
        
        # Calculate final weighted scores
        final_scores = {}
        for elective in ['MobileDev', 'ITBA', 'MMGD']:
            survey_component = normalized_survey.get(elective, 0) * 0.6
            activity_component = activity_scores.get(elective, 0) * 0.4
            final_scores[elective] = round(survey_component + activity_component, 2)
        
        # Determine recommendation
        recommended = max(final_scores, key=final_scores.get)
        confidence = final_scores[recommended]
        
        # Calculate confidence level
        sorted_scores = sorted(final_scores.values(), reverse=True)
        if len(sorted_scores) > 1:
            gap = sorted_scores[0] - sorted_scores[1]
            # Adjust confidence based on gap between top 2
            confidence_level = min(100, confidence + gap)
        else:
            confidence_level = confidence
        
        # Save or update recommendation
        recommendation, created = ElectiveRecommendation.objects.update_or_create(
            user=user,
            defaults={
                'survey_scores': normalized_survey,
                'activity_scores': activity_scores,
                'final_scores': final_scores,
                'recommended_elective': recommended,
                'confidence_score': round(confidence_level, 2)
            }
        )
        
        # Prepare detailed breakdown with enhanced activity analysis
        activity_breakdown = {}
        for elective in ['MobileDev', 'ITBA', 'MMGD']:
            elective_activities = activities.filter(elective=elective, completed=True)
            if elective_activities.exists():
                performance_scores = [a.calculate_performance_score() for a in elective_activities]
                avg_performance = sum(performance_scores) / len(performance_scores) if performance_scores else 0
                
                activity_breakdown[elective] = {
                    'score': activity_scores.get(elective, 0),
                    'activities_completed': elective_activities.count(),
                    'average_performance_score': round(avg_performance, 2),
                    'average_time_efficiency': round(
                        elective_activities.aggregate(Avg('time_efficiency'))['time_efficiency__avg'] or 0, 2
                    ),
                    'average_engagement': round(
                        elective_activities.aggregate(Avg('engagement_score'))['engagement_score__avg'] or 0, 2
                    ),
                    'average_improvement_rate': round(
                        elective_activities.aggregate(Avg('improvement_rate'))['improvement_rate__avg'] or 0, 2
                    ),
                    'total_interactions': sum(a.total_interactions for a in elective_activities),
                    'completion_rate': round((elective_activities.count() / 3) * 100, 2)
                }
            else:
                activity_breakdown[elective] = {
                    'score': 0,
                    'activities_completed': 0,
                    'message': 'No activities completed'
                }
            
            # Prepare response
            response_data = {
                'recommended_elective': recommended,
                'confidence_score': round(confidence_level, 2),
                'final_scores': final_scores,
                'breakdown': {
                    'survey_scores': normalized_survey,
                    'survey_weight': '60%',
                    'activity_scores': activity_scores,
                    'activity_weight': '40%',
                    'activity_analysis': activity_breakdown  # Enhanced activity breakdown
                },
                'activities_completed': activities.count(),
                'survey_completed': True,
                'analysis_method': 'Enhanced activity analysis using performance scores, time efficiency, and improvement rates'
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
        
        except Exception as e:
            # Log the actual error for debugging
            import traceback
            error_details = traceback.format_exc()
            print(f"Error in GenerateRecommendationView: {str(e)}")
            print(error_details)
            
            return Response(
                {
                    "detail": f"Error generating recommendation: {str(e)}",
                    "error_type": type(e).__name__
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
