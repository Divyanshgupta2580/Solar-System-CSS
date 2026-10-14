import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';

export default function PlanetCard({ planet, onClose, onOpenCompare }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'atmosphere' | 'facts' | 'missions'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!planet) return null;

  const handlePlaySound = () => {
    soundEngine.playPlanetChime(planet.audioFreq || 220);
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 800);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full max-w-lg p-4 md:p-6 flex flex-col justify-end md:justify-center pointer-events-none">
      <div className="planet-card-glass pointer-events-auto w-full max-h-[92vh] flex flex-col overflow-hidden rounded-3xl shadow-2xl border border-white/15 bg-slate-950/85 backdrop-blur-2xl text-slate-100 transition-all duration-300 animate-slide-in">
        
        {/* Header Bar */}
        <div className="relative p-6 pb-4 border-b border-white/10 flex items-start justify-between">
          <div className="flex items-center gap-4">
            {/* 3D Mini Rotating Globe Preview */}
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg overflow-hidden shrink-0">
              <div
                className="w-14 h-14 rounded-full globe-spin-preview relative"
                style={{
                  background: planet.cssVisual.background,
                  boxShadow: planet.cssVisual.boxShadow
                }}
              >
                {planet.hasRings && planet.id === 'saturn' && (
                  <div className="saturn-rings-preview" />
                )}
                {planet.hasRings && planet.id === 'uranus' && (
                  <div className="uranus-rings-preview" />
                )}
                <div className="globe-shadow-overlay" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full border"
                  style={{
                    borderColor: `${planet.color}66`,
                    backgroundColor: `${planet.color}22`,
                    color: planet.color
                  }}
                >
                  {planet.type}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {planet.orbitRadius === 0 ? 'Solar Center' : `#${planet.orbitRadius ? Math.round(planet.orbitRadius / 50) : ''} from Sun`}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-0.5 font-cinzel">
                {planet.name}
              </h2>
              <p className="text-xs text-slate-400 line-clamp-1">{planet.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePlaySound}
              className={`p-2.5 rounded-full transition-all border border-white/10 hover:border-sky-400/50 hover:bg-white/10 ${
                isPlayingAudio ? 'bg-sky-500/30 text-sky-300 scale-105' : 'text-slate-300'
              }`}
              title="Listen to planetary resonance probe audio"
              aria-label="Play planetary audio"
            >
              🔊
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
              aria-label="Close planet card"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center px-6 pt-3 pb-2 gap-2 border-b border-white/10 overflow-x-auto no-scrollbar text-xs font-medium">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'atmosphere', label: 'Atmosphere' },
            { id: 'facts', label: 'Fun Facts' },
            { id: 'missions', label: 'Missions' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundEngine.playClick();
                setActiveTab(tab.id);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white/15 text-white font-semibold shadow-inner border border-white/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar text-sm flex-1">
          {activeTab === 'overview' && (
            <>
              {/* Overview Description */}
              <p className="text-slate-300 leading-relaxed text-sm bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                {planet.overview}
              </p>

              {/* Core Physical Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="metric-box">
                  <div className="metric-icon text-sky-400">
                    🌍
                  </div>
                  <div>
                    <div className="metric-label">Diameter</div>
                    <div className="metric-value">{planet.sizeKm}</div>
                  </div>
                </div>

                <div className="metric-box">
                  <div className="metric-icon text-amber-400">
                    🛰️
                  </div>
                  <div>
                    <div className="metric-label">Distance from Sun</div>
                    <div className="metric-value">{planet.distanceAu}</div>
                    <div className="text-[10px] text-slate-400">{planet.distanceKm}</div>
                  </div>
                </div>

                <div className="metric-box">
                  <div className="metric-icon text-emerald-400">
                    ⏰
                  </div>
                  <div>
                    <div className="metric-label">Orbital Period</div>
                    <div className="metric-value">
                      {planet.orbitPeriodDays ? `${planet.orbitPeriodDays} days` : 'Center of System'}
                    </div>
                  </div>
                </div>

                <div className="metric-box">
                  <div className="metric-icon text-purple-400">
                    🧭
                  </div>
                  <div>
                    <div className="metric-label">Day Length</div>
                    <div className="metric-value">{planet.rotationHours}</div>
                  </div>
                </div>

                <div className="metric-box">
                  <div className="metric-icon text-rose-400">
                    🌡️
                  </div>
                  <div>
                    <div className="metric-label">Temperature</div>
                    <div className="metric-value text-xs">{planet.temperature}</div>
                  </div>
                </div>

                <div className="metric-box">
                  <div className="metric-icon text-indigo-400">
                    ⚖️
                  </div>
                  <div>
                    <div className="metric-label">Surface Gravity</div>
                    <div className="metric-value">{planet.gravity}</div>
                  </div>
                </div>
              </div>

              {/* Moons Summary */}
              {planet.hasMoon && planet.moonDetails && (
                <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                      Notable Moons ({planet.moonsCount} Total)
                    </span>
                    <span className="text-xs text-indigo-400">{planet.moonDetails.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-400">Size:</span> {planet.moonDetails.sizeKm}
                    </div>
                    <div>
                      <span className="text-slate-400">Orbit:</span> {planet.moonDetails.orbitPeriodDays}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'atmosphere' && (
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Atmospheric Composition
              </h3>
              <div className="space-y-3 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                {planet.atmosphere?.map((gas, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-200 font-medium">{gas.gas}</span>
                      <span className="text-slate-400 font-mono">{gas.percent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, gas.percent)}%`,
                          backgroundColor:
                            idx === 0 ? planet.color : idx === 1 ? '#38bdf8' : idx === 2 ? '#34d399' : '#a855f7'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'facts' && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                    ✨
                Cosmic Curiosities
              </h3>
              <div className="space-y-2.5">
                {planet.funFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/5 flex items-start gap-3 text-slate-200 text-xs leading-relaxed"
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-white shadow-sm mt-0.5"
                      style={{ backgroundColor: planet.color }}
                    >
                      {index + 1}
                    </span>
                    <span>{fact}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'missions' && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                🚀
                Historic Exploration Missions
              </h3>
              <div className="space-y-3">
                {planet.keyMissions.map((mission, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/5 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-xs">{mission.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-slate-300 font-mono">
                        {mission.year} • {mission.agency}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-normal">{mission.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t border-white/10 bg-slate-900/50 flex items-center justify-between gap-3">
          <button
            onClick={() => onOpenCompare(planet)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 transition-all border border-white/10"
          >
            ⚖️
            Compare Planet
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-slate-900 bg-white hover:bg-slate-200 transition-all shadow-md"
          >
            Done
            ➡️
          </button>
        </div>
      </div>
    </div>
  );
}
