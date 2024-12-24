from rest_framework import serializers
from .models import CompensationAir, CompensationWater
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


class CompensationAirSerializer(serializers.ModelSerializer):
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
        model = CompensationAir
        fields = '__all__'
        read_only_fields = ('Kt', 'm', 'Kzi', 'A', 'total', )


    def create(self, validated_data):
        ro = validated_data.get('ro', 0)
        qmn = validated_data.get('qmn', 0)
        qm = validated_data.get('qm', 0)
        t = validated_data.get('t', 0)
        gdk = validated_data.get('gdk', 0)

        Knas = validated_data.get('Knas', 0)
        Kf = validated_data.get('Kf', 0)



        Kt = Knas * Kf
        m = 3.6 * 0.001 * (qmn - qm) * t
        Kzi = ro / gdk if gdk != 0 else 0
        A = 10 / gdk if gdk > 1 else 1 / gdk if gdk != 0 else 0

        total = m * 1.1 * 8000 * A * Kt * Kzi


        validated_data['Kt'] = Kt
        validated_data['m'] = m
        validated_data['Kzi'] = Kzi
        validated_data['A'] = A
        validated_data['total'] = total
        return super().create(validated_data)


    def update(self, instance, validated_data):
        ro = validated_data.get('ro', instance.ro)
        qmn = validated_data.get('qmn', instance.qmn)
        qm = validated_data.get('qm', instance.qm)
        t = validated_data.get('t', instance.t)
        gdk = validated_data.get('gdk', instance.gdk)

        Knas = validated_data.get('Knas', instance.Knas)
        Kf = validated_data.get('Kf', instance.Kf)

        Kt = Knas * Kf
        m = 3.6 * 0.001 * (qmn - qm) * t
        Kzi = ro / gdk if gdk != 0 else 0
        A = 10 / gdk if gdk > 1 else 1 / gdk if gdk != 0 else 0

        total = m * 1.1 * 8000 * A * Kt * Kzi

        validated_data['Kt'] = Kt
        validated_data['m'] = m
        validated_data['Kzi'] = Kzi
        validated_data['A'] = A
        validated_data['total'] = total

        return super().update(instance, validated_data)


class CompensationWaterSerializer(serializers.ModelSerializer):
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
        model = CompensationWater
        fields = '__all__'
        read_only_fields = ('Yi', 'm', 'A', 'total', )


    def create(self, validated_data):
        Y = validated_data.get('Y', 0)
        CiD = validated_data.get('CiD', 0)
        CiF = validated_data.get('CiF', 0)
        QIf = validated_data.get('QIf', 0)
        t = validated_data.get('t', 0)
        gdk = validated_data.get('gdk', 0)

        Kkat = validated_data.get('Kkat', 0)
        Kr = validated_data.get('Kr', 0)


        A = 10 / gdk if gdk > 1 else 1 / gdk if gdk != 0 else 0
        Yi = Y * A
        m = (CiF - CiD) * QIf * t * 0.000001



        total = Kkat * Kr * 1.5 * m * Yi


        validated_data['A'] = A
        validated_data['Yi'] = Yi
        validated_data['m'] = m
        validated_data['total'] = total
        return super().create(validated_data)


    def update(self, instance, validated_data):
        Y = validated_data.get('Y', instance.Y)
        CiD = validated_data.get('CiD', instance.CiD)
        CiF = validated_data.get('CiF', instance.CiF)
        QIf = validated_data.get('QIf', instance.QIf)
        t = validated_data.get('t', instance.t)
        gdk = validated_data.get('gdk', instance.gdk)

        Kkat = validated_data.get('Kkat', instance.Kkat)
        Kr = validated_data.get('Kr', instance.Kr)

        A = 10 / gdk if gdk > 1 else 1 / gdk if gdk != 0 else 0
        Yi = Y * A
        m = (CiF - CiD) * QIf * t * 0.000001

        total = Kkat * Kr * 1.5 * m * Yi

        validated_data['A'] = A
        validated_data['m'] = m
        validated_data['Yi'] = Yi

        validated_data['total'] = total

        return super().update(instance, validated_data)