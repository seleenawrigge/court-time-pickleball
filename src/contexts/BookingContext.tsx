
import React, { createContext, useContext, useState } from 'react';
import { BookingDetails, mockBookings } from '../data/bookings';
import { Court } from '../data/courts';
import { useToast } from '@/hooks/use-toast';

interface BookingContextType {
  selectedCourt: Court | null;
  selectedDate: Date | null;
  selectedTimeSlotIds: number[];
  bookings: BookingDetails[];
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  setSelectedCourt: (court: Court | null) => void;
  setSelectedDate: (date: Date | null) => void;
  toggleTimeSlot: (timeSlotId: number) => void;
  updateContactInfo: (info: Partial<{ name: string; email: string; phone: string }>) => void;
  confirmBooking: () => void;
  isTimeSlotBooked: (courtId: number, date: string, timeSlotId: number) => boolean;
  resetBooking: () => void;
  clearSelectedTimeSlots: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlotIds, setSelectedTimeSlotIds] = useState<number[]>([]);
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

  // New function to toggle a time slot selection
  const toggleTimeSlot = (timeSlotId: number) => {
    setSelectedTimeSlotIds(prev => {
      // If already selected, remove it
      if (prev.includes(timeSlotId)) {
        return prev.filter(id => id !== timeSlotId);
      }
      
      // If not selected yet, add it only if it creates a consecutive sequence
      const newSelection = [...prev, timeSlotId].sort((a, b) => a - b);
      
      // Check if the selection is consecutive
      for (let i = 0; i < newSelection.length - 1; i++) {
        if (newSelection[i + 1] - newSelection[i] !== 1) {
          // Not consecutive, don't add
          toast({
            title: "Invalid Selection",
            description: "Please select consecutive time slots only.",
            variant: "destructive"
          });
          return prev;
        }
      }
      
      return newSelection;
    });
  };

  // Function to clear selected time slots
  const clearSelectedTimeSlots = () => {
    setSelectedTimeSlotIds([]);
  };

  const confirmBooking = () => {
    if (!selectedCourt || !selectedDate || selectedTimeSlotIds.length === 0) {
      toast({
        title: "Booking Incomplete",
        description: "Please select a court, date, and at least one time slot.",
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
    
    // Check if any selected time slot is already booked
    for (const timeSlotId of selectedTimeSlotIds) {
      if (isTimeSlotBooked(selectedCourt.id, formattedDate, timeSlotId)) {
        toast({
          title: "Time Slot Unavailable",
          description: "One or more of your selected time slots is already booked. Please select another time.",
          variant: "destructive"
        });
        return false;
      }
    }

    // Create a booking for each selected time slot
    const newBookings = selectedTimeSlotIds.map(timeSlotId => ({
      courtId: selectedCourt.id,
      date: formattedDate,
      timeSlotId: timeSlotId,
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone
    }));

    setBookings([...bookings, ...newBookings]);
    
    toast({
      title: "Booking Confirmed!",
      description: `Your booking for ${selectedCourt.name} on ${formattedDate} has been confirmed for ${selectedTimeSlotIds.length} hour(s).`,
    });
    
    return true;
  };

  const resetBooking = () => {
    setSelectedCourt(null);
    setSelectedDate(null);
    setSelectedTimeSlotIds([]);
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
        selectedTimeSlotIds,
        bookings,
        contactInfo,
        setSelectedCourt,
        setSelectedDate,
        toggleTimeSlot,
        updateContactInfo,
        confirmBooking,
        isTimeSlotBooked,
        resetBooking,
        clearSelectedTimeSlots
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
