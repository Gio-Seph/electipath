from django.urls import path
from .views import (
    SurveyResultView, 
    SurveyResultMeView, 
    LeaderboardView,
    GenerateRecommendationView,
)

urlpatterns = [
    path("survey-result/", SurveyResultView.as_view(), name="survey-result"),
    path("survey-result/me/", SurveyResultMeView.as_view(), name="survey-result-me"),
    path("leaderboard/", LeaderboardView.as_view(), name="leaderboard"),
    path("recommendation/", GenerateRecommendationView.as_view(), name="recommendation"),
]
