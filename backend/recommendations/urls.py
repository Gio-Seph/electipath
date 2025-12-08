from django.urls import path
from .views import GenerateRecommendationView

urlpatterns = [
    path("recommendation/", GenerateRecommendationView.as_view(), name="combined-recommendation"),
]
