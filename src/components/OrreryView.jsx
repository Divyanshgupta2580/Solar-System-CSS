import React, { useMemo } from 'react';
import { CELESTIAL_BODIES, ASTEROID_BELT, KUIPER_BELT } from '../data/planetsData';
import { soundEngine } from '../utils/audio';

export default function OrreryView({
  selectedPlanet,
  onSelectPlanet,
  is3DView,
  isPlaying,
  speedMultiplier,
  showOrbits,
  showLabels,
  showBelts,
  showMoons,
  zoom,
  panOffset,
  onMouseDown
}) {
  const sun = CELESTIAL_BODIES[0];
  const planets = CELESTIAL_BODIES.slice(1);

  // Generate Asteroid Belt particles
  const asteroidParticles = useMemo(() => {
    const list = [];
    for (let i = 0; i < ASTEROID_BELT.particleCount; i++) {
      const angle = (i / ASTEROID_BELT.particleCount) * 360 + (Math.random() * 8 - 4);
      const rad = ASTEROID_BELT.innerRadius + Math.random() * (ASTEROID_BELT.outerRadius - ASTEROID_BELT.innerRadius);
      const size = Math.random() * 2.2 + 1;
      const opacity = Math.random() * 0.6 + 0.25;
      const gray = Math.floor(Math.random() * 60 + 140);
      list.push({
        id: `ast-${i}`,
        angle,
        rad,
        size,
        opacity,
        color: `rgb(${gray}, ${gray - 10}, ${gray - 20})`
      });
    }
    return list;
  }, []);

  // Generate Kuiper Belt particles
  const kuiperParticles = useMemo(() => {
    const list = [];
    for (let i = 0; i < KUIPER_BELT.particleCount; i++) {
      const angle = (i / KUIPER_BELT.particleCount) * 360 + (Math.random() * 10 - 5);
      const rad = KUIPER_BELT.innerRadius + Math.random() * (KUIPER_BELT.outerRadius - KUIPER_BELT.innerRadius);
      const size = Math.random() * 2.5 + 1;
      const opacity = Math.random() * 0.5 + 0.15;
      list.push({
        id: `kuiper-${i}`,
        angle,
        rad,
        size,
        opacity,
        color: Math.random() > 0.5 ? '#93c5fd' : '#cbd5e1'
      });
    }
    return list;
  }, []);

  const handlePlanetClick = (e, planet) => {
    e.stopPropagation();
    soundEngine.playPlanetChime(planet.audioFreq || 220);
    onSelectPlanet(planet);
  };

  return (
    <div
      className="orrery-container select-none cursor-grab active:cursor-grabbing"
      onMouseDown={onMouseDown}
    >
      <div
        className={`orrery-stage ${is3DView ? 'mode-3d' : 'mode-2d'}`}
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom}) ${
            is3DView ? 'rotateX(62deg) rotateZ(-16deg)' : 'rotateX(0deg) rotateZ(0deg)'
          }`
        }}
      >
        {/* ================= SUN (Center) ================= */}
        <div
          className="sun-wrapper"
          onClick={(e) => handlePlanetClick(e, sun)}
          title="Click to inspect the Sun"
        >
          {/* Animated solar corona rays & flares */}
          <div className="sun-corona" />
          <div className="sun-plasma-burst" />
          <div
            className={`sun-body ${selectedPlanet?.id === 'sun' ? 'body-selected' : ''}`}
            style={{
              width: `${sun.displaySize}px`,
              height: `${sun.displaySize}px`,
              background: sun.cssVisual.background,
              boxShadow: sun.cssVisual.boxShadow
            }}
          >
            <div className="sun-granulation" />
          </div>

          {showLabels && (
            <div className="celestial-label sun-label">
              <span className="label-badge">☀️ {sun.name}</span>
            </div>
          )}
        </div>

        {/* ================= ASTEROID BELT ================= */}
        {showBelts && (
          <div
            className="belt-container asteroid-belt"
            style={{
              animationPlayState: isPlaying ? 'running' : 'paused',
              animationDuration: `${36 / speedMultiplier}s`
            }}
          >
            {asteroidParticles.map((ast) => {
              const radAngle = (ast.angle * Math.PI) / 180;
              const x = Math.cos(radAngle) * ast.rad;
              const y = Math.sin(radAngle) * ast.rad;
              return (
                <div
                  key={ast.id}
                  className="asteroid-particle"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    width: `${ast.size}px`,
                    height: `${ast.size}px`,
                    backgroundColor: ast.color,
                    opacity: ast.opacity
                  }}
                />
              );
            })}
          </div>
        )}

        {/* ================= KUIPER BELT ================= */}
        {showBelts && (
          <div
            className="belt-container kuiper-belt"
            style={{
              animationPlayState: isPlaying ? 'running' : 'paused',
              animationDuration: `${140 / speedMultiplier}s`
            }}
          >
            {kuiperParticles.map((kp) => {
              const radAngle = (kp.angle * Math.PI) / 180;
              const x = Math.cos(radAngle) * kp.rad;
              const y = Math.sin(radAngle) * kp.rad;
              return (
                <div
                  key={kp.id}
                  className="kuiper-particle"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    width: `${kp.size}px`,
                    height: `${kp.size}px`,
                    backgroundColor: kp.color,
                    opacity: kp.opacity
                  }}
                />
              );
            })}
          </div>
        )}

        {/* ================= 9 PLANET ORBITS ================= */}
        {planets.map((planet) => {
          const isSelected = selectedPlanet?.id === planet.id;
          const orbitDiameter = planet.orbitRadius * 2;
          const animDuration = planet.orbitSpeedSec / speedMultiplier;

          return (
            <div
              key={planet.id}
              className={`orbit-ring ${showOrbits ? 'visible' : 'hidden-orbit'} ${
                isSelected ? 'orbit-selected' : ''
              }`}
              style={{
                width: `${orbitDiameter}px`,
                height: `${orbitDiameter}px`,
                animationPlayState: isPlaying ? 'running' : 'paused',
                animationDuration: `${animDuration}s`,
                borderColor: isSelected
                  ? planet.color
                  : showOrbits
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'transparent'
              }}
            >
              {/* Planet anchor node placed at the top rim of the orbit track */}
              <div
                className="planet-anchor"
                style={{
                  top: `-${planet.displaySize / 2}px`,
                  left: `calc(50% - ${planet.displaySize / 2}px)`
                }}
              >
                {/* Counter-rotation to keep the planet and its label right-side up */}
                <div
                  className="planet-counter-rotator"
                  style={{
                    animationPlayState: isPlaying ? 'running' : 'paused',
                    animationDuration: `${animDuration}s`
                  }}
                >
                  {/* Planet Sphere Button */}
                  <div
                    className={`planet-node group ${isSelected ? 'planet-active-pulse' : ''}`}
                    onClick={(e) => handlePlanetClick(e, planet)}
                    title={`${planet.name} • ${planet.type}`}
                  >
                    {/* Atmospheric Glow Aura */}
                    <div
                      className="planet-atmosphere-glow"
                      style={{
                        backgroundColor: planet.glowColor,
                        transform: isSelected ? 'scale(1.8)' : 'scale(1.3)'
                      }}
                    />

                    {/* Planet Sphere */}
                    <div
                      className="planet-sphere"
                      style={{
                        width: `${planet.displaySize}px`,
                        height: `${planet.displaySize}px`,
                        background: planet.cssVisual.background,
                        boxShadow: planet.cssVisual.boxShadow
                      }}
                    >
                      {/* Saturn Rings */}
                      {planet.hasRings && planet.id === 'saturn' && (
                        <div className="saturn-rings-assembly">
                          <div className="saturn-ring-outer" />
                          <div className="saturn-ring-inner" />
                        </div>
                      )}

                      {/* Uranus Delicate Ring */}
                      {planet.hasRings && planet.id === 'uranus' && (
                        <div className="uranus-ring-assembly">
                          <div className="uranus-ring-disc" />
                        </div>
                      )}

                      {/* Planet Day/Night Terminator Shadow */}
                      <div className="planet-shadow-layer" />
                    </div>

                    {/* MOONS */}
                    {showMoons && planet.hasMoon && (
                      <div
                        className="sub-orbit-moon"
                        style={{
                          width: `${planet.displaySize * 2.4}px`,
                          height: `${planet.displaySize * 2.4}px`,
                          animationPlayState: isPlaying ? 'running' : 'paused',
                          animationDuration: `${Math.max(2.5, animDuration * 0.12)}s`
                        }}
                      >
                        <div
                          className="moon-body"
                          style={{
                            width: `${Math.max(4, planet.displaySize * 0.28)}px`,
                            height: `${Math.max(4, planet.displaySize * 0.28)}px`
                          }}
                        />
                      </div>
                    )}

                    {/* Planet Floating Name Label */}
                    {showLabels && (
                      <div className={`celestial-label ${isSelected ? 'label-focused' : ''}`}>
                        <div className="label-badge flex items-center gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: planet.color }}
                          />
                          <span>{planet.name}</span>
                        </div>
                        <div className="label-distance">{planet.distanceAu}</div>
                      </div>
                    )}

                    {/* Selection Beacon Ring */}
                    {isSelected && (
                      <div
                        className="selection-beacon"
                        style={{ borderColor: planet.color }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
