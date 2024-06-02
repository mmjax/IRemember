from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from drf_spectacular.views import (
        SpectacularSwaggerView,
        SpectacularAPIView,
        SpectacularRedocView
    )


from . import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls.users_urls')),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    )
    urlpatterns += [path(
        "schema/",
        SpectacularAPIView.as_view(),
        name="schema"
    )]
    urlpatterns += [path(
        "swagger/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger"
    )]
    urlpatterns += [path(
        "redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc"
    )]
    urlpatterns += static(
        settings.STATIC_URL,
        document_root=settings.STATIC_ROOT
    )

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    )
