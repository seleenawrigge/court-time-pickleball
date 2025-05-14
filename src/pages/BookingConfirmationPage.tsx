
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { useBooking } from '../contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateTimeSlots } from '../data/bookings';

const BookingConfirmationPage: React.FC = () => {
  const { selectedCourt, selectedDate, selectedTimeSlotId, resetBooking } = useBooking();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If no booking details, redirect to booking page
    if (!selectedCourt || !selectedDate || !selectedTimeSlotId) {
      navigate('/booking');
    }
  }, [selectedCourt, selectedDate, selectedTimeSlotId, navigate]);
  
  // Find the time slot text
  const timeSlot = generateTimeSlots().find(slot => slot.id === selectedTimeSlotId);
  
  const handleNewBooking = () => {
    resetBooking();
    navigate('/booking');
  };
  
  const handleViewBookings = () => {
    resetBooking();
    navigate('/my-bookings');
  };
  
  if (!selectedCourt || !selectedDate || !selectedTimeSlotId || !timeSlot) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <Layout>
      <div className="py-12 bg-gray-50 min-h-[60vh] flex items-center">
        <div className="container mx-auto px-4 max-w-lg">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-8">Your pickleball court has been successfully booked.</p>
            
            <div className="bg-gray-50 rounded-md p-6 mb-6 text-left">
              <h3 className="font-semibold text-lg mb-4">Booking Details</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Court:</span> {selectedCourt.name}</p>
                <p><span className="font-medium">Date:</span> {selectedDate.toLocaleDateString()}</p>
                <p><span className="font-medium">Time:</span> {timeSlot.time}</p>
                <p><span className="font-medium">Duration:</span> 1 hour</p>
                <p><span className="font-medium">Price:</span> {selectedCourt.pricePerHour} LKR</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" onClick={handleNewBooking} className="sm:flex-1">
                Book Another Court
              </Button>
              <Button onClick={handleViewBookings} className="sm:flex-1">
                View My Bookings
              </Button>
            </div>
            
            <p className="mt-8 text-sm text-gray-500">
              A confirmation has been sent to your email.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingConfirmationPage;
