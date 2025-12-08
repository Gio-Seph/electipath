from django.urls import path
from .views import (
    SurveyResultView, 
    SurveyResultMeView, 
    LeaderboardView,
)

urlpatterns = [
    path("survey-result/", SurveyResultView.as_view(), name="survey-result"),
    path("survey-result/me/", SurveyResultMeView.as_view(), name="survey-result-me"),
    path("leaderboard/", LeaderboardView.as_view(), name="leaderboard"),
]
