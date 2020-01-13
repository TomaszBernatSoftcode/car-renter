"""renter URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from renter_engine.views import landing_page, registration_page, renter_panel, user_panel, map_panel, rent_panel
from inner_api.session.data_dispatchers import log_out_user
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('login', auth_views.LoginView.as_view(), name='login'),
    path('logout', log_out_user, name='logout'),
    path('inner-api/', include('inner_api.urls')),
    # application pages below
    path('', landing_page, name='landing_page'),
    path('registration', registration_page, name='registration_page'),
    path('renter-panel', renter_panel, name='renter_panel'),
    path('user-panel', user_panel, name='user_panel'),
    path('rent-panel', rent_panel, name='rent_panel'),
    path('map', map_panel, name='map'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
