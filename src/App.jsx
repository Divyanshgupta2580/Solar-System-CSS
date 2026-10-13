import React, { useState, useEffect, useRef, useCallback } from 'react';
import Starfield from './components/Starfield';
import OrreryView from './components/OrreryView';
import PlanetCard from './components/PlanetCard';
import PlanetDock from './components/PlanetDock';
import ControlsHeader from './components/ControlsHeader';
import QuickZoomHUD from './components/QuickZoomHUD';
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
  const [zoom, setZoom] = useState(0.85);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareInitialPlanet, setCompareInitialPlanet] = useState(null);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Pan dragging state refs
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const touchStartDistRef = useRef(null);
  const touchStartZoomRef = useRef(zoom);
  const interactionTimeoutRef = useRef(null);

  // Trigger interaction state (disables transition during active gesture for 0ms lag)
  const markInteracting = useCallback(() => {
    setIsInteracting(true);
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 180);
  }, []);

  // Handle Mouse Drag / Pan on space canvas
  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    markInteracting();
    dragStartRef.current = {
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y
    };
  }, [panOffset, markInteracting]);

  const handleMouseMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    markInteracting();
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  }, [markInteracting]);

  const handleMouseUp = useCallback(() => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsInteracting(false);
    }
  }, []);

  // Touch Handlers for Mobile & Trackpad tablets
  const handleTouchStart = useCallback((e) => {
    markInteracting();
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: e.touches[0].clientX - panOffset.x,
        y: e.touches[0].clientY - panOffset.y
      };
    } else if (e.touches.length === 2) {
      isDraggingRef.current = false;
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDistRef.current = dist;
      touchStartZoomRef.current = zoom;
    }
  }, [panOffset, zoom, markInteracting]);

  const handleTouchMove = useCallback((e) => {
    markInteracting();
    if (e.touches.length === 1 && isDraggingRef.current) {
      setPanOffset({
        x: e.touches[0].clientX - dragStartRef.current.x,
        y: e.touches[0].clientY - dragStartRef.current.y
      });
    } else if (e.touches.length === 2 && touchStartDistRef.current) {
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scaleFactor = currentDist / touchStartDistRef.current;
      const targetZoom = touchStartZoomRef.current * scaleFactor;
      setZoom(Math.min(4.5, Math.max(0.2, targetZoom)));
    }
  }, [markInteracting]);

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    touchStartDistRef.current = null;
    setIsInteracting(false);
  }, []);

  // Unified, High-Precision Wheel & Pinch Zoom
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    markInteracting();

    // Check if pinch-to-zoom (trackpad) or regular mouse scroll wheel
    const isPinch = e.ctrlKey;
    const factor = isPinch ? 0.008 : 0.0018;
    const delta = -e.deltaY * factor;
    const zoomMultiplier = Math.exp(delta);

    setZoom((prev) => {
      const next = prev * zoomMultiplier;
      return Math.min(4.5, Math.max(0.2, Math.round(next * 1000) / 1000));
    });
  }, [markInteracting]);

  // Smooth Reset Camera View
  const handleResetView = useCallback(() => {
    soundEngine.playClick();
    setIsInteracting(false);
    setZoom(0.85);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  // When a planet is clicked, focus smoothly
  const handleSelectPlanet = useCallback((planet) => {
    setSelectedPlanet(planet);
    if (planet) {
      // If planet is far, ensure appropriate zoom
      setIsInteracting(false);
      if (zoom < 0.6) {
        setZoom(1.0);
      }
    }
  }, [zoom]);

  // Bind wheel listener to window/container with passive: false to prevent browser page zoom
  const containerRef = useRef(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Keyboard navigation & controls
  useEffect(() => {
    const handleKeyDown = (e) => {
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
        setIsInteracting(false);
        setZoom((prev) => Math.min(4.5, +(prev + 0.25).toFixed(2)));
        soundEngine.playClick();
      } else if (e.key === '-' || e.key === '_') {
        setIsInteracting(false);
        setZoom((prev) => Math.max(0.2, +(prev - 0.25).toFixed(2)));
        soundEngine.playClick();
      } else if (e.key === 'Escape') {
        if (showCompareModal) setShowCompareModal(false);
        else if (showHelpModal) setShowHelpModal(false);
        else setSelectedPlanet(null);
      } else if (e.key === ']' || e.key === 'ArrowRight') {
        const currentIndex = CELESTIAL_BODIES.findIndex((b) => b.id === selectedPlanet?.id);
        const nextIndex = (currentIndex + 1) % CELESTIAL_BODIES.length;
        const nextBody = CELESTIAL_BODIES[nextIndex];
        setSelectedPlanet(nextBody);
        soundEngine.playPlanetChime(nextBody.audioFreq || 220);
      } else if (e.key === '[' || e.key === 'ArrowLeft') {
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

  return (
    <main
      ref={containerRef}
      className="app-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Starfield */}
      <Starfield />

      {/* Top Header Navigation */}
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
        setZoom={(newZoom) => {
          setIsInteracting(false);
          setZoom(newZoom);
        }}
        onResetView={handleResetView}
        onOpenCompare={() => {
          setCompareInitialPlanet(selectedPlanet || CELESTIAL_BODIES[3]);
          setShowCompareModal(true);
        }}
        onOpenHelp={() => setShowHelpModal(true)}
        isAudioOn={isAudioOn}
        setIsAudioOn={setIsAudioOn}
      />

      {/* Main Interactive 3D Orrery View */}
      <OrreryView
        selectedPlanet={selectedPlanet}
        onSelectPlanet={handleSelectPlanet}
        is3DView={is3DView}
        isPlaying={isPlaying}
        speedMultiplier={speedMultiplier}
        showOrbits={showOrbits}
        showLabels={showLabels}
        showBelts={showBelts}
        showMoons={showMoons}
        zoom={zoom}
        panOffset={panOffset}
        isInteracting={isInteracting}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Dedicated Floating Quick Zoom & Pan HUD */}
      <QuickZoomHUD
        zoom={zoom}
        setZoom={(newZoom) => {
          setIsInteracting(false);
          setZoom(newZoom);
        }}
        onResetView={handleResetView}
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

      {/* Bottom Planet Selection Dock */}
      <PlanetDock
        selectedPlanet={selectedPlanet}
        onSelectPlanet={handleSelectPlanet}
      />

      {/* Side-by-Side Planet Comparison Modal */}
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
