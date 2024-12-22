from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import RadioactiveWasteViewSet

# Создание роутера и регистрация ViewSet
router = DefaultRouter()
router.register(r'radioactive_waste', RadioactiveWasteViewSet, basename='pollutants')

# Маршруты приложения
urlpatterns = [
    path('', include(router.urls)),
]
