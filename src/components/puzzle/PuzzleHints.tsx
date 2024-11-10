"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Define the shape of the Hint object being passed as props
type Hint = {
  hint: string;
  _id: string;
};

export function PuzzleHints({
  onHintsChange,
  hintsData,
}: {
  onHintsChange: (hintsOpened: number) => void;
  hintsData: Hint[];
}) {
  const [unlockedHints, setUnlockedHints] = useState<string[]>([]); // Use _id to track unlocked hints
  const { toast } = useToast();

  // Hardcoded cost values for the hints
  const hintCosts = [10, 20];

  const unlockHint = (hintId: string, cost: number) => {
    if (unlockedHints.includes(hintId)) return;

    toast({
      title: `Hint ${hintId} Unlocked!`,
      description: `-${cost} points`,
    });

    const updatedHints = [...unlockedHints, hintId];
    setUnlockedHints(updatedHints);

    // Update the hintsOpened count
    onHintsChange(updatedHints.length);
  };

  return (
    <div className="space-y-4">
      {hintsData.map((hint, index) => {
        const hintId = hint._id; // Use _id as the unique identifier
        const cost = hintCosts[index]; // Get the cost based on the hint position
        const isUnlocked = unlockedHints.includes(hintId);
        const isPreviousUnlocked = index === 0 || unlockedHints.includes(hintsData[index - 1]._id);

        return (
          <div
            key={hintId}
            className={cn(
              "p-4 rounded-lg border transition-all duration-300",
              isUnlocked
                ? "border-emerald-500/20 bg-emerald-500/10"
                : "border-gray-500/20 bg-gray-500/5",
              !isPreviousUnlocked && "opacity-50"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {isUnlocked ? (
                  <Unlock className="w-5 h-5 text-emerald-500 animate-[unlock_0.5s_ease-in-out]" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
                <div>
                  <h3 className="font-medium mb-1">Hint {index + 1}</h3>
                  {isUnlocked ? (
                    <p className="text-sm text-gray-400">{hint.hint}</p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Unlock this hint for {cost} points
                    </p>
                  )}
                </div>
              </div>
              {!isUnlocked && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-emerald-500/20"
                  onClick={() => unlockHint(hintId, cost)}
                  disabled={!isPreviousUnlocked} // Disable button if previous hint isn't unlocked
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Unlock
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
