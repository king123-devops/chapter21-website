from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StarWishViewSet, TimelineEventViewSet

# The router automatically generates all the standard RESTful endpoints
router = DefaultRouter()
router.register(r'wishes', StarWishViewSet, basename='starwish')
router.register(r'timeline', TimelineEventViewSet, basename='timelineevent')

urlpatterns = [
    path('', include(router.urls)),
]
