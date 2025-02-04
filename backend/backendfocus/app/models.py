from django.db import models

# Onde você define as tabelas do banco de dados como classes Python.

class AnaliseVideo(models.Model):
    titulo = models.CharField(max_length=70)
    data = models.DateTimeField("data da análise", auto_now_add=True)
    contemViolencia = models.BooleanField()

    def __str__(self):
        return self.titulo
    
class Video(models.Model):
    titulo = models.CharField(max_length=70)
    descricao = models.TextField(max_length=255, null=True)
    file = models.FileField("arquivo de video", upload_to='videos/')
    data = models.DateTimeField("data de upload", auto_now_add=True)
    analise = models.ForeignKey("análise do vídeo", AnaliseVideo, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.filename
    
class Usuario(models.Model):
    nome = models.CharField("nome de usuário", max_length=16, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    senha = models.CharField(max_length=255)

    def __str__(self):
        return self.nome
    
class Repositorio(models.Model):
    nome = models.CharField("nome do repositório", max_length=100)
    descricao = models.CharField(max_lengtch=255)
    criador = models.ForeignKey("criador do repositório", Usuario, on_delete=models.CASCADE)
    privado = models.BooleanField()
    colaboradores = models.ManyToManyField(Usuario, null=True)
    imagem = models.ImageField("imagem do repositório", upload_to='imagens/', null=True)

    def __str__(self):
        return self.nome

class Notificacao(models.Model):
    titulo = models.CharField(max_length=255)
    descricao = models.CharField(max_length=255)
    usuario = models.ForeignKey("usuario da notificação", Usuario, on_delete=models.CASCADE)
    data = models.DateTimeField("data da notificação", auto_now_add=True)