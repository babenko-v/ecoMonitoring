from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Temporary_place
from .serializers import TemporaryPlaceSerializer


class RadioactiveWasteViewSet(ModelViewSet):
    queryset = Temporary_place.objects.all()
    serializer_class = TemporaryPlaceSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]


    filterset_fields = ['n', 'v', 't', 'total_tax', 'company']
    search_fields = ['n', 'v', 't', 'total_tax', 'company']
    ordering_fields = ['n', 'v', 't', 'total_tax', 'company']

    def perform_create(self, serializer):

        data = self.request.data
        n = float(data.get('on_electricity', 0))
        v = float(data.get('c1ns', 0))
        t = float(data.get('c2ns', 0))

        total_tax = n * v * t

        serializer.save(total_tax=total_tax)