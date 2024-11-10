"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

type Location = {
  lat: number;
  lng: number;
};

type PuzzleMapProps = {
  onLocationSelect: (location: Location) => void;
  selectedLocation: Location | null;
};

export function PuzzleMap({ onLocationSelect, selectedLocation }: PuzzleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current || isDragging) return;

    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert pixel coordinates to lat/lng (mock conversion)
    const lat = (rect.height - y) / rect.height * 90;
    const lng = (x / rect.width * 360) - 180;

    onLocationSelect({ lat, lng });
  };

  return (
    <div
      ref={mapRef}
      className="relative aspect-video rounded-lg bg-gray-900/50 border-2 border-dashed border-emerald-500/20 overflow-hidden cursor-crosshair"
      onClick={handleMapClick}
      onMouseDown={() => setIsDragging(false)}
      onMouseMove={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
    >
      {/* Mock map grid lines */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="border border-emerald-500/10" />
        ))}
      </div>

      {selectedLocation && (
        <div 
          className="absolute animate-bounce"
          style={{
            left: `${((selectedLocation.lng + 180) / 360) * 100}%`,
            bottom: `${(selectedLocation.lat / 90) * 100}%`,
            transform: 'translate(-50%, 50%)'
          }}
        >
          <MapPin className="w-6 h-6 text-emerald-500" />
        </div>
      )}

      {!selectedLocation && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Click to mark location on map</p>
          </div>
        </div>
      )}
    </div>
  );
}