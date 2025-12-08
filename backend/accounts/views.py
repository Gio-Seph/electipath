# accounts/views.py (or wherever your current views.py is)

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .serializers import RegisterSerializer, LoginSerializer
from .models import UserProfile
from django.contrib.auth.models import User
from django.contrib.auth import login

from rest_framework_simplejwt.tokens import RefreshToken


@api_view(["POST"])
def register_user(request):
  serializer = RegisterSerializer(data=request.data)
  if serializer.is_valid():
      user = serializer.save()
      
      # Create UserProfile with gender
      gender = request.data.get('gender', 'male')
      full_name = request.data.get('full_name', '')
      UserProfile.objects.create(user=user, gender=gender, full_name=full_name)
      
      return Response(
          {"user": {"id": user.id, "username": user.username, "gender": gender}},
          status=status.HTTP_201_CREATED
      )
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login_user(request):
  """
  JWT-based login:
  - Validates username/password using LoginSerializer
  - Returns user info + access & refresh tokens
  """
  serializer = LoginSerializer(data=request.data)

  if serializer.is_valid():
      user = serializer.validated_data['user']

      # Generate JWT tokens
      refresh = RefreshToken.for_user(user)
      access_token = str(refresh.access_token)

      # (Optional) You no longer need Django session login for JWT:
      # login(request, user)

      # Get user profile data (gender and full_name)
      try:
          profile = UserProfile.objects.get(user=user)
          gender = profile.gender
          full_name = profile.full_name
          print(f"DEBUG: Found profile for {user.username} - full_name: '{full_name}'")
      except UserProfile.DoesNotExist:
          gender = 'male'  # Default if profile doesn't exist
          full_name = ''
          print(f"DEBUG: No profile found for {user.username}")
      
      # Extract first name from full_name
      first_name = full_name.split()[0] if full_name else user.username
      print(f"DEBUG: Extracted first_name: '{first_name}'")
      
      return Response(
          {
              "user": {
                  "id": user.id,
                  "username": user.username,
                  "email": user.email,
                  "gender": gender,
                  "full_name": full_name,
                  "first_name": first_name,
              },
              "access": access_token,
              "refresh": str(refresh),
          },
          status=status.HTTP_200_OK,
      )

  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PATCH"])
@permission_classes([IsAuthenticated])
def user_profile(request):
    """Get or update user profile"""
    user = request.user
    
    # Get or create profile
    profile, created = UserProfile.objects.get_or_create(
        user=user,
        defaults={'gender': 'male', 'full_name': ''}
    )
    
    if request.method == "GET":
        # Extract first name
        first_name = profile.full_name.split()[0] if profile.full_name else user.username
        
        return Response({
            "username": user.username,
            "email": user.email,
            "full_name": profile.full_name,
            "first_name": first_name,
            "gender": profile.gender
        })
    
    elif request.method == "PATCH":
        # Update profile
        if 'full_name' in request.data:
            profile.full_name = request.data['full_name']
        if 'gender' in request.data:
            profile.gender = request.data['gender']
        
        profile.save()
        
        # Extract first name
        first_name = profile.full_name.split()[0] if profile.full_name else user.username
        
        return Response({
            "message": "Profile updated successfully",
            "username": user.username,
            "email": user.email,
            "full_name": profile.full_name,
            "first_name": first_name,
            "gender": profile.gender
        })
