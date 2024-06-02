from django.core.exceptions import PermissionDenied
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from api.serializers.memories_serializers import MemoryListSerializer, \
    MemoryDetailSerializer, MemoryCreateSerializer, \
    PostCreateUpdateDestroySerializer, MemoryListForCartSerializer, \
    MemoryDetailForUpdateSerializer
from memories.models import Memory, Post


class MemoryViewSet(viewsets.ModelViewSet):
    pagination_class = None
    http_method_names = ["get", "post", "patch", "delete"]

    def get_serializer_class(self):
        if self.action == "cart":
            return MemoryListForCartSerializer
        if self.action == "for_update":
            return MemoryDetailForUpdateSerializer
        if self.action == "list":
            return MemoryListSerializer
        if self.action in ("create", "partial_update", "destroy"):
            return MemoryCreateSerializer
        if self.action == "retrieve":
            return MemoryDetailSerializer

    def get_queryset(self):
        current_user = self.request.user
        queryset = Memory.objects.filter(
            Q(participants=current_user) | Q(creator=current_user)
        ).distinct()

        return queryset

    def perform_create(self, serializer):
        data = serializer.validated_data
        if self.request.user in data.get("participants"):
            raise ValidationError("Нельзя добавить самого себя в участинки")
        serializer.save(creator=self.request.user)

    def perform_update(self, serializer):
        instance = self.get_object()
        if instance.creator != self.request.user:
            raise PermissionDenied("You are not allowed to update this object.")
        serializer.save()

    def perform_destroy(self, request):
        instance = self.get_object()
        if instance.creator != self.request.user:
            raise PermissionDenied("You are not allowed to delete this object.")
        instance.delete()

    @action(["get"], detail=False)
    def cart(self, request, *args, **kwargs):
        return Response(self.get_serializer(self.get_queryset(), many=True).data)

    @action(["get"], detail=True)
    def for_update(self, request, *args, **kwargs):
        memory = Memory.objects.filter(id=kwargs.get("pk")).first()
        return Response(self.get_serializer(memory).data)


class PostsViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostCreateUpdateDestroySerializer
    http_method_names = ["post", "patch", "delete"]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
