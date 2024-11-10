"use client";

import { useState, useEffect, useContext } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, CheckCircle2 } from "lucide-react";
import { HuntCard } from "@/components/hunts/HuntCard";
import { ParticipantList } from "@/components/hunts/ParticipantList";
import { ResponseView } from "@/components/hunts/ResponseView";
import { HuntLeaderboard } from "@/components/hunts/HuntLeaderboard";
import { AuthContext } from '@/app/context/AuthContext';

export default function MyHuntsPage() {
  const [hunts, setHunts] = useState([]);
  const [selectedHunt, setSelectedHunt] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const { toast } = useToast();

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  useEffect(() => {
    async function fetchHunts() {
      if (!user || !user._id) {
        toast({
          title: "Error",
          description: "User data not available.",
          variant: "destructive",
        });
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/yourHunts/${user._id}`);
        if (!response.ok) throw new Error("Failed to fetch hunts");
       
        const data = await response.json();
        console.log(data)
        if (data.statusCode === 200) {
          setHunts(data.data);
        } else {
          toast({
            title: "No Hunts Found",
            description: data.message || "No hunts were found for this user.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while fetching hunts.",
          variant: "destructive",
        });
        console.error("Error fetching hunts:", error);
      }
    }
  
    fetchHunts();
  }, [user]); 
  useEffect(() => {
    async function fetchParticipants() {
      if (!selectedHunt) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/getParticipants/${selectedHunt}`);
        if (!response.ok) throw new Error("Failed to fetch participants");

        const data = await response.json();
        if (data.statusCode === 200) {
          setParticipants(data.data);
        } else {
          toast({
            title: "No Participants Found",
            description: data.message || "No participants were found for this hunt.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while fetching participants.",
          variant: "destructive",
        });
        console.error("Error fetching participants:", error);
      }
    }

    fetchParticipants();
  }, [selectedHunt,user]);

  const handleResponseApproval = async (responseId, approved) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: approved ? "Response Approved" : "Response Rejected",
        description: `Response has been ${approved ? "approved" : "rejected"} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update response status.",
        variant: "destructive",
      });
    }
  };

  if (!selectedHunt) {
    return (
      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=2000&h=1000&blur=50')] mix-blend-overlay opacity-5 bg-cover bg-center" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text">
                My Hunts
              </h1>

            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {hunts.map((hunt) => (
                <HuntCard
                  key={hunt._id}
                  hunt={hunt}
                  onClick={() => setSelectedHunt(hunt._id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=2000&h=1000&blur=50')] mix-blend-overlay opacity-5 bg-cover bg-center" />
      
      <div className="relative max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedHunt(null);
                setSelectedParticipant(null);
                setParticipants([]);
              }}
            >
              ← Back to Hunts
            </Button>
            <h1 className="text-3xl font-bold">
              {hunts.find(h => h._id === selectedHunt)?.title}
            </h1>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Card className="glass-card">
                <Tabs defaultValue="participants">
                  <TabsList className="w-full">
                    <TabsTrigger value="participants" className="flex-1">
                      <Users className="w-4 h-4 mr-2" />
                      Participants
                    </TabsTrigger>
                    <TabsTrigger value="responses" className="flex-1">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Responses
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="participants" className="p-6">
                    <ParticipantList
                      participants={participants}
                      onParticipantSelect={setSelectedParticipant}
                      selectedParticipantId={selectedParticipant}
                    />
                  </TabsContent>
                  
                  <TabsContent value="responses" className="p-6">
                    {selectedParticipant ? (
                      <ResponseView
                        participantId={selectedParticipant}
                        onApprove={(responseId) => handleResponseApproval(responseId, true)}
                        onReject={(responseId) => handleResponseApproval(responseId, false)}
                      />
                    ) : (
                      <div className="text-center py-12">
                        <Users className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                        <p className="text-lg font-medium">Select a participant to view their responses</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </Card>
            </div>

            <div className="space-y-6">
              <HuntLeaderboard huntId={selectedHunt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
