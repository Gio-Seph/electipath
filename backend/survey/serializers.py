from rest_framework import serializers
from .models import SurveyResult

class SurveyResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyResult
        fields = [
            "id",
            "selected_elective",
            "trait_scores",
            "elective_scores",
            "date_completed",
            "total_xp",
            "level",
            "completion_time",
            "questions_answered",
        ]
        read_only_fields = ["id", "date_completed"]

    def create(self, validated_data):
        user = self.context["request"].user

        # If user already has a survey → update instead of creating duplicate
        existing = SurveyResult.objects.filter(user=user).first()
        if existing:
            existing.selected_elective = validated_data.get("selected_elective", existing.selected_elective)
            existing.trait_scores = validated_data.get("trait_scores", existing.trait_scores)
            existing.elective_scores = validated_data.get("elective_scores", existing.elective_scores)
            existing.total_xp = validated_data.get("total_xp", existing.total_xp)
            existing.level = validated_data.get("level", existing.level)
            existing.completion_time = validated_data.get("completion_time", existing.completion_time)
            existing.questions_answered = validated_data.get("questions_answered", existing.questions_answered)
            existing.save()
            return existing

        return SurveyResult.objects.create(user=user, **validated_data)
