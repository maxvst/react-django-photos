from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    url(r'albums/(?P<id>.+)', views.base, name='base'),
    path('albums', views.bases, name='bases'),
    url(r'images/(?P<id>.+)/native', views.image_native, name='image'),
    url(r'images/(?P<id>.+)/info', views.image_info, name='image'),
    url(r'images/(?P<id>.+)/preview', views.image_preview, name='image'),
    # url(r'images/(?P<id>.+)', views.image_native, name='image'),
    url(r'images', views.images, name='images'),
]
