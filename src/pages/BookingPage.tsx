
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { useBooking } from '../contexts/BookingContext';
import { courts } from '../data/courts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DatePicker } from '@/components/DatePicker';
import TimeSlotPicker from '@/components/TimeSlotPicker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const BookingPage: React.FC = () => {
  const { 
    selectedCourt, 
    selectedDate, 
    selectedTimeSlotId, 
    setSelectedCourt, 
    setSelectedDate, 
    setSelectedTimeSlotId,
    contactInfo,
    updateContactInfo,
    confirmBooking
  } = useBooking();
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confirmBooking();
    navigate('/booking-confirmation');
  };

  return (
    <Layout>
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Book a Court</h1>
            <p className="text-gray-600 mt-2">Select your preferred court, date, and time</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Court Selection</CardTitle>
                  <CardDescription>Choose from our available courts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {courts.map(court => (
                      <Card 
                        key={court.id} 
                        className={`cursor-pointer ${selectedCourt?.id === court.id ? 'border-primary ring-2 ring-primary ring-opacity-50' : ''}`}
                        onClick={() => setSelectedCourt(court)}
                      >
                        <CardContent className="p-4 flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0">
                            <img src={court.image} alt={court.name} className="w-full h-full object-cover rounded-md" />
                          </div>
                          <div>
                            <h3 className="font-medium">{court.name}</h3>
                            <p className="text-sm text-gray-600">{court.type.charAt(0).toUpperCase() + court.type.slice(1)} | {court.pricePerHour} LKR/hr</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Select a date:</h3>
                    <DatePicker date={selectedDate} setDate={setSelectedDate} />
                  </div>
                  
                  <TimeSlotPicker 
                    selectedTimeSlotId={selectedTimeSlotId}
                    onSelectTimeSlot={setSelectedTimeSlotId}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                  <CardDescription>Complete your information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    {selectedCourt && (
                      <div className="mb-4 p-4 bg-accent rounded-md">
                        <h4 className="font-medium">{selectedCourt.name}</h4>
                        <p className="text-sm">{selectedCourt.pricePerHour} LKR per hour</p>
                        {selectedDate && (
                          <p className="text-sm mt-2">
                            Date: {selectedDate.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )}
                    
                    <div className="space-y-4 mt-6">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          value={contactInfo.name}
                          onChange={e => updateContactInfo({ name: e.target.value })}
                          placeholder="Your name" 
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={contactInfo.email}
                          onChange={e => updateContactInfo({ email: e.target.value })}
                          placeholder="Your email" 
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          value={contactInfo.phone}
                          onChange={e => updateContactInfo({ phone: e.target.value })}
                          placeholder="Your phone number" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-6" 
                      type="submit" 
                      disabled={!selectedCourt || !selectedDate || !selectedTimeSlotId}
                    >
                      Complete Booking
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
