from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Risk_health
from objects.models import Objects
from pollutants.models import Pollutants
from .serializers import RishHealthrSerializer
from pollutants.serializers import PollutantsSerializer
from objects.serializers import ObjectsSerializer


class RiskHealthViewSet(ModelViewSet):
    queryset = Risk_health.objects.all()
    serializer_class = RishHealthrSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    filterset_fields = ['concentration', 'sf', 'rfc', 'date', 'hq', 'ladd', 'cr', 'pollutant', 'company']

    search_fields = ['concentration', 'sf', 'rfc', 'date', 'hq', 'ladd', 'cr', 'pollutant', 'company']

    ordering_fields = ['concentration', 'sf', 'rfc', 'date', 'hq', 'ladd', 'cr', 'pollutant', 'company']

    def perform_create(self, serializer):
        data = serializer.validated_data


        concentration = data.get('concentration', 0)
        sf = data.get('sf', 0)
        rfc = data.get('rfc', 0)

        ladd = (concentration * 20 * 365 * 70) / (70 * 70 * 365)
        hq = concentration / rfc
        cr = ladd * sf

        serializer.save(ladd=ladd, hq=hq, cr=cr)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        pollutants = Pollutants.objects.all()
        pollutants_serializer = PollutantsSerializer(pollutants, many=True)

        companies = Objects.objects.all()
        companies_serializer = ObjectsSerializer(companies, many=True)

        return Response({
            'risk_health': response.data,
            'pollutants': pollutants_serializer.data,
            'objects': companies_serializer.data,
        })
