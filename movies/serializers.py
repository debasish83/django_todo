from rest_framework import serializers
from .models import Movie, MovieNumber


class MovieNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieNumber
        fields = ['id', 'isbn_10', 'isbn_13']


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['title', 'description', 'price', 'published',
                  'is_published', 'number']
