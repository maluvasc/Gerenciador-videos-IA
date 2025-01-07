from django.db import models

class Video(models.Model):
    filename = models.CharField(max_length=255)
    file = models.FileField(upload_to='videos/')

    def __str__(self):
        return self.filename
