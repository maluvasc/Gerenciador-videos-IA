from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import Video, Repositorio, UserProfile
from .serializers import VideoSerializer, UserSerializer, RepositorioSerializer, UserProfileSerializer
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.models import User
import os

# Onde você implementa a lógica das páginas, APIs ou funcionalidades da aplicação.

class UserProfileUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile, created = UserProfile.objects.get_or_create(user=self.request.user)
        return profile
    
class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile, created = UserProfile.objects.get_or_create(user=self.request.user)
        return profile

class RepositorioListCreate(generics.ListCreateAPIView):
    queryset = Repositorio.objects.all()
    serializer_class = RepositorioSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(criador=self.request.user)

class RepositoriosDoUsuarioList(generics.ListAPIView):
    serializer_class = RepositorioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Repositorio.objects.filter(criador=user)
    
class RepositorioDetailView(generics.RetrieveAPIView):
    queryset = Repositorio.objects.all()
    serializer_class = RepositorioSerializer
    permission_classes = [IsAuthenticated]

class RepositorioDelete(generics.DestroyAPIView):
    serializer_class = RepositorioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Repositorio.objects.filter(criador=user) 

class VideoListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk): 
        videos = Video.objects.filter(repositorio_id=pk)  
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)

class RepositoryVideosList(generics.ListAPIView):
    serializer_class = VideoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        repositorio_id = self.kwargs['repositorio_id']
        return Video.objects.filter(repositorio_id=repositorio_id)
    
class RepositorioUpdateView(generics.UpdateAPIView):
    serializer_class = RepositorioSerializer
    permission_classes = [IsAuthenticated]
 
    def get_queryset(self):
        user = self.request.user
        return Repositorio.objects.filter(criador=user)

class VideoUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        files = request.FILES.getlist('file')
        repositorio_id = request.data.get('repositorio')

        if not repositorio_id:
            return Response({"error": "O campo 'repositorio' é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            repositorio = Repositorio.objects.get(id=repositorio_id)
        except Repositorio.DoesNotExist:
            return Response({"error": "Repositório não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
        response_data = []
        for file in files:
            file_name = os.path.splitext(file.name)[0]
            data = {
                'titulo': file_name,
                'descricao': request.data.get('descricao', ''),
                'file': file,
                'repositorio': repositorio.id,
                'autor': request.user.id
            }
            serializer = VideoSerializer(data=data)
            if serializer.is_valid():
                video = serializer.save(autor=request.user)
                response_data.append(VideoSerializer(video).data)
                print(video.file.path)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(response_data, status=status.HTTP_201_CREATED)
    
class ListUsersView(APIView):
    permission_classes = [IsAuthenticated]  # Apenas usuários logados podem ver a lista

    def get(self, request):
        users = User.objects.all().order_by("username")  # Lista todos os usuários ordenados pelo nome
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

#Criação de usuário
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() #queryset é o conjunto de objetos que serão retornados
    serializer_class = UserSerializer #serializer_class é a classe que será usada para serializar os objetos, no caso UserSerializer
    permission_classes = [AllowAny] #permission_classes é a lista de permissões que a view requer, nesse caso qualquer um pode criar um usuário, independente de estar logado ou não

    #método que é chamado quando um usuário é criado
    def perform_create(self, serializer): 
        if serializer.is_valid(): #verifica se os campos do usuário são válidos
            serializer.save() #salva o usuário no banco de dados
        else:
            print(serializer.errors)

class EditUserView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user #retorna o usuário que está fazendo a requisição
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        user.email = request.data.get("email", user.email)
        user.save()
        return Response(UserSerializer(user).data)

class ChangePasswordUserView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        if not user.check_password(old_password):
            return Response({"error": "Senha antiga incorreta."}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({"error": "As senhas novas não coincidem."}, status=status.HTTP_400_BAD_REQUEST)

        # Define a nova senha e salva
        user.set_password(new_password)
        user.save()

        return Response({"message": "Senha alterada com sucesso."}, status=status.HTTP_200_OK)
    
class DeleteAccountView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class VideoDetailView(generics.RetrieveAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [IsAuthenticated]

def home(request):
    return HttpResponse("Bem-vindo ao Gerenciador de Vídeos!")