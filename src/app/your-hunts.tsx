import React from 'react';
import { Hunt } from './types';

const sampleHunts: Hunt[] = [
  // Sample hunts data
];

const YourHunts: React.FC = () => {
  return (
    <div className="dark-green-background min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Your Hunts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleHunts.map((hunt) => (
          <div key={hunt.id} className="card rounded-lg p-4">
            <h2 className="text-xl font-semibold">{hunt.name}</h2>
            <p className="mt-2">Ends on: {new Date(hunt.endTime).toLocaleString()}</p>
            <p className="mt-1">Points: {hunt.points}</p>
            <button
              className="button text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
              onClick={() => handleViewParticipants(hunt.id)}
            >
              View Participants
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourHunts;
