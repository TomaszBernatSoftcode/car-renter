#!/usr/bin/python
# -*- coding: utf-8 -*-
from django.apps import AppConfig


class InnerApiConfig(AppConfig):
    name = 'inner_api'
    label = 'inner_api'
    verbose_name = u'API wewnętrzne aplikacji'
