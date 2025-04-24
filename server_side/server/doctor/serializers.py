from rest_framework import serializers
from django.contrib.auth.models import User
from .models import DoctorProfile

class DoctorProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = DoctorProfile
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data.pop('user', None)  # Make sure 'user' is not passed twice
        return DoctorProfile.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
