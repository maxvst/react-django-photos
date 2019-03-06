from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    url(r'bases/(?P<id>.+)', views.base, name='base'),
    path('bases', views.bases, name='bases'),
    url(r'images/(?P<id>.+)', views.image, name='image'),
    url(r'images', views.images, name='images'),
]
