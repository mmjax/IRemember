# Generated by Django 5.0.4 on 2024-04-28 09:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Memory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=254, verbose_name='Название воспоминания')),
                ('date', models.CharField(max_length=30, verbose_name='Дата воспоминания')),
                ('coordinates', models.CharField(max_length=20, verbose_name='Место воспоминания')),
                ('description', models.CharField(max_length=500, verbose_name='Описание события')),
                ('preview', models.CharField(max_length=30, verbose_name='Превью')),
            ],
            options={
                'verbose_name': 'Воспоминание',
                'verbose_name_plural': 'Воспоминания',
            },
        ),
    ]
