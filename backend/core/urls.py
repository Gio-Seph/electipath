from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    # 🔥 USER ROUTES
    path('api/users/', include('users.urls')),

    # 🔥 JWT AUTH ROUTES (REQUIRED)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # 🔥 OTHER APP ROUTES
    path("api/", include("accounts.urls")),
    path("api/", include("survey.urls")),
    path("api/", include("activities.urls")),
]
