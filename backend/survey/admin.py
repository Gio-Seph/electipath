from django.contrib import admin
from .models import SurveyResult


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
