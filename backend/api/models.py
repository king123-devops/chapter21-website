from django.db import models

class StarWish(models.Model):
    title = models.CharField(max_length=255)
    message = models.TextField()

    def __str__(self):
        return self.title

class TimelineEvent(models.Model):
    era_year = models.CharField(max_length=50) # e.g., "2003", "Childhood", etc.
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return f"{self.era_year} - {self.title}"
