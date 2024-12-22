from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Radioactive_waste
from .serializers import RadioactiveSerializer


class RadioactiveWasteViewSet(ModelViewSet):
    queryset = Radioactive_waste.objects.all()
    serializer_class = RadioactiveSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]


    filterset_fields = ['on_electricity', 'c1ns', 'c2ns', 'c1v', 'c2v', 'v1ns', 'v2ns', 'v1v', 'v2v', 'company',
                        'total_tax']
    search_fields = ['on_electricity', 'c1ns', 'c2ns', 'c1v', 'c2v', 'v1ns', 'v2ns', 'v1v', 'v2v', 'company__name']
    ordering_fields = ['on_electricity', 'c1ns', 'c2ns', 'c1v', 'c2v', 'v1ns', 'v2ns', 'v1v', 'v2v', 'company',
                       'total_tax']

    def perform_create(self, serializer):

        data = self.request.data
        on_electricity = float(data.get('on_electricity', 0))
        c1ns = float(data.get('c1ns', 0))
        c2ns = float(data.get('c2ns', 0))
        c1v = float(data.get('c1v', 0))
        c2v = float(data.get('c2v', 0))
        v1ns = float(data.get('v1ns', 0))
        v2ns = float(data.get('v2ns', 0))
        v1v = float(data.get('v1v', 0))
        v2v = float(data.get('v2v', 0))

        extra_value = bool(data.get('extra_value'))

        total_tax = on_electricity * 0.0133 + (2 * c1ns * v1ns + 50 * c1v * v1v) + 1/32 if extra_value is True else 0 * (2 * c2ns * v2ns + 50 * c2v * v2v)

        serializer.save(total_tax=total_tax)