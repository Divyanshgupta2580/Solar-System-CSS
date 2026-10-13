// Comprehensive astronomical and visual data for the Sun and all 9 planets
export const CELESTIAL_BODIES = [
  {
    id: 'sun',
    name: 'Sun',
    subtitle: 'The Heart of the Solar System',
    type: 'Yellow Dwarf Star (G2V)',
    color: '#fbbf24',
    secondaryColor: '#f97316',
    glowColor: 'rgba(251, 191, 36, 0.65)',
    sizeKm: '1,392,700 km',
    displaySize: 58, // UI representation px
    orbitRadius: 0,
    orbitPeriodDays: 0,
    orbitSpeedSec: 0, // center
    rotationHours: '600 hrs (differential)',
    distanceAu: '0 AU',
    distanceKm: '0 km',
    temperature: '5,500 °C (surface) / 15M °C (core)',
    gravity: '274.0 m/s² (28.0g)',
    moonsCount: 0,
    atmosphere: [
      { gas: 'Hydrogen (H₂)', percent: 73.4 },
      { gas: 'Helium (He)', percent: 24.8 },
      { gas: 'Oxygen & Carbon', percent: 1.2 },
      { gas: 'Iron & Neon', percent: 0.6 }
    ],
    overview: 'The Sun contains 99.86% of all mass in our solar system. A nearly perfect sphere of incandescent plasma, powered by continuous nuclear fusion in its core where hydrogen is fused into helium at 15 million degrees Celsius.',
    funFacts: [
      'Over 1.3 million Earths could fit inside the Sun.',
      'The light you feel right now took about 8 minutes and 20 seconds to travel from the Sun to Earth.',
      'It takes between 100,000 to 1,000,000 years for photon energy generated in the core to reach the surface.'
    ],
    keyMissions: [
      { name: 'Parker Solar Probe', year: 2018, agency: 'NASA', note: 'Closest spacecraft to touch the Sun’s corona at record 690,000 km/h.' },
      { name: 'SOHO Observatory', year: 1995, agency: 'ESA/NASA', note: 'Over 25 years continuously monitoring space weather and coronal mass ejections.' },
      { name: 'Solar Orbiter', year: 2020, agency: 'ESA', note: 'Capturing the closest images ever taken of solar poles.' }
    ],
    audioFreq: 110, // Hz for resonance drone
    cssVisual: {
      background: 'radial-gradient(circle at 35% 35%, #fff7ed 0%, #fef08a 25%, #f59e0b 60%, #dc2626 95%)',
      boxShadow: '0 0 45px #f59e0b, 0 0 90px #ea580c, 0 0 150px rgba(234, 88, 12, 0.4), inset -6px -6px 20px rgba(185, 28, 28, 0.8)'
    }
  },
  {
    id: 'mercury',
    name: 'Mercury',
    subtitle: 'The Swift Iron Planet',
    type: 'Terrestrial Planet',
    color: '#94a3b8',
    secondaryColor: '#64748b',
    glowColor: 'rgba(148, 163, 184, 0.5)',
    sizeKm: '4,879 km',
    displaySize: 13,
    orbitRadius: 70, // pixels from center
    orbitPeriodDays: 88,
    orbitSpeedSec: 8.8, // calibrated animation duration
    rotationHours: '1,407.6 hrs (58.6 days)',
    distanceAu: '0.39 AU',
    distanceKm: '57.9 Million km',
    temperature: '-180 °C to 430 °C',
    gravity: '3.7 m/s² (0.38g)',
    moonsCount: 0,
    atmosphere: [
      { gas: 'Oxygen (O₂)', percent: 42.0 },
      { gas: 'Sodium (Na)', percent: 29.0 },
      { gas: 'Hydrogen (H₂)', percent: 22.0 },
      { gas: 'Helium (He)', percent: 6.0 },
      { gas: 'Potassium & others', percent: 1.0 }
    ],
    overview: 'Mercury is the smallest planet in the Solar System and closest to the Sun. Its surface is scarred by countless meteorite impacts, resembling Earth’s Moon, and endures the most extreme temperature swings in the solar system.',
    funFacts: [
      'A year on Mercury is only 88 Earth days, but one solar day (noon to noon) lasts 176 Earth days.',
      'Despite being closest to the Sun, radar observations reveal water ice inside permanently shadowed polar craters.',
      'Mercury has a massive metallic iron core making up about 85% of the planet’s total radius.'
    ],
    keyMissions: [
      { name: 'Mariner 10', year: 1974, agency: 'NASA', note: 'First spacecraft to visit Mercury, revealing its cratered surface.' },
      { name: 'MESSENGER', year: 2004, agency: 'NASA', note: 'Orbited Mercury for 4 years, mapping 100% of the surface composition.' },
      { name: 'BepiColombo', year: 2018, agency: 'ESA/JAXA', note: 'Dual-orbiter mission scheduled for comprehensive orbital insertion.' }
    ],
    audioFreq: 147,
    cssVisual: {
      background: 'radial-gradient(circle at 35% 30%, #e2e8f0 0%, #94a3b8 40%, #475569 80%, #1e293b 100%)',
      boxShadow: '0 0 12px rgba(148, 163, 184, 0.6), inset -3px -3px 6px rgba(15, 23, 42, 0.9)'
    }
  },
  {
    id: 'venus',
    name: 'Venus',
    subtitle: 'The Toxic Furnace Jewel',
    type: 'Terrestrial Planet',
    color: '#fbbf24',
    secondaryColor: '#d97706',
    glowColor: 'rgba(251, 191, 36, 0.55)',
    sizeKm: '12,104 km',
    displaySize: 18,
    orbitRadius: 104,
    orbitPeriodDays: 224.7,
    orbitSpeedSec: 14.5,
    rotationHours: '5,832 hrs (243 days, Retrograde)',
    distanceAu: '0.72 AU',
    distanceKm: '108.2 Million km',
    temperature: '465 °C (Average, hot enough to melt lead)',
    gravity: '8.87 m/s² (0.91g)',
    moonsCount: 0,
    atmosphere: [
      { gas: 'Carbon Dioxide (CO₂)', percent: 96.5 },
      { gas: 'Nitrogen (N₂)', percent: 3.5 },
      { gas: 'Sulfur Dioxide (SO₂)', percent: 0.015 },
      { gas: 'Water Vapor & Argon', percent: 0.005 }
    ],
    overview: 'Often called Earth’s "evil twin", Venus has roughly identical size and mass, but suffers from a runaway greenhouse effect. Its crushing atmosphere has 92 times the surface pressure of Earth and rains corrosive sulfuric acid.',
    funFacts: [
      'Venus rotates backwards compared to most planets: the Sun rises in the west and sets in the east.',
      'A day on Venus (243 Earth days) is longer than its entire year (225 Earth days).',
      'It is the hottest planet in the Solar System, hotter even than Mercury despite being twice as far from the Sun.'
    ],
    keyMissions: [
      { name: 'Venera 7 & 13', year: 1970, agency: 'Soviet Union', note: 'First human craft to land and transmit pictures from the scorching Venusian surface.' },
      { name: 'Magellan', year: 1989, agency: 'NASA', note: 'Used synthetic aperture radar to map 98% of the planet’s volcanic terrain.' },
      { name: 'Akatsuki', year: 2010, agency: 'JAXA', note: 'Studying super-rotating atmospheric winds and sulfuric cloud dynamics.' }
    ],
    audioFreq: 185,
    cssVisual: {
      background: 'radial-gradient(circle at 35% 30%, #fef3c7 0%, #fde68a 25%, #d97706 70%, #78350f 100%)',
      boxShadow: '0 0 18px rgba(245, 158, 11, 0.6), inset -4px -4px 8px rgba(69, 26, 3, 0.9)'
    }
  },
  {
    id: 'earth',
    name: 'Earth',
    subtitle: 'The Blue Oasis of Life',
    type: 'Terrestrial Planet (Water World)',
    color: '#38bdf8',
    secondaryColor: '#22c55e',
    glowColor: 'rgba(56, 189, 248, 0.65)',
    sizeKm: '12,742 km',
    displaySize: 20,
    orbitRadius: 145,
    orbitPeriodDays: 365.25,
    orbitSpeedSec: 20.0,
    rotationHours: '23.93 hrs',
    distanceAu: '1.00 AU',
    distanceKm: '149.6 Million km',
    temperature: '-88 °C to 58 °C (Mean: 15 °C)',
    gravity: '9.81 m/s² (1.00g)',
    moonsCount: 1, // Moon / Luna
    atmosphere: [
      { gas: 'Nitrogen (N₂)', percent: 78.08 },
      { gas: 'Oxygen (O₂)', percent: 20.95 },
      { gas: 'Argon (Ar)', percent: 0.93 },
      { gas: 'Carbon Dioxide & others', percent: 0.04 }
    ],
    overview: 'The only known celestial harbor for life in the cosmos. Earth has liquid water covering 71% of its surface, a protective nitrogen-oxygen atmosphere, and a dynamic geomagnetic field produced by its molten liquid outer core.',
    funFacts: [
      'Earth is the densest major body in the entire solar system at 5.51 g/cm³.',
      'Our planet is not a perfect sphere; centrifugal rotation causes an equatorial bulge.',
      'Earth’s Moon is unusually large relative to its parent planet, stabilizing Earth’s axial tilt and seasonal cycle.'
    ],
    keyMissions: [
      { name: 'Apollo 11', year: 1969, agency: 'NASA', note: 'First humans landed on the Moon, returning invaluable lunar geology samples.' },
      { name: 'International Space Station', year: 1998, agency: 'NASA/ESA/JAXA/CSA', note: 'Continuously inhabited laboratory orbiting Earth every 90 minutes.' },
      { name: 'Landsat Program', year: 1972, agency: 'NASA/USGS', note: 'Longest continuous global record of the Earth’s changing surface from space.' }
    ],
    audioFreq: 220,
    hasMoon: true,
    moonDetails: {
      name: 'Moon (Luna)',
      sizeKm: '3,474 km',
      orbitPeriodDays: '27.3 days',
      distanceKm: '384,400 km'
    },
    cssVisual: {
      background: 'radial-gradient(circle at 35% 30%, #93c5fd 0%, #38bdf8 25%, #15803d 50%, #1d4ed8 75%, #0f172a 100%)',
      boxShadow: '0 0 20px rgba(56, 189, 248, 0.7), inset -4px -4px 9px rgba(15, 23, 42, 0.95)'
    }
  },
  {
    id: 'mars',
    name: 'Mars',
    subtitle: 'The Crimson Frontier',
    type: 'Terrestrial Planet',
    color: '#ef4444',
    secondaryColor: '#b91c1c',
    glowColor: 'rgba(239, 68, 68, 0.6)',
    sizeKm: '6,779 km',
    displaySize: 15,
    orbitRadius: 185,
    orbitPeriodDays: 687,
    orbitSpeedSec: 28.0,
    rotationHours: '24.62 hrs (1 Sol)',
    distanceAu: '1.52 AU',
    distanceKm: '227.9 Million km',
    temperature: '-140 °C to 20 °C (Mean: -63 °C)',
    gravity: '3.72 m/s² (0.38g)',
    moonsCount: 2, // Phobos & Deimos
    atmosphere: [
      { gas: 'Carbon Dioxide (CO₂)', percent: 95.32 },
      { gas: 'Nitrogen (N₂)', percent: 2.6 },
      { gas: 'Argon (Ar)', percent: 1.9 },
      { gas: 'Oxygen & Water Vapor', percent: 0.18 }
    ],
    overview: 'Mars owes its distinctive blood-red hue to iron oxide (rust) widespread across its surface. It hosts the tallest volcano known in the solar system, Olympus Mons (22 km tall), and the massive canyon network Valles Marineris.',
    funFacts: [
      'Sunsets on Mars appear eerie blue due to fine airborne dust particles scattering red light.',
      'Mars has frozen water ice sheets at both polar ice caps that expand and contract with the seasons.',
      'Phobos, Mars’s largest moon, is slowly spiraling closer and will crash into Mars or shatter into a ring in 50 million years.'
    ],
    keyMissions: [
      { name: 'Perseverance & Ingenuity', year: 2020, agency: 'NASA', note: 'Searching for ancient biosignatures and successfully flew the first powered aircraft on another planet.' },
      { name: 'Curiosity Rover', year: 2011, agency: 'NASA', note: 'Discovered ancient organic molecules and past habitable freshwater lake environments in Gale Crater.' },
      { name: 'Hope Probe', year: 2020, agency: 'UAE', note: 'Mapping holistic Mars atmospheric layers and weather cycles.' }
    ],
    audioFreq: 247,
    hasMoon: true,
    moonDetails: {
      name: 'Phobos & Deimos',
      sizeKm: '22 km & 12 km',
      orbitPeriodDays: '0.3 & 1.3 days',
      distanceKm: '9,376 km & 23,463 km'
    },
    cssVisual: {
      background: 'radial-gradient(circle at 35% 30%, #fca5a5 0%, #ef4444 35%, #b91c1c 70%, #450a0a 100%)',
      boxShadow: '0 0 16px rgba(239, 68, 68, 0.65), inset -3px -3px 8px rgba(69, 10, 10, 0.95)'
    }
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    subtitle: 'The Titan King of Worlds',
    type: 'Gas Giant',
    color: '#f59e0b',
    secondaryColor: '#d97706',
    glowColor: 'rgba(245, 158, 11, 0.55)',
    sizeKm: '139,820 km',
    displaySize: 38,
    orbitRadius: 245,
    orbitPeriodDays: 4333,
    orbitSpeedSec: 42.0,
    rotationHours: '9.93 hrs (Fastest planetary rotation)',
    distanceAu: '5.20 AU',
    distanceKm: '778.5 Million km',
    temperature: '-110 °C (Cloud tops) / 24,000 °C (Core)',
    gravity: '24.79 m/s² (2.53g)',
    moonsCount: 95, // Io, Europa, Ganymede, Callisto
    atmosphere: [
      { gas: 'Hydrogen (H₂)', percent: 89.8 },
      { gas: 'Helium (He)', percent: 10.2 },
      { gas: 'Methane (CH₄)', percent: 0.3 },
      { gas: 'Ammonia & Water', percent: 0.1 }
    ],
    overview: 'Jupiter is more massive than all other planets in the Solar System combined. It features alternating atmospheric bands formed by 500 km/h jet streams, and the Great Red Spot — an anticyclonic storm larger than Earth that has raged for centuries.',
    funFacts: [
      'Jupiter acts as a gravitational shield for Earth, deflecting comets and asteroids from the inner solar system.',
      'Ganymede, Jupiter’s largest moon, is larger than planet Mercury and possesses its own intrinsic magnetic field.',
      'Europa conceals a global liquid saltwater ocean beneath its ice crust with more water than all of Earth’s oceans combined.'
    ],
    keyMissions: [
      { name: 'Juno', year: 2011, agency: 'NASA', note: 'Orbiting Jupiter’s poles to measure deep atmospheric water, magnetic field, and core composition.' },
      { name: 'Galileo', year: 1989, agency: 'NASA', note: 'Dropped an atmospheric descent probe into Jupiter and observed volcanic plumes on Io.' },
      { name: 'JUICE (JUpiter ICy moons Explorer)', year: 2023, agency: 'ESA', note: 'En route to explore habitable potential on Ganymede, Europa, and Callisto.' }
    ],
    audioFreq: 130,
    hasMoon: true,
    moonDetails: {
      name: 'Galilean Moons (Io, Europa, Ganymede, Callisto)',
      sizeKm: '3,121 - 5,268 km',
      orbitPeriodDays: '1.7 to 16.7 days',
      distanceKm: '422,000 - 1,883,000 km'
    },
    cssVisual: {
      background: 'repeating-linear-gradient(175deg, #78350f 0px, #b45309 6px, #fef3c7 12px, #f59e0b 18px, #d97706 24px, #78350f 30px)',
      boxShadow: '0 0 26px rgba(245, 158, 11, 0.6), inset -6px -6px 14px rgba(69, 26, 3, 0.95)'
    }
  },
  {
    id: 'saturn',
    name: 'Saturn',
    subtitle: 'The Crowned Jewel of the Solar System',
    type: 'Gas Giant (Ringed Wonder)',
    color: '#eab308',
    secondaryColor: '#ca8a04',
    glowColor: 'rgba(234, 179, 8, 0.55)',
    sizeKm: '116,460 km',
    displaySize: 32,
    orbitRadius: 305,
    orbitPeriodDays: 10759,
    orbitSpeedSec: 56.0,
    rotationHours: '10.7 hrs',
    distanceAu: '9.58 AU',
    distanceKm: '1.43 Billion km',
    temperature: '-140 °C (Cloud tops)',
    gravity: '10.44 m/s² (1.07g)',
    moonsCount: 146, // Most in the solar system!
    atmosphere: [
      { gas: 'Hydrogen (H₂)', percent: 96.3 },
      { gas: 'Helium (He)', percent: 3.25 },
      { gas: 'Methane (CH₄)', percent: 0.45 },
      { gas: 'Ammonia & Phosphine', percent: 0.05 }
    ],
    overview: 'Saturn is renowned for its dazzling, extensive ring system consisting of trillions of icy chunks ranging from tiny dust grains to house-sized boulders. Saturn is so light that if there were an ocean large enough, it would float on water.',
    funFacts: [
      'Saturn is the least dense planet in our solar system (density 0.687 g/cm³), lower than liquid water.',
      'The rings span up to 282,000 km in width, but are extraordinarily thin — averaging only 10 to 30 meters thick!',
      'Saturn’s giant moon Titan is the only moon in the solar system with a dense nitrogen atmosphere and liquid methane lakes.'
    ],
    keyMissions: [
      { name: 'Cassini-Huygens', year: 1997, agency: 'NASA/ESA/ASI', note: 'Explored Saturn for 13 years and landed the Huygens probe safely onto methane-rich Titan.' },
      { name: 'Voyager 1 & 2', year: 1977, agency: 'NASA', note: 'Sent back the first close-up images of intricate ring divisions and shepherd moons.' },
      { name: 'Dragonfly (Upcoming)', year: 2028, agency: 'NASA', note: 'Rotorcraft lander planned to fly across multiple organic dune environments on Titan.' }
    ],
    audioFreq: 164,
    hasRings: true,
    hasMoon: true,
    moonDetails: {
      name: 'Titan & Enceladus',
      sizeKm: '5,150 km & 504 km',
      orbitPeriodDays: '15.9 days & 1.4 days',
      distanceKm: '1,222,000 km & 238,000 km'
    },
    cssVisual: {
      background: 'repeating-linear-gradient(172deg, #ca8a04 0px, #fef08a 6px, #eab308 12px, #a16207 18px, #ca8a04 24px)',
      boxShadow: '0 0 24px rgba(234, 179, 8, 0.6), inset -5px -5px 12px rgba(113, 63, 18, 0.95)'
    }
  },
  {
    id: 'uranus',
    name: 'Uranus',
    subtitle: 'The Rolling Cyan Ice Giant',
    type: 'Ice Giant',
    color: '#38bdf8',
    secondaryColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.55)',
    sizeKm: '50,724 km',
    displaySize: 24,
    orbitRadius: 365,
    orbitPeriodDays: 30685,
    orbitSpeedSec: 72.0,
    rotationHours: '17.24 hrs (Retrograde, 97.8° tilt)',
    distanceAu: '19.2 AU',
    distanceKm: '2.87 Billion km',
    temperature: '-195 °C to -224 °C (Coldest atmosphere in Solar System)',
    gravity: '8.69 m/s² (0.89g)',
    moonsCount: 28,
    atmosphere: [
      { gas: 'Hydrogen (H₂)', percent: 82.5 },
      { gas: 'Helium (He)', percent: 15.2 },
      { gas: 'Methane (CH₄)', percent: 2.3 },
      { gas: 'Hydrogen Deuteride', percent: 0.009 }
    ],
    overview: 'Uranus is unique because it rotates on its side with an axial tilt of 97.8 degrees, effectively "rolling" along its orbit like a bowling ball. Its distinctive cyan color is caused by atmospheric methane gas absorbing red photons.',
    funFacts: [
      'Because of its extreme tilt, each pole gets 42 continuous years of uninterrupted sunlight followed by 42 years of freezing darkness.',
      'Uranus has 13 faint narrow rings composed of extremely dark organic compounds and water ice particles.',
      'All of Uranus’s 28 moons are named after characters from William Shakespeare and Alexander Pope.'
    ],
    keyMissions: [
      { name: 'Voyager 2', year: 1986, agency: 'NASA', note: 'Only human spacecraft to ever visit Uranus, discovering 10 new moons and 2 new rings.' },
      { name: 'Hubble Space Telescope', year: 1990, agency: 'NASA/ESA', note: 'Continuously tracks seasonal auroras and cloud patterns on the rolling giant.' },
      { name: 'Uranus Orbiter & Probe (Proposed)', year: 2031, agency: 'NASA Decadal', note: 'Designated highest priority flagship mission to investigate ice giant formation.' }
    ],
    audioFreq: 196,
    hasRings: true,
    ringType: 'vertical',
    cssVisual: {
      background: 'radial-gradient(circle at 35% 30%, #e0f2fe 0%, #7dd3fc 40%, #06b6d4 75%, #0e7490 100%)',
      boxShadow: '0 0 22px rgba(6, 182, 212, 0.65), inset -4px -4px 10px rgba(22, 78, 99, 0.95)'
    }
  },
  {
    id: 'neptune',
    name: 'Neptune',
    subtitle: 'The Supersonic Azure Voyager',
    type: 'Ice Giant',
    color: '#3b82f6',
    secondaryColor: '#1d4ed8',
    glowColor: 'rgba(59, 130, 246, 0.65)',
    sizeKm: '49,244 km',
    displaySize: 23,
    orbitRadius: 425,
    orbitPeriodDays: 60190,
    orbitSpeedSec: 88.0,
    rotationHours: '16.11 hrs',
    distanceAu: '30.1 AU',
    distanceKm: '4.50 Billion km',
    temperature: '-200 °C (Cloud tops)',
    gravity: '11.15 m/s² (1.14g)',
    moonsCount: 16,
    atmosphere: [
      { gas: 'Hydrogen (H₂)', percent: 80.0 },
      { gas: 'Helium (He)', percent: 19.0 },
      { gas: 'Methane (CH₄)', percent: 1.5 },
      { gas: 'Ethane & Acetylene', percent: 0.01 }
    ],
    overview: 'The most distant major planet from the Sun. Neptune is home to the most ferocious supersonic winds in the solar system, topping 2,100 km/h (1,300 mph). Its deep oceanic cobalt hue radiates across the outer dark frontier.',
    funFacts: [
      'Neptune was discovered through mathematical calculation before it was ever seen through a telescope by astronomers.',
      'Neptune completed its first full orbit around the Sun since its 1846 discovery only in 2011 (taking 165 Earth years!).',
      'Its moon Triton is geologically active with cryovolcanoes spewing liquid nitrogen geysers 8 km into space.'
    ],
    keyMissions: [
      { name: 'Voyager 2', year: 1989, agency: 'NASA', note: 'Flew within 4,950 km of Neptune’s north pole, discovering the Great Dark Spot and geysers on Triton.' },
      { name: 'James Webb Space Telescope (JWST)', year: 2022, agency: 'NASA/ESA/CSA', note: 'Captured the clearest infrared view of Neptune’s rings in more than three decades.' }
    ],
    audioFreq: 220,
    hasMoon: true,
    moonDetails: {
      name: 'Triton (Cryovolcanic Moon)',
      sizeKm: '2,707 km',
      orbitPeriodDays: '5.88 days (Retrograde)',
      distanceKm: '354,759 km'
    },
    cssVisual: {
      background: 'radial-gradient(circle at 35% 30%, #93c5fd 0%, #3b82f6 35%, #1d4ed8 70%, #1e1b4b 100%)',
      boxShadow: '0 0 22px rgba(59, 130, 246, 0.7), inset -4px -4px 10px rgba(15, 23, 42, 0.95)'
    }
  },
  {
    id: 'pluto',
    name: 'Pluto',
    subtitle: 'The Heart of the Kuiper Belt',
    type: 'Dwarf Planet / 9th Planet',
    color: '#e2e8f0',
    secondaryColor: '#a1a1aa',
    glowColor: 'rgba(203, 213, 225, 0.45)',
    sizeKm: '2,377 km',
    displaySize: 10,
    orbitRadius: 485,
    orbitPeriodDays: 90560,
    orbitSpeedSec: 108.0,
    rotationHours: '153.3 hrs (6.4 days, Retrograde)',
    distanceAu: '39.5 AU (eccentric: 29.7 to 49.3 AU)',
    distanceKm: '5.91 Billion km',
    temperature: '-230 °C to -240 °C',
    gravity: '0.62 m/s² (0.06g)',
    moonsCount: 5, // Charon, Styx, Nix, Kerberos, Hydra
    atmosphere: [
      { gas: 'Nitrogen (N₂)', percent: 97.0 },
      { gas: 'Methane (CH₄)', percent: 2.5 },
      { gas: 'Carbon Monoxide (CO)', percent: 0.5 }
    ],
    overview: 'Discovered in 1930 and traditionally cherished as the 9th planet of our solar system. Pluto is an icy world with towering water-ice mountains, glaciers of frozen nitrogen, and the famous bright heart-shaped region named Tombaugh Regio.',
    funFacts: [
      'Pluto’s orbit is tilted 17 degrees and so elliptical that for 20 years of its 248-year orbit, it is closer to the Sun than Neptune!',
      'Pluto and its largest moon Charon form a binary system; Charon is so massive they orbit a common center of gravity outside Pluto.',
      'Pluto’s heart (Sputnik Planitia) is a million-square-kilometer glacier of churned nitrogen ice that actively convects.'
    ],
    keyMissions: [
      { name: 'New Horizons', year: 2015, agency: 'NASA', note: 'Historic flyby that unveiled Pluto’s young geological heart, blue atmospheric haze, and ice volcanoes.' }
    ],
    audioFreq: 261,
    hasMoon: true,
    moonDetails: {
      name: 'Charon (Binary Companion)',
      sizeKm: '1,212 km',
      orbitPeriodDays: '6.38 days (Tidally locked)',
      distanceKm: '19,596 km'
    },
    cssVisual: {
      background: 'radial-gradient(circle at 35% 30%, #f8fafc 0%, #cbd5e1 35%, #78716c 75%, #292524 100%)',
      boxShadow: '0 0 10px rgba(226, 232, 240, 0.5), inset -2px -2px 5px rgba(28, 25, 23, 0.95)'
    }
  }
];

export const ASTEROID_BELT = {
  innerRadius: 205,
  outerRadius: 228,
  particleCount: 160
};

export const KUIPER_BELT = {
  innerRadius: 440,
  outerRadius: 520,
  particleCount: 220
};
