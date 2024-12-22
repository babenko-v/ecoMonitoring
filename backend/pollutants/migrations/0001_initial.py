import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("objects", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Pollutants",
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
                ("name", models.CharField(max_length=200, unique=True)),
                ("enormity_mass_flow", models.FloatField()),
                ("permissible_emissions", models.FloatField()),
                ("dangerous_emissions", models.IntegerField()),
            ],
            options={
                "db_table": "Pollutants",
                "ordering": ["name"],
            },
        ),
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
