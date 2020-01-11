from rest_framework import serializers
from renter_engine.models import City


class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = ('id', 'name')


class CityCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = '__all__'
