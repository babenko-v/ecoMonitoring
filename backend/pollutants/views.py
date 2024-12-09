from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Pollutants, Calculations
from .serializers import PollutantsSerializer, CalculationsSerializer


class PollutantsViewSet(ModelViewSet):
    queryset = Pollutants.objects.all()
    serializer_class = PollutantsSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    filterset_fields = ['name', 'enormity_mass_flow', 'permissible_emissions', 'dangerous_emissions']

    search_fields = ['name', 'enormity_mass_flow', 'permissible_emissions', 'dangerous_emissions']

    ordering_fields = ['name', 'enormity_mass_flow', 'permissible_emissions', 'dangerous_emissions']

class CalculationsViewSet(ModelViewSet):
    queryset = Calculations.objects.all()
    serializer_class = CalculationsSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    filterset_fields = ['total_emissions', 'date', 'pollutant', 'company']

    filterset_fields = ['total_emissions', 'date', 'pollutant', 'company']

    filterset_fields = ['total_emissions', 'date', 'pollutant', 'company']
