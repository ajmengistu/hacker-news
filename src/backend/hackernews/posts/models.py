from django.db import models
from django.conf import settings
class Post(models.Model):
    url = models.URLField()
    description = models.TextField()
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    votes = models.IntegerField()
    created_date = models.DateTimeField()
# from django.db import models
# from django.conf import settings
# # Create your models here.
# class Post(models.Model):
#     url = models.URLField()
#     description = models.TextField(blank=True)
#     created_date = models.DateField()
#     posted_by = models.ForeignKey(settings.Auth_USER_MODEL, null=True, on_delete=models.CASCADE)
#     votes = models.IntegerField()
# class Replay(models.Model):
#     parent_id = models.ForeignKey('Post', null=True, on_delete=models.CASCADE)
#     description = models.TextField(blank=True)
#     created_date = models.DateField()
#     replied_by = models.ForeignKey(settings.Auth_USER_MODEL, null=True, on_delete=models.CASCADE)