from django.urls import path
from . import views
# Define as rotas específicas da aplicação.

urlpatterns = [
    path('videos/<int:pk>/', views.VideoDetailView.as_view(), name='video-detail'),
    path('videos/all/', views.AllVideosList.as_view(), name='all-videos'),
    path('videos/upload/', views.VideoUploadView.as_view(), name='video-upload'),
    path('repository/user/', views.RepositoriosDoUsuarioList.as_view(), name='repositorios-do-usuario'),
    path('repository/register/', views.RepositorioListCreate.as_view(), name='repositorio-list'),
    path('repository/update/<int:pk>/', views.RepositorioUpdateView.as_view(), name='update-repositorio'),
    path('repository/delete/<int:pk>/', views.RepositorioDelete.as_view(), name='delete-repositorio'),
    path('repository/user/', views.RepositoriosDoUsuarioList.as_view(), name='repositorios-do-usuario'),
    path("videos/repositorio/<int:repositorio_id>/", views.RepositoryVideosList.as_view(), name="repository-videos"),
    path('repository/<int:pk>/', views.RepositorioDetailView.as_view(), name='repositorio-detail'),
]