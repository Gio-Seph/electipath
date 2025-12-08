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
