# models.py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, **extra_fields):
        if not phone_number:
            raise ValueError('The phone number must be set')
        user = self.model(phone_number=phone_number, **extra_fields)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(phone_number, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    phone_number = models.CharField(max_length=15, unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []

    class Meta:
        app_label = 'accounts'

class Loan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')])
    created_at = models.DateTimeField(auto_now_add=True)

class StoreCard(models.Model):
    # image_url = models.ImageField(upload_to='categories/', null=True, blank=True)
    image_url = models.URLField(null=True, blank=True)
    url = models.URLField()
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class Store(models.Model):
    title = models.ForeignKey(StoreCard, on_delete=models.SET_NULL, null=True, blank=True, default=None)
    banner = models.ImageField(upload_to='stores/', null=True, blank=True)
    icon = models.ImageField(upload_to='stores/', null=True, blank=True)
    name = models.CharField(max_length=120)
    phone_number = models.CharField(max_length=15)
    owner = models.CharField(max_length=120)
    type = models.CharField(max_length=30)
    province = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class Organization(models.Model):
    name = models.CharField(max_length=100)
    province = models.CharField(max_length=50)
    personnel_number = models.IntegerField(max_length=10)
    agent_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    position = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.name

class Icon(models.Model):
    image = models.URLField()
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

