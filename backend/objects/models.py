from django.db import models

class Objects(models.Model):

    name = models.CharField(max_length=150, verbose_name="object_company", unique=True)
    head = models.CharField(max_length=350, verbose_name="head of company")
    address = models.CharField(max_length=250, verbose_name="address")
    economic_activity = models.CharField(max_length=150, verbose_name="economic activity")
    ownership = models.CharField(max_length=250, verbose_name="ownership")

    class Meta:
        db_table = 'info_objects'
        ordering = ('id',)

