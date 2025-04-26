from django.db import models
from django.utils import timezone
from doctor.models import DoctorProfile
from health_program.models import HealthProgram

# Create your models here.


class DoctorPatient(models.Model):
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE, related_name = 'doctor_patients')
    health_program = models.ForeignKey(HealthProgram, on_delete=models.CASCADE)
    first_name = models.CharField( max_length = 200)
    last_name = models.CharField( max_length = 200)
    insurance_code = models.CharField( max_length = 200)
    date_created = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.first_name}- {self.last_name} for {self.health_program.title}"