from django.db import models

from pollutants.models import Pollutants

from objects.models import Objects


class Calculations(models.Model):
    total_emissions = models.FloatField()
    date = models.IntegerField()
    total_tax = models.FloatField()

    pollutant = models.ForeignKey(Pollutants, on_delete=models.PROTECT)
    company = models.ForeignKey(Objects, on_delete=models.PROTECT)


    class Meta:
        db_table = 'Calculations'
        ordering = ['date', ]