import React, { useState } from 'react';
import { CELESTIAL_BODIES } from '../data/planetsData';
import { soundEngine } from '../utils/audio';

export default function ComparisonModal({ initialPlanetA, onClose }) {
  const [planetAId, setPlanetAId] = useState(initialPlanetA?.id || 'earth');
  const [planetBId, setPlanetBId] = useState(
    initialPlanetA?.id === 'mars' ? 'earth' : 'mars'
  );

  const planetA = CELESTIAL_BODIES.find((p) => p.id === planetAId) || CELESTIAL_BODIES[3];
  const planetB = CELESTIAL_BODIES.find((p) => p.id === planetBId) || CELESTIAL_BODIES[4];

  // Weight calculation for 70kg person
  const getWeightOnPlanet = (gravityStr) => {
    const match = gravityStr.match(/\(([\d.]+)g\)/);
    if (match) {
      const g = parseFloat(match[1]);
      return `${Math.round(70 * g)} kg`;
    }
    return 'N/A';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-950/90 border border-white/15 shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              ⚖️
            </div>
            <div>
              <h2 className="text-xl font-bold font-cinzel text-white">
                Celestial Comparison
              </h2>
              <p className="text-xs text-slate-400">
                Compare scale, atmospheric characteristics, and physics side-by-side
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Planet Selectors Bar */}
        <div className="grid grid-cols-2 gap-4 p-6 bg-white/[0.02] border-b border-white/10">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Planet 1
            </label>
            <select
              value={planetAId}
              onChange={(e) => {
                soundEngine.playClick();
                setPlanetAId(e.target.value);
              }}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm font-medium focus:outline-none focus:border-sky-500"
            >
              {CELESTIAL_BODIES.map((body) => (
                <option key={body.id} value={body.id}>
                  {body.name} ({body.type})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Planet 2
            </label>
            <select
              value={planetBId}
              onChange={(e) => {
                soundEngine.playClick();
                setPlanetBId(e.target.value);
              }}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm font-medium focus:outline-none focus:border-sky-500"
            >
              {CELESTIAL_BODIES.map((body) => (
                <option key={body.id} value={body.id}>
                  {body.name} ({body.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Visual Scale Comparison Stage */}
        <div className="p-6 border-b border-white/10 flex items-center justify-around bg-gradient-to-b from-transparent to-slate-900/40">
          {/* Planet A Visual */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-28 flex items-center justify-center">
              <div
                className="rounded-full shadow-lg transition-all duration-300 relative"
                style={{
                  width: `${Math.min(100, Math.max(20, planetA.displaySize * 2))}px`,
                  height: `${Math.min(100, Math.max(20, planetA.displaySize * 2))}px`,
                  background: planetA.cssVisual.background,
                  boxShadow: planetA.cssVisual.boxShadow
                }}
              >
                {planetA.hasRings && planetA.id === 'saturn' && (
                  <div className="saturn-rings-preview" />
                )}
              </div>
            </div>
            <span className="font-bold text-white text-base">{planetA.name}</span>
            <span className="text-xs text-slate-400">{planetA.sizeKm}</span>
          </div>

          <div className="text-slate-600 font-cinzel text-xl font-bold">VS</div>

          {/* Planet B Visual */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-28 flex items-center justify-center">
              <div
                className="rounded-full shadow-lg transition-all duration-300 relative"
                style={{
                  width: `${Math.min(100, Math.max(20, planetB.displaySize * 2))}px`,
                  height: `${Math.min(100, Math.max(20, planetB.displaySize * 2))}px`,
                  background: planetB.cssVisual.background,
                  boxShadow: planetB.cssVisual.boxShadow
                }}
              >
                {planetB.hasRings && planetB.id === 'saturn' && (
                  <div className="saturn-rings-preview" />
                )}
              </div>
            </div>
            <span className="font-bold text-white text-base">{planetB.name}</span>
            <span className="text-xs text-slate-400">{planetB.sizeKm}</span>
          </div>
        </div>

        {/* Comparative Matrix Table */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar text-xs">
          {[
            { label: 'Classification', valA: planetA.type, valB: planetB.type },
            { label: 'Distance from Sun', valA: `${planetA.distanceAu} (${planetA.distanceKm})`, valB: `${planetB.distanceAu} (${planetB.distanceKm})` },
            { label: 'Orbital Period', valA: planetA.orbitPeriodDays ? `${planetA.orbitPeriodDays} days` : '0 days', valB: planetB.orbitPeriodDays ? `${planetB.orbitPeriodDays} days` : '0 days' },
            { label: 'Day Length', valA: planetA.rotationHours, valB: planetB.rotationHours },
            { label: 'Temperature', valA: planetA.temperature, valB: planetB.temperature },
            { label: 'Surface Gravity', valA: planetA.gravity, valB: planetB.gravity },
            { label: 'Weight of 70kg Person', valA: getWeightOnPlanet(planetA.gravity), valB: getWeightOnPlanet(planetB.gravity) },
            { label: 'Moons Count', valA: `${planetA.moonsCount} moons`, valB: `${planetB.moonsCount} moons` }
          ].map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 items-center"
            >
              <div className="text-slate-400 font-medium">{row.label}</div>
              <div className="text-slate-200 font-semibold">{row.valA}</div>
              <div className="text-slate-200 font-semibold">{row.valB}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white text-slate-900 font-semibold text-xs hover:bg-slate-200 transition-all shadow-md"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
