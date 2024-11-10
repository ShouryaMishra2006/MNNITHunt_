"use client"
import { useEffect, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import { EventCard } from "@/components/events/EventCard";
import CreateEventForm from "@/components/events/CreateEventForm";
import { format, parseISO } from "date-fns";

export default function EventsPage() {
  const [liveEvents, setLiveEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const liveResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/liveHunts`);
        if (!liveResponse.ok) throw new Error("Failed to fetch live events");
        const liveData = await liveResponse.json();
        console.log("Live Data:", liveData); // Debugging
        setLiveEvents(Array.isArray(liveData.data) ? liveData.data : []); // Ensure it's an array

        const upcomingResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/upcomingHunts`);
        if (!upcomingResponse.ok) throw new Error("Failed to fetch upcoming events");
        const upcomingData = await upcomingResponse.json();
        console.log("Upcoming Data:", upcomingData); // Debugging
        setUpcomingEvents(Array.isArray(upcomingData.data) ? upcomingData.data : []); // Ensure it's an array
      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Function to format date for display
  const formatEventTime = (dateString) => {
    const date = parseISO(dateString); // Parse the ISO date string
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const istDate = new Date(date.getTime() - istOffset);
    return format(istDate, "MMM d, yyyy h:mm a"); // Format to IST
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=2000&h=1000&blur=50')] mix-blend-overlay opacity-5 bg-cover bg-center" />
      <div className="relative">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Live Events Section */}
              <section className="glass-card p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text">
                    Live Hunts
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-sm font-medium border border-red-500/20">
                    {liveEvents.length} Active
                  </span>
                </div>
                <div className="grid gap-6">
                  {loading ? (
                    <p>Loading events...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : liveEvents.length > 0 ? (
                    liveEvents.map((event) => (
                      <EventCard key={event._id} event={{
                        id: event._id,
                        title: event.name,
                        description: event.description,
                        startTime: formatEventTime(event.startTime),
                        endTime: formatEventTime(event.endTime),
                        location: event.location || "Location not specified",
                        participants: event.participants ? event.participants.length : 0,
                        totalPuzzles: event.puzzles.length, // Check if puzzles exist
                        difficulty: event.level || "Unknown", // Provide a fallback for difficulty
                        status: "live",
                      }} />
                    ))
                  ) : (
                    <p>No live events currently available.</p>
                  )}
                </div>
              </section>

              {/* Upcoming Events Section */}
              <section className="glass-card p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-sky-600 text-transparent bg-clip-text">
                    Upcoming Hunts
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-500 text-sm font-medium border border-sky-500/20">
                    {upcomingEvents.length} Scheduled
                  </span>
                </div>
                <div className="grid gap-6">
                  {loading ? (
                    <p>Loading events...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event) => (
                      <EventCard key={event._id} event={{
                        id: event._id,
                        title: event.name,
                        description: event.description,
                        startTime: formatEventTime(event.startTime),
                        endTime: formatEventTime(event.endTime),
                        location: event.location || "Location not specified",
                        participants: event.participants ? event.participants.length : 0,
                        totalPuzzles:event.puzzles.length, // Check if puzzles exist
                        difficulty: event.level || "Unknown", // Provide a fallback for difficulty
                        status: "upcoming",
                      }} />
                    ))
                  ) : (
                    <p>No upcoming events available.</p>
                  )}
                </div>
              </section>
            </div>

            {/* Create Event Form */}
            <div className="lg:col-span-1">
              <CreateEventForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
