"""
WSGI config for backendfocus project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""
# Configuração para o servidor WSGI, usado para implantação.

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backendfocus.settings')

application = get_wsgi_application()
