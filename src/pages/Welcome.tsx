
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Welcome = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stride-white p-6 text-center">
      <h1 className="text-5xl font-bold mb-4">Stride</h1>
      <p className="text-xl text-stride-secondary mb-12 max-w-md">
        Your life. Your real work. One step at a time.
      </p>
      <div className="mb-8">
        <p className="text-2xl mb-6 max-w-md">
          Stop drifting. Start Striding. Your real life deserves better.
        </p>
      </div>
      <Button 
        onClick={() => navigate('/dashboard')}
        className="bg-stride-action hover:bg-black text-white px-10 py-6 text-lg rounded-full"
      >
        Get Started
      </Button>
    </div>
  );
};

export default Welcome;
