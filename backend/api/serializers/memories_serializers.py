from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from api.serializers.users_serializers import CustomUserSerializer, \
    CustomUserListSerializer
from memories.models import Memory, Post


class PostListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('description', 'date', 'image')


class PostSerializer(serializers.ModelSerializer):
    creator = CustomUserSerializer()

    class Meta:
        model = Post
        fields = ('description', 'date', 'image', 'creator')


class PostCreateUpdateDestroySerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('memory', 'description', 'image')


class MemoryListSerializer(serializers.ModelSerializer):
    participants = CustomUserListSerializer(many=True)

    class Meta:
        model = Memory
        fields = (
            "id", "name", "coordinates", "date", "participants", "place_name"
        )


class MemoryDetailSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True)
    creator = CustomUserSerializer()
    participants = CustomUserSerializer(many=True)

    class Meta:
        model = Memory
        fields = (
            "id", "name", "date", "coordinates", "description", "creator", "participants", "posts", "place_name"
        )


class MemoryDetailForUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Memory
        fields = ("participants",)


class MemoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memory
        fields = (
            "id", "name", "date", "coordinates", "description", "participants", "place_name"
        )


class MemoryListForCartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Memory
        fields = ("id", "coordinates", "place_name")
