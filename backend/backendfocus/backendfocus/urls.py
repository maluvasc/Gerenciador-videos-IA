from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from app import views
# Roteamento central do projeto. Ele conecta rotas de aplicativos (como App/urls.py) ao projeto principal.

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/videos/', include('app.urls')),
    path('', views.home, name='home'),  # Adicionando a URL para a página inicial
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
