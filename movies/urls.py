from django.urls import path, include
from . import views
from .views import MovieViewSet, ListMovies
from rest_framework import routers

# using router to register ViewSet
router = routers.DefaultRouter()
router.register('listmovies', MovieViewSet)

# MovieViewSet is built with DRF viewset.ModelViewSets and it supports all the
# REST operators like GET, POST, PUT and DELETE
# For DRF we can setup token based authentication for users
# Unless the user provides the token we can block the API access
# For username and password, a token is generated. We return data only if token is valid and not expired
urlpatterns = [
    path('hellomovies', views.hello_movies),
    path('hellotemplate', views.hello_template),
    path('', include(router.urls))
]
