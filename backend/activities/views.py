from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Avg
from django.contrib.auth.models import User
from datetime import timedelta

from .models import ActivityResult


class ActivityResultView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """Save activity completion data with enhanced metrics"""
        user = request.user
        elective = request.data.get('elective')
        activity_name = request.data.get('activity_name')
        completion_time_seconds = request.data.get('completion_time_seconds')
        engagement_score = request.data.get('engagement_score', 0)
        
        # Enhanced metrics
        total_interactions = request.data.get('total_interactions', 0)
        interaction_rate = request.data.get('interaction_rate', 0)
        time_efficiency = request.data.get('time_efficiency', 0)
        quality_indicators = request.data.get('quality_indicators', {})
        attempts = request.data.get('attempts', 1)
        completed = request.data.get('completed', True)
        
        if not all([elective, activity_name, completion_time_seconds is not None]):
            return Response(
                {"detail": "Missing required fields"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Convert seconds to timedelta
        completion_time = timedelta(seconds=completion_time_seconds)
        
        # Get existing activity to track improvement
        existing = ActivityResult.objects.filter(
            user=user,
            elective=elective,
            activity_name=activity_name
        ).first()
        
        # Calculate improvement if this is a retry
        improvement_rate = 0
        first_attempt_time = completion_time
        last_attempt_time = completion_time
        
        if existing:
            # This is a retry - calculate improvement
            if existing.first_attempt_time:
                first_attempt_time = existing.first_attempt_time
            else:
                first_attempt_time = existing.completion_time
            
            last_attempt_time = completion_time
            
            # Improvement = reduction in time or increase in engagement
            time_improvement = 0
            if existing.completion_time:
                old_time = existing.completion_time.total_seconds()
                new_time = completion_time.total_seconds()
                if old_time > 0:
                    time_improvement = ((old_time - new_time) / old_time) * 100
            
            engagement_improvement = max(0, engagement_score - existing.engagement_score)
            improvement_rate = (time_improvement * 0.5) + (engagement_improvement * 0.5)
        else:
            first_attempt_time = completion_time
        
        # Create or update activity result
        activity, created = ActivityResult.objects.update_or_create(
            user=user,
            elective=elective,
            activity_name=activity_name,
            defaults={
                'completion_time': completion_time,
                'completed': completed,
                'engagement_score': engagement_score,
                'total_interactions': total_interactions,
                'interaction_rate': interaction_rate,
                'time_efficiency': time_efficiency,
                'quality_indicators': quality_indicators,
                'attempts': attempts,
                'first_attempt_time': first_attempt_time,
                'last_attempt_time': last_attempt_time,
                'improvement_rate': improvement_rate
            }
        )
        
        return Response({
            'message': 'Activity result saved',
            'activity_id': activity.id,
            'performance_score': activity.calculate_performance_score()
        }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
    
    def get(self, request):
        """Get user's activity results"""
        user = request.user
        activities = ActivityResult.objects.filter(user=user).order_by('-date_completed')
        
        activity_data = []
        for activity in activities:
            activity_data.append({
                'id': activity.id,
                'elective': activity.elective,
                'activity_name': activity.activity_name,
                'completion_time_seconds': activity.completion_time.total_seconds(),
                'completed': activity.completed,
                'engagement_score': activity.engagement_score,
                'total_interactions': activity.total_interactions,
                'interaction_rate': activity.interaction_rate,
                'time_efficiency': activity.time_efficiency,
                'attempts': activity.attempts,
                'improvement_rate': activity.improvement_rate,
                'performance_score': activity.calculate_performance_score(),
                'date_completed': activity.date_completed
            })
        
        return Response(activity_data, status=status.HTTP_200_OK)


class ActivityAnalysisView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Analyze how students finish activities - comprehensive performance analysis"""
        user = request.user
        
        # Get all user's activity results
        user_activities = ActivityResult.objects.filter(user=user, completed=True)
        
        if not user_activities.exists():
            return Response({
                'message': 'No completed activities found',
                'analysis': {}
            }, status=status.HTTP_200_OK)
        
        # Initialize analysis structure
        analysis = {
            'overall': {},
            'by_elective': {},
            'trends': {},
            'comparison': {}
        }
        
        # ============================================================================
        # OVERALL ANALYSIS
        # ============================================================================
        total_activities = user_activities.count()
        avg_completion_time = user_activities.aggregate(
            Avg('completion_time')
        )['completion_time__avg']
        avg_engagement = user_activities.aggregate(
            Avg('engagement_score')
        )['engagement_score__avg'] or 0
        avg_time_efficiency = user_activities.aggregate(
            Avg('time_efficiency')
        )['time_efficiency__avg'] or 0
        avg_performance = user_activities.aggregate(
            Avg('total_interactions')
        )['total_interactions__avg'] or 0
        
        # Calculate overall performance score
        overall_performance_scores = [a.calculate_performance_score() for a in user_activities]
        avg_performance_score = sum(overall_performance_scores) / len(overall_performance_scores) if overall_performance_scores else 0
        
        analysis['overall'] = {
            'total_activities_completed': total_activities,
            'average_completion_time_minutes': round(avg_completion_time.total_seconds() / 60, 2) if avg_completion_time else 0,
            'average_engagement_score': round(avg_engagement, 2),
            'average_time_efficiency': round(avg_time_efficiency, 2),
            'average_interactions': round(avg_performance, 2),
            'overall_performance_score': round(avg_performance_score, 2),
            'completion_rate': round((total_activities / 9) * 100, 2)  # 9 total activities (3 per elective)
        }
        
        # ============================================================================
        # ANALYSIS BY ELECTIVE
        # ============================================================================
        for elective in ['MobileDev', 'ITBA', 'MMGD']:
            elective_activities = user_activities.filter(elective=elective)
            
            if elective_activities.exists():
                elective_avg_time = elective_activities.aggregate(
                    Avg('completion_time')
                )['completion_time__avg']
                elective_avg_engagement = elective_activities.aggregate(
                    Avg('engagement_score')
                )['engagement_score__avg'] or 0
                elective_avg_efficiency = elective_activities.aggregate(
                    Avg('time_efficiency')
                )['time_efficiency__avg'] or 0
                
                elective_performance_scores = [a.calculate_performance_score() for a in elective_activities]
                elective_avg_performance = sum(elective_performance_scores) / len(elective_performance_scores) if elective_performance_scores else 0
                
                # Calculate improvement trend
                activities_ordered = elective_activities.order_by('date_completed')
                if activities_ordered.count() >= 2:
                    first_score = activities_ordered.first().calculate_performance_score()
                    last_score = activities_ordered.last().calculate_performance_score()
                    improvement_trend = last_score - first_score
                else:
                    improvement_trend = 0
                
                analysis['by_elective'][elective] = {
                    'activities_completed': elective_activities.count(),
                    'average_completion_time_minutes': round(elective_avg_time.total_seconds() / 60, 2) if elective_avg_time else 0,
                    'average_engagement_score': round(elective_avg_engagement, 2),
                    'average_time_efficiency': round(elective_avg_efficiency, 2),
                    'average_performance_score': round(elective_avg_performance, 2),
                    'improvement_trend': round(improvement_trend, 2),
                    'completion_rate': round((elective_activities.count() / 3) * 100, 2)  # 3 activities per elective
                }
            else:
                analysis['by_elective'][elective] = {
                    'activities_completed': 0,
                    'completion_rate': 0,
                    'message': 'No activities completed for this elective'
                }
        
        # ============================================================================
        # TREND ANALYSIS
        # ============================================================================
        # Analyze performance over time
        activities_by_date = user_activities.order_by('date_completed')
        
        if activities_by_date.count() >= 2:
            first_activity = activities_by_date.first()
            last_activity = activities_by_date.last()
            
            time_span_days = (last_activity.date_completed - first_activity.date_completed).days or 1
            
            analysis['trends'] = {
                'first_activity_date': first_activity.date_completed.isoformat(),
                'last_activity_date': last_activity.date_completed.isoformat(),
                'time_span_days': time_span_days,
                'activities_per_day': round(total_activities / time_span_days, 2) if time_span_days > 0 else total_activities,
                'performance_improvement': round(
                    last_activity.calculate_performance_score() - first_activity.calculate_performance_score(),
                    2
                ),
                'engagement_trend': round(
                    last_activity.engagement_score - first_activity.engagement_score,
                    2
                )
            }
        
        # ============================================================================
        # COMPARISON WITH PEERS
        # ============================================================================
        # Compare user's performance with average of all users
        all_activities = ActivityResult.objects.filter(completed=True)
        
        if all_activities.exists():
            peer_avg_engagement = all_activities.aggregate(
                Avg('engagement_score')
            )['engagement_score__avg'] or 0
            peer_avg_time = all_activities.aggregate(
                Avg('completion_time')
            )['completion_time__avg']
            peer_avg_efficiency = all_activities.aggregate(
                Avg('time_efficiency')
            )['time_efficiency__avg'] or 0
            
            analysis['comparison'] = {
                'engagement_vs_peer': round(avg_engagement - peer_avg_engagement, 2),
                'time_efficiency_vs_peer': round(avg_time_efficiency - peer_avg_efficiency, 2),
                'peer_average_engagement': round(peer_avg_engagement, 2),
                'peer_average_time_efficiency': round(peer_avg_efficiency, 2),
                'performance_percentile': self._calculate_percentile(user, avg_performance_score)
            }
        
        # ============================================================================
        # INSIGHTS & RECOMMENDATIONS
        # ============================================================================
        insights = []
        
        # Engagement insights
        if avg_engagement > 80:
            insights.append("Excellent engagement! You're highly interactive with activities.")
        elif avg_engagement < 50:
            insights.append("Consider spending more time exploring activities to improve engagement.")
        
        # Time efficiency insights
        if avg_time_efficiency > 80:
            insights.append("Great time management! You complete activities efficiently.")
        elif avg_time_efficiency < 50:
            insights.append("You might be rushing through activities. Take time to explore thoroughly.")
        
        # Elective preference insights
        elective_scores = {k: v.get('average_performance_score', 0) for k, v in analysis['by_elective'].items()}
        if elective_scores:
            top_elective = max(elective_scores, key=elective_scores.get)
            if elective_scores[top_elective] > 70:
                insights.append(f"You show strong performance in {top_elective} activities.")
        
        # Improvement insights
        if analysis.get('trends', {}).get('performance_improvement', 0) > 10:
            insights.append("Great improvement! Your performance is getting better over time.")
        
        analysis['insights'] = insights
        
        return Response({
            'user_id': user.id,
            'username': user.username,
            'analysis': analysis
        }, status=status.HTTP_200_OK)
    
    def _calculate_percentile(self, user, user_score):
        """Calculate user's performance percentile"""
        all_users = User.objects.filter(activity_results__completed=True).distinct()
        
        user_scores = []
        for u in all_users:
            activities = ActivityResult.objects.filter(user=u, completed=True)
            if activities.exists():
                scores = [a.calculate_performance_score() for a in activities]
                avg_score = sum(scores) / len(scores) if scores else 0
                user_scores.append(avg_score)
        
        if not user_scores:
            return 50  # Default to median if no data
        
        user_scores.sort()
        percentile = (sum(1 for score in user_scores if score < user_score) / len(user_scores)) * 100
        return round(percentile, 2)
