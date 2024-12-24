from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import CompensationAirViewSet, CompensationWaterViewSet


router = DefaultRouter()
router.register(r'compensations_water', CompensationWaterViewSet, basename='compensations_water')
router.register(r'compensations_air', CompensationAirViewSet, basename='compensations_air')


urlpatterns = [
    path('', include(router.urls)),
]
