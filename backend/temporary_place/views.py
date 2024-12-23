from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Temporary_place
from .serializers import TemporaryPlaceSerializer
from objects.models import Objects
from objects.serializers import ObjectsSerializer
from pollutants.models import Pollutants
from pollutants.serializers import PollutantsSerializer


class TemporaryPlaceViewSet(ModelViewSet):
    queryset = Temporary_place.objects.all()
    serializer_class = TemporaryPlaceSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]


    filterset_fields = ['n', 'v', 't', 'total_tax', 'company']
    search_fields = ['n', 'v', 't', 'total_tax', 'company']
    ordering_fields = ['n', 'v', 't', 'total_tax', 'company']

    def perform_create(self, serializer):

        data = self.request.data
        n = float(data.get('n'))
        v = float(data.get('v'))
        t = float(data.get('t'))

        total_tax = n * v * t

        serializer.save(total_tax=total_tax)

    def perform_update(self, serializer):
        instance = serializer.instance
        data = self.request.data

        n = float(data.get('n', instance.n))
        v = float(data.get('v', instance.v))
        t = float(data.get('t', instance.t))

        total_tax = n * v * t
        serializer.save(total_tax=total_tax)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        pollutants = Pollutants.objects.all()
        pollutants_serializer = PollutantsSerializer(pollutants, many=True)

        companies = Objects.objects.all()
        companies_serializer = ObjectsSerializer(companies, many=True)

        return Response({
            'temp_place': response.data,
            'pollutants': pollutants_serializer.data,
            'objects': companies_serializer.data,
        })