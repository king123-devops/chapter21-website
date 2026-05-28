from rest_framework import viewsets
from .models import StarWish, TimelineEvent
from .serializers import StarWishSerializer, TimelineEventSerializer

class StarWishViewSet(viewsets.ModelViewSet):
    queryset = StarWish.objects.all()
    serializer_class = StarWishSerializer

class TimelineEventViewSet(viewsets.ModelViewSet):
    queryset = TimelineEvent.objects.all()
    serializer_class = TimelineEventSerializer
