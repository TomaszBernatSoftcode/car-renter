from django.contrib import admin
from renter_engine.models import City, Address, Client, Car, CarDetails, Offer, CarRent
from renter_engine.admin_custom_filters import CustomDateFieldListFilter, ValueRangeFilter


admin.AdminSite.site_header = 'Renter - Panel Administracyjny'
admin.AdminSite.index_title = 'Panel Administracyjny'
admin.AdminSite.site_url = None
admin.site.empty_value_display = 'Nieznane'

# Uzyteczny szablon z mojego poprzedniego projektu
# @admin.register(Contact)
# class ContactAdmin(admin.ModelAdmin):
#     list_display = ('name', 'phone_number', 'email', 'user', 'add_timestamp')
#     search_fields = ['contact_channels', 'name', 'phone_number', 'email']
#     list_filter = (('add_timestamp', CustomDateFieldListFilter),)
#
#     def changelist_view(self, request, extra_context=None):
#         if not request.user.is_superuser:
#             self.list_display = ['name', 'phone_number', 'email']
#             self.list_filter = [('add_timestamp', CustomDateFieldListFilter)]
#         return super().changelist_view(request, extra_context)
#
#     def get_form(self, request, obj=None, change=False, **kwargs):
#         if not request.user.is_superuser:
#             self.fields = ('name', 'phone_number', 'email', 'contact_channels')
#         return super().get_form(request, obj, **kwargs)
#
#
# @admin.register(Offer)
# class OfferAdmin(admin.ModelAdmin):
#     save_as = True
#     list_display = ('contact', 'product', 'quantity', 'price_with_currency', 'user', 'add_timestamp')
#     search_fields = [
#         'contact__name',
#         'product__category__name', 'product__brand__name', 'product__model', 'product__symbol', 'product__color__name',
#         'quantity', 'price',
#         'user__username'
#     ]
#     list_filter = (
#         'user', ('add_timestamp', CustomDateFieldListFilter), ('quantity', ValueRangeFilter), ('price', ValueRangeFilter)
#     )
#     autocomplete_fields = ['contact', 'product', 'currency', 'user']
#
#     def changelist_view(self, request, extra_context=None):
#         if not request.user.is_superuser:
#             self.list_display = ['contact', 'product', 'quantity', 'price_with_currency', 'add_timestamp']
#             self.list_filter = [
#                 ('add_timestamp', CustomDateFieldListFilter), ('quantity', ValueRangeFilter), ('price', ValueRangeFilter)
#             ]
#         return super().changelist_view(request, extra_context)
#
#     def get_form(self, request, obj=None, change=False, **kwargs):
#         if not request.user.is_superuser:
#             self.fields = ('contact', 'product', 'quantity', ('price', 'currency'))
#         return super().get_form(request, obj, **kwargs)
#
#     def save_model(self, request, obj, form, change):
#         obj.user = request.user
#         obj.save()
#         if '_addanother' in request.POST:
#             latest_product_id = Offer.objects.latest('id').id
#             request.path = request.path.replace('add/', '{id}/change/'.format(id=latest_product_id))


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'add_date')
    search_fields = ['user', 'name']
    list_filter = (('add_date', CustomDateFieldListFilter),)

    def changelist_view(self, request, extra_context=None):
        if not request.user.is_superuser:
            self.list_display = ['name', ]
            self.list_filter = [('add_date', CustomDateFieldListFilter)]
        return super().changelist_view(request, extra_context)

    def get_form(self, request, obj=None, change=False, **kwargs):
        if not request.user.is_superuser:
            self.fields = ('name', )
        return super().get_form(request, obj, **kwargs)

    def save_model(self, request, obj, form, change):
        obj.user = request.user
        obj.save()
        if '_addanother' in request.POST:
            latest_product_id = Offer.objects.latest('id').id
            request.path = request.path.replace('add/', '{id}/change/'.format(id=latest_product_id))


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'city', 'street', 'house_number', 'apartment_number', 'postal_code', 'creation_date')
    search_fields = ['user', 'name', 'city', 'street', 'house_number', 'apartment_number', 'postal_code']
    list_filter = (('creation_date', CustomDateFieldListFilter),)

    def changelist_view(self, request, extra_context=None):
        if not request.user.is_superuser:
            self.list_display = ['name', 'city', 'street', 'house_number', 'apartment_number', 'postal_code']
            self.list_filter = [('creation_date', CustomDateFieldListFilter)]
        return super().changelist_view(request, extra_context)

    def get_form(self, request, obj=None, change=False, **kwargs):
        if not request.user.is_superuser:
            self.fields = ('name', 'city', 'street', 'house_number', 'apartment_number', 'postal_code')
        return super().get_form(request, obj, **kwargs)

    def save_model(self, request, obj, form, change):
        obj.user = request.user
        obj.save()
        if '_addanother' in request.POST:
            latest_product_id = Offer.objects.latest('id').id
            request.path = request.path.replace('add/', '{id}/change/'.format(id=latest_product_id))


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('user', 'address', 'name', 'last_name', 'email', 'phone_number')
    search_fields = ['user', 'address', 'name', 'last_name', 'email', 'phone_number']
    list_filter = (('registration_date', CustomDateFieldListFilter),)

    def changelist_view(self, request, extra_context=None):
        if not request.user.is_superuser:
            self.list_display = ['address', 'name', 'last_name', 'email', 'phone_number']
            self.list_filter = [('registration_date', CustomDateFieldListFilter)]
        return super().changelist_view(request, extra_context)

    def get_form(self, request, obj=None, change=False, **kwargs):
        if not request.user.is_superuser:
            self.fields = ('address', 'name', 'last_name', 'email', 'phone_number')
        return super().get_form(request, obj, **kwargs)

    def save_model(self, request, obj, form, change):
        obj.user = request.user
        obj.save()
        if '_addanother' in request.POST:
            latest_product_id = Offer.objects.latest('id').id
            request.path = request.path.replace('add/', '{id}/change/'.format(id=latest_product_id))


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'brand', 'type', 'model', 'boot_capacity',
        'person_capacity', 'fuel_type', 'average_burning', 'gearbox_type', 'color', 'creation_date', 'car_add_date'
    )
    search_fields = [
        'user', 'brand', 'type', 'model', 'boot_capacity',
        'person_capacity', 'fuel_type', 'average_burning', 'gearbox_type', 'color'
    ]
    list_filter = (('creation_date', CustomDateFieldListFilter), ('car_add_date', CustomDateFieldListFilter))

    def changelist_view(self, request, extra_context=None):
        if not request.user.is_superuser:
            self.list_display = [
                'brand', 'type', 'model', 'boot_capacity', 'person_capacity', 'fuel_type',
                'average_burning', 'gearbox_type', 'color'
            ]
            self.list_filter = [('creation_date', CustomDateFieldListFilter), ('car_add_date', CustomDateFieldListFilter)]
        return super().changelist_view(request, extra_context)

    def get_form(self, request, obj=None, change=False, **kwargs):
        if not request.user.is_superuser:
            self.fields = (
                'brand', 'type', 'model', 'boot_capacity', 'person_capacity', 'fuel_type',
                'average_burning', 'gearbox_type', 'color'
            )
        return super().get_form(request, obj, **kwargs)

    def save_model(self, request, obj, form, change):
        obj.user = request.user
        obj.save()
        if '_addanother' in request.POST:
            latest_product_id = Offer.objects.latest('id').id
            request.path = request.path.replace('add/', '{id}/change/'.format(id=latest_product_id))


