from django.conf.urls import url
from django_json_redirects import load_redirects
from .views import (
    CanonicalTemplateFinder,
    GreenhouseVacancies,
    cert_view
)

urlpatterns = load_redirects() + [
    url(r'^secure-boot-master-ca.crl/?$', cert_view),
    url(r'^careers/all-vacancies?$', GreenhouseVacancies.as_view()),
    url(r'^(?P<template>.*)/?$', CanonicalTemplateFinder.as_view())
]
