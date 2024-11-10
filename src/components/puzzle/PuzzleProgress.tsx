import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type PuzzleProgressProps = {
  currentPuzzle: number;
  totalPuzzles: number;
};

export function PuzzleProgress({ currentPuzzle, totalPuzzles }: PuzzleProgressProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-emerald-500/20 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${((currentPuzzle - 1) / (totalPuzzles - 1)) * 100}%` }}
        />

        {/* Progress Points */}
        <div className="relative flex justify-between">
          {Array.from({ length: totalPuzzles }).map((_, index) => {
            const isCompleted = index + 1 < currentPuzzle;
            const isCurrent = index + 1 === currentPuzzle;

            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center",
                  isCurrent && "animate-pulse"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center bg-gray-900 border-2",
                  isCompleted && "border-emerald-500 bg-emerald-500/20",
                  isCurrent && "border-emerald-500 bg-emerald-500/10",
                  !isCompleted && !isCurrent && "border-emerald-500/20"
                )}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className={cn(
                      "w-5 h-5",
                      isCurrent ? "text-emerald-500" : "text-emerald-500/20"
                    )} />
                  )}
                </div>
                <span className={cn(
                  "mt-2 text-sm",
                  isCompleted && "text-emerald-500",
                  isCurrent && "text-emerald-400 font-medium",
                  !isCompleted && !isCurrent && "text-gray-500"
                )}>
                  Puzzle {index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}