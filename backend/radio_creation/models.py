from django.db import models

from objects.models import Objects


class Radioactive_waste(models.Model):
    on_electricity = models.FloatField(max_length=100)
    c1ns = models.FloatField(max_length=100)
    c2ns = models.FloatField(max_length=100)
    c1v = models.FloatField(max_length=100)
    c2v = models.FloatField(max_length=100)
    v1ns = models.FloatField(max_length=100)
    v2ns = models.FloatField(max_length=100)
    v1v = models.FloatField(max_length=100)
    v2v = models.FloatField(max_length=100)
    total_tax = models.FloatField(max_length=100)

    company = models.ForeignKey(Objects, on_delete=models.PROTECT)


    class Meta:
        db_table = 'Radioactive_waste'
        ordering = ['total_tax', ]