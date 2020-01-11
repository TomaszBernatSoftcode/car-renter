from rest_framework import serializers
from renter_engine.models import Car


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
