from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import PollutantsViewSet

# Создание роутера и регистрация ViewSet
router = DefaultRouter()
router.register(r'pollutants', PollutantsViewSet, basename='pollutants')

# Маршруты приложения
urlpatterns = [
    path('', include(router.urls)),  #
]
