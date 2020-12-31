from django.shortcuts import render
"""Django is MVT model view template framework. There are many types of views in Django:
function views, class based view and generic views
Some developer prefer function view over class similar to react functional vs class based
components. We need not write views by hand when there are already lot of sane defaults
If we go through generic API views documentation there is a view for listing and creating models:
ListCreateAPIView which takes a queryset and serializer class
"""
from .models import Lead
from .serializers import LeadSerializer
from rest_framework import generics


# Create your views here.
class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
