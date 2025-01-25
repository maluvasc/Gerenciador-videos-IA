from rest_framework import serializers
from .models import Video
# Usado para converter modelos em JSON (ou outros formatos), principalmente quando você usa Django REST Framework.
class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'filename', 'file']
