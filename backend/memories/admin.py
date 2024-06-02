from django.contrib import admin
from .models import Memory, Post

@admin.register(Memory)
class MemoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'creator')
    search_fields = ('name', 'date', 'creator__username')
    list_filter = ('date', 'creator')

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('description', 'date', 'memory')
    search_fields = ('description', 'date', 'memory__name')
    list_filter = ('date', 'memory')