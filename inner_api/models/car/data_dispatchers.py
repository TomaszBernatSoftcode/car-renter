from rest_framework import generics
from renter_engine.models import CarDetails
from inner_api.models.car.serializers import LocationSerializer


class CarsLatestLocationsList(generics.ListAPIView):
    """
    ViewSet for fetching currencies
    """

    queryset = CarDetails.objects.all()
    serializer_class = LocationSerializer
