from django.urls import path
from . import views

# we have to created the ListTodo and DetailTodo views yet
# given that we are serving an API the ORM model that we have created on
# top of the database need to be converted to json and served for the frontend
# app. For that we need object/protobuf/thrift to json serializer
urlpatterns = [
    path('', views.ListTodo.as_view()),
    path('<int:pk>/', views.DetailTodo.as_view()),
]
