from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Booking


@api_view(['GET'])
def get_bookings(request):
    bookings = Booking.objects.all()
    data = [{"seat": b.seat_number} for b in bookings]
    return Response(data)


@api_view(['POST'])
def create_booking(request):
    seat = request.data.get('seat')
    name = request.data.get('name')
    phone = request.data.get('phone')

    if Booking.objects.filter(seat_number=seat).exists():
        return Response({"error": "Seat already booked"}, status=400)

    Booking.objects.create(seat_number=seat, name=name, phone=phone)
    return Response({"message": "Booked successfully"})


@api_view(['DELETE'])
def delete_booking(request, seat):
    try:
        booking = Booking.objects.get(seat_number=seat)
        booking.delete()
        return Response({"message": "Deleted successfully"})
    except Booking.DoesNotExist:
        return Response({"error": "Not found"}, status=404)