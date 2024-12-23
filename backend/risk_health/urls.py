from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import RiskHealthViewSet

# Создание роутера и регистрация ViewSet
router = DefaultRouter()
router.register(r'risk_health', RiskHealthViewSet, basename='risk_heath')

# Маршруты приложения
urlpatterns = [
    path('', include(router.urls)),
]
