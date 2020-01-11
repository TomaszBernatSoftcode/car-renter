from rest_framework import viewsets, status
from rest_framework.response import Response
from renter_engine.models import City, Address, Client
from inner_api.models.client.serializers import ClientSerializer, ClientCreationSerializer
from inner_api.models.address.serializers import AddressCreationSerializer


class ClientViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = ClientSerializer
    queryset = Client.objects.all()

    def list(self, request):
        pass

    def create(self, request):
        try:
            client_data = request.data.get('client', None)
            address_data = request.data.get('address', None)

            if not client_data or not address_data:
                return Response(status=status.HTTP_400_BAD_REQUEST, data={
                    'message': 'Nie podano danych użytkownika lub adresu.',
                    'clear_fields': False
                })

            address_serializer = AddressCreationSerializer(data=address_data)
            address_serializer.is_valid()
            errors = address_serializer.errors

            if (len(errors) == 1 and list(errors.keys())[0] == 'non_field_errors') or len(errors) == 0:
                address = Address.objects.get_or_create(
                    city=City.objects.get(id=address_data['city']),
                    street=address_data['street'],
                    house_number=address_data['house_number'],
                    apartment_number=address_data['apartment_number'],
                    postal_code=address_data['postal_code'],
                    defaults={
                        'creation_date': address_data['creation_date']
                    }
                )[0]
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST, data={
                    'message': 'Wystąpił błąd podczas zapisywania adresu. Prosimy spróbować raz jeszcze.',
                    'clear_fields': False
                })

            client_serializer = ClientCreationSerializer(data=client_data)
            if client_serializer.is_valid():
                serialized_data = client_serializer.data
                client, created = Client.objects.get_or_create(
                    email=serialized_data['email'],
                    phone_number=serialized_data['phone_number'],
                    defaults={
                        'address': address,
                        'name': serialized_data['name'],
                        'last_name': serialized_data['last_name'],
                        'registration_date': serialized_data['registration_date']
                    }
                )

                if created:
                    return Response(status=status.HTTP_201_CREATED)

                return Response(status=status.HTTP_400_BAD_REQUEST, data={
                    'message': 'Użytkownik o podanym adresie email i telefonie już istnieje.',
                    'clear_fields': True
                })

        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass
