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
class OfferAdmin(admin.ModelAdmin):
    pass


@admin.register(Address)
class OfferAdmin(admin.ModelAdmin):
    pass


@admin.register(Client)
class OfferAdmin(admin.ModelAdmin):
    pass


@admin.register(Car)
class OfferAdmin(admin.ModelAdmin):
    pass


@admin.register(CarDetails)
class OfferAdmin(admin.ModelAdmin):
    pass


@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    pass


@admin.register(CarRent)
class OfferAdmin(admin.ModelAdmin):
    pass

