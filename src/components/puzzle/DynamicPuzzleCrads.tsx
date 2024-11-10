"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Lock, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type PuzzleCardProps = {
  isLoading: boolean;
};



export function DynamicPuzzleCards({ isLoading }: PuzzleCardProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="glass-card p-6 animate-pulse">
            <div className="h-6 bg-emerald-500/20 rounded w-3/4 mb-4" />
            <div className="h-4 bg-emerald-500/10 rounded w-full mb-2" />
            <div className="h-4 bg-emerald-500/10 rounded w-2/3" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {MOCK_PUZZLES.map((puzzle) => (
        <Card
          key={puzzle.id}
          className={cn(
            "glass-card p-6 transition-all duration-300 group hover:border-emerald-500/30",
            puzzle.status === "completed" && "bg-emerald-500/10",
            puzzle.status === "active" && "animate-pulse",
            puzzle.status === "locked" && "opacity-75"
          )}
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">{puzzle.title}</h3>
              <Badge
                variant="outline"
                className={cn(
                  "border",
                  puzzle.difficulty === "easy" && "bg-green-500/10 text-green-500 border-green-500/20",
                  puzzle.difficulty === "medium" && "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
                  puzzle.difficulty === "hard" && "bg-red-500/10 text-red-500 border-red-500/20"
                )}
              >
                {puzzle.difficulty}
              </Badge>
            </div>

            <p className="text-gray-400 text-sm">{puzzle.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-emerald-500/10">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>{puzzle.timeLimit}</span>
              </div>

              <div className="flex items-center gap-2">
                {puzzle.status === "completed" && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                )}
                {puzzle.status === "active" && (
                  <MapPin className="w-5 h-5 text-emerald-400" />
                )}
                {puzzle.status === "locked" && (
                  <Lock className="w-5 h-5 text-gray-500" />
                )}
                <span className={cn(
                  "text-sm",
                  puzzle.status === "completed" && "text-emerald-500",
                  puzzle.status === "active" && "text-emerald-400",
                  puzzle.status === "locked" && "text-gray-500"
                )}>
                  {puzzle.status.charAt(0).toUpperCase() + puzzle.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}