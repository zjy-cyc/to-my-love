import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { MapPin, ChevronUp } from 'lucide-react';
import { MEMORY_LOCATIONS } from '../constants';
import { SectionProps } from '../types';

// Fix for default Leaflet marker icons
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Fix for TypeScript errors with framer-motion props
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const MapSection: React.FC<SectionProps> = ({ onPrev }) => {
  const centerPosition: [number, number] = [25.36, 111.5]; 

  return (
    <section className="h-full w-full relative flex flex-col bg-stone-50 overflow-hidden">
      {/* Top Navigation & Header Bar */}
      <div className="absolute top-0 left-0 w-full z-[2000] p-4 flex flex-col items-center bg-gradient-to-b from-white/90 via-white/60 to-transparent backdrop-blur-[2px]">
        <MotionButton
          onClick={onPrev}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-2 p-1.5 bg-rose-50 hover:bg-rose-100 rounded-full text-rose-400 cursor-pointer transition-all border border-rose-100 shadow-sm"
        >
          <ChevronUp size={18} />
        </MotionButton>
        
        <MotionDiv 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
        >
            <h2 className="font-serif-display text-2xl text-stone-800 tracking-tight">Our Footprints</h2>
            <p className="text-[10px] uppercase tracking-widest text-stone-500 font-medium">The places we call ours</p>
        </MotionDiv>
      </div>

      <div className="flex-grow w-full h-full relative z-0">
         <MapContainer 
            center={centerPosition} 
            zoom={4} 
            scrollWheelZoom={false} 
            style={{ height: "100%", width: "100%" }}
            className="z-0"
         >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            {MEMORY_LOCATIONS.map((loc) => (
                <Marker key={loc.id} position={loc.position}>
                <Popup className="font-sans text-sm">
                    <strong className="block text-rose-500 font-semibold mb-1">{loc.title}</strong>
                    {loc.description}
                </Popup>
                </Marker>
            ))}
        </MapContainer>
      </div>
      
      {/* Bottom Floating Legend */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-stone-100 flex items-center gap-4 whitespace-nowrap">
        <div className="flex items-center gap-2 text-rose-500">
            <MapPin size={16} />
            <span className="font-bold text-[10px] uppercase tracking-widest">Memories</span>
        </div>
        <div className="h-4 w-px bg-stone-200"></div>
        <p className="text-[10px] text-stone-600 font-medium uppercase tracking-tight">
            Beijing • Hong Kong • Ho Chi Minh City
        </p>
      </div>
    </section>
  );
};

export default MapSection;