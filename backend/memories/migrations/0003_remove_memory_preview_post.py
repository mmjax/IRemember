# Generated by Django 5.0.4 on 2024-04-28 11:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('memories', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='memory',
            name='preview',
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_created=True, blank=True, null=True, verbose_name='Дата поста')),
                ('description', models.CharField(max_length=100, verbose_name='Описание поста')),
                ('image', models.ImageField(blank=True, null=True, upload_to='post/images/', verbose_name='Фото')),
                ('memory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='memories.memory')),
            ],
            options={
                'verbose_name': 'Воспоминание',
                'verbose_name_plural': 'Воспоминания',
            },
        ),
    ]