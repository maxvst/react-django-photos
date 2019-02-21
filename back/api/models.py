from django.db import models

# Create your models here.

from django.db import models
from django.utils import timezone


class Base(models.Model):
    location = models.CharField(max_length=256)

    def __str__(self):
        return self.location

class Image(models.Model):
    location = models.CharField(max_length=256)
    rect = models.TextField()
    base = models.ForeignKey(Base, on_delete=models.CASCADE)

    def publish(self):
        self.save()    

    def __str__(self):
        return self.location

