from rest_framework import serializers
from .models import Pollutants, Calculations

class PollutantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pollutants
        fields = '__all__'

class CalculationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calculations
        fields = '__all__'
