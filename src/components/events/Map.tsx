import { useEffect, useRef, useState } from "react";
import L, { LatLngExpression, LatLngTuple, Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
    posix: LatLngExpression | LatLngTuple;
    zoom?: number;
    customLocation?: LatLngTuple; // Optional custom location
    bounds?: { north: number; south: number; east: number; west: number }; // Bounds for restricting area
    onLocationSelect: (coordinates: LatLngTuple) => void; // Callback to send coordinates back to the parent
}

const Map = ({ posix, zoom = 19, customLocation, bounds, onLocationSelect }: MapProps) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<LeafletMap | null>(null);
    const markerRef = useRef<LeafletMarker | null>(null);

    useEffect(() => {
        if (mapContainerRef.current && !mapInstanceRef.current) {
            // Initialize map
            const initializedMap = L.map(mapContainerRef.current, {
                attributionControl: false,
                center: posix,
                zoom: zoom,
            });

            // Add tile layer
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(initializedMap);

            // Add initial marker at specified position
            L.marker(posix).addTo(initializedMap).bindPopup("Hey! I study here");

            // Add custom marker if customLocation is provided
            if (customLocation) {
                L.marker(customLocation)
                    .addTo(initializedMap)
                    .bindPopup("Custom Location")
                    .openPopup();
            }

            // Restrict map view to bounds if provided
            if (bounds) {
                const maxBounds = L.latLngBounds(
                    [bounds.south, bounds.west],
                    [bounds.north, bounds.east]
                );
                initializedMap.setMaxBounds(maxBounds);
                initializedMap.on("drag", () => {
                    initializedMap.panInsideBounds(maxBounds, { animate: false });
                });
            }

            // Click event to get coordinates and move marker
            initializedMap.on("click", (e) => {
                const { lat, lng } = e.latlng;
                const clickedCoordinates: LatLngTuple = [lat, lng];

                // Move existing marker or create a new one
                if (!markerRef.current) {
                    markerRef.current = L.marker(clickedCoordinates).addTo(initializedMap);
                } else {
                    markerRef.current.setLatLng(clickedCoordinates);
                }

                // Call the parent callback with the clicked coordinates
                onLocationSelect(clickedCoordinates);

                console.log("Clicked Coordinates:", lat, lng);
            });

            // Store the map instance
            mapInstanceRef.current = initializedMap;
        }

        // Cleanup on unmount
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [posix, zoom, customLocation, bounds, onLocationSelect]);

    return (
        <div>
            <div
                ref={mapContainerRef}
                style={{ width: "100%", height: "100vh", padding: 0, margin: 0 }}
            />
        </div>
    );
};

export default Map;
