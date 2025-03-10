# Configura o painel administrativo do Django. Você pode registrar seus modelos aqui.

from django.contrib import admin
from .models import Repositorio, Video, AnaliseVideo, Notificacao, UserProfile

admin.site.register(UserProfile)
admin.site.register(Repositorio)
admin.site.register(Video)
admin.site.register(AnaliseVideo)
admin.site.register(Notificacao)