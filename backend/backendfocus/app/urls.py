from django.urls import path
from . import views
# Define as rotas específicas da aplicação.

urlpatterns = [
    path('videos/', views.VideoListView.as_view(), name='video-list'),
    path('videos/upload/', views.VideoUploadView.as_view(), name='video-upload'),
    path('repository/register/', views.RepositorioListCreate.as_view(), name='repositorio-list'),
    path('repository/update/<int:pk>/', views.RepositorioUpdateView.as_view(), name='update-repositorio'),
    path('repository/delete/<int:pk>/', views.RepositorioDelete.as_view(), name='delete-repositorio'),
    path('repository/user/', views.RepositoriosDoUsuarioList.as_view(), name='repositorios-do-usuario'),
    path('repository/<int:repositorio_id>/videos/', views.RepositoryVideosList.as_view(), name='videos-do-repositorio'),
    path('repository/<int:pk>/', views.RepositorioDetailView.as_view(), name='repositorio-detail'),
]