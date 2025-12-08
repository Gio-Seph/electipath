from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F, Avg, Count
from django.contrib.auth.models import User
import logging

from .models import SurveyResult
from .serializers import SurveyResultSerializer

logger = logging.getLogger(__name__)


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
