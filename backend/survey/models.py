from django.db import models
from django.contrib.auth.models import User

class SurveyResult(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="survey_result")
    selected_elective = models.CharField(max_length=50)
    trait_scores = models.JSONField()
    elective_scores = models.JSONField()
    date_completed = models.DateTimeField(auto_now_add=True)
    
    # Leaderboard fields
    total_xp = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    completion_time = models.DurationField(null=True, blank=True)
    questions_answered = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} - {self.selected_elective} (Level {self.level})"


class ElectiveRecommendation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='recommendation')
    
    # Survey component (60% weight)
    survey_scores = models.JSONField()  # {MMGD: 85, ITBA: 72, MobileDev: 90}
    survey_weight = models.FloatField(default=0.6)
    
    # Activity component (40% weight)
    activity_scores = models.JSONField()  # {MMGD: 75, ITBA: 88, MobileDev: 82}
    activity_weight = models.FloatField(default=0.4)
    
    # Final combined scores
    final_scores = models.JSONField()  # {MMGD: 81, ITBA: 78.4, MobileDev: 87.2}
    recommended_elective = models.CharField(max_length=50)
    confidence_score = models.FloatField()  # 0-100
    
    date_generated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - Recommended: {self.recommended_elective} ({self.confidence_score}%)"
