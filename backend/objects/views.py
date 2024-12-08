from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Objects
from .serializers import ObjectsSerializer


class ObjectsViewSet(ModelViewSet):
    queryset = Objects.objects.all()
    serializer_class = ObjectsSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    # Позволяет фильтровать по любому полю
    filterset_fields = ['name', 'head', 'address', 'economic_activity', 'ownership']

    # Позволяет искать по конкретным полям
    search_fields = ['name', 'head', 'address', 'economic_activity', 'ownership']

    # Позволяет сортировать по любому полю
    ordering_fields = ['name', 'head', 'address', 'economic_activity', 'ownership']
