from django.urls import re_path
from . import consumers, middleware
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

websocket_urlpatterns = [
    re_path(r'ws/socket/$', consumers.MyConsumer.as_asgi()),
    # re_path(r'ws/store-cards/$', consumers.StoreCardsConsumer.as_asgi()),
    re_path(r'ws/auth/$', consumers.AuthConsumer.as_asgi()),
    re_path(r'ws/organizations/$', consumers.IconConsumer.as_asgi()),
    re_path(r'ws/organizations/signup/$', consumers.OrganizationConsumer.as_asgi()),
    re_path(r'ws/stores/signup/$', consumers.StoreSignUp.as_asgi()),
    # re_path(r'ws/shop/$', consumers.ShopsConsumer.as_asgi()),
]
# application = ProtocolTypeRouter({
#     'http': get_asgi_application(),
#     'websocket': AuthMiddlewareStack(
#         middleware.WebSocketAuthMiddleware(
#             URLRouter(
#                 websocket_urlpatterns
#             )
#         )
#     ),
# })
application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AuthMiddlewareStack(
        middleware.WebSocketAuthMiddleware(
            URLRouter(
                websocket_urlpatterns
            )
        )
    ),
})