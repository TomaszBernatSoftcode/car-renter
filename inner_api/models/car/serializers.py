from rest_framework import serializers
from renter_engine.models import Car, CarDetails


class CarSerializer(serializers.ModelSerializer):

    class Meta:
        model = Car
        fields = (
            'brand', 'model', 'type', 'boot_capacity', 'person_capacity',
            'fuel_type', 'average_burning', 'gearbox_type',
            'color', 'creation_date'
        )


class CarNameSerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = Car
        fields = ('name', )


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
