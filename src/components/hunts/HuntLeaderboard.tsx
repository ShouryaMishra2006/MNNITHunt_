import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Medal } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const MOCK_LEADERBOARD = [
  {
    id: 1,
    name: "Alex Turner",
    score: 2500,
    solved: 4,
    time: "1h 23m",
  },
  {
    id: 2,
    name: "Sarah Chen",
    score: 2300,
    solved: 3,
    time: "1h 45m",
  },
  {
    id: 3,
    name: "Raj Patel",
    score: 2100,
    solved: 3,
    time: "2h 10m",
  },
];

type HuntLeaderboardProps = {
  huntId: number;
};

export function HuntLeaderboard({ huntId }: HuntLeaderboardProps) {
  return (
    <Card className="glass-card p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold">Leaderboard</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Refresh leaderboard
            }}
          >
            Refresh
          </Button>
        </div>

        <div className="space-y-2">
          {MOCK_LEADERBOARD.map((entry, index) => (
            <div
              key={entry.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-colors",
                index === 0 && "bg-emerald-500/10 border border-emerald-500/20"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  index === 0 && "bg-emerald-500 text-white",
                  index === 1 && "bg-gray-500/20 text-gray-300",
                  index === 2 && "bg-yellow-500/20 text-yellow-500"
                )}>
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{entry.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{entry.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{entry.score}</p>
                <p className="text-sm text-gray-400">{entry.solved} solved</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}