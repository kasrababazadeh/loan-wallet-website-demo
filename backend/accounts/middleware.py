import urllib.parse
from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model
from django.db import close_old_connections

User = get_user_model()

@database_sync_to_async
def get_user_from_query_string(query_string):
    parsed_query = urllib.parse.parse_qs(query_string.decode('utf-8'))
    user_id = parsed_query.get('user_id')
    if user_id:
        try:
            return User.objects.get(id=user_id[0])
        except User.DoesNotExist:
            return AnonymousUser()
    return AnonymousUser()

class WebSocketAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        close_old_connections()
        user = await get_user_from_query_string(scope['query_string'])
        scope['user'] = user
        return await super().__call__(scope, receive, send)
