import re

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from renter_engine.models import CarDetails, CarRent
from inner_api.models.car_details.serializers import LocationSerializer
from inner_api.models.car_rent.serializers import CarRentSerializer


class CarsLatestLocationsList(generics.ListAPIView):
    """
    ViewSet for fetching currencies
    """

    queryset = CarDetails.objects.all()
    serializer_class = LocationSerializer


class HistoricRentsList(generics.ListAPIView):
    """
    ViewSet for fetching currencies
    """

    def list(self, request, *args, **kwargs):
        pass


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def retrieve_ongoing_rent_from_user(request, *args, **kwargs):
    if request.user.is_authenticated:
        user_id = re.match('^\d+$', kwargs.get('userId'))
        if not user_id:
            return Response(
                {'message': 'Invalid user id provided'},
                content_type='application/json', status=status.HTTP_400_BAD_REQUEST
            )

        try:
            car_rent = CarRent.objects.get(
                client__user__id=user_id,
                true_stop_ts__isnull=True
            )
            serializer = CarRentSerializer(car_rent, many=False)

            return Response(serializer.data, content_type='application/json')
        except CarRent.DoesNotExist as e:
            # TODO: dodac message do wyswietlenia we froncie
            return Response(status=status.HTTP_404_NOT_FOUND)
        except CarRent.MultipleObjectsReturned as e:
            #TODO: dodac message i powiadomienie dla adminow
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
