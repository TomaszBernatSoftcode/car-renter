from rest_framework import generics
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from renter_engine.models import Offer
from inner_api.models.offer.serializers import OfferSerializer


class OffersList(generics.ListAPIView):
    """
    ViewSet for fetching offers
    """
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer


# class OfferUpdate(generics.UpdateAPIView):
#     """
#     ViewSet for fetching currencies
#     """
#     authentication_classes = [SessionAuthentication, BasicAuthentication]
#     permission_classes = [IsAuthenticated]
#
#     queryset = Offer.objects.all()
#     serializer_class = OfferSerializer
