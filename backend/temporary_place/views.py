from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Temporary_place
from .serializers import TemporaryPlaceSerializer


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
        # Пересчет total_tax при обновлении
        instance = serializer.instance
        data = self.request.data

        n = float(data.get('n', instance.n))
        v = float(data.get('v', instance.v))
        t = float(data.get('t', instance.t))

        total_tax = n * v * t
        serializer.save(total_tax=total_tax)