from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import CompensationAir, CompensationWater
from objects.models import Objects
from pollutants.models import Pollutants
from .serializers import CompensationAirSerializer, CompensationWaterSerializer
from pollutants.serializers import PollutantsSerializer
from objects.serializers import ObjectsSerializer


class CompensationAirViewSet(ModelViewSet):
    queryset = CompensationAir.objects.all()
    serializer_class = CompensationAirSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    filterset_fields = ['m', 'A', 'Kt', 'date', 'Kzi', 'total', 'pollutant', 'company']

    search_fields = ['m', 'A', 'Kt', 'date', 'Kzi', 'total', 'pollutant', 'company']

    ordering_fields = ['m', 'A', 'Kt', 'date', 'Kzi', 'total', 'pollutant', 'company']

    def perform_create(self, serializer):
        data = serializer.validated_data

        ro = data.get('ro', 0)
        qmn = data.get('qmn', 0)
        qm = data.get('qm', 0)
        t = data.get('t', 0)
        gdk = data.get('gdk', 0)

        Knas = data.get('Knas', 0)
        Kf = data.get('Kf', 0)

        Kt = Knas * Kf
        m = 3.6 * 0.001 * (qmn - qm) * t
        Kzi = ro / gdk if gdk != 0 else 0
        A = 10 / gdk if gdk > 1 else 1 / gdk if gdk != 0 else 0

        total = m * 1, 1 * 8000 * A * Kt * Kzi

        serializer.save(Kt=Kt, m=m, Kzi=Kzi, A=A, total=total)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        pollutants = Pollutants.objects.all()
        pollutants_serializer = PollutantsSerializer(pollutants, many=True)

        companies = Objects.objects.all()
        companies_serializer = ObjectsSerializer(companies, many=True)

        return Response({
            'compensation_air': response.data,
            'pollutants': pollutants_serializer.data,
            'objects': companies_serializer.data,
        })

class CompensationWaterViewSet(ModelViewSet):
    queryset = CompensationWater.objects.all()
    serializer_class = CompensationWaterSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    filterset_fields = ['Kkat', 'Kr', 'm', 'Yi', 'date', 'total', 'pollutant', 'company']

    search_fields = ['Kkat', 'Kr', 'm', 'Yi', 'date', 'total', 'pollutant', 'company']

    ordering_fields = ['Kkat', 'Kr', 'm', 'Yi', 'date', 'total', 'pollutant', 'company']

    def perform_create(self, serializer):
        data = serializer.validated_data

        Y = data.get('Y', 0)
        CiD = data.get('CiD', 0)
        CiF = data.get('CiF', 0)
        QIf = data.get('QIf', 0)
        t = data.get('t', 0)
        gdk = data.get('gdk', 0)

        Kkat = data.get('Kkat', 0)
        Kr = data.get('Kr', 0)

        A = 10 / gdk if gdk > 1 else 1 / gdk if gdk != 0 else 0
        Yi = Y * A
        m = (CiF - CiD) * QIf * t * 0.000001

        total = Kkat * Kr * 1.5 * m * Yi

        serializer.save(Yi=Yi, m=m, A=A, total=total)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        pollutants = Pollutants.objects.all()
        pollutants_serializer = PollutantsSerializer(pollutants, many=True)

        companies = Objects.objects.all()
        companies_serializer = ObjectsSerializer(companies, many=True)

        return Response({
            'compensation_water': response.data,
            'pollutants': pollutants_serializer.data,
            'objects': companies_serializer.data,
        })
