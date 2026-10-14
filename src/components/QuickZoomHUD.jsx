import React from 'react';
import { soundEngine } from '../utils/audio';

export default function QuickZoomHUD({ zoom, setZoom, onResetView }) {
  const handleStepZoom = (delta) => {
    soundEngine.playClick();
    setZoom((prev) => {
      const next = +(prev + delta).toFixed(2);
      return Math.min(4.5, Math.max(0.2, next));
    });
  };

  const handleSliderChange = (e) => {
    const val = parseFloat(e.target.value);
    setZoom(val);
  };

  const setPreset = (targetZoom) => {
    soundEngine.playClick();
    setZoom(targetZoom);
  };

  return (
    <div className="fixed bottom-20 right-4 z-30 pointer-events-auto flex flex-col items-end gap-2">
      {/* Zoom HUD Glass Bar */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/15 shadow-2xl text-white">
        {/* Zoom Out Button */}
        <button
          onClick={() => handleStepZoom(-0.25)}
          className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          title="Zoom Out (Scroll Down / -)"
          aria-label="Zoom out"
        >
          🔍-
        </button>

        {/* Smooth Zoom Slider */}
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0.2"
            max="4.5"
            step="0.05"
            value={zoom}
            onChange={handleSliderChange}
            className="w-24 md:w-32 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
            title="Drag to zoom smoothly"
          />
          <span className="text-[11px] font-mono font-bold text-sky-300 w-12 text-center select-none">
            {Math.round(zoom * 100)}%
          </span>
        </div>

        {/* Zoom In Button */}
        <button
          onClick={() => handleStepZoom(0.25)}
          className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          title="Zoom In (Scroll Up / +)"
          aria-label="Zoom in"
        >
          🔍+
        </button>

        <div className="w-[1px] h-4 bg-white/15 mx-0.5" />

        {/* Reset Camera Button */}
        <button
          onClick={onResetView}
          className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          title="Reset camera & center view (R)"
          aria-label="Reset view"
        >
          🔄
        </button>
      </div>

      {/* Quick View Presets */}
      <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/10 text-[10px] text-slate-400 font-medium">
        <span className="px-1 text-slate-500">Presets:</span>
        <button
          onClick={() => setPreset(0.35)}
          className={`px-2 py-0.5 rounded-lg transition-all ${
            zoom <= 0.4 ? 'bg-sky-500/20 text-sky-300 font-bold' : 'hover:bg-white/10 hover:text-white'
          }`}
          title="Whole Solar System & Kuiper Belt view"
        >
          Wide
        </button>
        <button
          onClick={() => setPreset(0.9)}
          className={`px-2 py-0.5 rounded-lg transition-all ${
            zoom >= 0.8 && zoom <= 1.1 ? 'bg-sky-500/20 text-sky-300 font-bold' : 'hover:bg-white/10 hover:text-white'
          }`}
          title="Default balanced orrery view"
        >
          Standard
        </button>
        <button
          onClick={() => setPreset(2.2)}
          className={`px-2 py-0.5 rounded-lg transition-all ${
            zoom >= 2.0 ? 'bg-sky-500/20 text-sky-300 font-bold' : 'hover:bg-white/10 hover:text-white'
          }`}
          title="Close-up planetary inspection"
        >
          Close-Up
        </button>
      </div>
    </div>
  );
}
