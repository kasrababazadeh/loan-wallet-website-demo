from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
from channels.db import database_sync_to_async
import os
from urllib.parse import parse_qs
import django
from django.conf import settings
# from ippanel import IPPanelClient
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
from .models import StoreCard
import json
import random
from .models import User, Icon, Organization, Store, StoreCard
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser



class MyConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({
            'message': 'You are connected!'
        }))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        await self.send(text_data=json.dumps({
            'message': 'Message received!'
        }))

class StoreCardsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send_store_cards()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        # Handle incoming messages if needed
        pass

    async def send_store_cards(self):
        store_cards = await self.get_store_cards()
        await self.send(text_data=json.dumps({
            'store_cards': store_cards
        }))

    @database_sync_to_async
    def get_store_cards(self):
        # Fetch store cards from the database
        queryset = StoreCard.objects.all()
        store_cards = [
            {'id': card.id, 'title': card.title, 'image_url': card.image_url, 'url': card.url}
            for card in queryset
        ]
        return store_cards

class IconConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        cards = await self.get_cards()
        await self.send(text_data=json.dumps({
            'cards': cards
        }))

    @database_sync_to_async
    def get_cards(self):
        cards = Icon.objects.all().values('id', 'title', 'image')
        return list(cards)

User = get_user_model()
client_sessions = {}

class MyConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({
            'message': 'You are connected!'
        }))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        await self.send(text_data=json.dumps({
            'message': 'Message received!'
        }))

class AuthConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get('action')

        if action == 'send_sms':
            phone_number = data.get('phone_number')
            rand_int = random.randint(1000, 9999)
            print(phone_number)
            print(rand_int)
            client_sessions[phone_number] = rand_int
            print('SMS sent successfully')
            await self.send(text_data=json.dumps({'status': 'success', 'message': 'SMS sent successfully'}))

        elif action == 'verify_code':
            phone_number = data.get('phone_number')
            verification_code = data.get('verification_code')
            rand_int = client_sessions.get(phone_number)

            if not rand_int:
                print('No verification code found. Please send SMS first.')
                await self.send(text_data=json.dumps({'status': 'error', 'message': 'No verification code found. Please send SMS first.'}))
                return

            if verification_code == str(rand_int):
                if data.get('type') == 'login':
                    await self.handle_login(phone_number)
                elif data.get('type') == 'signup':
                    await self.handle_signup(phone_number)
            else:
                print('Invalid verification code')
                await self.send(text_data=json.dumps({'status': 'error', 'message': 'Invalid verification code'}))

        elif action == 'logout':
            print('logout . . .')
            await self.handle_logout()

    @database_sync_to_async
    def is_phone_registered(self, phone_number):
        return User.objects.filter(phone_number=phone_number).exists()

    @database_sync_to_async
    def register_phone(self, phone_number):
        user = User.objects.create_user(phone_number=phone_number)
        return user

    @database_sync_to_async
    def get_user_by_phone(self, phone_number):
        try:
            return User.objects.get(phone_number=phone_number)
        except User.DoesNotExist:
            return AnonymousUser()

    async def handle_login(self, phone_number):
        user = await self.get_user_by_phone(phone_number)
        if user:
            self.scope['user'] = user
            print('Login successful')
            await self.send(text_data=json.dumps({'status': 'success', 'message': 'Login successful'}))

    async def handle_signup(self, phone_number):
        if not await self.is_phone_registered(phone_number):
            user = await self.register_phone(phone_number)
            self.scope['user'] = user
            print('Registration successful')
            await self.send(text_data=json.dumps({'status': 'success', 'message': 'Registration successful'}))
        else:
            print('Phone number already registered')
            await self.send(text_data=json.dumps({'status': 'error', 'message': 'Phone number already registered'}))

    async def handle_logout(self):
        if self.scope['user'].is_authenticated:
            # Clear session-related data if needed
            phone_number = self.scope['user'].phone_number
            if phone_number in client_sessions:
                del client_sessions[phone_number]
            # Perform any additional logout actions
            print('Logout successful')
            await self.send(text_data=json.dumps({'status': 'success', 'message': 'Logout successful'}))
            print('Logout successful')
        else:
            print('User not authenticated')
            await self.send(text_data=json.dumps({'status': 'error', 'message': 'User not authenticated'}))
            print('User not authenticated')

class OrganizationConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        data = json.loads(text_data)
        organization_name = data['organization_name']
        province_data = data['province']
        personnel_number_data = data['personnel_number']
        agent_name_data = data['agent_name']
        phone_number_data = data['phone_number']
        position_data = data['position']

        # Save the organization data to the database
        organization = Organization.objects.create(
            name=organization_name,
            province=province_data,
            personnel_number=personnel_number_data,
            agent_name=agent_name_data,
            phone_number=phone_number_data,
            position=position_data
        )
        self.send(text_data=json.dumps({
            'message': f'با تشکر، درخواست شما به نام سازمان {organization.name} با موفقیت ثبت شد! در اسرع وقت با شما تماس گرفته خواهد شد.'
        }))

class StoreSignUp(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        data = json.loads(text_data)
        title_data = data['title']
        name_data = data['name']
        phone_number_data = data['phone_number']
        owner_data = data['owner']
        type_data = data['type']
        province_data = data['province']
        titleObj = StoreCard.objects.get(id=int(title_data))
        # Save the organization data to the database
        store = Store.objects.create(
            title=titleObj,
            name=name_data,
            phone_number=phone_number_data,
            owner=owner_data,
            type=type_data,
            province=province_data
        )
        self.send(text_data=json.dumps({
            'message': f'با تشکر، درخواست شما به نام فروشگاه {store.name} با موفقیت ثبت شد! در اسرع وقت با شما تماس گرفته خواهد شد.'
        }))

# class ShopsConsumer(WebsocketConsumer):
#     def connect(self):
#         self.accept()

#     def disconnect(self, close_code):
#         pass

#     def receive(self, text_data):
#         # Extract the query parameters from the scope
#         query_string = self.scope['query_string'].decode()
#         query_params = parse_qs(query_string)
#         word = query_params.get('word', [None])[0]
#         print(word)
        
#         if word:
#             # Perform some processing on the table
#             results = self.process_word(word)
            
#             # Send the results back to the frontend
#             self.send(text_data=json.dumps({
#                 'word': word,
#                 'results': results,
#             }))
#         else:
#             self.send(text_data=json.dumps({
#                 'error': 'No word provided',
#             }))

#     def process_word(self, word):
#         # Example processing: filtering a table based on the word
#         results = Store.objects.filter(title__title=word).values()
#         return list(results)
# class ShopsConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         query_string = self.scope['query_string'].decode()
#         query_params = parse_qs(query_string)
#         self.word = query_params.get('word', [None])[0]
#         self.page = int(query_params.get('page', [1])[0])
#         print(self.word)
#         print(self.page)

#         if self.word:
#             await self.accept()
#             results = await self.get_results(self.word, self.page)
#             await self.send(text_data=json.dumps({
#                 'results': results
#             }))
#         else:
#             await self.close()

#     async def disconnect(self, close_code):
#         pass

#     async def receive(self, text_data):
#         pass

#     @database_sync_to_async
#     def get_results(self, word, page):
#         page_size = 9  # Changed to 9 to match the client's expectation
#         start_index = (page - 1) * page_size
#         results = Store.objects.filter(title__url__icontains=word).values('id', 'banner', 'icon', 'title__title', 'name', 'type', 'province')[start_index:start_index + page_size]
#         return list(results)
