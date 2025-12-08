from django.urls import path
from .views import (
    ActivityResultView,
    ActivityAnalysisView
)

urlpatterns = [
    path("activity-result/", ActivityResultView.as_view(), name="activity-result"),
    path("activity-analysis/", ActivityAnalysisView.as_view(), name="activity-analysis"),
]
