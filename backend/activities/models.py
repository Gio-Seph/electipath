from django.db import models
from django.contrib.auth.models import User

class ActivityResult(models.Model):
    ELECTIVE_CHOICES = [
        ('MobileDev', 'Mobile Development'),
        ('ITBA', 'IT Business Analytics'),
        ('MMGD', 'Multimedia & Game Development'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activity_results')
    elective = models.CharField(max_length=50, choices=ELECTIVE_CHOICES)
    activity_name = models.CharField(max_length=100)
    completion_time = models.DurationField()  # Time spent on activity
    completed = models.BooleanField(default=False)
    engagement_score = models.FloatField(default=0)  # 0-100 based on interactions
    
    # Enhanced tracking metrics
    total_interactions = models.IntegerField(default=0)  # Total clicks, changes, etc.
    interaction_rate = models.FloatField(default=0)  # Interactions per minute
    time_efficiency = models.FloatField(default=0)  # 0-100 score based on optimal time
    quality_indicators = models.JSONField(default=dict, blank=True)  # Activity-specific metrics
    attempts = models.IntegerField(default=1)  # Number of times activity was attempted
    first_attempt_time = models.DurationField(null=True, blank=True)  # Time on first attempt
    last_attempt_time = models.DurationField(null=True, blank=True)  # Time on last attempt
    improvement_rate = models.FloatField(default=0)  # Improvement from first to last attempt
    
    date_completed = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'survey_activityresult'  # Use existing table name from survey app
        unique_together = ['user', 'elective', 'activity_name']
        ordering = ['-date_completed']
    
    def __str__(self):
        return f"{self.user.username} - {self.elective} - {self.activity_name}"
    
    def calculate_performance_score(self):
        """Calculate overall performance score (0-100)"""
        # Weighted combination of metrics
        completion_weight = 30 if self.completed else 0
        engagement_weight = self.engagement_score * 0.3
        efficiency_weight = self.time_efficiency * 0.2
        improvement_weight = min(100, self.improvement_rate * 20) * 0.2
        
        return min(100, completion_weight + engagement_weight + efficiency_weight + improvement_weight)
