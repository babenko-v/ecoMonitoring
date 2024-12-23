from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Calculations
from objects.models import Objects
from pollutants.models import Pollutants
from .serializers import CalculationWaterSerializer, CalculationAirSerializer
from pollutants.serializers import PollutantsSerializer
from objects.serializers import ObjectsSerializer


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
        pollutant_ratio = data.get('pollutant')

        ratio_water = data.get('ratio_water', 1)

        total_tax = ratio_water * total_emissions * pollutant_ratio.tax_rate
        serializer.save(total_tax=total_tax)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        pollutants = Pollutants.objects.all().exclude(type_of_pollutant="air")
        pollutants_serializer = PollutantsSerializer(pollutants, many=True)

        companies = Objects.objects.all()
        companies_serializer = ObjectsSerializer(companies, many=True)

        return Response({
            'calculations': response.data,
            'pollutants': pollutants_serializer.data,
            'companies': companies_serializer.data,
        })


class CalculationsAirViewSet(ModelViewSet):
    queryset = Calculations.objects.all().exclude(pollutant__type_of_pollutant="water")
    serializer_class = CalculationAirSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    filterset_fields = ['total_emissions', 'date', 'pollutant', 'company', 'total_tax']

    search_fields = ['total_emissions', 'date', 'pollutant', 'company', 'total_tax']

    ordering_fields = ['total_emissions', 'date', 'pollutant', 'company', 'total_tax']

    def perform_create(self, serializer):
        data = serializer.validated_data
        total_emissions = data.get('total_emissions', 0)
        pollutant_ratio = data.get('pollutant')
        calculation_method = data.get('calculation_method', False)

        if calculation_method is False:
            total_tax = total_emissions * pollutant_ratio.tax_rate
        else:
            k1 = data.get('k1', 1)
            k2 = data.get('k2', 1)
            total_tax = k1 * total_emissions * pollutant_ratio.tax_rate * k2

        serializer.save(total_tax=total_tax)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        pollutants = Pollutants.objects.all().exclude(type_of_pollutant="water")
        pollutants_serializer = PollutantsSerializer(pollutants, many=True)

        companies = Objects.objects.all()
        companies_serializer = ObjectsSerializer(companies, many=True)

        return Response({
            'calculations': response.data,
            'pollutants': pollutants_serializer.data,
            'companies': companies_serializer.data,
        })


