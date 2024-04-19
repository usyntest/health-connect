from django.db import models


# Create your models here.

class MedicalFacility(models.Model):
    name = models.CharField(max_length=200)
    size = models.CharField(max_length=200)
    image = models.TextField()
    description = models.TextField()
    short_location = models.TextField()
    location = models.TextField()
    verified = models.BooleanField()


class MedicalProfessional(models.Model):
    name = models.CharField(max_length=200)
    degrees = models.TextField()
    image = models.TextField()
    gender = models.BooleanField()
    experience = models.IntegerField()
    speciality = models.CharField(max_length=200)
    verified = models.BooleanField()
    description = models.TextField()
    medical_facility = models.ForeignKey(MedicalFacility, on_delete=models.SET_NULL, null=True)
