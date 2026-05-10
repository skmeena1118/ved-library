from django.contrib import admin
from .models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['seat', 'name', 'phone', 'email', 'paid', 'created_at']
    list_filter = ['created_at', 'paid']
    search_fields = ['name', 'phone', 'email']