import random
import razorpay
from django.core.mail import send_mail
from django.http import JsonResponse
from .models import Booking, OTP
from rest_framework.decorators import api_view

client = razorpay.Client(auth=("YOUR_KEY", "YOUR_SECRET"))

# 📌 Get bookings
@api_view(['GET'])
def get_bookings(request):
    data = list(Booking.objects.values())
    return JsonResponse(data, safe=False)


# 📌 Create booking (after payment)
@api_view(['POST'])
def create_booking(request):
    data = request.data

    Booking.objects.create(
        seat=data['seat'],
        name=data['name'],
        phone=data['phone'],
        email=data['email'],
        paid=True
    )

    return JsonResponse({"status": "success"})


# 📌 Delete booking
@api_view(['DELETE'])
def delete_booking(request, seat):
    Booking.objects.filter(seat=seat).delete()
    return JsonResponse({"deleted": True})


# 📌 OTP SEND
@api_view(['POST'])
def send_otp(request):
    email = request.data['email']
    otp = str(random.randint(100000, 999999))

    OTP.objects.create(email=email, otp=otp)

    send_mail(
        "Your OTP",
        f"Your OTP is {otp}",
        "noreply@ved.com",
        [email]
    )

    return JsonResponse({"message": "OTP sent"})


# 📌 OTP VERIFY
@api_view(['POST'])
def verify_otp(request):
    email = request.data['email']
    otp = request.data['otp']

    exists = OTP.objects.filter(email=email, otp=otp).exists()

    return JsonResponse({"verified": exists})


# 📌 PAYMENT
@api_view(['POST'])
def create_payment(request):
    order = client.order.create({
        "amount": 100 * 100,
        "currency": "INR",
        "payment_capture": 1
    })
    return JsonResponse(order)