from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from app.views import home, CreateUserView, RepositorioListCreate

# Roteamento central do projeto. Ele conecta rotas de aplicativos (como App/urls.py) ao projeto principal.

# urlpatterns é uma lista de caminhos de URL para visualizações. Cada caminho é uma instância de path() que mapeia um URL a uma visualização.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('app.urls')), # Adicionando a URL do aplicativo
    path('app/user/register/', CreateUserView.as_view(), name='register'), # Adicionando a URL para o registro de usuários
    path('app/repository/register/', RepositorioListCreate.as_view(), name='repositorio-list'), # Adicionando a URL para o registro de repositorios
    path('app/token/', TokenObtainPairView.as_view(), name='get_token'), # Adicionando a URL para obter o token de acesso
    path('app/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'), # Adicionando a URL para atualizar o token de acesso
    path('app-auth/', include('rest_framework.urls')),
    path('', home, name='home'),  # Adicionando a URL para a página inicial
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
