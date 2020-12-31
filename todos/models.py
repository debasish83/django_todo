from django.db import models


# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        """string representation of the model"""
        return self.title

    @classmethod
    def create(cls, title, description):
        todo = cls(title=title, description=description)
        return todo

