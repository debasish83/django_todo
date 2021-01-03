from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Movie, Rating
from django.contrib.auth.models import User
from .serializers import MovieSerializer, RatingSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
# Create your views here.
# ModelViewSt has create (post), retrieve (get on id), update (put),
# destroy (delete) and list (get all)


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    # we can define our own action using the results from database
    # to use it via REST API we need to use action decorator
    # pk is the primary key - the primary key of the database
    @action(detail=True, methods=['POST'])
    def rate_movie(self, request, pk=None):
        # we have to check if stars has been passed in request
        if 'stars' in request.data:
            response = {'message': 'its working'}
            movie = Movie.objects.get(id=pk)
            stars = request.data['stars']
            # user is anonymous unless the user is authenticated with django
            # the user need to be fixed by using 'rest_framework.authtoken'
            # and then get the view authenticated using TokenAuthentication
            # Ensure to add the Authorization token in the request header
            user = request.user
            # This particular call only works for a user whose id=1, It's possible to set some
            # test users using this idea
            # user = User.objects.get(id=1)
            print('User', user)
            print('movie title', movie.title)
            try:
                rating = Rating.objects.get(user=user.id, movie=movie.id)
                rating.stars = stars
                rating.save()
                serializer = RatingSerializer(rating, many=False)
                response = {'message': 'Rating updated', 'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                Rating.objects.create(user=user, movie=movie, stars=stars)
                serializer = RatingSerializer(rating, many=False)
                response = {'message': 'Rating updated', 'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'message': 'You need to provide stars'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )

    # since we have defined our own rate_movie method we would like to override the default
    # create to ensure that there are no other way to rate movies
    def create(self, request, *args, **kwargs):
        response = {'message': 'You cant create rating like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        response = {'message': 'You cant update rating like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
