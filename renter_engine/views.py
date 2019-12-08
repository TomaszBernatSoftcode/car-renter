from django.contrib.auth.decorators import login_required
from django.shortcuts import render


def application_page(request):
    #TODO: trzeba dodac kontekst ktory w zaleznosci od requesta bedzie uruchamial dany komponent z widokiem
    return render(request, 'car_renter/application/app.html')
