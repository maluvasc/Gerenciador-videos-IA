from django.db import models
from django.contrib.auth.models import User

# Onde você define as tabelas do banco de dados como classes Python.

class AnaliseVideo(models.Model):
    titulo = models.CharField(max_length=70)
    data = models.DateTimeField("data da análise", auto_now_add=True)
    contemViolencia = models.BooleanField()

    def __str__(self):
        return self.titulo
    
class Video(models.Model):
    titulo = models.CharField(max_length=70, default='Sem título')
    descricao = models.TextField(max_length=255, null=True, blank=True)
    file = models.FileField("arquivo de video", upload_to='videos/')
    data = models.DateTimeField("data de upload", auto_now_add=True)
    analise = models.ForeignKey('AnaliseVideo', on_delete=models.CASCADE, null=True)
    autor = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.titulo
    
class Repositorio(models.Model):
    nome = models.CharField("nome do repositório", max_length=100)
    descricao = models.CharField(max_length=255, blank=True)
    criador = models.ForeignKey(User, on_delete=models.CASCADE)
    privado = models.BooleanField(default=False)
    colaboradores = models.ManyToManyField(User, related_name='colaboradores', blank=True)
    imagem = models.ImageField("imagem do repositório", upload_to='imagens/', null=True, blank=True)

    def __str__(self):
        return self.nome

class Notificacao(models.Model):
    titulo = models.CharField(max_length=255)
    descricao = models.CharField(max_length=255)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    data = models.DateTimeField("data da notificação", auto_now_add=True)