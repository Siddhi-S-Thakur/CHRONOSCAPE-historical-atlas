import React from 'react';

export const GeologicalLayer: React.FC = () => {
  return (
    <g id="layer-geology" className="transition-opacity duration-700">
      <defs>
        <radialGradient id="tethysGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#142236" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#080E18" stopOpacity="1" />
        </radialGradient>
        <filter id="glowTectonic">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#C5A059" />
        </marker>
      </defs>

      {/* Tethys Ocean Basin Background */}
      <rect width="1000" height="850" fill="url(#tethysGrad)" />

      {/* Ancient Ocean Bathymetric Isoclines */}
      <g stroke="#1F334E" strokeWidth="1.2" fill="none" opacity="0.45">
        <path d="M 50 200 Q 350 150 650 220 T 1000 200" />
        <path d="M 30 350 Q 300 300 700 360 T 980 320" />
        <path d="M 60 520 Q 420 460 780 530 T 990 500" />
      </g>

      {/* PROTO-EURASIAN CRATON (Far North Margin) */}
      <g transform="translate(100, 60)">
        <path
          d="M 50 120 C 180 75, 400 85, 620 105 C 750 120, 850 65, 900 130 C 870 180, 750 200, 620 180 C 460 170, 300 190, 140 200 C 80 180, 30 150, 50 120 Z"
          fill="#161F2E"
          stroke="#38475E"
          strokeWidth="2"
        />
        <text
          x="460"
          y="140"
          fontFamily="'Cinzel', serif"
          fontSize="15"
          fill="#8090AB"
          letterSpacing="6"
          textAnchor="middle"
        >
          PROTO-EURASIAN CRATONIC MARGIN
        </text>
        <text
          x="460"
          y="162"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="9"
          fill="#525E75"
          textAnchor="middle"
          letterSpacing="1"
        >
          SUBDUCTION TRENCH ZONE (NEO-TETHYS MARGIN)
        </text>
      </g>

      {/* SUBDUCTION SUTURE LINE */}
      <path
        d="M 150 240 Q 480 220 700 250 T 950 230"
        fill="none"
        stroke="#E25B36"
        strokeWidth="2.5"
        strokeDasharray="6,4"
        opacity="0.85"
      />
      <text
        x="550"
        y="225"
        fill="#E25B36"
        fontSize="10"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        letterSpacing="2"
        fontWeight="bold"
      >
        TETHYAN CONSUMPTION SUTURE
      </text>

      {/* MOVING INDIAN TECTONIC PLATE (Gondwana Breakup) */}
      <g id="tectonic-craton-group" transform="translate(380, 380)" className="transition-all duration-1000">
        {/* Drift Velocity Vectors */}
        <g stroke="#C5A059" strokeWidth="1.6" opacity="0.8">
          <line x1="120" y1="140" x2="120" y2="35" strokeDasharray="3,3" markerEnd="url(#arrow)" />
          <line x1="220" y1="180" x2="220" y2="75" strokeDasharray="3,3" markerEnd="url(#arrow)" />
          <line x1="20" y1="200" x2="20" y2="95" strokeDasharray="3,3" markerEnd="url(#arrow)" />
        </g>

        {/* Continental Craton Outline */}
        <path
          d="M 40 80 C 100 20, 200 30, 260 90 C 290 150, 280 230, 240 310 C 190 380, 150 420, 130 450 C 110 410, 70 340, 30 280 C -10 200, 0 130, 40 80 Z"
          fill="#251E14"
          stroke="#C5A059"
          strokeWidth="2.5"
          filter="url(#glowTectonic)"
        />

        {/* Deccan Volcanic Traps / Basalt Plume Eruption */}
        <ellipse
          cx="140"
          cy="190"
          rx="65"
          ry="50"
          fill="#7C2D12"
          opacity="0.65"
          stroke="#EA580C"
          strokeWidth="1.5"
          strokeDasharray="4,2"
        />
        <text
          x="140"
          y="194"
          fontFamily="'Cinzel', serif"
          fontSize="9.5"
          fill="#FDBA74"
          textAnchor="middle"
          fontWeight="bold"
        >
          RÉUNION PLUME / DECCAN TRAPS
        </text>

        {/* Indian Plate Inscription */}
        <text
          x="130"
          y="265"
          fontFamily="'Cinzel', serif"
          fontSize="17"
          fill="#F3EFE6"
          fontWeight="bold"
          letterSpacing="4"
          textAnchor="middle"
        >
          INDIAN CRATON
        </text>
        <text
          x="130"
          y="285"
          fontFamily="'EB Garamond', serif"
          fontSize="12"
          fill="#C5A059"
          fontStyle="italic"
          textAnchor="middle"
        >
          Drift Speed: ~18–20 cm/year Northward
        </text>
        <text
          x="130"
          y="302"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="8.5"
          fill="#9CA3AF"
          textAnchor="middle"
        >
          Separated from Madagascar c. 88 Ma
        </text>

        {/* Geologic Callout Tag */}
        <circle cx="240" cy="90" r="4" fill="#C5A059" />
        <line x1="240" y1="90" x2="300" y2="60" stroke="#C5A059" strokeWidth="1" />
        <rect x="300" y="45" width="170" height="42" rx="4" fill="#0E121B" stroke="#2B3448" />
        <text x="310" y="62" fontSize="10" fill="#E2DDD3" fontFamily="'Cinzel', serif" fontWeight="bold">
          K-Pg BOUNDARY
        </text>
        <text x="310" y="78" fontSize="8.5" fill="#8892A6" fontFamily="'Plus Jakarta Sans', sans-serif">
          Massive flood basalt eruptions
        </text>
      </g>

      <g transform="translate(40, 770)">
        <text x="0" y="0" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="11" fill="#758298" className="font-mono">
          CRATONIC DRIFT PHASE: LATE CRETACEOUS (~70 Ma) • PRE-COLLISIONAL TETHYS BASIN
        </text>
      </g>
    </g>
  );
};
