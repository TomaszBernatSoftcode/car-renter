from rest_framework import generics
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from renter_engine.models import City
from inner_api.models.city.serializers import CitySerializer


class CitiesList(generics.ListAPIView):
    """
    ViewSet for fetching currencies
    """
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]

    queryset = City.objects.all()
    serializer_class = CitySerializer
