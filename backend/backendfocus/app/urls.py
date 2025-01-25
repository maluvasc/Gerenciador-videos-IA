from django.urls import path
from .views import VideoListView, VideoUploadView
# Define as rotas específicas da aplicação.

urlpatterns = [
    path('', VideoListView.as_view(), name='video-list'),
    path('upload/', VideoUploadView.as_view(), name='video-upload'),
]