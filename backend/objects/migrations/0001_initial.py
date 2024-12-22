from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Objects",
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
                (
                    "name",
                    models.CharField(
                        max_length=150, unique=True, verbose_name="object_company"
                    ),
                ),
                (
                    "head",
                    models.CharField(max_length=350, verbose_name="head of company"),
                ),
                ("address", models.CharField(max_length=250, verbose_name="address")),
                (
                    "economic_activity",
                    models.CharField(max_length=150, verbose_name="economic activity"),
                ),
                (
                    "ownership",
                    models.CharField(max_length=250, verbose_name="ownership"),
                ),
            ],
            options={
                "db_table": "info_objects",
                "ordering": ("id",),
            },
        ),
    ]
