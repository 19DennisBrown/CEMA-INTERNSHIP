from django.urls import path
from .views import (
    DoctorPatientCreateView,
    DoctorPatientDetailView,
    DoctorPatientUpdateView,
    DoctorPatientDeleteView,
    DoctorPatientListView,
    HealthProgramDetailWithPatientsView
)

urlpatterns = [
    path('create/', DoctorPatientCreateView.as_view(), name='doctor-patient-create'),
    path('view/', DoctorPatientListView.as_view(), name='doctor-patient-list'),
    path('<int:id>/view/', DoctorPatientDetailView.as_view(), name='doctor-patient-detail'),
    path('<int:id>/update/', DoctorPatientUpdateView.as_view(), name='doctor-patient-update'),
    path('<int:id>/delete/', DoctorPatientDeleteView.as_view(), name='doctor-patient-delete'),
    path('programs/<int:id>/with-patients/', HealthProgramDetailWithPatientsView.as_view(), name='program-detail-with-patients'),
]
