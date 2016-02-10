from django.conf.urls import url
from django_json_redirects import load_redirects
from views import CanonicalTemplateFinder

urlpatterns = load_redirects()

# Standard patterns
urlpatterns += [
    url(r'^(?P<template>.*)/?$', CanonicalTemplateFinder.as_view()),  # Fenchurch
]
