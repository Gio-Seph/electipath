from django.contrib import admin
from .models import ActivityResult


@admin.register(ActivityResult)
class ActivityResultAdmin(admin.ModelAdmin):
    list_display = ['user', 'elective', 'activity_name', 'completed', 'engagement_score', 'total_interactions', 'attempts', 'date_completed']
    list_filter = ['elective', 'completed', 'date_completed', 'date_updated']
    search_fields = ['user__username', 'user__email', 'activity_name', 'elective']
    readonly_fields = ['date_completed', 'date_updated', 'calculate_performance_score_display']
    fieldsets = (
        ('User & Activity', {
            'fields': ('user', 'elective', 'activity_name')
        }),
        ('Completion Status', {
            'fields': ('completed', 'attempts', 'completion_time', 'first_attempt_time', 'last_attempt_time')
        }),
        ('Performance Metrics', {
            'fields': ('engagement_score', 'total_interactions', 'interaction_rate', 'time_efficiency', 'improvement_rate', 'quality_indicators')
        }),
        ('Calculated Score', {
            'fields': ('calculate_performance_score_display',)
        }),
        ('Timestamps', {
            'fields': ('date_completed', 'date_updated')
        }),
    )
    
    def calculate_performance_score_display(self, obj):
        return f"{obj.calculate_performance_score():.2f}%"
    calculate_performance_score_display.short_description = 'Performance Score'
