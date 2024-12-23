from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import CalculationsWaterViewSet, CalculationsAirViewSet


router = DefaultRouter()
router.register(r'calculations_water', CalculationsWaterViewSet, basename='calculations_water')
router.register(r'calculations_air', CalculationsAirViewSet, basename='calculations_air')


urlpatterns = [
    path('', include(router.urls)),
]
