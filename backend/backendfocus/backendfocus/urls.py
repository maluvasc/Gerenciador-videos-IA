from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from app.views import home, CreateUserView, ListUsersView, EditUserView, ChangePasswordUserView, DeleteAccountView, UserProfileUpdateView, UserProfileView

# Roteamento central do projeto. Ele conecta rotas de aplicativos (como App/urls.py) ao projeto principal.

# urlpatterns é uma lista de caminhos de URL para visualizações. Cada caminho é uma instância de path() que mapeia um URL a uma visualização.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('app.urls')), # Adicionando a URL do aplicativo
    path('app/user/register/', CreateUserView.as_view(), name='register'), # Adicionando a URL para o registro de usuários
    path('app/user/update/', EditUserView.as_view(), name='edit'), # Adicionando a URL para o registro de usuários
    path('app/userProfile/update/', UserProfileUpdateView.as_view(), name='user-profile-update'),
    path('app/userProfile/retrieve/', UserProfileView.as_view(), name='user-profile-update'),
    path('app/user/retrieve/', ListUsersView.as_view(), name="list_users"),
    path('app/user/changePassword/', ChangePasswordUserView.as_view(), name="change_password"),
    path('app/user/delete/', DeleteAccountView.as_view(), name="delete_user"),
    path('app/token/', TokenObtainPairView.as_view(), name='get_token'), # Adicionando a URL para obter o token de acesso
    path('app/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'), # Adicionando a URL para atualizar o token de acesso
    path('app-auth/', include('rest_framework.urls')),
    path('', home, name='home'),  # Adicionando a URL para a página inicial
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
