# Generated by Django 5.1.5 on 2025-02-21 01:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_alter_repositorio_imagem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='analise',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app.analisevideo'),
        ),
    ]
