from rest_framework.generics import CreateAPIView
from .serializers import DoctorProfileSerializer

from rest_framework.response import Response
from .models import DoctorProfile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

# Get profile
class DoctorProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = DoctorProfile.objects.get(user=request.user)
            serializer = DoctorProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except DoctorProfile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

# Create profile
class DoctorProfileCreateView(CreateAPIView):
    serializer_class = DoctorProfileSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Update profile
class DoctorProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        try:
            profile = DoctorProfile.objects.get(user=request.user)
        except DoctorProfile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = DoctorProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        try:
            profile = DoctorProfile.objects.get(user=request.user)
        except DoctorProfile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = DoctorProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
