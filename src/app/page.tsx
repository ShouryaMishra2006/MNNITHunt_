import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPinned, Compass, Trophy, Map } from "lucide-react";
import  Navbar  from "@/components/ui/Navbar";
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=2000&h=1000&blur=50')] mix-blend-overlay opacity-5 bg-cover bg-center" />
      <div className="relative">
      <Navbar/>
    

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <div className="inline-block animate-glow rounded-full p-2 mb-4">
              <Map className="w-16 h-16 text-emerald-500" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold">
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text">
                Campus Adventure
              </span>
              <br />
              <span className="text-white">
                Awaits You
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium">
              Explore MNNIT like never before. Solve riddles, find hidden spots, and compete with fellow students.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button asChild size="lg" className="text-lg bg-emerald-600 hover:bg-emerald-500 text-white button-glow">
                <Link href="/signup">Start Your Hunt</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
                <Link href="/login">Continue Hunt</Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="glass-card rounded-xl p-8 text-center space-y-4 transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <MapPinned className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Campus Explorer</h3>
              <p className="text-gray-400">Discover hidden spots and secret locations across MNNIT campus.</p>
            </div>

            <div className="glass-card rounded-xl p-8 text-center space-y-4 transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <Compass className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Solve Riddles</h3>
              <p className="text-gray-400">Challenge yourself with creative puzzles about MNNIT history and culture.</p>
            </div>

            <div className="glass-card rounded-xl p-8 text-center space-y-4 transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Win Rewards</h3>
              <p className="text-gray-400">Compete with other students and earn exclusive MNNIT merchandise.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}