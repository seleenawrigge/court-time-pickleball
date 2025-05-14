
import React from 'react';
import { TimeSlot, generateTimeSlots } from '../data/bookings';
import { cn } from '@/lib/utils';
import { useBooking } from '../contexts/BookingContext';
import { Badge } from '@/components/ui/badge';

interface TimeSlotPickerProps {
  onSelectTimeSlot?: (id: number) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  onSelectTimeSlot
}) => {
  const { 
    selectedCourt, 
    selectedDate, 
    selectedTimeSlotIds,
    isTimeSlotBooked, 
    toggleTimeSlot 
  } = useBooking();
  
  const timeSlots = React.useMemo(() => generateTimeSlots(), []);

  // Handle time slot selection/deselection
  const handleTimeSlotClick = (slotId: number, isBooked: boolean) => {
    if (isBooked) return;
    
    if (onSelectTimeSlot) {
      onSelectTimeSlot(slotId);
    } else {
      toggleTimeSlot(slotId);
    }
  };

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
      <h3 className="text-lg font-medium mb-2">Select a time:</h3>
      {selectedTimeSlotIds.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            You've selected {selectedTimeSlotIds.length} hour(s)
          </p>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {timeSlots.map((slot) => {
          const isBooked = isTimeSlotBooked(selectedCourt.id, formattedDate, slot.id) || slot.isBooked;
          const isSelected = selectedTimeSlotIds.includes(slot.id);
          return (
            <button
              key={slot.id}
              onClick={() => handleTimeSlotClick(slot.id, isBooked)}
              disabled={isBooked}
              className={cn(
                "time-slot p-3 rounded-md border text-center relative",
                isBooked 
                  ? "bg-gray-100 border-gray-200 text-gray-400 time-slot-booked" 
                  : "border-gray-200 hover:border-primary hover:bg-accent",
                isSelected && !isBooked && "bg-primary text-white border-primary"
              )}
            >
              {slot.time}
              {isBooked && <div className="text-xs mt-1">(Booked)</div>}
              {isSelected && !isBooked && (
                <Badge className="absolute -top-2 -right-2 bg-green-500">
                  {selectedTimeSlotIds.indexOf(slot.id) + 1}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotPicker;
