from rest_framework import serializers
from renter_engine.models import CarDetails
from inner_api.models.car.serializers import CarNameSerializer, CarSerializer


class LocationSerializer(serializers.ModelSerializer):
    car = CarNameSerializer()

    class Meta:
        model = CarDetails
        fields = ('car', 'last_geo_lat', 'last_geo_lon', 'status')


class CarDetailsSerializer(serializers.ModelSerializer):
    car = CarSerializer()

    class Meta:
        model = CarDetails
        fields = ('car', 'mileage', 'status', 'image', 'description')