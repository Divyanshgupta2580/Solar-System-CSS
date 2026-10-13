import React from 'react';
import { X, Keyboard, Command } from 'lucide-react';

export default function KeyboardShortcutsModal({ onClose }) {
  const shortcuts = [
    { key: 'Space', action: 'Play / Pause orbital revolution' },
    { key: '[  /  ]', action: 'Navigate to previous / next planet' },
    { key: '3', action: 'Toggle between 3D Perspective and 2D Schematic' },
    { key: '+  /  -', action: 'Zoom camera in / out' },
    { key: 'M', action: 'Toggle cosmic ambient synthesizer' },
    { key: 'R', action: 'Reset camera pan & zoom to center' },
    { key: 'Esc', action: 'Close inspector drawer / modals' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-md rounded-3xl bg-slate-950/90 border border-white/15 shadow-2xl p-6 text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-cinzel">Keyboard Shortcuts</h3>
              <p className="text-xs text-slate-400">Quick controls for seamless navigation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5 text-xs">
          {shortcuts.map((sc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5"
            >
              <span className="text-slate-300">{sc.action}</span>
              <kbd className="px-2 py-1 rounded-lg bg-white/10 border border-white/15 text-sky-300 font-mono font-bold text-[11px] shadow-sm">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold text-xs hover:bg-slate-200 transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
