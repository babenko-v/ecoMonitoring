from django.db import models

from pollutants.models import Pollutants

from objects.models import Objects


class Risk_health(models.Model):
    concentration = models.FloatField()

    sf = models.FloatField()
    rfc = models.FloatField()
    date = models.IntegerField()

    hq = models.FloatField()
    ladd = models.FloatField()
    cr = models.FloatField()

    pollutant = models.ForeignKey(Pollutants, on_delete=models.PROTECT)
    company = models.ForeignKey(Objects, on_delete=models.PROTECT)


    class Meta:
        db_table = 'Rish_health'
        ordering = ['date', ]