from django.urls import path
from inner_api.session.data_dispatchers import retrieve_user_from_session
from inner_api.models.city.data_dispatchers import CitiesList
from inner_api.models.offer.data_dispatchers import OffersList
from inner_api.models.car.data_dispatchers import CarsLatestLocationsList
from inner_api.models.client.data_dispatchers import ClientViewSet


app_name = 'inner_api'
client_api_manager = ClientViewSet.as_view({
    'get': 'list',
    'post': 'create',
    'patch': 'partial_update',
    'delete': 'destroy',
})

urlpatterns = [
    path(r'cities', CitiesList.as_view(), name='cities'),
    path(r'cars/latest-locations', CarsLatestLocationsList.as_view(), name='cars_latest_locations'),
    path(r'offers', OffersList.as_view(), name='offers'),
    path(r'client', client_api_manager, name="client_api_manager"),
    path(r'session/user', retrieve_user_from_session, name='retrieve_user_from_session'),
]
