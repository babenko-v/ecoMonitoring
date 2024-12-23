from rest_framework import serializers
from .models import Radioactive_waste
from objects.models import Objects


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Objects
        fields = ['id', 'name', 'address']

class RadioactiveSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(
        queryset=Objects.objects.all(),
        source='company',
        write_only=True
    )
    extra_value = serializers.BooleanField(write_only=True, required=False, default=False)

    class Meta:
        model = Radioactive_waste
        fields = '__all__'
        read_only_fields = ('total_tax',)

    def create(self, validated_data):
        # Извлечь и удалить extra_value из данных
        extra_value = validated_data.pop('extra_value', False)

        # Логика расчета total_tax
        on_electricity = validated_data.get('on_electricity', 0)
        c1ns = validated_data.get('c1ns', 0)
        c2ns = validated_data.get('c2ns', 0)
        c1v = validated_data.get('c1v', 0)
        c2v = validated_data.get('c2v', 0)
        v1ns = validated_data.get('v1ns', 0)
        v2ns = validated_data.get('v2ns', 0)
        v1v = validated_data.get('v1v', 0)
        v2v = validated_data.get('v2v', 0)

        total_tax = (
            on_electricity * 0.0133
            + (2 * c1ns * v1ns + 50 * c1v * v1v)
            + (1 / 32 if extra_value else 0)
            * (2 * c2ns * v2ns + 50 * c2v * v2v)
        )

        # Создать объект модели с пересчитанным total_tax
        validated_data['total_tax'] = total_tax
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Извлечь и удалить extra_value из данных
        extra_value = validated_data.pop('extra_value', False)

        # Логика расчета total_tax
        on_electricity = validated_data.get('on_electricity', instance.on_electricity)
        c1ns = validated_data.get('c1ns', instance.c1ns)
        c2ns = validated_data.get('c2ns', instance.c2ns)
        c1v = validated_data.get('c1v', instance.c1v)
        c2v = validated_data.get('c2v', instance.c2v)
        v1ns = validated_data.get('v1ns', instance.v1ns)
        v2ns = validated_data.get('v2ns', instance.v2ns)
        v1v = validated_data.get('v1v', instance.v1v)
        v2v = validated_data.get('v2v', instance.v2v)

        total_tax = (
            on_electricity * 0.0133
            + (2 * c1ns * v1ns + 50 * c1v * v1v)
            + (1 / 32 if extra_value else 0)
            * (2 * c2ns * v2ns + 50 * c2v * v2v)
        )

        # Установить новое значение total_tax
        validated_data['total_tax'] = total_tax
        return super().update(instance, validated_data)
