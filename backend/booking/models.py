from django.db import models

class Booking(models.Model):
    seat_number = models.IntegerField()
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Seat {self.seat_number} - {self.name}"