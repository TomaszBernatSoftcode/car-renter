from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.http import JsonResponse
from inner_api.session.serializers import UserSerializer


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def retrieve_user_from_session(request, *args, **kwargs):
    if request.user.is_authenticated:
        serializer = UserSerializer(request.user, many=False)
        return JsonResponse(serializer.data, safe=False)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
