from django.db import models

from pollutants.models import Pollutants

from objects.models import Objects


class CompensationAir(models.Model):
    ro = models.FloatField()
    qmn = models.FloatField()
    qm = models.FloatField()
    t = models.FloatField()
    gdk = models.FloatField()

    Knas = models.FloatField()
    Kf = models.FloatField()

    Kt = models.FloatField()
    m = models.FloatField()
    Kzi = models.FloatField()
    A = models.FloatField()

    total = models.FloatField()

    date = models.IntegerField()


    pollutant = models.ForeignKey(Pollutants, on_delete=models.PROTECT)
    company = models.ForeignKey(Objects, on_delete=models.PROTECT)


    class Meta:
        db_table = 'CompensationAir'
        ordering = ['date', ]

class CompensationWater(models.Model):
    Y = models.FloatField()
    CiD = models.FloatField()
    CiF = models.FloatField()
    QIf = models.FloatField()
    t = models.FloatField()
    gdk = models.FloatField()

    Kkat = models.FloatField()
    Kr = models.FloatField()

    Yi = models.FloatField()
    m = models.FloatField()
    A = models.FloatField()

    total = models.FloatField()

    date = models.IntegerField()


    pollutant = models.ForeignKey(Pollutants, on_delete=models.PROTECT)
    company = models.ForeignKey(Objects, on_delete=models.PROTECT)


    class Meta:
        db_table = 'CompensationWater'
        ordering = ['date', ]

