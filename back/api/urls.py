from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('base', views.bases, name='bases'),
    url(r'base/(?P<id>.+)', views.base, name='base'),
    url(r'image/(?P<id>.+)', views.image, name='image')
]
