from django.contrib import admin
from .models import Booking

class BookingAdmin(admin.ModelAdmin):
    list_display = ('seat_number', 'name', 'phone', 'created_at')
    search_fields = ('name', 'phone')
    list_filter = ('created_at',)

admin.site.register(Booking, BookingAdmin)