from django.db import models
# Onde você define as tabelas do banco de dados como classes Python.
class Video(models.Model):
    filename = models.CharField(max_length=255)
    file = models.FileField(upload_to='videos/')

    def __str__(self):
        return self.filename
