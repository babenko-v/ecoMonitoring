from django.db import models

from objects.models import Objects


class Temporary_place (models.Model):
    n = models.FloatField()
    v = models.FloatField()
    t = models.IntegerField()
    total_tax = models.FloatField(max_length=100)

    company = models.ForeignKey(Objects, on_delete=models.PROTECT)


    class Meta:
        db_table = 'Radioactive_waste'
        ordering = ['total_tax', ]