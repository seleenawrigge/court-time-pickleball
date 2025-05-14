
import React from 'react';
import { Court } from '../data/courts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';

interface CourtCardProps {
  court: Court;
}

const CourtCard: React.FC<CourtCardProps> = ({ court }) => {
  const navigate = useNavigate();
  const { setSelectedCourt } = useBooking();
  
  const handleBookNow = () => {
    setSelectedCourt(court);
    navigate('/booking');
  };
  
  return (
    <div className="court-card bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
      <div className="h-48 bg-gray-200 relative">
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-full object-cover"
        />
        <Badge 
          className={`absolute top-4 right-4 ${
            court.type === 'indoor' ? 'bg-blue-500' : 'bg-green-500'
          }`}
        >
          {court.type.charAt(0).toUpperCase() + court.type.slice(1)}
        </Badge>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{court.name}</h3>
          <span className="text-lg font-semibold text-primary">${court.pricePerHour}/hr</span>
        </div>
        <p className="text-gray-600 mb-4">{court.description}</p>
        <div className="mb-6">
          <h4 className="font-medium text-sm text-gray-700 mb-2">Features:</h4>
          <div className="flex flex-wrap gap-2">
            {court.features.map((feature, index) => (
              <Badge key={index} variant="outline" className="bg-accent text-accent-foreground">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
        <Button onClick={handleBookNow} className="w-full">Book Now</Button>
      </div>
    </div>
  );
};

export default CourtCard;
