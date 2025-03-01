from rest_framework import serializers
from .models import Calculations
from objects.models import Objects
from pollutants.models import Pollutants


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Objects
        fields = ['id', 'name', 'address']


class Pollutanterializer(serializers.ModelSerializer):
    class Meta:
        model = Pollutants
        fields = ['id', 'name', 'tax_rate']


class CalculationWaterSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(
        queryset=Objects.objects.all(),
        source='company',
        write_only=True
    )
    pollutant = Pollutanterializer(read_only=True)
    pollutant_id = serializers.PrimaryKeyRelatedField(
        queryset=Pollutants.objects.all().exclude(type_of_pollutant="air"),
        source='pollutant',
        write_only=True
    )
    ratio_water = serializers.FloatField(write_only=True, required=False, default=False)

    class Meta:
        model = Calculations
        fields = '__all__'
        read_only_fields = ('total_tax',)

    def create(self, validated_data):
        ratio_water = validated_data.pop('ratio_water', 1)
        pollutants = validated_data.get('pollutant')

        total_emissions = validated_data.get('total_emissions', 0)

        total_tax = ratio_water * total_emissions * pollutants.tax_rate


        validated_data['total_tax'] = total_tax
        return super().create(validated_data)

    def update(self, instance, validated_data):
        ratio_water = validated_data.pop('ratio_water', 1)


        total_emissions = validated_data.get('total_emissions', instance.total_emissions)
        pollutants = validated_data.get('pollutant')

        total_tax = ratio_water * total_emissions * pollutants.tax_rate

        validated_data['total_tax'] = total_tax
        return super().update(instance, validated_data)


class CalculationAirSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(
        queryset=Objects.objects.all(),
        source='company',
        write_only=True
    )

    pollutant = Pollutanterializer(read_only=True)
    pollutant_id = serializers.PrimaryKeyRelatedField(
        queryset=Pollutants.objects.all().exclude(type_of_pollutant="water"),
        source='pollutant',
        write_only=True
    )

    calculation_method = serializers.BooleanField(write_only=True, default=False)
    k1 = serializers.IntegerField(write_only=True, required=False, default=1)
    k2 = serializers.IntegerField(write_only=True, required=False, default=1)


    class Meta:
        model = Calculations
        fields = '__all__'
        read_only_fields = ('total_tax',)

    def create(self, validated_data):
        calculation_method = validated_data.pop('calculation_method', False)
        pollutant_ratio = validated_data.get('pollutant')
        total_emissions = validated_data.get('total_emissions', 0)
        k1 = validated_data.pop('k1', 1)
        k2 = validated_data.pop('k2', 1)

        if calculation_method is False:
            total_tax = pollutant_ratio.tax_rate * total_emissions
        else:

            total_tax = k1 * k2 * total_emissions * pollutant_ratio.tax_rate

        validated_data['total_tax'] = total_tax

        # Убедитесь, что k1 и k2 не передаются в super().create
        return super().create(validated_data)

    def update(self, instance, validated_data):
        calculation_method = validated_data.pop('calculation_method', False)
        pollutant_ratio = validated_data.get('pollutant')
        total_emissions = validated_data.get('total_emissions', instance.total_emissions)
        k1 = validated_data.pop('k1', 1)
        k2 = validated_data.pop('k2', 1)

        if calculation_method is False:
            total_tax = pollutant_ratio.tax_rate * total_emissions
        else:

            total_tax = k1 * k2 * total_emissions * pollutant_ratio.tax_rate

        validated_data['total_tax'] = total_tax
        return super().update(instance, validated_data)

