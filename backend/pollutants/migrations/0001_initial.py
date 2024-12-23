# Generated by Django 5.1 on 2024-12-23 19:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Pollutants',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('enormity_mass_flow', models.FloatField()),
                ('permissible_emissions', models.FloatField()),
                ('dangerous_emissions', models.IntegerField()),
                ('tax_rate', models.FloatField()),
                ('type_of_pollutant', models.CharField(max_length=200)),
            ],
            options={
                'db_table': 'Pollutants',
                'ordering': ['name'],
            },
        ),
    ]
