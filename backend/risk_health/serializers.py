from rest_framework import serializers
from .models import Risk_health
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


class RishHealthrSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(
        queryset=Objects.objects.all(),
        source='company',
        write_only=True
    )
    pollutant = Pollutanterializer(read_only=True)
    pollutant_id = serializers.PrimaryKeyRelatedField(
        queryset=Pollutants.objects.all(),
        source='pollutant',
        write_only=True
    )

    class Meta:
        model = Risk_health
        fields = '__all__'
        read_only_fields = ('hq', 'ladd', 'cr', )


    def create(self, validated_data):

        concentration = validated_data.get('concentration', 0)
        sf = validated_data.get('sf', 0)
        rfc = validated_data.get('rfc', 0)

        ladd = (concentration * 20 * 365  * 70)/(70 * 70 * 365)
        hq = concentration / rfc
        cr = ladd * sf


        validated_data['ladd'] = ladd
        validated_data['hq'] = hq
        validated_data['cr'] = cr
        return super().create(validated_data)


    def update(self, instance, validated_data):

        concentration = validated_data.get('concentration', instance.concentration)
        sf = validated_data.get('sf', instance.concentration)
        rfc = validated_data.get('rfc', instance.concentration)

        ladd = (concentration * 20 * 365 * 70) / (70 * 70 * 365)
        hq = concentration / rfc
        cr = ladd * sf

        validated_data['ladd'] = ladd
        validated_data['hq'] = hq
        validated_data['cr'] = cr

        return super().update(instance, validated_data)