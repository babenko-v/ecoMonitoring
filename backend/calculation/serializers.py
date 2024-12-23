from rest_framework import serializers
from .models import Calculations

class CalculationWaterSerializer(serializers.ModelSerializer):
    ratio_water = serializers.FloatField(write_only=True, required=False, default=False)
    pollutant_ratio = serializers.FloatField(write_only=True, required=False, default=False)

    class Meta:
        model = Calculations
        fields = '__all__'
        read_only_fields = ('total_tax',)

    def create(self, validated_data):
        ratio_water = validated_data.pop('ratio_water', 1)
        pollutant_ratio = validated_data.pop('pollutant_ratio', 1)

        total_emissions = validated_data.get('total_emissions', 0)


        total_tax = ratio_water * total_emissions * pollutant_ratio

        validated_data['total_tax'] = total_tax
        return super().create(validated_data)

    def update(self, instance, validated_data):
        ratio_water = validated_data.pop('ratio_water', 1)


        total_emissions = validated_data.get('total_emissions', instance.total_emissions)
        pollutant_ratio = validated_data.get('pollutant_ratio', 0)

        total_tax = ratio_water * total_emissions * pollutant_ratio


        validated_data['total_tax'] = total_tax
        return super().update(instance, validated_data)
