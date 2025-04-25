from django.db import models
from django.utils import timezone
from doctor.models import DoctorProfile  

class HealthProgram(models.Model):
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE, related_name='health_programs')
    title = models.CharField(max_length=200)
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.title} by {self.doctor.firstname} {self.doctor.lastname}"
