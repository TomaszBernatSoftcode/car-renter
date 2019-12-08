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
from renter_engine.views import landing_page, renter_panel, user_panel, map_panel
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('login', auth_views.LoginView.as_view(), name='login'),
    path('inner-api/', include('inner_api.urls')),
    # application pages below
    path('', landing_page, name='landing_page'),
    path('renter', renter_panel, name='renter_panel'),
    path('user-panel', user_panel, name='user_panel'),
    path('map', map_panel, name='map'),
]
