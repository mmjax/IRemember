from django.contrib.auth.models import AbstractUser
from django.db import models


FRIENDSHIP_REQUEST_STATUSES = (
    ('sent', 'Заявка отправлена'),
    ('rejected', 'Заявка отклонена')
)


class CustomUser(AbstractUser):
    email = models.EmailField(
        unique=True,
        verbose_name="Эл. почта"
    )
    photo = models.ImageField(
        blank=True,
        null=True,
        upload_to='users/images/',
        verbose_name='Фото'
    )
    friends = models.ManyToManyField('CustomUser', blank=True)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return f'username: {self.username}, email: {self.email}'


class FriendshipRequest(models.Model):
    from_user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='from_me_requests',
        verbose_name='Отправитель'
    )
    to_user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='to_me_requests',
        verbose_name='Получатель'
    )
    status = models.CharField(
        max_length=150,
        choices=FRIENDSHIP_REQUEST_STATUSES,
        blank=True,
        default='sent',
        verbose_name='Статус заявки'
    )

    class Meta:
        verbose_name = 'Заявка в друзья'
        verbose_name_plural = 'Заявки в друзья'

    def __str__(self):
        return f'{self.from_user} --- {self.to_user}: {self.status}'