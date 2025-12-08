from django.contrib import admin
from .models import SurveyResult, ElectiveRecommendation


@admin.register(SurveyResult)
class SurveyResultAdmin(admin.ModelAdmin):
    list_display = ['user', 'selected_elective', 'level', 'total_xp', 'questions_answered', 'date_completed']
    list_filter = ['selected_elective', 'level', 'date_completed']
    search_fields = ['user__username', 'user__email', 'selected_elective']
    readonly_fields = ['date_completed', 'trait_scores', 'elective_scores']
    fieldsets = (
        ('User Information', {
            'fields': ('user',)
        }),
        ('Survey Results', {
            'fields': ('selected_elective', 'trait_scores', 'elective_scores', 'questions_answered')
        }),
        ('Leaderboard Data', {
            'fields': ('total_xp', 'level', 'completion_time')
        }),
        ('Timestamps', {
            'fields': ('date_completed',)
        }),
    )


@admin.register(ElectiveRecommendation)
class ElectiveRecommendationAdmin(admin.ModelAdmin):
    list_display = ['user', 'recommended_elective', 'confidence_score', 'date_generated']
    list_filter = ['recommended_elective', 'date_generated']
    search_fields = ['user__username', 'user__email', 'recommended_elective']
    readonly_fields = ['date_generated', 'survey_scores', 'activity_scores', 'final_scores']
    fieldsets = (
        ('User', {
            'fields': ('user',)
        }),
        ('Survey Component (60%)', {
            'fields': ('survey_scores', 'survey_weight')
        }),
        ('Activity Component (40%)', {
            'fields': ('activity_scores', 'activity_weight')
        }),
        ('Final Recommendation', {
            'fields': ('final_scores', 'recommended_elective', 'confidence_score')
        }),
        ('Timestamps', {
            'fields': ('date_generated',)
        }),
    )
