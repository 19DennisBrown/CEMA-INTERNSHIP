from rest_framework import serializers
from .models import HealthProgram

class HealthProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthProgram
        fields = ['id', 'doctor', 'title', 'date_created']
        read_only_fields = ['id', 'doctor', 'date_created']

    def validate_title(self, value):
        request = self.context.get('request')
        doctor = request.user.doctorprofile

        # When updating, exclude the current instance from the check
        if self.instance:
            exists = HealthProgram.objects.filter(doctor=doctor, title=value).exclude(pk=self.instance.pk).exists()
        else:
            exists = HealthProgram.objects.filter(doctor=doctor, title=value).exists()

        if exists:
            raise serializers.ValidationError("You already have a program with this title.")

        return value

    def create(self, validated_data):
        request = self.context.get('request')
        doctor = request.user.doctorprofile
        return HealthProgram.objects.create(doctor=doctor, **validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance
