
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useBooking } from '../contexts/BookingContext';
import { Card, CardContent } from '@/components/ui/card';
import { courts } from '../data/courts';
import { generateTimeSlots } from '../data/bookings';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Input } from '@/components/ui/input';

const MyBookingsPage: React.FC = () => {
  const { bookings } = useBooking();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchEmail, setSearchEmail] = useState('');
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchEmail.trim()) {
      toast({
        title: "Please enter an email",
        description: "Enter the email you used for your booking",
        variant: "destructive"
      });
      return;
    }
    
    const found = bookings.filter(booking => booking.email.toLowerCase() === searchEmail.toLowerCase());
    
    if (found.length === 0) {
      toast({
        title: "No bookings found",
        description: "No bookings were found for this email",
        variant: "destructive"
      });
      setFilteredBookings([]);
    } else {
      setFilteredBookings(found);
      toast({
        title: "Bookings found",
        description: `Found ${found.length} booking(s) for this email`,
      });
    }
  };
  
  // Helper function to get court name by ID
  const getCourtById = (courtId: number) => {
    return courts.find(court => court.id === courtId)?.name || 'Unknown';
  };
  
  // Helper function to get time slot by ID
  const getTimeSlotById = (timeSlotId: number) => {
    return generateTimeSlots().find(slot => slot.id === timeSlotId)?.time || 'Unknown';
  };

  return (
    <Layout>
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Bookings</h1>
            <p className="text-gray-600 mt-2">View and manage your pickleball court reservations</p>
          </div>
          
          <div className="max-w-xl mx-auto mb-8">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit">Find My Bookings</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {filteredBookings.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBookings.map((booking, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="bg-primary h-2"></div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg">{getCourtById(booking.courtId)}</h3>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{getTimeSlotById(booking.timeSlotId)}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Booked by:</span>
                        <span className="font-medium">{booking.name}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{booking.email}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{booking.phone}</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button variant="outline" className="w-full">
                        Cancel Booking
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchEmail ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">We couldn't find any bookings associated with this email.</p>
              <Button onClick={() => navigate('/booking')}>Make a Booking</Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Enter your email to find your bookings</h3>
              <p className="text-gray-600">Use the email address you provided when making your booking.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyBookingsPage;
