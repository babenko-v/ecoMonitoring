# Generated by Django 5.1 on 2024-12-23 23:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("objects", "0001_initial"),
        ("pollutants", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Calculations",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("total_emissions", models.FloatField()),
                ("date", models.IntegerField()),
                ("total_tax", models.FloatField()),
                (
                    "company",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="objects.objects",
                    ),
                ),
                (
                    "pollutant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="pollutants.pollutants",
                    ),
                ),
            ],
            options={
                "db_table": "Calculations",
                "ordering": ["date"],
            },
        ),
    ]
