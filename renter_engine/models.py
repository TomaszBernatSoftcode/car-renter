from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from datetime import date
from renter_engine.model_fields_validators import NAME_PATTERN, DETAILED_NAME_PATTERN,\
    PHONE_NUMBER_PATTERN, POSTAL_CODE_PATTERN, PL_NUMBER_PLATE_PATTERN
from decimal import Decimal, ROUND_HALF_UP


class City(models.Model):
    class Meta:
        verbose_name = 'Miasto'
        verbose_name_plural = 'Miasta'
        ordering = ['name']
        unique_together = ['name', ]

    admin_user = models.ForeignKey(User, null=True, related_name='cities_admin_users', on_delete=models.SET_NULL, verbose_name='Administrator')
    name = models.CharField(unique=True, max_length=24, validators=[NAME_PATTERN, ], verbose_name='Nazwa miasta')
    add_date = models.DateField(default=date.today, verbose_name='Data dodania miasta')

    def __str__(self):
        return self.name


class Address(models.Model):
    class Meta:
        verbose_name = 'Adres'
        verbose_name_plural = 'Adresy'
        ordering = ['city', 'street', '-creation_date']
        unique_together = ['city', 'street', 'house_number', 'apartment_number', 'postal_code']

    admin_user = models.ForeignKey(User, null=True, related_name='addresses_admin_users', on_delete=models.SET_NULL, verbose_name='Administrator')
    city = models.ForeignKey('City', null=True, related_name='addresses', on_delete=models.SET_NULL, verbose_name='Miasto')
    street = models.CharField(max_length=24, validators=[NAME_PATTERN, ], verbose_name='Ulica')
    house_number = models.CharField(max_length=12, validators=[DETAILED_NAME_PATTERN, ], verbose_name='Numer domu')
    apartment_number = models.CharField(blank=True, null=False, max_length=12, validators=[DETAILED_NAME_PATTERN, ], verbose_name='Numer mieszkania')
    postal_code = models.CharField(max_length=12, validators=[POSTAL_CODE_PATTERN, ], verbose_name='Kod pocztowy')
    creation_date = models.DateField(default=date.today, verbose_name='Data utworzenia adresu')

    def __str__(self):
        return '{city}, {street}, {house_number}/{apartment_number}, {postal_code}'.format(
            city=self.city, street=self.street,
            house_number=self.house_number, apartment_number=self.apartment_number,
            postal_code=self.postal_code
        )


class Client(models.Model):
    class Meta:
        verbose_name = 'Klient'
        verbose_name_plural = 'Klienci'
        ordering = ['-registration_date', 'user__last_name']

    admin_user = models.ForeignKey(User, null=True, related_name='clients_admin_users', on_delete=models.SET_NULL, verbose_name='Administrator')
    user = models.ForeignKey(User, related_name='clients', on_delete=models.CASCADE, verbose_name='Klient')
    address = models.ForeignKey('Address', null=True, related_name='clients', on_delete=models.SET_NULL, verbose_name='Adres')
    phone_number = models.CharField(max_length=24, unique=True, validators=[PHONE_NUMBER_PATTERN, ], verbose_name='Numer telefonu')
    registration_date = models.DateField(default=date.today, verbose_name='Data utworzenia klienta')

    def __str__(self):
        return '{name} {last_name}, {email}'.format(
            name=self.user.first_name, last_name=self.user.last_name, email=self.user.email
        )

    @property
    def is_during_car_rent(self):
        return CarRent.objects.filter(client__id=self.id, has_paid=False).exists()


