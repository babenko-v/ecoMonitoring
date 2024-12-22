from rest_framework import serializers

from .models import Temporary_place


class TemporaryPlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Temporary_place
        fields = '__all__'
