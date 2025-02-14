from rest_framework import serializers
from .models import Video, Repositorio
from django.contrib.auth.models import User

# Usado para converter modelos em JSON (ou outros formatos), principalmente quando você usa Django REST Framework.

#Converte instâncias de User em JSON e vice-versa
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}} #password é write_only, ou seja, só é usado para criar um usuário, não é retornado quando um usuário é consultado

    #método que é chamado quando um usuário é criado, cria um usuário com dados já validados
    def create(self, validaded_data):
        user = User.objects.create_user(**validaded_data) #cria um usuário com os dados validados
        return user

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'titulo', 'descricao', 'file', 'data', 'analise', 'autor', 'repositorio']

class RepositorioSerializer(serializers.ModelSerializer):
    videos = VideoSerializer(many=True, read_only=True)

    class Meta:
        model = Repositorio
        fields = ['id', 'nome', 'descricao', 'criador', 'privado', 'colaboradores', 'imagem', 'videos']
        extra_kwargs = {'criador': {'read_only': True}}