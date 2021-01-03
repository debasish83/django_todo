from django.contrib import admin
from .models import Movie, MovieNumber, Author, Character

# Register your models here.
# admin.site.register(Movie)
# default admin site is not human readable
# we can provide a method to convert our object to a string


# It's possible to have more controls to display the model in admin
@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ['title', 'description']
    list_filter = ['is_published']
    search_fields = ['title']


admin.site.register(MovieNumber)
admin.site.register(Character)
admin.site.register(Author)
