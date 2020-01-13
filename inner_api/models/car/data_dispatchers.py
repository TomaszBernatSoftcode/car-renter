import re

from random import shuffle, randrange

from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.response import Response
from renter_engine.models import CarDetails
from inner_api.models.car_details.serializers import LocationSerializer


class CarsLatestLocationsList(generics.ListAPIView):
    """
    ViewSet for fetching currencies
    """

    queryset = CarDetails.objects.all()
    serializer_class = LocationSerializer


class CarLatestLocationsList(generics.ListAPIView):
    """
    ViewSet for fetching currencies
    """

    def list(self, request, *args, **kwargs):
        car_id = kwargs.get('car_id')

        lat_lon_pairs = [
            {'lat': 50.659915, 'lon': 17.899422},
            {'lat': 50.655375, 'lon': 17.922242},
            {'lat': 50.644960, 'lon': 17.943348},
            {'lat': 50.669239, 'lon': 17.920034},
            {'lat': 50.672766, 'lon': 17.910819},
            {'lat': 50.682193, 'lon': 17.855741},
            {'lat': 50.688973, 'lon': 17.912666},
            {'lat': 50.694441, 'lon': 17.927777},
            {'lat': 50.669036, 'lon': 17.941092},
            {'lat': 50.679944, 'lon': 17.943997},
            {'lat': 50.687816, 'lon': 17.916858},
            {'lat': 50.698550, 'lon': 17.911684},
            {'lat': 50.698305, 'lon': 17.903984},
            {'lat': 50.661259, 'lon': 17.941605},
            {'lat': 50.664904, 'lon': 17.938372},
            {'lat': 50.667425, 'lon': 17.932919},
            {'lat': 50.672774, 'lon': 17.959607},
            {'lat': 50.675311, 'lon': 17.942894},
            {'lat': 50.680670, 'lon': 17.939539},
            {'lat': 50.679046, 'lon': 17.931643}
        ]
        shuffle(lat_lon_pairs)
        random_index = randrange(20)

        return JsonResponse(lat_lon_pairs[random_index])
