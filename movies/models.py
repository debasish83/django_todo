from django.db import models


class MovieNumber(models.Model):
    isbn_10 = models.CharField(max_length=10, blank=True)
    isbn_13 = models.CharField(max_length=13, blank=True)


# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length=36, blank=False, unique=True)
    description = models.TextField(max_length=256, blank=True)

    price = models.DecimalField(default=0, max_digits=3, decimal_places=2)
    # published = models.DateTimeField(auto_now=True, auto_now_add=True)
    published = models.DateField(blank=True)
    is_published = models.BooleanField(default=False)

    # FileField allow pload a specfiic file
    # cover = models.FileField(upload_to='covers/')
    cover = models.ImageField(upload_to='covers/', blank=True)
    # number = models.OneToOneField(MovieNumber, null=True,
    #                              blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Character(models.Model):
    name = models.CharField(max_length=30)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='characters')


class Author(models.Model):
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    movies = models.ManyToManyField(Movie)
