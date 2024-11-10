import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { User2, MapPin, Image as ImageIcon, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const MOCK_PARTICIPANTS = [
  {
    id: 1,
    name: "Shourya Mishra",
    progress: 4,
    totalPuzzles: 5,
    lastActive: "2 mins ago",
    responses: 8,
    approved: 6,
  },
  {
    id: 2,
    name: "Vatsal Kumar",
    progress: 3,
    totalPuzzles: 5,
    lastActive: "15 mins ago",
    responses: 6,
    approved: 4,
  },
];

type ParticipantListProps = {
  huntId: number;
  onParticipantSelect: (id: number) => void;
  selectedParticipantId: number | null;
};

export function ParticipantList({ 
  huntId, 
  onParticipantSelect,
  selectedParticipantId 
}: ParticipantListProps) {
  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {MOCK_PARTICIPANTS.map((participant) => {
          const progress = (participant.progress / participant.totalPuzzles) * 100;
          const isSelected = participant.id === selectedParticipantId;

          return (
            <Button
              key={participant.id}
              variant="ghost"
              className={cn(
                "w-full p-4 h-auto flex items-start justify-between hover:bg-emerald-500/10",
                isSelected && "bg-emerald-500/10 border-emerald-500/30"
              )}
              onClick={() => onParticipantSelect(participant.id)}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <User2 className="w-5 h-5 text-emerald-500" />
                </div>
                
                <div className="text-left space-y-2">
                  <div>
                    <h4 className="font-medium">{participant.name}</h4>
                    <p className="text-sm text-gray-400">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {participant.lastActive}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span>{participant.responses} responses</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>{participant.approved} approved</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{participant.progress}/{participant.totalPuzzles}</span>
                    </div>
                    <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-sky-600"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
}