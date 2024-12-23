from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import CalculationsWaterViewSet


router = DefaultRouter()
router.register(r'calculations', CalculationsWaterViewSet, basename='calculations')


urlpatterns = [
    path('', include(router.urls)),
]
