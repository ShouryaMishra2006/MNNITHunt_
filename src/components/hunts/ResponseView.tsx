import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Image as ImageIcon, CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const MOCK_RESPONSES = [

  {
    id: 2,
    type: "image",
    puzzleNumber: 2,
    timestamp: "2024-03-20T10:30:00",
    content: "https://images.unsplash.com/photo-1519669417670-68775a50919c",
    status: "approved"
  },
  
  {
    id: 2,
    type: "image",
    puzzleNumber: 2,
    timestamp: "2024-03-20T10:30:00",
    content: "https://images.unsplash.com/photo-1519669417670-68775a50919c",
    status: "pending"
  },
];

type ResponseViewProps = {
  participantId: number;
  onApprove: (responseId: number) => void;
  onReject: (responseId: number) => void;
};

export function ResponseView({ 
  participantId,
  onApprove,
  onReject
}: ResponseViewProps) {
  const [loading, setLoading] = useState<number | null>(null);

  const handleAction = async (responseId: number, action: "approve" | "reject") => {
    setLoading(responseId);
    try {
      if (action === "approve") {
        await onApprove(responseId);
      } else {
        await onReject(responseId);
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {MOCK_RESPONSES.map((response) => (
          <Card
            key={response.id}
            className={cn(
              "p-4 glass-card",
              response.status === "approved" && "bg-emerald-500/10 border-emerald-500/30",
              response.status === "rejected" && "bg-red-500/10 border-red-500/30"
            )}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {response.type === "location" ? (
                      <MapPin className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-emerald-500" />
                    )}
                    <span className="font-medium">
                      Puzzle {response.puzzleNumber} Response
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(response.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "border",
                    response.status === "approved" && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                    response.status === "rejected" && "bg-red-500/10 text-red-500 border-red-500/20",
                    response.status === "pending" && "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                  )}
                >
                  {response.status.charAt(0).toUpperCase() + response.status.slice(1)}
                </Badge>
              </div>

              {response.type === "image" ? (
                <div className="aspect-video rounded-lg bg-gray-900/50 border border-emerald-500/20 relative overflow-hidden">
                 <img
                    src={response.content}
                    alt={`Puzzle ${response.puzzleNumber} response`}
                    className="w-full h-full object-cover"
                  />
              
                </div>
              ) : (
                <div className="aspect-video rounded-lg overflow-hidden">
                  No response yet
                </div>
              )}

              {response.status === "pending" && (
                <div className="flex items-center gap-2">
                  <Button
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500"
                    onClick={() => handleAction(response.id, "approve")}
                    disabled={loading === response.id}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-red-500/20 text-red-500 hover:bg-red-500/10"
                    onClick={() => handleAction(response.id, "reject")}
                    disabled={loading === response.id}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}