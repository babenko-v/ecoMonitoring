from rest_framework import serializers

from .models import Radioactive_waste


class RadioactiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Radioactive_waste
        fields = '__all__'
