
import React from 'react';
import { Button } from '@/components/ui/button';
import CourtCard from '@/components/CourtCard';
import { courts } from '../data/courts';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/90 to-primary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Perfect Pickleball Court</h1>
              <p className="text-lg mb-6 opacity-90">
                Easy online booking for indoor and outdoor courts. Reserve your spot and get playing!
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate('/booking')}
                className="bg-white text-primary hover:bg-gray-100"
              >
                Book a Court Now
              </Button>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="bg-white p-4 rounded-lg shadow-lg transform rotate-2">
                <img 
                  src="/lovable-uploads/20a6aa08-c027-4440-a235-92fcca6c609e.png" 
                  alt="Pickleball rackets and balls" 
                  className="rounded w-full h-64 object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courts Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our Courts</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Discover our premium indoor and outdoor pickleball courts. Each court is maintained to professional standards for the best playing experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courts.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book your court in seconds with our intuitive online system.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Courts</h3>
              <p className="text-gray-600">Enjoy our well-maintained indoor and outdoor courts with top facilities.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Hours</h3>
              <p className="text-gray-600">Book early morning to late evening, 7 days a week.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Play?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Don't wait! Book your pickleball court now and secure your preferred time slot.
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/booking')}
          >
            Book a Court
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
