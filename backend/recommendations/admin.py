from django.contrib import admin
from .models import ElectiveRecommendation

@admin.register(ElectiveRecommendation)
class ElectiveRecommendationAdmin(admin.ModelAdmin):
    list_display = ['user', 'recommended_elective', 'confidence_score', 'date_generated']
    list_filter = ['recommended_elective', 'date_generated']
    search_fields = ['user__username', 'recommended_elective']
