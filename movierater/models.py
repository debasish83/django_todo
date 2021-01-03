from django.db import models
# Users are built in as part of authentication
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.


# how to find average rating for each movie
# we created functions in view and it's possible to create functions in models
# as well
class Movie(models.Model):
    title = models.CharField(max_length=32)
    description = models.TextField(max_length=360)

    def no_of_ratings(self):
        ratings = Rating.objects.filter(movie=self)
        return len(ratings)

    def avg_ratings(self):
        ratings = Rating.objects.filter(movie=self)
        sum = 0
        for rating in ratings:
            sum += rating.stars
        if len(ratings) > 0:
            return sum/len(ratings)
        else:
            return 0


class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # rating is bounded within 1-5
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    class Meta:
        unique_together = (('user', 'movie'),)
        index_together = (('user', 'movie'),)
