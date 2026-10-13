import React, { useState, useEffect, useRef, useCallback } from 'react';
import Starfield from './components/Starfield';
import OrreryView from './components/OrreryView';
import PlanetCard from './components/PlanetCard';
import PlanetDock from './components/PlanetDock';
import ControlsHeader from './components/ControlsHeader';
import ComparisonModal from './components/ComparisonModal';
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal';
import { CELESTIAL_BODIES } from './data/planetsData';
import { soundEngine } from './utils/audio';

export default function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [is3DView, setIs3DView] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showBelts, setShowBelts] = useState(true);
  const [showMoons, setShowMoons] = useState(true);
  const [zoom, setZoom] = useState(0.9);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareInitialPlanet, setCompareInitialPlanet] = useState(null);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Pan dragging state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Handle Drag / Pan on the space canvas
  const handleMouseDown = useCallback((e) => {
    // Only drag with primary mouse button
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y
    };
  }, [panOffset]);

  const handleMouseMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Handle Wheel Zoom
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.0012;
    setZoom((prev) => Math.min(2.5, Math.max(0.35, +(prev + zoomDelta).toFixed(2))));
  }, []);

  const handleResetView = useCallback(() => {
    soundEngine.playClick();
    setZoom(0.9);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  // Keyboard navigation & controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is inside an input or select
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
        soundEngine.playClick();
      } else if (e.key === '3') {
        setIs3DView((prev) => !prev);
        soundEngine.playClick();
      } else if (e.key === 'm' || e.key === 'M') {
        const isPlayingNow = soundEngine.toggleAmbient();
        setIsAudioOn(isPlayingNow);
      } else if (e.key === 'r' || e.key === 'R') {
        handleResetView();
      } else if (e.key === '+' || e.key === '=') {
        setZoom((prev) => Math.min(2.5, +(prev + 0.15).toFixed(2)));
        soundEngine.playClick();
      } else if (e.key === '-' || e.key === '_') {
        setZoom((prev) => Math.max(0.35, +(prev - 0.15).toFixed(2)));
        soundEngine.playClick();
      } else if (e.key === 'Escape') {
        if (showCompareModal) setShowCompareModal(false);
        else if (showHelpModal) setShowHelpModal(false);
        else setSelectedPlanet(null);
      } else if (e.key === ']' || e.key === 'ArrowRight') {
        // Next planet
        const currentIndex = CELESTIAL_BODIES.findIndex((b) => b.id === selectedPlanet?.id);
        const nextIndex = (currentIndex + 1) % CELESTIAL_BODIES.length;
        const nextBody = CELESTIAL_BODIES[nextIndex];
        setSelectedPlanet(nextBody);
        soundEngine.playPlanetChime(nextBody.audioFreq || 220);
      } else if (e.key === '[' || e.key === 'ArrowLeft') {
        // Prev planet
        const currentIndex = CELESTIAL_BODIES.findIndex((b) => b.id === selectedPlanet?.id);
        const prevIndex = (currentIndex - 1 + CELESTIAL_BODIES.length) % CELESTIAL_BODIES.length;
        const prevBody = CELESTIAL_BODIES[prevIndex];
        setSelectedPlanet(prevBody);
        soundEngine.playPlanetChime(prevBody.audioFreq || 220);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPlanet, showCompareModal, showHelpModal, handleResetView]);

  // Touch and wheel events on container
  const containerRef = useRef(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  return (
    <main
      ref={containerRef}
      className="app-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Multi-Layer Starfield */}
      <Starfield />

      {/* Top Header Controls */}
      <ControlsHeader
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        speedMultiplier={speedMultiplier}
        setSpeedMultiplier={setSpeedMultiplier}
        is3DView={is3DView}
        setIs3DView={setIs3DView}
        showOrbits={showOrbits}
        setShowOrbits={setShowOrbits}
        showLabels={showLabels}
        setShowLabels={setShowLabels}
        showBelts={showBelts}
        setShowBelts={setShowBelts}
        showMoons={showMoons}
        setShowMoons={setShowMoons}
        zoom={zoom}
        setZoom={setZoom}
        onResetView={handleResetView}
        onOpenCompare={() => {
          setCompareInitialPlanet(selectedPlanet || CELESTIAL_BODIES[3]);
          setShowCompareModal(true);
        }}
        onOpenHelp={() => setShowHelpModal(true)}
        isAudioOn={isAudioOn}
        setIsAudioOn={setIsAudioOn}
      />

      {/* Main Interactive 3D Orrery Solar System View */}
      <OrreryView
        selectedPlanet={selectedPlanet}
        onSelectPlanet={setSelectedPlanet}
        is3DView={is3DView}
        isPlaying={isPlaying}
        speedMultiplier={speedMultiplier}
        showOrbits={showOrbits}
        showLabels={showLabels}
        showBelts={showBelts}
        showMoons={showMoons}
        zoom={zoom}
        panOffset={panOffset}
        onMouseDown={handleMouseDown}
      />

      {/* Planet Inspector Details Drawer */}
      {selectedPlanet && (
        <PlanetCard
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
          onOpenCompare={(planet) => {
            setCompareInitialPlanet(planet);
            setShowCompareModal(true);
          }}
        />
      )}

      {/* Bottom Planet Selection Quick Dock */}
      <PlanetDock
        selectedPlanet={selectedPlanet}
        onSelectPlanet={setSelectedPlanet}
      />

      {/* Planet Comparison Modal */}
      {showCompareModal && (
        <ComparisonModal
          initialPlanetA={compareInitialPlanet}
          onClose={() => setShowCompareModal(false)}
        />
      )}

      {/* Keyboard Shortcuts Modal */}
      {showHelpModal && (
        <KeyboardShortcutsModal onClose={() => setShowHelpModal(false)} />
      )}
    </main>
  );
}
