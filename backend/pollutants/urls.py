from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import PollutantsViewSet, CalculationsViewSet

# Создание роутера и регистрация ViewSet
router = DefaultRouter()
router.register(r'pollutants', PollutantsViewSet, basename='pollutants')
router.register(r'calculations', CalculationsViewSet, basename='calculations')

# Маршруты приложения
urlpatterns = [
    path('', include(router.urls)),  #
]
