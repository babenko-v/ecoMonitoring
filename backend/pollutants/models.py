from django.db import models

class Pollutants(models.Model):
    name = models.CharField(max_length=200, unique=True)
    enormity_mass_flow = models.FloatField()
    permissible_emissions = models.FloatField()
    dangerous_emissions = models.IntegerField()
    tax_rate = models.FloatField()
    type_of_pollutant = models.CharField(max_length=200)

    class Meta:
        db_table = 'Pollutants'
        ordering = ['name', ]

