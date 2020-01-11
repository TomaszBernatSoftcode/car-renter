from rest_framework import serializers
from renter_engine.models import Client
from inner_api.session.serializers import UserSerializer
from inner_api.models.address.serializers import AddressSerializer


class ClientSessionSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    address = AddressSerializer()

    class Meta:
        model = Client
        fields = ('user', 'address', 'phone_number', 'registration_date')


class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = '__all__'


class ClientCreationSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=128)
    name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=150)
    email = serializers.EmailField()

    class Meta:
        model = Client
        fields = ('user_name', 'password', 'name', 'last_name', 'email', 'phone_number', 'registration_date')
