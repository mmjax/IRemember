from django.urls import path, include
from rest_framework import routers

from api.views.memories_views import MemoryViewSet, PostsViewSet
from api.views.users_views import CustomUserViewSet, FriendViewSet, \
    FriendshipRequestCreateDestroyViewSet, FriendshipRequestViewSet

router_v1 = routers.DefaultRouter()


router_v1.register(r'users', CustomUserViewSet, basename='users')
router_v1.register('memory', MemoryViewSet, basename='memories')
router_v1.register('post', PostsViewSet, basename='posts')
router_v1.register('friends', FriendViewSet, basename='friends')
router_v1.register(
    r'users/(?P<user_id>\d+)/friend',
    FriendshipRequestCreateDestroyViewSet,
    basename='send_delete_friendship-request'
)
router_v1.register(
    'friendship-requests',
    FriendshipRequestViewSet,
    basename='friendship_requests'
)


urlpatterns = [
    path('auth/', include('djoser.urls.authtoken')),
    path('', include(router_v1.urls)),
    path('', include('djoser.urls.base')),
]