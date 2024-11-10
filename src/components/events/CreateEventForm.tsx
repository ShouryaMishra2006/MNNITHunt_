"use client"
import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { Calendar, Clock, Lightbulb, PlusCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import axios from 'axios';
import { AuthContext } from '@/app/context/AuthContext';
import dynamic from 'next/dynamic';
import { useToast } from "@/hooks/use-toast";
type Puzzle = {
  puzzleText: string;
  hints: string[];
  location: { coordinates: [number, number] } | null;
  photoReq: boolean;
};

export default function CreateEventForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [puzzles, setPuzzles] = useState<Puzzle[]>([{
    puzzleText: '',
    hints: ['', ''],
    location: null,
    photoReq: false,
  }]);
const toast = useToast()
  const Map = useMemo(() => dynamic(
    () => import('./Map'),
    { 
      loading: () => <p>Loading Map...</p>,
      ssr: false
    }
  ), []);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is not available.");
  }

  const { user, setUser } = authContext;

  useEffect(() => {
    if (user) {
      console.log("User data:", user);
    } else {
      console.log("User is not logged in");
    }
  }, [user]);



  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !description.trim() || !startTime || !endTime || !difficulty) {
      alert("Please fill in all required fields.");
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      alert("Start time must be before end time.");
      return;
    }
    const formattedPuzzles = puzzles.map((puzzle) => ({
      ...puzzle,
      hints: puzzle.hints.map((hint) => ({ hint })),
  }));

    const huntData = {
      name,
      description,
      puzzles: formattedPuzzles,
      startTime,
      endTime,
      createdBy: user?._id || "UnknownUser",
      level: difficulty,
    };

    try {
      const response = await axios.post('http://localhost:5217/api/v1/createHunt', huntData);
      console.log("Hunt created successfully", response.data);
      if(response.ok){
        toast({
          title: "New Hunt created",
          description: "Refresh to add it to the page",
        });
      }
    } catch (error) {
      console.error("Error creating hunt:", error);
      alert("There was an error creating the hunt. Please try again.");
    }
  }, [name, description, startTime, endTime, difficulty, puzzles, user?.id]);

  const addPuzzle = useCallback(() => {
    setPuzzles([...puzzles, {
      puzzleText: '',
      hints: ['', ''],
      location: null,
      photoReq: false,
    }]);
  }, [puzzles]);

  const updatePuzzle = useCallback((index: number, field: keyof Puzzle, value: any) => {
    setPuzzles((prevPuzzles) => {
      const updatedPuzzles = [...prevPuzzles];
      updatedPuzzles[index] = { ...updatedPuzzles[index], [field]: value };
      return updatedPuzzles;
    });
  }, []);

  const updateHint = useCallback((puzzleIndex: number, hintIndex: number, value: string) => {
    setPuzzles((prevPuzzles) => {
      const updatedPuzzles = [...prevPuzzles];
      updatedPuzzles[puzzleIndex].hints[hintIndex] = value;
      return updatedPuzzles;
    });
  }, []);

  // Handle location update from the map
  const handleLocationSelect = useCallback((puzzleIndex: number, coordinates: [number, number]) => {
    updatePuzzle(puzzleIndex, 'location', { coordinates });
  }, [updatePuzzle]);

  const position = useMemo(() => [40.7128, -74.006], []); // Example coordinates for NYC
  const zoom = useMemo(() => 13, []);

  const boundsConstraint = {
    north: 25.496979684903667,
    south: 25.489079078157516,
    east:  81.86999098996981,
    west:  81.86005752776079
  };

  return (
    <div className="glass-card p-6 sticky top-6">
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="w-7 h-7 text-emerald-500" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text">
          Create Hunt
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          placeholder="Hunt Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-background/50 border-emerald-500/20"
          required
        />

        <Textarea
          placeholder="Hunt Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-background/50 border-emerald-500/20 min-h-[100px]"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="bg-background/50 border-emerald-500/20"
            required
          />
          <Input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="bg-background/50 border-emerald-500/20"
            required
          />
        </div>

        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger className="bg-background/50 border-emerald-500/20">
            <SelectValue placeholder="Select Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        {puzzles.map((puzzle, puzzleIndex) => (
          <div key={puzzleIndex} className="p-4 border border-emerald-500/20 rounded-lg space-y-4">
            <h3 className="font-semibold text-emerald-400">Puzzle #{puzzleIndex + 1}</h3>
            <Textarea
              placeholder="Puzzle Text"
              value={puzzle.puzzleText}
              onChange={(e) => updatePuzzle(puzzleIndex, 'puzzleText', e.target.value)}
              className="bg-background/50 border-emerald-500/20"
              required
            />
            {puzzle.hints.map((hint, hintIndex) => (
              <Input
                key={hintIndex}
                placeholder={`Hint ${hintIndex + 1}`}
                value={hint}
                onChange={(e) => updateHint(puzzleIndex, hintIndex, e.target.value)}
                className="bg-background/50 border-emerald-500/20"
                required
              />
            ))}
            <div className="bg-white-700 mx-auto my-5 w-[100%] h-[20%]">
              <Map
                posix={[25.493620009925067, 81.8628369732815]} // Default position
                bounds={boundsConstraint}
                onLocationSelect={(coordinates) => handleLocationSelect(puzzleIndex, coordinates)} // Pass the index and coordinates
              />
            </div>
            {puzzle.location && puzzle.location.coordinates && (
              <p className="text-sm text-emerald-400">
                Selected: {puzzle.location.coordinates[0].toFixed(4)}, {puzzle.location.coordinates[1].toFixed(4)}
              </p>
            )}
            <div className="flex items-center">
              <span className="text-sm text-emerald-400 mr-2">Image Required</span>
              <Switch
                checked={puzzle.photoReq}
                onCheckedChange={(checked) => updatePuzzle(puzzleIndex, 'photoReq', checked)}
                className="bg-background/50 border-emerald-500/20"
              />
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" className="w-full border-emerald-500/20" onClick={addPuzzle}>
          <PlusCircle className="w-4 h-4 mr-2" /> Add Puzzle
        </Button>

        <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500">
          Create Hunt
        </Button>
      </form>
    </div>
  );
}