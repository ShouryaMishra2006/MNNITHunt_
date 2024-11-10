import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Puzzle, Radio } from "lucide-react"; // Use Puzzle icon
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { useHunt } from "@/app/context/huntContext";
type Event = {
  id: string; // Assuming _id from backend as string
  name: string; // title -> name
  description: string;
  startTime: string;
  endTime: string;
  participants: Array<any>; // Backend includes participants as an array
  puzzles: Array<any>; // Puzzles array from the backend
  level: string; // difficulty -> level
  status: "live" | "upcoming"; // same as backend status
  huntId: string; // Assuming huntId is provided in the backend
  totalPuzzles: Number
};

type EventCardProps = {
  event: Event;
};





export function EventCard({ event }: EventCardProps) {
  const authContext = useContext(AuthContext);
  const { setParticipationData } = useHunt();

if (!authContext) {
  throw new Error("AuthContext is not available.");
}

const { user, setUser } = authContext;
  console.log(event);

  const handleJoinNow = async () => {
    try {
      const response = await fetch(`http://localhost:5217/api/v1/participate/${event?.id}`, {
        method: "POST", // Assuming a POST request for joining
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ participant: user?._id, user }), // Add any required data here
      });
      const joinData = await response.json();
      console.log("Joined event successfully:", joinData);
      setParticipationData(joinData);
      // Optionally, update the state or navigate based on the response
    } catch (error) {
      console.error("Failed to join event:", error);
    }
  };

  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const isLive = event.status === "live";

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "hard":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <Card className="glass-card overflow-hidden group hover:border-emerald-500/30 transition-colors">
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`${getDifficultyColor(event.level)} border`}>
                {event.level}
              </Badge>
              {isLive && (
                <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 animate-pulse">
                  <Radio className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              )}
            </div>
          </div>
          <p className="text-gray-400 text-sm line-clamp-2">{event.description}</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{format(startDate, "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span>
              {format(startDate, "h:mm a")} - {format(endDate, "h:mm a")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>MNNIT Campus</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-emerald-500/10">
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-emerald-500" />
              <span>{event.participants.length} joined</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Puzzle className="w-4 h-4 text-emerald-500" />
              <span>{event.totalPuzzles} puzzles</span>
            </div>
          </div>

          {isLive && (
            <Button
            onClick={handleJoinNow}
              asChild
              className={cn("transition-all duration-300", "bg-red-600 hover:bg-red-500")}
            >
              <Link href={`/puzzle?huntId=${event.id}`}>Join Now</Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
