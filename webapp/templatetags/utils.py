# -*- coding: utf-8 -*-
from django import template
import dateutil.parser

register = template.Library()


@register.filter
def format_date(date):
    date_formatted = dateutil.parser.parse(date)
    return date_formatted.strftime("%-d %B %Y")


@register.filter
def replace_admin(url):
    return url.replace("admin.insights.ubuntu.com", "insights.ubuntu.com")


@register.filter
def replace_encoded_endash(str):
    return str.replace("&#8211;", "–")
