"use client";
// Import React if using JSX directly or when necessary in TypeScript
import React from "react";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { MapPin, Trophy, Upload, Clock, Users, Lock, Unlock, CheckCircle2, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PuzzleProgress } from "@/components/puzzle/PuzzleProgress";
import { PuzzleHints } from "@/components/puzzle/PuzzleHints";
import { LocationSharing } from "@/components/puzzle/LocationSharing";
import { useHunt } from "../context/huntContext";
import { AuthContext } from "../context/AuthContext";

const formSchema = z.object({
  location: z.tuple([z.number(), z.number()]),
  photo: z.any().optional(),
});

const PuzzlePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [huntStartTime, setHuntStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [hintsOpened, setHintsOpened] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLeaderboardUpdated, setIsLeaderboardUpdated] = useState(false);
  
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not available.");
  }
  
  const { user } = authContext;
  const { participationData } = useHunt();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: [0, 0],
    }
  });

  const endTime = participationData.data.puzzles.endTime;

  function calculateTimeRemaining(endTime) {
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    const timeLeft = end - now;

    if (timeLeft <= 0) {
      return "Time's up!";
    }

    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s remaining`;
  }
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(endTime));
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [endTime]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
      toast({
        title: "Photo Selected",
        description: `Selected file: ${file.name}`,
      });
    }
  };

  async function fetchLeaderboard() {
    try {
      const response = await fetch(`http://localhost:5217/api/v1/leaderboard/${participationData.data.huntId}`);
      if (!response.ok) throw new Error("Failed to fetch leaderboard");
      const data = await response.json();
      setLeaderboard(data);
      setIsLeaderboardUpdated(false); // Reset flag after leaderboard is updated
    } catch (error) {
      console.error(error);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    if (!user?._id || !participationData?.data?.huntId) {
      toast({
        title: "Error",
        description: "Missing user or hunt information",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const currentTime = Date.now();
    const timeTaken = huntStartTime ? Math.floor((currentTime - huntStartTime) / 1000) : 0;

    try {
      const formData = new FormData();
      
      // Add all required fields
      formData.append("huntId", participationData.data.huntId);
      formData.append("userId", user._id);
      formData.append("puzzleId", participationData.data.puzzles.puzzles[currentPuzzle]._id);
      formData.append("guessedLocation", JSON.stringify({ coordinates: values.location }));
      formData.append("timeTaken", timeTaken.toString());
      formData.append("hintsOpened", hintsOpened.toString());

      // Add photo if exists
      if (participationData.data.puzzles.puzzles[currentPuzzle].photoReq && photo) {
        formData.append("image", photo);
      }
      const response = await fetch("http://localhost:5217/api/v1/submitGuess", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit answer");
      }

      const result = await response.json();
      
      toast({
        title: "Success!",
        description: result.message || "Answer submitted successfully",
      });

      // Move to next puzzle if submission was successful
      if (currentPuzzle < participationData.data.puzzles.puzzles.length - 1) {
        setCurrentPuzzle(prev => prev + 1);
      }
      setIsLeaderboardUpdated(true);
      // Reset form and photo
      form.reset();
      setPhoto(null);
      setHintsOpened(0);

    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit answer",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (isLeaderboardUpdated) {
      fetchLeaderboard(); // Fetch leaderboard after a successful submission
    }
  }, [isLeaderboardUpdated]);

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=2000&h=1000&blur=50')] mix-blend-overlay opacity-5 bg-cover bg-center" />
      
      <div className="relative max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text">
              {participationData.data.puzzles.name}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {participationData.data.puzzles.description}
            </p>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                <span>{timeRemaining}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-500" />
                <span>{participationData.data.participantsCount} hunters active</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <PuzzleProgress currentPuzzle={currentPuzzle + 1} totalPuzzles={participationData.data.puzzles.puzzles.length} />

          {/* Main Content */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Puzzle Section */}
            <div className="md:col-span-2">
              <Card className="glass-card p-6">
                <Tabs defaultValue="description">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="hints">Hints</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description">
                    <div className="text-emerald">
                      <p>{participationData.data.puzzles.puzzles[currentPuzzle].description}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="hints">
                    <PuzzleHints hints={participationData.data.puzzles.puzzles[currentPuzzle].hints} onHintUsed={() => setHintsOpened(prev => prev + 1)} />
                  </TabsContent>
                </Tabs>
              </Card>
              <LocationSharing form={form} />

              {participationData.data.puzzles.puzzles[currentPuzzle].photoReq && (
                <Button variant="outline" onClick={() => document.getElementById("photoUpload").click()} disabled={isSubmitting}>
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Photo
                </Button>
              )}
              <input type="file" id="photoUpload" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </div>

            {/* Leaderboard */}
            <div>
              <Card className="glass-card p-6 space-y-4">
                <h2 className="text-2xl font-bold text-emerald-600">Leaderboard</h2>
                <ul className="space-y-2">
                  {leaderboard.map((entry, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{entry.name}</span>
                      <span>{entry.score}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzlePage;
