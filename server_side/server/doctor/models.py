from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class DoctorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    specialisation = models.CharField(max_length=200)
    age = models.PositiveIntegerField()
    year_joined_hospital = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.firstname} {self.lastname} - {self.specialisation}"
