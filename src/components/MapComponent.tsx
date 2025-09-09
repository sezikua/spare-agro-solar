'use client';

import { useEffect, useRef } from 'react';

// Declare Google Maps types
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
    initMap?: () => void;
  }
}

interface Location {
  title: string;
  address: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  className?: string;
}

export default function MapComponent({ className = '' }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 6,
        center: { lat: 49.0, lng: 32.0 },
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      const locations: Location[] = [
        { 
          title: "Дилерський центр, Київська область", 
          address: "смт Глеваха, вул. Сулими, 11", 
          lat: 50.24298, 
          lng: 30.27668 
        },
        { 
          title: "Дилерський центр, Сумська область", 
          address: "вул. Київська 50, с. Сад, Сумський район, Сумська область", 
          lat: 50.871772, 
          lng: 34.725595 
        },
        { 
          title: "Дилерський центр, Чернігівська область", 
          address: "м. Ніжин, вул. Березанська, 159а", 
          lat: 51.064299, 
          lng: 31.906310 
        }
      ];

      const infoWindow = new window.google.maps.InfoWindow();

      locations.forEach(loc => {
        const marker = new window.google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map,
          title: loc.title,
          icon: {
            url: "/map/tyre.png",
            scaledSize: new window.google.maps.Size(40, 40)
          }
        });

        marker.addListener("click", () => {
          const html = `
            <div style="min-width:220px;line-height:1.4;padding:8px;">
              <strong style="color: #008E4E; font-size: 16px;">${loc.title}</strong><br/>
              <span style="color: #666; font-size: 14px;">${loc.address}</span>
            </div>
          `;
          infoWindow.setContent(html);
          infoWindow.open(map, marker);
        });
      });
    };

    // Load Google Maps API if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAUn4F7L4VQRajB9vFQyVSbfGOyAOKXn4w&callback=initMap';
      script.async = true;
      script.defer = true;
      
      // Set global callback
      window.initMap = initMap;
      
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      // Cleanup
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <div 
        ref={mapRef} 
        className="w-full h-[500px] rounded-lg shadow-lg border border-gray-200"
        style={{ minHeight: '500px' }}
      />
    </div>
  );
}

