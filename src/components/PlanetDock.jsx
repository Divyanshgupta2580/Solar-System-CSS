import React from 'react';
import { CELESTIAL_BODIES } from '../data/planetsData';
import { soundEngine } from '../utils/audio';

export default function PlanetDock({ selectedPlanet, onSelectPlanet }) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 max-w-[95vw] md:max-w-4xl px-3 py-2 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-1.5 overflow-x-auto no-scrollbar">
      {CELESTIAL_BODIES.map((body) => {
        const isSelected = selectedPlanet?.id === body.id;
        return (
          <button
            key={body.id}
            onClick={() => {
              soundEngine.playPlanetChime(body.audioFreq || 220);
              onSelectPlanet(body);
            }}
            className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-xl transition-all duration-200 shrink-0 group relative ${
              isSelected
                ? 'bg-white/15 scale-105 shadow-inner'
                : 'hover:bg-white/5 opacity-75 hover:opacity-100'
            }`}
            title={`Inspect ${body.name} (${body.type})`}
          >
            {/* Visual avatar circle */}
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div
                className="w-5 h-5 rounded-full transition-transform group-hover:scale-110 shadow-sm"
                style={{
                  background: body.cssVisual.background,
                  boxShadow: isSelected ? `0 0 10px ${body.color}` : 'none'
                }}
              />
              {body.hasRings && body.id === 'saturn' && (
                <div
                  className="absolute w-8 h-2 rounded-full border border-amber-300/60 pointer-events-none"
                  style={{ transform: 'rotate(-25deg)' }}
                />
              )}
            </div>

            {/* Planet Name */}
            <span
              className={`text-[11px] font-medium tracking-tight whitespace-nowrap transition-colors ${
                isSelected ? 'text-white font-bold' : 'text-slate-300 group-hover:text-white'
              }`}
            >
              {body.name}
            </span>

            {/* Active Indicator Pip */}
            {isSelected && (
              <span
                className="w-1.5 h-1.5 rounded-full absolute -bottom-1"
                style={{ backgroundColor: body.color }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
