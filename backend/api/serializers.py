from rest_framework import serializers
from .models import StarWish, TimelineEvent

class StarWishSerializer(serializers.ModelSerializer):
    class Meta:
        model = StarWish
        fields = ['id', 'title', 'message']

class TimelineEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimelineEvent
        fields = ['id', 'era_year', 'title', 'description']
