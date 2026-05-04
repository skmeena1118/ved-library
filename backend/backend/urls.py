from django.contrib import admin
from django.urls import path
from booking import views
from django.http import HttpResponse

def home(request):
    return HttpResponse("Backend is running ")

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/bookings/', views.get_bookings),
    path('api/book/', views.create_booking),
    path('api/delete/<int:seat>/', views.delete_booking),
]