from django.apps import AppConfig
# Contém a configuração da aplicação.

class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'
