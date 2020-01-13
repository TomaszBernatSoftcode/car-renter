import dateutil.parser

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from renter_engine.models import CarRent
from inner_api.models.car_rent.serializers import CarRentSerializer
from inner_api.models.car.serializers import LocationSerializer


class HistoricRentsList(generics.ListAPIView):
    """
    ViewSet for fetching currencies
    """
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        if not user_id:
            return Response(
                {'message': 'Podano nieprawidłowe id użytkownika.'},
                content_type='application/json', status=status.HTTP_400_BAD_REQUEST
            )

        car_rents = CarRent.objects.filter(
            client__user__id=user_id,
            true_stop_ts__isnull=False
        )

        if not car_rents:
            return Response(
                {'message': 'Brak danych o historycznych wypożyczeniach dla tego konta.'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = CarRentSerializer(car_rents, many=True)
        return Response(serializer.data, content_type='application/json')


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def retrieve_ongoing_rent_from_user(request, *args, **kwargs):
    if request.user.is_authenticated:
        user_id = kwargs.get('user_id')
        if not user_id:
            return Response(
                {'message': 'Podano nieprawidłowe id użytkownika.'},
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
            return Response(
                {'message': 'Brak danych o aktulanym wypożyczeniu dla tego konta.'},
                status=status.HTTP_404_NOT_FOUND
            )
        except CarRent.MultipleObjectsReturned as e:
            return Response(
                {'message': 'Konta posiada więcej niż jedno trwające wypożyczenie. Należy skontaktowac sie z administracją.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['PUT'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def end_ongoing_rent_for_user(request, *args, **kwargs):
    if request.user.is_authenticated:
        car_rent_id = kwargs.get('car_rent_id')
        if not car_rent_id:
            return Response(
                {'message': 'Podano nieprawidłowe id wypożyczenia.'},
                content_type='application/json', status=status.HTTP_400_BAD_REQUEST
            )

        try:
            end_timestamp = request.data.get('endTimestamp', None)
            serialized_coordinates = LocationSerializer(data=request.data.get('latestCoordinates', None))

            if not end_timestamp or not serialized_coordinates.is_valid():
                return Response(
                    {'message': 'Nie podano ostanich koordynatów auta lub momentu zakończenia wypożyczenia.'},
                    content_type='application/json', status=status.HTTP_400_BAD_REQUEST
                )

            car_rent = CarRent.objects.get(id=car_rent_id)
            car_rent.stop_geo_lat = serialized_coordinates.data.get('lat')
            car_rent.stop_geo_lon = serialized_coordinates.data.get('lon')
            car_rent.true_stop_ts = dateutil.parser.parse(end_timestamp)
            car_rent.save()

            return Response(status=status.HTTP_200_OK, content_type='application/json')
        except CarRent.DoesNotExist as e:
            return Response(
                {'message': 'Brak aktulanych wypożyczeń dla tego konta.'},
                status=status.HTTP_404_NOT_FOUND
            )
        except CarRent.MultipleObjectsReturned as e:
            return Response(
                {'message': 'Konta posiada więcej niż jedno trwające wypożyczenie. Należy skontaktowac sie z administracją.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
