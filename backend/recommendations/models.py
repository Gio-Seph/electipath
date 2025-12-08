from django.db import models
from django.contrib.auth.models import User

class ElectiveRecommendation(models.Model):
    """Combined recommendation based on BOTH survey AND activity results"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='combined_recommendation')
    
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
        return f"{self.user.username} - Combined Recommendation: {self.recommended_elective} ({self.confidence_score}%)"
