from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ObjectsViewSet

# Создание роутера и регистрация ViewSet
router = DefaultRouter()
router.register(r'objects', ObjectsViewSet, basename='objects')

# Маршруты приложения
urlpatterns = [
    path('', include(router.urls)),  # Включаем маршруты роутера
]
