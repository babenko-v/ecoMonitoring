from rest_framework import serializers
from .models import Pollutants

class PollutantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pollutants
        fields = '__all__'
