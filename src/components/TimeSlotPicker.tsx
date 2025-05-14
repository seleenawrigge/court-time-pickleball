
import React from 'react';
import { TimeSlot, generateTimeSlots } from '../data/bookings';
import { cn } from '@/lib/utils';
import { useBooking } from '../contexts/BookingContext';

interface TimeSlotPickerProps {
  selectedTimeSlotId: number | null;
  onSelectTimeSlot: (id: number) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedTimeSlotId,
  onSelectTimeSlot
}) => {
  const { selectedCourt, selectedDate, isTimeSlotBooked } = useBooking();
  const timeSlots = React.useMemo(() => generateTimeSlots(), []);

  if (!selectedCourt || !selectedDate) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
        <p className="text-gray-500">Please select a court and date first</p>
      </div>
    );
  }

  const formattedDate = selectedDate.toISOString().split('T')[0];

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-4">Select a time:</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {timeSlots.map((slot) => {
          const isBooked = isTimeSlotBooked(selectedCourt.id, formattedDate, slot.id) || slot.isBooked;
          return (
            <button
              key={slot.id}
              onClick={() => !isBooked && onSelectTimeSlot(slot.id)}
              disabled={isBooked}
              className={cn(
                "time-slot p-3 rounded-md border text-center",
                isBooked 
                  ? "bg-gray-100 border-gray-200 text-gray-400 time-slot-booked" 
                  : "border-gray-200 hover:border-primary hover:bg-accent",
                selectedTimeSlotId === slot.id && !isBooked && "bg-primary text-white border-primary"
              )}
            >
              {slot.time}
              {isBooked && <div className="text-xs mt-1">(Booked)</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotPicker;
