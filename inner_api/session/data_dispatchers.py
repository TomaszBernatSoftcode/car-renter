from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.http import JsonResponse
from renter_engine.models import Client
from inner_api.models.client.serializers import ClientSessionSerializer
from django.contrib.auth import logout


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def retrieve_user_from_session(request, *args, **kwargs):
    if request.user.is_authenticated:
        try:
            client = Client.objects.get(user=request.user)
        except Client.DoesNotExist as e:
            logout(request)
            return Response(
                {
                    'message': '{0} {1}'.format(
                        'Brak konta klienta dla zalogowanego użytkownika.',
                        'Skontakuj się z administracją [administracja@rent-go.com].'
                    ),
                    'redirect': 'landing'
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ClientSessionSerializer(client, many=False)
        return JsonResponse(serializer.data, safe=False)
    else:
        return Response(
            {
                'message': 'Brak zalogowanego użytkownika.',
                'redirect': 'login'
            },
            status=status.HTTP_401_UNAUTHORIZED
        )
