
export interface TimeSlot {
  id: number;
  time: string;
  isBooked: boolean;
}

export interface BookingDetails {
  courtId: number;
  date: string;
  timeSlotId: number;
  name: string;
  email: string;
  phone: string;
}

export const generateTimeSlots = () => {
  const slots: TimeSlot[] = [];
  let id = 1;
  
  for (let hour = 7; hour <= 21; hour++) {
    const amPm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    slots.push({
      id: id++,
      time: `${displayHour}:00 ${amPm}`,
      isBooked: Math.random() > 0.7 // Randomly mark some slots as booked
    });
  }
  
  return slots;
};

// Sample bookings data
export const mockBookings: BookingDetails[] = [
  {
    courtId: 1,
    date: '2025-05-15',
    timeSlotId: 3,
    name: 'John Smith',
    email: 'john@example.com',
    phone: '(555) 123-4567'
  },
  {
    courtId: 2,
    date: '2025-05-16',
    timeSlotId: 5,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '(555) 987-6543'
  }
];
