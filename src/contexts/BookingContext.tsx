
import React, { createContext, useContext, useState } from 'react';
import { BookingDetails, mockBookings } from '../data/bookings';
import { Court } from '../data/courts';
import { useToast } from '@/components/ui/use-toast';

interface BookingContextType {
  selectedCourt: Court | null;
  selectedDate: Date | null;
  selectedTimeSlotId: number | null;
  bookings: BookingDetails[];
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  setSelectedCourt: (court: Court | null) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTimeSlotId: (timeSlotId: number | null) => void;
  updateContactInfo: (info: Partial<{ name: string; email: string; phone: string }>) => void;
  confirmBooking: () => void;
  isTimeSlotBooked: (courtId: number, date: string, timeSlotId: number) => boolean;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<number | null>(null);
  const [bookings, setBookings] = useState<BookingDetails[]>(mockBookings);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const { toast } = useToast();

  const updateContactInfo = (info: Partial<{ name: string; email: string; phone: string }>) => {
    setContactInfo(prev => ({ ...prev, ...info }));
  };

  const isTimeSlotBooked = (courtId: number, date: string, timeSlotId: number): boolean => {
    return bookings.some(
      booking => 
        booking.courtId === courtId && 
        booking.date === date && 
        booking.timeSlotId === timeSlotId
    );
  };

  const confirmBooking = () => {
    if (!selectedCourt || !selectedDate || !selectedTimeSlotId) {
      toast({
        title: "Booking Incomplete",
        description: "Please select a court, date, and time slot.",
        variant: "destructive"
      });
      return false;
    }

    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      toast({
        title: "Contact Information Missing",
        description: "Please provide your name, email, and phone number.",
        variant: "destructive"
      });
      return false;
    }

    const formattedDate = selectedDate.toISOString().split('T')[0];
    
    if (isTimeSlotBooked(selectedCourt.id, formattedDate, selectedTimeSlotId)) {
      toast({
        title: "Time Slot Unavailable",
        description: "This time slot is already booked. Please select another time.",
        variant: "destructive"
      });
      return false;
    }

    const newBooking: BookingDetails = {
      courtId: selectedCourt.id,
      date: formattedDate,
      timeSlotId: selectedTimeSlotId,
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone
    };

    setBookings([...bookings, newBooking]);
    
    toast({
      title: "Booking Confirmed!",
      description: `Your booking for ${selectedCourt.name} on ${formattedDate} has been confirmed.`,
    });
    
    return true;
  };

  const resetBooking = () => {
    setSelectedCourt(null);
    setSelectedDate(null);
    setSelectedTimeSlotId(null);
    setContactInfo({
      name: '',
      email: '',
      phone: ''
    });
  };

  return (
    <BookingContext.Provider
      value={{
        selectedCourt,
        selectedDate,
        selectedTimeSlotId,
        bookings,
        contactInfo,
        setSelectedCourt,
        setSelectedDate,
        setSelectedTimeSlotId,
        updateContactInfo,
        confirmBooking,
        isTimeSlotBooked,
        resetBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
