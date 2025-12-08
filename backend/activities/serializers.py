from rest_framework import serializers
from .models import ActivityResult


class ActivityResultSerializer(serializers.ModelSerializer):
    completion_time_seconds = serializers.SerializerMethodField()
    performance_score = serializers.SerializerMethodField()
    
    class Meta:
        model = ActivityResult
        fields = [
            'id',
            'user',
            'elective',
            'activity_name',
            'completion_time_seconds',
            'completed',
            'engagement_score',
            'total_interactions',
            'interaction_rate',
            'time_efficiency',
            'quality_indicators',
            'attempts',
            'improvement_rate',
            'performance_score',
            'date_completed',
            'date_updated',
        ]
        read_only_fields = ['id', 'user', 'date_completed', 'date_updated']
    
    def get_completion_time_seconds(self, obj):
        return obj.completion_time.total_seconds() if obj.completion_time else None
    
    def get_performance_score(self, obj):
        return obj.calculate_performance_score()
