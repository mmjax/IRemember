from django.db import models

from users.models import CustomUser


class Memory(models.Model):
    name = models.CharField(
        max_length=254,
        verbose_name='Название воспоминания',
    )
    date = models.DateField(
        verbose_name="Дата воспоминания",
    )
    coordinates = models.CharField(
        max_length=150,
        verbose_name='Место воспоминания',
    )
    place_name = models.CharField(
        max_length=150,
        verbose_name='Название места воспоминания',
    )
    description = models.CharField(
        max_length=500,
        verbose_name='Описание события',
    )
    creator = models.ForeignKey(
        CustomUser,
        related_name='memories',
        on_delete=models.CASCADE,
        verbose_name='Создатель',
    )
    participants = models.ManyToManyField(
        CustomUser,
        related_name='boards_participated',
        blank=True,
        verbose_name='Участники',
    )

    class Meta:
        verbose_name = 'Воспоминание'
        verbose_name_plural = 'Воспоминания'

    def __str__(self):
        return self.name


class Post(models.Model):
    memory = models.ForeignKey(
        Memory,
        related_name='posts',
        on_delete=models.CASCADE
    )
    description = models.CharField(
        verbose_name="Описание поста",
        max_length=100
    )
    date = models.DateField(
        verbose_name="Дата поста",
        blank=True,
        null=True,
        auto_created=True
    )
    image = models.ImageField(
        blank=True,
        null=True,
        upload_to='post/images/',
        verbose_name='Фото'
    )
    creator = models.ForeignKey(
        CustomUser,
        related_name='post',
        on_delete=models.CASCADE,
        verbose_name='Создатель',
    )

    class Meta:
        verbose_name = 'Пост'
        verbose_name_plural = 'Посты'

    def __str__(self):
        return self.description

