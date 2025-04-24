from django.urls import path
from .views import DoctorProfileView, DoctorProfileCreateView, DoctorProfileUpdateView

urlpatterns = [
    path('', DoctorProfileView.as_view(), name='doctor-profile'),
    path('create/', DoctorProfileCreateView.as_view(), name='doctor-profile-create'),
    path('update/', DoctorProfileUpdateView.as_view(), name='doctor-profile-update'),
]