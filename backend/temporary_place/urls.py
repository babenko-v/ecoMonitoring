from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import TemporaryPlaceViewSet

router = DefaultRouter()
router.register(r'temporary_place', TemporaryPlaceViewSet, basename='temporary place')

# Маршруты приложения
urlpatterns = [
    path('', include(router.urls)),
]
