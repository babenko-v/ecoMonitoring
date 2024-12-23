from rest_framework import serializers

from .models import Temporary_place
from objects.models import Objects


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Objects
        fields = ['id', 'name', 'address']

class TemporaryPlaceSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(
        queryset=Objects.objects.all(),
        source='company',
        write_only=True
    )
    class Meta:
        model = Temporary_place
        fields = '__all__'
        read_only_fields = ('total_tax',)
