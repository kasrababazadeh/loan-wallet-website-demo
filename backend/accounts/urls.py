from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, LoanViewSet, StoreViewSet, ShopListView, StoreCardListView, StoreCardCategoryView, StoreDetailView
from django.conf import settings
from django.conf.urls.static import static
app_name = 'accounts'
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'loans', LoanViewSet)
router.register(r'stores', StoreViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/shop/', ShopListView.as_view(), name='shop-list'),
    path('api/store-cards/', StoreCardListView.as_view(), name='store-card-list'),
    path('api/store-categories/', StoreCardCategoryView.as_view(), name='store-category'),
    path('api/store/<int:pk>/', StoreDetailView.as_view(), name='store-detail'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
