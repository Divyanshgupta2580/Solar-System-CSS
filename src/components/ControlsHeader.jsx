import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  Layers, 
  Volume2, 
  VolumeX, 
  SlidersHorizontal, 
  HelpCircle, 
  ArrowRightLeft,
  Box,
  Move
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function ControlsHeader({
  isPlaying,
  setIsPlaying,
  speedMultiplier,
  setSpeedMultiplier,
  is3DView,
  setIs3DView,
  showOrbits,
  setShowOrbits,
  showLabels,
  setShowLabels,
  showBelts,
  setShowBelts,
  showMoons,
  setShowMoons,
  zoom,
  setZoom,
  onResetView,
  onOpenCompare,
  onOpenHelp,
  isAudioOn,
  setIsAudioOn
}) {
  const [showLayersDropdown, setShowLayersDropdown] = useState(false);

  const speedOptions = [0.25, 0.5, 1, 2, 5, 10];

  const handleToggleAudio = () => {
    const isPlayingNow = soundEngine.toggleAmbient();
    setIsAudioOn(isPlayingNow);
  };

  const handleTogglePlay = () => {
    soundEngine.playClick();
    setIsPlaying(!isPlaying);
  };

  const handleZoom = (delta) => {
    soundEngine.playClick();
    const current = typeof zoom === 'number' ? zoom : 0.85;
    const next = +(current + delta).toFixed(2);
    setZoom(Math.min(4.5, Math.max(0.2, next)));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 p-3 md:p-4 pointer-events-none flex items-start justify-between gap-3">
      {/* Brand Header */}
      <div className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/10 shadow-xl">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-sky-400 p-0.5 shadow-md flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400 text-sm">
            ☀️
          </div>
        </div>
        <div>
          <h1 className="text-sm md:text-base font-extrabold tracking-wider text-white font-cinzel leading-none">
            COSMIC ORRERY
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
              9 Planets • 3D CSS Engine
            </span>
          </div>
        </div>
      </div>

      {/* Center Orbital Time Controls */}
      <div className="pointer-events-auto hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/10 shadow-xl">
        {/* Play / Pause */}
        <button
          onClick={handleTogglePlay}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            isPlaying
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
          }`}
          title={isPlaying ? 'Pause simulation (Space)' : 'Resume simulation (Space)'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isPlaying ? 'Pause' : 'Resume'}</span>
        </button>

        {/* Speed multiplier picker */}
        <div className="flex items-center bg-white/5 rounded-xl p-0.5 border border-white/5">
          {speedOptions.map((speed) => (
            <button
              key={speed}
              onClick={() => {
                soundEngine.playClick();
                setSpeedMultiplier(speed);
              }}
              className={`px-2 py-1 text-[11px] font-medium rounded-lg transition-all ${
                speedMultiplier === speed
                  ? 'bg-white/20 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>

        {/* 3D vs 2D Perspective Toggle */}
        <button
          onClick={() => {
            soundEngine.playClick();
            setIs3DView(!is3DView);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
            is3DView
              ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
              : 'bg-white/5 text-slate-300 border-white/10 hover:text-white'
          }`}
          title="Toggle 3D Angled Perspective vs 2D Flat Schematic"
        >
          <Box className="w-3.5 h-3.5" />
          <span>{is3DView ? '3D View' : '2D Schematic'}</span>
        </button>
      </div>

      {/* Right Controls (Zoom, Layers, Audio, Compare, Help) */}
      <div className="pointer-events-auto flex items-center gap-1.5 px-2 py-1.5 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/10 shadow-xl">
        {/* Zoom In / Out */}
        <button
          onClick={() => handleZoom(0.15)}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          title="Zoom in (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <span className="text-[11px] text-slate-400 font-mono w-12 text-center transition-all duration-150">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => handleZoom(-0.15)}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          title="Zoom out (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={onResetView}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors border-r border-white/10 mr-1"
          title="Reset camera view"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* View Layers Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLayersDropdown(!showLayersDropdown)}
            className={`p-2 rounded-xl transition-all ${
              showLayersDropdown ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
            title="Toggle celestial layers & overlays"
          >
            <Layers className="w-4 h-4" />
          </button>

          {showLayersDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 p-2 rounded-2xl bg-slate-950/95 border border-white/15 shadow-2xl backdrop-blur-2xl space-y-1 text-xs">
              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer text-slate-200">
                <span>Orbit Lines</span>
                <input
                  type="checkbox"
                  checked={showOrbits}
                  onChange={(e) => setShowOrbits(e.target.checked)}
                  className="rounded accent-sky-500"
                />
              </label>
              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer text-slate-200">
                <span>Planet Labels</span>
                <input
                  type="checkbox"
                  checked={showLabels}
                  onChange={(e) => setShowLabels(e.target.checked)}
                  className="rounded accent-sky-500"
                />
              </label>
              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer text-slate-200">
                <span>Asteroid Belts</span>
                <input
                  type="checkbox"
                  checked={showBelts}
                  onChange={(e) => setShowBelts(e.target.checked)}
                  className="rounded accent-sky-500"
                />
              </label>
              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer text-slate-200">
                <span>Moons</span>
                <input
                  type="checkbox"
                  checked={showMoons}
                  onChange={(e) => setShowMoons(e.target.checked)}
                  className="rounded accent-sky-500"
                />
              </label>
            </div>
          )}
        </div>

        {/* Compare Planets Button */}
        <button
          onClick={onOpenCompare}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          title="Compare planets side-by-side"
        >
          <ArrowRightLeft className="w-4 h-4" />
        </button>

        {/* Cosmic Ambient Audio Toggle */}
        <button
          onClick={handleToggleAudio}
          className={`p-2 rounded-xl transition-all ${
            isAudioOn
              ? 'text-sky-300 bg-sky-500/20 border border-sky-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/10'
          }`}
          title={isAudioOn ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
        >
          {isAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Shortcuts / Help Guide */}
        <button
          onClick={onOpenHelp}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          title="Controls & Shortcuts"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
