from django.contrib.auth.decorators import login_required
from django.shortcuts import render


def landing_page(request):
    return render(request, 'car_renter/application/landing_page.html')


@login_required
def renter_panel(request):
    return render(request, 'car_renter/application/renter_panel.html')


@login_required
def user_panel(request):
    return render(request, 'car_renter/user_panel/user_panel.html')
