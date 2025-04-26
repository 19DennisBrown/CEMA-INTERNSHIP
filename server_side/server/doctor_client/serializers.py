from rest_framework import serializers
from .models import DoctorPatient
from health_program.models import HealthProgram

class DoctorPatientSerializer(serializers.ModelSerializer):
    # Accept health_program ID for input
    health_program = serializers.PrimaryKeyRelatedField(
        queryset=HealthProgram.objects.all(), write_only=True
    )
    # Show program title for output
    health_program_title = serializers.CharField(
        source='health_program.title', read_only=True
    )

    class Meta:
        model = DoctorPatient
        fields = [
            'id',
            'doctor',
            'health_program',       # used for POST
            'health_program_title', # shown when fetching
            'first_name',
            'last_name',
            'insurance_code',
            'date_created',
        ]
        read_only_fields = ['id', 'doctor', 'date_created']

    def create(self, validated_data):
        request = self.context.get('request')
        doctor = request.user.doctorprofile
        health_program = validated_data.pop('health_program')
        return DoctorPatient.objects.create(
            doctor=doctor,
            health_program=health_program,
            **validated_data
        )


    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.insurance_code = validated_data.get('insurance_code', instance.insurance_code)
        instance.save()
        return instance
