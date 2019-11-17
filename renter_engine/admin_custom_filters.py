# -*- coding: utf-8 -*-

import datetime
from django.contrib.admin.filters import DateFieldListFilter, FieldListFilter
from django.contrib.admin.options import IncorrectLookupParameters
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class CustomDateFieldListFilter(DateFieldListFilter):
    """
    Filtr z wlasnymi zakresami dat
    """
    template = "xtg_engine/admin/custom_filters/filter_datetime.html"

    def __init__(self, field, request, params, model, model_admin, field_path):
        self.field_generic = '%s__' % field_path
        self.field_path = field_path
        self.date_params = dict((k, v) for k, v in params.items()
                                if k.startswith(self.field_generic))

        now = timezone.now()

        # currentMonth filter variables
        cm_year = now.year
        cm_month = now.month + 1
        if cm_month > 12:
            cm_month = 1
            cm_year += 1

        # lastMonth filter variables
        lm_year = now.year
        lm_month = now.month - 1
        if lm_month < 1:
            lm_month = 12
            lm_year -= 1

        # When time zone support is enabled, convert "now" to the user's time
        # zone so Django's definition of "Today" matches what the user expects.
        if timezone.is_aware(now):
            now = timezone.localtime(now)

        if isinstance(field, models.DateTimeField):
            today = now.replace(hour=0, minute=0, second=0, microsecond=0)
        else:  # field is a models.DateField
            today = now.date()
        current_week = today - datetime.timedelta(days=today.weekday())
        self.lookup_kwarg_since = '%s__gte' % field_path
        self.lookup_kwarg_until = '%s__lte' % field_path
        self.links = (
            (_(u'All'), {
                self.lookup_kwarg_since: (datetime.datetime(2000, 1, 1)).strftime("%Y-%m-%d"),
                self.lookup_kwarg_until: (datetime.datetime(2100, 1, 1)).strftime("%Y-%m-%d"),
            }),
            (_(u'Last month'), {
                self.lookup_kwarg_since: (datetime.datetime(lm_year, lm_month, 1)).strftime(
                    "%Y-%m-%d"),
                self.lookup_kwarg_until: (datetime.datetime(now.year, now.month, 1)).strftime(
                    "%Y-%m-%d"),
            }),
            (_(u'Last week'), {
                self.lookup_kwarg_since: (current_week - datetime.timedelta(days=7)).strftime(
                    "%Y-%m-%d"),
                self.lookup_kwarg_until: (current_week).strftime("%Y-%m-%d"),
            }),
            (_(u'Last 7 days'), {
                self.lookup_kwarg_since: (today - datetime.timedelta(days=7)).strftime(
                    "%Y-%m-%d"),
                self.lookup_kwarg_until: (today).strftime("%Y-%m-%d"),
            }),
            (_(u'Yesterday'), {
                self.lookup_kwarg_since: (today - datetime.timedelta(days=1)).strftime(
                    "%Y-%m-%d"),
                self.lookup_kwarg_until: (today).strftime("%Y-%m-%d"),
            }),
            (_(u'Today'), {
                self.lookup_kwarg_since: (today).strftime("%Y-%m-%d"),
                self.lookup_kwarg_until: (today + datetime.timedelta(days=1)).strftime(
                    "%Y-%m-%d"),
            }),
            (_(u'Current week'), {
                self.lookup_kwarg_since: (current_week).strftime("%Y-%m-%d"),
                self.lookup_kwarg_until: (current_week + datetime.timedelta(days=7)).strftime(
                    "%Y-%m-%d"),
            }),
            (_(u'Current month'), {
                # self.lookup_kwarg_since: str(datetime.datetime(now.year,now.month,1)),
                # self.lookup_kwarg_until: str(datetime.datetime(now.year,now.month+1,1)),
                self.lookup_kwarg_since: (datetime.datetime(now.year, now.month, 1)).strftime(
                    "%Y-%m-%d"),
                self.lookup_kwarg_until: (datetime.datetime(cm_year, cm_month, 1)).strftime(
                    "%Y-%m-%d"),
            })
        )
        super(DateFieldListFilter, self).__init__(
            field, request, params, model, model_admin, field_path)

    def expected_parameters(self):
        return [self.lookup_kwarg_since, self.lookup_kwarg_until]

    def choices(self, cl):
        for title, param_dict in self.links:
            yield {
                'selected': self.date_params == param_dict,
                'query_string': cl.get_query_string(
                    param_dict, [self.field_generic]),
                'display': title,
            }

    def queryset(self, request, queryset):
        try:
            self.used_parameters = {k: v for k, v in self.used_parameters.items() if v}
            return queryset.filter(**self.used_parameters)
        except (ValueError, ValidationError) as e:
            # Fields may raise a ValueError or ValidationError when converting
            # the parameters to the correct type.
            raise IncorrectLookupParameters(e)


class ValueRangeFilter(FieldListFilter):

    template = "xtg_engine/admin/custom_filters/filter_values.html"

    def __init__(self, field, request, params, model, model_admin, field_path):
        self.field = field
        self.field_path = field_path
        self.title = getattr(field, 'verbose_name', field_path)

        self.lookup_kwarg_min = '%s__gte' % field_path
        self.lookup_kwarg_max = '%s__lte' % field_path

        super().__init__(field, request, params, model, model_admin, field_path)

    def expected_parameters(self):
        return [self.lookup_kwarg_min, self.lookup_kwarg_max]

    def choices(self, changelist):
        yield {}

    def queryset(self, request, queryset):
        try:
            self.used_parameters = {k: v for k, v in self.used_parameters.items() if v}
            return queryset.filter(**self.used_parameters)
        except (ValueError, ValidationError) as e:
            # Fields may raise a ValueError or ValidationError when converting
            # the parameters to the correct type.
            raise IncorrectLookupParameters(e)
