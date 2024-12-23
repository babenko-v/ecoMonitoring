from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Pollutants
from .serializers import PollutantsSerializer


class PollutantsViewSet(ModelViewSet):
    queryset = Pollutants.objects.all()
    serializer_class = PollutantsSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    filterset_fields = ['name', 'enormity_mass_flow', 'permissible_emissions', 'dangerous_emissions', 'type_of_pollutant', 'tax_rate']

    search_fields = ['name', 'enormity_mass_flow', 'permissible_emissions', 'dangerous_emissions', 'type_of_pollutant', 'tax_rate']

    ordering_fields = ['name', 'enormity_mass_flow', 'permissible_emissions', 'dangerous_emissions', 'type_of_pollutant', 'tax_rate']

