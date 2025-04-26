from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import HealthProgram
from .serializers import HealthProgramSerializer
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView

# Create Health Program
class HealthProgramCreateView(CreateAPIView):
    serializer_class = HealthProgramSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}
    
    
# View all health programs
class DoctorProgramListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        doctor = request.user.doctorprofile
        programs = HealthProgram.objects.filter(doctor=doctor)
        serializer = HealthProgramSerializer(programs, many=True)
        return Response(serializer.data)


# Retrieve Health Program
class HealthProgramDetailView(RetrieveAPIView):
    queryset = HealthProgram.objects.all()
    serializer_class = HealthProgramSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id' 

# Update Health Program
class HealthProgramUpdateView(UpdateAPIView):
    queryset = HealthProgram.objects.all()
    serializer_class = HealthProgramSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

# Delete Health Program
class HealthProgramDeleteView(DestroyAPIView):
    queryset = HealthProgram.objects.all()
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

