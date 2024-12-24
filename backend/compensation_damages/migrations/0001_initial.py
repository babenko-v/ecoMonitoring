# Generated by Django 5.1 on 2024-12-24 23:02

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
            name="CompensationAir",
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
                ("ro", models.FloatField()),
                ("qmn", models.FloatField()),
                ("qm", models.FloatField()),
                ("t", models.FloatField()),
                ("gdk", models.FloatField()),
                ("Knas", models.FloatField()),
                ("Kf", models.FloatField()),
                ("Kt", models.FloatField()),
                ("m", models.FloatField()),
                ("Kzi", models.FloatField()),
                ("A", models.FloatField()),
                ("total", models.FloatField()),
                ("date", models.IntegerField()),
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
                "db_table": "CompensationAir",
                "ordering": ["date"],
            },
        ),
        migrations.CreateModel(
            name="CompensationWater",
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
                ("Y", models.FloatField()),
                ("CiD", models.FloatField()),
                ("CiF", models.FloatField()),
                ("QIf", models.FloatField()),
                ("t", models.FloatField()),
                ("gdk", models.FloatField()),
                ("Kkat", models.FloatField()),
                ("Kr", models.FloatField()),
                ("Yi", models.FloatField()),
                ("m", models.FloatField()),
                ("A", models.FloatField()),
                ("total", models.FloatField()),
                ("date", models.IntegerField()),
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
                "db_table": "CompensationWater",
                "ordering": ["date"],
            },
        ),
    ]
