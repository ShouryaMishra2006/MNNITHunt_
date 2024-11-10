"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Share2, Copy, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function LocationSharing() {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleGetLocation = () => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
        setIsLoading(false);
        toast({
          title: "Location Retrieved",
          description: "Your current location has been successfully captured.",
        });
      },
      (error) => {
        toast({
          title: "Error",
          description: getGeolocationErrorMessage(error),
          variant: "destructive",
        });
        setIsLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const getGeolocationErrorMessage = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "Location permission was denied. Please enable location access.";
      case error.POSITION_UNAVAILABLE:
        return "Location information is unavailable.";
      case error.TIMEOUT:
        return "Location request timed out.";
      default:
        return "An unknown error occurred.";
    }
  };

  const handleCopyLocation = () => {
    if (!location) return;

    const locationString = `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
    navigator.clipboard.writeText(locationString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);

    toast({
      title: "Copied!",
      description: "Location coordinates copied to clipboard",
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <MapPin className="w-12 h-12 mx-auto text-emerald-500" />
        <h3 className="text-lg font-semibold">Share Your Location</h3>
        <p className="text-sm text-gray-400">
          Share your current location to verify you're at the right spot
        </p>
      </div>

      {!location ? (
        <Button
          onClick={handleGetLocation}
          className={cn(
            "w-full bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500",
            isLoading && "animate-pulse"
          )}
          disabled={isLoading}
        >
          <MapPin className="w-4 h-4 mr-2" />
          {isLoading ? "Getting Location..." : "Get Current Location"}
        </Button>
      ) : (
        <Card className="p-4 bg-emerald-500/10 border-emerald-500/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="font-medium">Location Captured</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-500/20"
                onClick={handleCopyLocation}
              >
                {isCopied ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Latitude</span>
                <p className="font-mono">{location.latitude.toFixed(6)}°</p>
              </div>
              <div>
                <span className="text-gray-400">Longitude</span>
                <p className="font-mono">{location.longitude.toFixed(6)}°</p>
              </div>
              {location.accuracy && (
                <div className="col-span-2">
                  <span className="text-gray-400">Accuracy</span>
                  <p className="font-mono">±{Math.round(location.accuracy)}m</p>
                </div>
              )}
            </div>

            <Button
              onClick={handleGetLocation}
              variant="outline"
              className="w-full border-emerald-500/20"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Update Location
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
