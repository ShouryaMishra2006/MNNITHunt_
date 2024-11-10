
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Participant } from './types';

const sampleParticipants: Record<string, Participant[]> = {
  
};

const ParticipantsPage: React.FC = () => {
  const { huntId } = useParams<{ huntId: string }>();
  const navigate = useNavigate();

  const participants = sampleParticipants[huntId || ''] || [];

  return (
    <div className="min-h-screen bg-green-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Participants</h1>
      <table className="w-full bg-green-700 text-white rounded-lg">
        <thead>
          <tr>
            <th className="p-2 border-b border-green-600">Name</th>
            <th className="p-2 border-b border-green-600">Tasks Solved</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td className="p-2 border-b border-green-600 text-center">{participant.name}</td>
              <td className="p-2 border-b border-green-600 text-center">{participant.tasksSolved}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={() => navigate('/')}
      >
        Back to Hunts
      </button>
    </div>
  );
};

export default ParticipantsPage;
