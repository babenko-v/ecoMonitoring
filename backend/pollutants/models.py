from django.db import models
from objects.models import Objects



class Pollutants(models.Model):
    name = models.CharField(max_length=200, unique=True)
    enormity_mass_flow = models.FloatField()
    permissible_emissions = models.FloatField()
    dangerous_emissions = models.IntegerField()

    class Meta:
        db_table = 'Pollutants'
        ordering = ['name', ]


class Calculations(models.Model):
    total_emissions = models.FloatField()
    date = models.DateField()

    pollutant = models.ForeignKey(Pollutants, on_delete=models.PROTECT)
    company = models.ForeignKey(Objects, on_delete=models.PROTECT)


    class Meta:
        db_table = 'Calculations'
        ordering = ['date', ]