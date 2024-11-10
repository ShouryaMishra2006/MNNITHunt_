import React from 'react';
import { Trophy, Crown, Award } from 'lucide-react';

export default function Leaderboard() {
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
    <div className="game-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Top Adventurers
        </h2>
        <Trophy className="w-8 h-8 text-yellow-400" />
      </div>
      
      <div className="space-y-4">
        {leaders.map((leader) => (
          <div
            key={leader.rank}
            className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-indigo-50 transition-all duration-300 hover:scale-102"
          >
            <div className="relative">
              <img
                src={leader.avatar}
                alt={leader.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-300 group-hover:ring-4 transition-all"
              />
              <div className="absolute -top-2 -right-2">
                {getRankIcon(leader.rank)}
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {leader.name}
              </h3>
              <p className="text-sm text-gray-500">
                Completed in {leader.time}
              </p>
            </div>
            
            <div className="text-right">
              <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                {leader.score}
              </span>
              <p className="text-sm text-gray-500">points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}