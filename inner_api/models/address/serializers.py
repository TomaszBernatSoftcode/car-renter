from rest_framework import serializers
from renter_engine.models import Address


class AddressCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = ('city', 'street', 'house_number', 'apartment_number', 'postal_code', 'creation_date')
