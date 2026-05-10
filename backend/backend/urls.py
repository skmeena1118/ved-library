from django.contrib import admin
from django.urls import path
from booking import views
from django.http import HttpResponse


# 👉 ADD THIS
def home(request):
    return HttpResponse("✅ Backend is running successfully")

urlpatterns = [
    path('', home),  # 👈 THIS FIXES 404
    path('admin/', admin.site.urls),

    path('api/bookings/', views.get_bookings),
    path('api/book/', views.create_booking),
    path('api/delete/<int:seat>/', views.delete_booking),
    path('api/payment/', views.create_payment),
    path('api/send-otp/', views.send_otp),
    path('api/verify-otp/', views.verify_otp),
]