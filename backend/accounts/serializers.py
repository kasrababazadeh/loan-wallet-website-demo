from rest_framework import serializers
from .models import User, Loan, Store, StoreCard

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'

class StoreCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreCard
        fields = '__all__'

class StoreCategorySerializer(serializers.ModelSerializer):
    stores = serializers.SerializerMethodField()

    class Meta:
        model = StoreCard
        fields = '__all__'

    def get_stores(self, obj):
        # Get the last 3 stores related to this category
        stores = Store.objects.filter(title=obj).order_by('-created_at')[:3]
        return StoreSerializer(stores, many=True).data