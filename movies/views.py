from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from .models import Movie
from .serializers import MovieSerializer
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


# html are static pages, we can send data from django to the html template
# and visualize it
def hello_template(request):
    movies = Movie.objects.filter(is_published=True)
    return render(request, 'movie_template.html', {'movies': movies})


# views creation for REST API using DRF viewsets
# For todos and leads app we used one of default DRF views
# To enable token authentication we need enable token based authentication
class MovieViewSet(viewsets.ModelViewSet):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


# Create your views here.
def hello_movies(request):
    # using template in-place of sending a HttpResponse, we can send full blown
    # html page as well
    return HttpResponse('Hello movies from Function based Views')


class ListMovies(View):
    # objects.all() is a mysql call every time or the data is retrieved from a
    # in memory cache
    # get all objects
    # movies = Movie.objects.all()
    # filter the objects
    movies = Movie.objects.filter(is_published=True)
    # select movie based on id
    # movies = Movie.objects.get(id=1)
    output = ''
    output = f"We have {len(movies)} books in DB<br>"
    # django is a full stack framework and it can generate html templates as well
    # we will mainly use django as API backend
    for movie in movies:
        output += f"We have {movie.title} books with id {movie.id}<br>"

    # add more attributes and function to do different API pulls if needed
    def get(self, request):
        return HttpResponse(self.output)
