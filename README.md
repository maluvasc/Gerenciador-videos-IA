# Gerenciador de Vídeos

## Visão Geral

Este é um sistema de gerenciamento de vídeos com análise automatizada, desenvolvido com Django no backend e JavaScript/CSS no frontend. O sistema permite que usuários enviem vídeos para repositórios, que podem vir a servir para aplicações com análise de IA.

## Funcionalidades

- ✅ Upload de vídeos para repositórios
- ✅ Organização de vídeos em repositórios
- ✅ Interface de reprodutor de vídeos
- ✅ Sistema de lixeira
- ✅ CRUD completo para repositórios e vídeos
- ✅ Fila de processamento para análise sequencial de vídeos

## Tecnologias Utilizadas

### Backend

- Python 3.x
- Django
- Django REST Framework
- MySQL (via Django ORM)

### Frontend

- JavaScript (puro)
- HTML5 / CSS3

### Inteligência Artificial

- Frameworks para visão computacional (ex: YOLO - ainda em estruturação)
- Pipeline de análise com fila de processamento individual por vídeo

## Modelos de Dados

### Video

- `titulo`: CharField
- `descricao`: TextField
- `file`: FileField (armazenamento de vídeos)
- `repositorio`: ForeignKey para Repositorio
- `autor`: ForeignKey para User
- `naLixeira`: BooleanField (padrão `False`)

### Repositorio

- `nome`: CharField
- `descricao`: TextField
- `usuario`: ForeignKey para User

## Endpoints Importantes

- `POST /app/videos/upload/` - Upload de vídeos para um repositório
- `POST /app/videos/{id}/lixeira/` - Mover um vídeo para a lixeira (remoção lógica)
- `GET /app/repositorios/` - Listar repositórios do usuário
- `GET /app/videos/` - Listar vídeos (com filtros aplicáveis, ex: na lixeira ou não)

## Aviso

⚠️ Este sistema ainda está em fase de produção e, portanto, indisponível para testes de terceiros no momento.