@admin.register(CarDetails)
class CarDetailsAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'car', 'number_plate', 'mileage', 'status',
        'image', 'description', 'last_geo_lat', 'last_geo_lon', 'last_update_date'
    )
    search_fields = [
        'user', 'car', 'number_plate', 'mileage', 'status',
        'image', 'description'
    ]
    list_filter = (('last_update_date', CustomDateFieldListFilter), )

    def changelist_view(self, request, extra_context=None):
        if not request.user.is_superuser:
            self.list_display = [
                'car', 'number_plate', 'mileage', 'status', 'image', 'description'
            ]
            self.list_filter = [('last_update_date', CustomDateFieldListFilter), ]
        return super().changelist_view(request, extra_context)

    def get_form(self, request, obj=None, change=False, **kwargs):
        if not request.user.is_superuser:
            self.fields = (
                'car', 'number_plate', 'mileage', 'status', 'image', 'description'
            )
        return super().get_form(request, obj, **kwargs)

    def save_model(self, request, obj, form, change):
        obj.user = request.user
        obj.save()
        if '_addanother' in request.POST:
            latest_product_id = Offer.objects.latest('id').id
            request.path = request.path.replace('add/', '{id}/change/'.format(id=latest_product_id))


@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    list_display = ('user', 'car_details', 'status', 'value_per_minute', 'add_date')
    search_fields = ['user', 'car_details', 'status', 'value_per_minute']
    list_filter = (('add_date', CustomDateFieldListFilter),)

    def changelist_view(self, request, extra_context=None):
        if not request.user.is_superuser:
            self.list_display = ['car_details', 'status', 'value_per_minute']
            self.list_filter = [('add_date', CustomDateFieldListFilter), ]
        return super().changelist_view(request, extra_context)

    def get_form(self, request, obj=None, change=False, **kwargs):
        if not request.user.is_superuser:
            self.fields = ('car_details', 'status', 'value_per_minute')
        return super().get_form(request, obj, **kwargs)

    def save_model(self, request, obj, form, change):
        obj.user = request.user
        obj.save()
        if '_addanother' in request.POST:
            latest_product_id = Offer.objects.latest('id').id
            request.path = request.path.replace('add/', '{id}/change/'.format(id=latest_product_id))


