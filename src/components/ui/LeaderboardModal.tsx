import React from 'react';
import { Trophy, Crown, Award, X } from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
  if (!isOpen) return null;

  const leaders = [
    {
      rank: 1,
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
      score: 2500,
      time: "1:45:30"
    },
    {
      rank: 2,
      name: "Sarah Williams",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
      score: 2350,
      time: "1:50:15"
    },
    {
      rank: 3,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
      score: 2200,
      time: "1:55:45"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-orange-400" />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl transform transition-all">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Top Adventurers
              </h2>
              <Trophy className="w-10 h-10 text-yellow-400" />
            </div>
            
            <div className="space-y-4">
              {leaders.map((leader) => (
                <div
                  key={leader.rank}
                  className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-indigo-50 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={leader.avatar}
                      alt={leader.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-indigo-300 group-hover:ring-4 transition-all"
                    />
                    <div className="absolute -top-2 -right-2">
                      {getRankIcon(leader.rank)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {leader.name}
                    </h3>
                    <p className="text-gray-500">
                      Completed in {leader.time}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                      {leader.score}
                    </span>
                    <p className="text-gray-500">points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}