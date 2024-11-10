import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, ChevronRight, Trophy } from "lucide-react";
import { format, isValid } from "date-fns";
import { cn } from "@/lib/utils";

type Hunt = {
  id: number;
  name: string;
  participants: Array;
  status: "active" | "completed";
  startDate: string;
  endDate: string;
  totalPuzzles: number;
  completedPuzzles: number;
};

type HuntCardProps = {
  hunt: Hunt;
  onClick: () => void;
};

export function HuntCard({ hunt, onClick }: HuntCardProps) {
  const progress = (hunt.completedPuzzles / hunt.totalPuzzles) * 100;

  const startDate = new Date(hunt.endTime);
  console.log(startDate)
  const formattedStartDate = isValid(startDate) ? format(startDate, 'MMM d, h:mm a') : "Invalid date";
console.log(formattedStartDate)
  return (
    <Card 
      className="glass-card overflow-hidden group hover:border-emerald-500/30 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">{hunt.name}</h3>
            <Badge
              variant="outline"
              className={cn(
                "border",
                hunt.status === "active" 
                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                  : "bg-gray-500/10 text-gray-500 border-gray-500/20"
              )}
            >
              {hunt.status=="active"? "Active": "Upcoming"}
            </Badge>
          </div>
          <ChevronRight className="w-5 h-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{formattedStartDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Users className="w-4 h-4" />
            <span>{hunt.participants.length} participants</span>
          </div>
        </div>

        
      </div>
    </Card>
  );
}
