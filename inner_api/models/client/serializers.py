from rest_framework import serializers
from renter_engine.models import Client


class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = '__all__'


class ClientCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = ('name', 'last_name', 'email', 'phone_number', 'registration_date')