class Car(models.Model):
    SEDAN = 'sedan'
    HATCHBACK = 'hatchback'
    SUV = 'suv'
    KOMBI = 'kombi'
    SMART = 'smart'
    CAR_TYPES_CHOICES = [
        (SEDAN, 'Sedan'),
        (HATCHBACK, 'Hatchback'),
        (SUV, 'Suv'),
        (KOMBI, 'Kombi'),
        (SMART, 'Smart')
    ]

    GASOLINE = 'gasoline'
    LPG = 'lpg'
    ELECTRICITY = 'electricity'
    FUEL_TYPES_CHOICES = [
        (GASOLINE, 'Benzyna'),
        (LPG, 'Lpg'),
        (ELECTRICITY, 'Elektryczność')
    ]

    MANUAL = 'manual'
    AUTO = 'auto'
    GEARBOX_TYPE_CHOICES = [
        (MANUAL, 'Manualna'),
        (AUTO, 'Automatyczna'),
    ]

    class Meta:
        verbose_name = 'Pojazd'
        verbose_name_plural = 'Pojazdy'
        ordering = ['creation_date', 'brand', 'model']
        unique_together = [
            'brand', 'type', 'model', 'creation_date', 'fuel_type',
            'boot_capacity', 'person_capacity',
            'average_burning', 'gearbox_type', 'color',
        ]

    admin_user = models.ForeignKey(User, null=True, related_name='cars_admin_users', on_delete=models.SET_NULL, verbose_name='Administrator')
    brand = models.CharField(max_length=24, validators=[NAME_PATTERN, ], verbose_name='Marka')
    type = models.CharField(max_length=9, choices=CAR_TYPES_CHOICES, verbose_name='Typ')
    model = models.CharField(max_length=24, validators=[DETAILED_NAME_PATTERN, ], verbose_name='Model')
    boot_capacity = models.IntegerField(
        validators=[MinValueValidator(100), MaxValueValidator(1500)],
        verbose_name='Pojemność bagażnika'
    )
    person_capacity = models.IntegerField(
        validators=[MinValueValidator(2), MaxValueValidator(5)],
        verbose_name='Ilośc miejsc'
    )
    fuel_type = models.CharField(max_length=11, choices=FUEL_TYPES_CHOICES,)
    average_burning = models.FloatField(
        validators=[MinValueValidator(3), MaxValueValidator(16)],
        verbose_name='Średnie spalanie'
    )
    gearbox_type = models.CharField(max_length=6, choices=GEARBOX_TYPE_CHOICES, verbose_name='Skrzynia biegów')
    color = models.CharField(max_length=24, validators=[NAME_PATTERN, ], verbose_name='Kolor')
    creation_date = models.DateField(verbose_name='Rok produkcji')
    car_add_date = models.DateField(default=date.today, verbose_name='Data dodania pojazdu do systemu')

    def __str__(self):
        return '{brand} {model}, {type} {creation_date}'.format(
            brand=self.brand, model=self.model,
            type=self.type, creation_date=self.creation_date
        )

    @property
    def name(self):
        return '{brand} {model} - {type}'.format(brand=self.brand, model=self.model, type=self.type)


def car_directory_path(instance, filename):
    return 'cars/{brand}/{model}/{filename}'.format(
        brand=instance.car.brand,
        model=instance.car.model,
        filename=filename
    )


class CarDetails(models.Model):
    AVAILABLE = 'available'
    RENTED = 'rented'
    MECHANIC = 'mechanic'
    CAR_STATUS_CHOICES = [
        (AVAILABLE, 'Dostępny'),
        (RENTED, 'Wynajęty'),
        (MECHANIC, 'Przerw techniczna')
    ]

    class Meta:
        verbose_name = 'Szczegóły pojazdu'
        verbose_name_plural = 'Szczegóły pojazdów'
        ordering = ['car', '-last_update_date']
        unique_together = []

    admin_user = models.ForeignKey(User, null=True, related_name='car_details_admin_users', on_delete=models.SET_NULL, verbose_name='Administrator')
    car = models.ForeignKey('Car', related_name='details', on_delete=models.CASCADE, verbose_name='Pojazd')
    number_plate = models.CharField(max_length=8, validators=[PL_NUMBER_PLATE_PATTERN, ], verbose_name='Numer rejestracyjny')
    mileage = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(1000000000)],
        verbose_name='Średnie spalanie'
    )
    status = models.CharField(max_length=9, choices=CAR_STATUS_CHOICES, verbose_name='Status pojazdu')
    image = models.ImageField(upload_to=car_directory_path, blank=True, max_length=2000)
    description = models.TextField()
    last_geo_lat = models.DecimalField(max_digits=10, decimal_places=7, null=False)
    last_geo_lon = models.DecimalField(max_digits=10, decimal_places=7, null=False)
    last_update_date = models.DateField(default=date.today, verbose_name='Data ostatniej aktualizacji')

    def __str__(self):
        return '{car} {number_plate}, {mileage} - {status}'.format(
            car=self.car, number_plate=self.number_plate, mileage=self.mileage, status=self.status
        )


