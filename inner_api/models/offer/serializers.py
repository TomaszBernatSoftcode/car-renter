from rest_framework import serializers
from renter_engine.models import Offer
from inner_api.models.car.serializers import CarDetailsSerializer


class OfferSerializer(serializers.ModelSerializer):
    car_details = CarDetailsSerializer()
    value_per_hour = serializers.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        model = Offer
        fields = ('id', 'car_details', 'status', 'value_per_hour', 'add_date')
