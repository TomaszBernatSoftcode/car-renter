from django.contrib.auth.decorators import login_required
from django.shortcuts import render


def landing_page(request):
    #TODO: dodac kontekst
    return render(request, 'car_renter/application/app.html')


@login_required
def renter_panel(request):
    # TODO: dodac kontekst
    return render(request, 'car_renter/application/app.html')


@login_required
def user_panel(request):
    # TODO: dodac kontekst
    return render(request, 'car_renter/application/app.html')


@login_required
def map_panel(request):
    # TODO: dodac kontekst
    return render(request, 'car_renter/application/app.html')

