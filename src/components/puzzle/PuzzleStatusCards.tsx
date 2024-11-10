import { Lock, CheckCircle2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type PuzzleStatusCardsProps = {
  currentPuzzle: number;
  totalPuzzles: number;
};

export function PuzzleStatusCards({ currentPuzzle, totalPuzzles }: PuzzleStatusCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {Array.from({ length: totalPuzzles }).map((_, index) => {
        const puzzleNumber = index + 1;
        const isCompleted = puzzleNumber < currentPuzzle;
        const isCurrent = puzzleNumber === currentPuzzle;
        const isLocked = puzzleNumber > currentPuzzle;

        return (
          <div
            key={index}
            className={cn(
              "relative group aspect-square rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300",
              isCompleted && "bg-emerald-500/20 border-emerald-500/40",
              isCurrent && "bg-emerald-500/10 border-emerald-500/30 animate-pulse",
              isLocked && "bg-gray-900/50 border-gray-500/20",
              "border backdrop-blur-sm"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-lg" />
            
            <div className="relative space-y-2">
              {isCompleted && <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500" />}
              {isCurrent && <MapPin className="w-8 h-8 mx-auto text-emerald-400" />}
              {isLocked && <Lock className="w-8 h-8 mx-auto text-gray-500" />}
              
              <div>
                <p className={cn(
                  "text-sm font-medium",
                  isCompleted && "text-emerald-400",
                  isCurrent && "text-emerald-300",
                  isLocked && "text-gray-500"
                )}>
                  Puzzle {puzzleNumber}
                </p>
                <p className={cn(
                  "text-xs",
                  isCompleted && "text-emerald-500/70",
                  isCurrent && "text-emerald-400/70",
                  isLocked && "text-gray-500/70"
                )}>
                  {isCompleted && "Completed"}
                  {isCurrent && "In Progress"}
                  {isLocked && "Locked"}
                </p>
              </div>
            </div>

            {/* Hover Effect */}
            <div className={cn(
              "absolute inset-0 rounded-lg border-2 opacity-0 group-hover:opacity-100 transition-all duration-300",
              isCompleted && "border-emerald-500/50",
              isCurrent && "border-emerald-400/50",
              isLocked && "border-gray-500/30"
            )} />
          </div>
        );
      })}
    </div>
  );
}