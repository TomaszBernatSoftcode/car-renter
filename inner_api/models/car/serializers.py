from abc import ABC

from rest_framework import serializers
from renter_engine.models import Car


class CarSerializer(serializers.ModelSerializer):

    class Meta:
        model = Car
        fields = (
            'id', 'brand', 'model', 'type', 'boot_capacity', 'person_capacity',
            'fuel_type', 'average_burning', 'gearbox_type',
            'color', 'creation_date'
        )


class CarNameSerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = Car
        fields = ('name', )


class LocationSerializer(serializers.Serializer):
    lat = serializers.DecimalField(max_digits=10, decimal_places=7)
    lon = serializers.DecimalField(max_digits=10, decimal_places=7)

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass
