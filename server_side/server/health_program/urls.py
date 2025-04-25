from django.urls import path
from .views import (
    HealthProgramCreateView,
    HealthProgramDetailView,
    HealthProgramUpdateView,
    HealthProgramDeleteView,
    DoctorProgramListView,
)

urlpatterns = [
    path('create/', HealthProgramCreateView.as_view(), name='healthprogram-create'),
    path('view/', DoctorProgramListView.as_view(), name='healthprogram-list'),
    path('<int:id>/view/', HealthProgramDetailView.as_view(), name='healthprogram-detail'),
    path('<int:id>/update/', HealthProgramUpdateView.as_view(), name='healthprogram-update'),
    path('<int:id>/delete/', HealthProgramDeleteView.as_view(), name='healthprogram-delete'),
]
