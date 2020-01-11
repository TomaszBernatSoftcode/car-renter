from rest_framework import viewsets, status
from rest_framework.response import Response
from renter_engine.models import City, Address, Client
from inner_api.models.client.serializers import ClientSerializer, ClientCreationSerializer
from inner_api.models.address.serializers import AddressCreationSerializer
from django.contrib.auth.models import User


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
                    'message': 'Nie podano danych użytkownika lub adresu.'
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
                    'message': 'Wystąpił błąd podczas zapisywania adresu. Prosimy spróbować raz jeszcze.'
                })

            client_serializer = ClientCreationSerializer(data=client_data)
            if client_serializer.is_valid():
                serialized_data = client_serializer.data

                if User.objects.filter(email=serialized_data['email']).count() > 0:
                    return Response(status=status.HTTP_400_BAD_REQUEST, data={
                        'message': 'Użytkownik o podanym adresie email już istnieje.',
                        'clear_email': True
                    })

                user, user_created = User.objects.get_or_create(
                    username=serialized_data['user_name'],
                    defaults={
                        'email': serialized_data['email'],
                        'password': serialized_data['password'],
                        'first_name': serialized_data['name'],
                        'last_name': serialized_data['last_name']
                    }
                )

                if not user_created:
                    return Response(status=status.HTTP_400_BAD_REQUEST, data={
                        'message': 'Użytkownik o podanej nazwie użytkownika już istnieje.',
                        'clear_username': True
                    })

                Client(
                    user=user,
                    address=address,
                    phone_number=serialized_data['phone_number'],
                    registration_date=serialized_data['registration_date']
                ).save()

                return Response(status=status.HTTP_201_CREATED)

            return Response(status=status.HTTP_400_BAD_REQUEST, data={
                'message': 'Użytkownik o podanym numerze telefonu już istnieje.',
                'clear_phone_number': True
            })
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass
