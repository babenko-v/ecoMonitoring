from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Calculations
from .serializers import CalculationWaterSerializer


class CalculationsWaterViewSet(ModelViewSet):
    queryset = Calculations.objects.all().exclude(pollutant__type_of_pollutant="air")
    serializer_class = CalculationWaterSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    filterset_fields = ['total_emissions', 'date', 'pollutant',  'company', 'total_tax']

    search_fields = ['total_emissions', 'date', 'pollutant', 'company', 'total_tax']

    ordering_fields = ['total_emissions', 'date', 'pollutant',  'company', 'total_tax']

    def perform_create(self, serializer):
        data = serializer.validated_data
        total_emissions = data.get('total_emissions', 0)


        ratio_water = data.get('ratio_water', 1)
        pollutant_ratio = data.get('pollutant_ratio', 0)

        total_tax = ratio_water * total_emissions * pollutant_ratio
        serializer.save(total_tax=total_tax)



# class CalculationsAirViewSet(ModelViewSet):
#     queryset = Calculations.objects.all().exclude(pollutant__type_of_pollutant="air")
#     serializer_class = CalculationsSerializer
#     filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
#
#     filterset_fields = ['total_emissions', 'date', 'pollutant', 'company', 'total_tax']
#
#     search_fields = ['total_emissions', 'date', 'pollutant', 'company', 'total_tax']
#
#     ordering_fields = ['total_emissions', 'date', 'pollutant', 'company', 'total_tax']