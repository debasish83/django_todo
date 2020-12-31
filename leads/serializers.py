from rest_framework import serializers
from .models import Lead
"""Coming from other frameworks it's surprising that Django has no controllers
Typically MVC framework has model, view and controller
controller encapsulates logic for processing requests and returning responses
Django interpretation of MVC, view describes the data that get presented to the user
In Django view is the python callback function for a particular URL because that callback
function describes which data is presented
In Django a view describes which data is presented but a view delegates to a template that
describes how the data is presented. This template possibly is handled on React side
Where is controller in Django ? It's probably the framework itself: the machinery that sends
a request to appropriate view according to the Django URL configuration
We should rather call Django as MTV framework - model, framework creates the view based on url
configuration and then let template choose how the view is rendered to user
"""


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'email', 'message')
        model = Lead
