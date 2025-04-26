from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from .models import DoctorPatient
from .serializers import DoctorPatientSerializer
from rest_framework import serializers

#  Create a DoctorPatient
class DoctorPatientCreateView(CreateAPIView):
    serializer_class = DoctorPatientSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()

        # Expect health_program ID from request data
        health_program_id = self.request.data.get('health_program')
        from health_program.models import HealthProgram
        try:
            health_program = HealthProgram.objects.get(id=health_program_id)
        except HealthProgram.DoesNotExist:
            raise serializers.ValidationError("Health program not found.")

        context['health_program'] = health_program
        return context

#  List all patients for the authenticated doctor
class DoctorPatientListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        doctor = request.user.doctorprofile
        patients = DoctorPatient.objects.filter(doctor=doctor)
        serializer = DoctorPatientSerializer(patients, many=True)
        return Response(serializer.data)

#  View a single patient
class DoctorPatientDetailView(RetrieveAPIView):
    queryset = DoctorPatient.objects.all()
    serializer_class = DoctorPatientSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

#  Update a patient
class DoctorPatientUpdateView(UpdateAPIView):
    queryset = DoctorPatient.objects.all()
    serializer_class = DoctorPatientSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

# Delete a patient
class DoctorPatientDeleteView(DestroyAPIView):
    queryset = DoctorPatient.objects.all()
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
