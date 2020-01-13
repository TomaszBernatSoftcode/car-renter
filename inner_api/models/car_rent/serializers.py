from rest_framework import serializers
from renter_engine.models import CarRent
from inner_api.models.offer.serializers import OfferSerializer


class CarRentSerializer(serializers.ModelSerializer):
    offer = OfferSerializer()

    class Meta:
        model = CarRent
        fields = ('id', 'offer', 'start_ts', 'stop_ts', 'true_stop_ts', 'has_paid', 'payment_timestamp')