class Offer(models.Model):
    RUNNING = 'running'
    OUTDATED = 'outdated'
    OFFER_TYPE_CHOICES = [
        (RUNNING, 'Trwająca'),
        (OUTDATED, 'Przedawniona'),
    ]

    class Meta:
        verbose_name = 'Oferta'
        verbose_name_plural = 'Oferty'
        ordering = ['car_details', '-status', '-add_date']

    admin_user = models.ForeignKey(User, null=True, related_name='offers_admin_users', on_delete=models.SET_NULL, verbose_name='Administrator')
    car_details = models.ForeignKey('CarDetails', related_name='offers', on_delete=models.CASCADE, verbose_name='Pojazd')
    status = models.CharField(max_length=8, choices=OFFER_TYPE_CHOICES, verbose_name='Status oferty')
    value_per_minute = models.DecimalField(
        max_digits=3, decimal_places=2,
        validators=[MinValueValidator(0.05), MaxValueValidator(0.8)],
        verbose_name='Należność za minutę wypożyczenia'
    )
    add_date = models.DateField(default=date.today, verbose_name='Data dodania')

    def __str__(self):
        return '{car_details} {value_per_minute}/min - {status}'.format(
            car_details=self.car_details, value_per_minute=self.value_per_minute, status=self.status
        )

    @property
    def value_per_hour(self):
        return Decimal(self.value_per_minute * Decimal('60.0')).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)


class CarRent(models.Model):
    EXTRA_PAYMENT_TARIFF = 20

    class Meta:
        verbose_name = 'Wypożyczenie'
        verbose_name_plural = 'Wypożyczenia'
        ordering = ['offer', '-has_paid', '-start_ts']

    admin_user = models.ForeignKey(User, null=True, related_name='rents_admin_users', on_delete=models.SET_NULL, verbose_name='Administrator')
    client = models.ForeignKey('Client', related_name='rents', on_delete=models.CASCADE, verbose_name='Klient')
    offer = models.ForeignKey('Offer', related_name='rents', on_delete=models.CASCADE, verbose_name='Oferta')
    start_geo_lat = models.DecimalField(max_digits=10, decimal_places=7, null=False)
    start_geo_lon = models.DecimalField(max_digits=10, decimal_places=7, null=False)
    stop_geo_lat = models.DecimalField(max_digits=10, decimal_places=7, null=False)
    stop_geo_lon = models.DecimalField(max_digits=10, decimal_places=7, null=False)
    start_ts = models.DateTimeField(verbose_name='Moment rozpoczęcia')
    stop_ts = models.DateTimeField(verbose_name='Planowany moment zakończenia')
    true_stop_ts = models.DateTimeField(null=True, blank=True, verbose_name='Moment zakończenia')
    has_paid = models.BooleanField(default=False, verbose_name='Czy wpłynęła opłata')
    payment_timestamp = models.DateTimeField(null=True, blank=True, verbose_name='Moment otrzymania wpłaty')

    def calculate_payment(self):
        pass

    def calculate_extra_payment(self):
        pass

    def __str__(self):
        return '{client} {offer} {start_ts}-{stop_ts}, {payment_message}'.format(
            client=self.client, offer=self.offer,
            start_ts=self.start_ts, stop_ts=self.stop_ts if self.true_stop_ts == self.stop_ts else self.true_stop_ts,
            payment_message='Zapłacono' if self.has_paid else 'Nie zapłacono'
        )
