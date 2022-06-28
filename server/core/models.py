from django.db import models
from django.contrib.auth.models import User


class Match(models.Model):
    home_team = models.CharField(max_length=50)
    home_score = models.IntegerField()
    home_image = models.CharField(max_length=100)
    away_team = models.CharField(max_length=50)
    away_score = models.IntegerField()
    away_image = models.CharField(max_length=100)
    championship = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    match_hour = models.CharField(max_length=5)

    def __str__(self):
        return f'{self.home_team} {self.home_score}x{self.away_score} {self.away_team}'
