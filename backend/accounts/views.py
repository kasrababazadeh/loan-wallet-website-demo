from rest_framework import viewsets, generics
from rest_framework import status
from rest_framework.response import Response
# from rest_framework.decorators import api_view
from .models import User, Loan, Store, StoreCard
from .serializers import UserSerializer, LoanSerializer, StoreSerializer, StoreCardSerializer, StoreCategorySerializer
from rest_framework import generics
from .models import Store
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from .pagination import CustomPageNumberPagination

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

class StoreCardListView(generics.ListAPIView):
    queryset = StoreCard.objects.all()
    serializer_class = StoreCardSerializer

class StoreCardCategoryView(generics.ListAPIView):
    queryset = StoreCard.objects.all()
    serializer_class = StoreCategorySerializer

# class StoreDetailView(generics.RetrieveAPIView):
#     queryset = Store.objects.all()
#     # print(f"queryset: {queryset}")
#     serializer_class = StoreSerializer

class StoreDetailView(generics.RetrieveAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # print(f"Retrieved store: {instance}")
        serializer = self.get_serializer(instance)
        return Response(serializer.data)



# class ShopListView(generics.ListAPIView):
#     serializer_class = StoreSerializer
#     pagination_class = CustomPageNumberPagination

#     def get_queryset(self):
#         word = self.request.query_params.get('word', None)
#         queryset = Store.objects.filter(title__url__icontains=word)
#         # print(queryset)
#         return queryset

class ShopListView(generics.ListAPIView):
    serializer_class = StoreSerializer
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        word = self.request.query_params.get('word', None)
        if word:
            queryset = Store.objects.filter(title__url__icontains=word)
            # print(f"Filtered queryset: {queryset}")
        else:
            queryset = Store.objects.all()  # Fallback to all stores
        return queryset