@admin.register(CarRent)
class OfferAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'client', 'offer', 'start_geo_lat', 'start_geo_lon', 'stop_geo_lat', 'stop_geo_lon',
        'start_ts', 'stop_ts', 'true_stop_ts', 'has_paid', 'payment_timestamp'
    )
    search_fields = ['user', 'client', 'offer', ]
    list_filter = (
        ('start_ts', CustomDateFieldListFilter), ('stop_ts', CustomDateFieldListFilter),
        ('true_stop_ts', CustomDateFieldListFilter), ('payment_timestamp', CustomDateFieldListFilter), 'has_paid'
    )

    def changelist_view(self, request, extra_context=None):
        if not request.user.is_superuser:
            self.list_display = [
                'client', 'offer', 'start_geo_lat', 'start_geo_lon', 'stop_geo_lat', 'stop_geo_lon',
                'start_ts', 'stop_ts', 'true_stop_ts', 'has_paid', 'payment_timestamp'
            ]
            self.list_filter = [
                ('start_ts', CustomDateFieldListFilter), ('stop_ts', CustomDateFieldListFilter),
                ('true_stop_ts', CustomDateFieldListFilter), ('payment_timestamp', CustomDateFieldListFilter),
                'has_paid'
            ]
        return super().changelist_view(request, extra_context)

    def get_form(self, request, obj=None, change=False, **kwargs):
        if not request.user.is_superuser:
            self.fields = (
                'client', 'offer', 'start_geo_lat', 'start_geo_lon', 'stop_geo_lat', 'stop_geo_lon',
                'start_ts', 'stop_ts', 'true_stop_ts', 'has_paid', 'payment_timestamp'
            )
        return super().get_form(request, obj, **kwargs)

    def save_model(self, request, obj, form, change):
        obj.user = request.user
        obj.save()
        if '_addanother' in request.POST:
            latest_product_id = Offer.objects.latest('id').id
            request.path = request.path.replace('add/', '{id}/change/'.format(id=latest_product_id))

