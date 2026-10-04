import React from 'react';
import { useTemporal } from '../../../context/TemporalContext';

export const TerritoriesLayer: React.FC = () => {
  const { 
    currentAnchor, 
    selectEmpire, 
    setHoveredEntity, 
    selectedEntity 
  } = useTemporal();

  const isMauryaActive = currentAnchor.id === 'maurya';
  const isDeccanActive = currentAnchor.id === 'deccan';
  const isAncientActive = currentAnchor.id === 'ancient';
  const isCholaActive = currentAnchor.id === 'chola';
  const isRevoltActive = currentAnchor.id === 'revolt';

  // Overall territory opacity dims during 1857 revolt mode
  const territoryGroupOpacity = isRevoltActive ? 0.15 : 1.0;

  const isMauryaSelected = selectedEntity?.type === 'empire' && selectedEntity.data.id === 'maurya';
  const isTamilSelected = selectedEntity?.type === 'empire' && selectedEntity.data.id === 'tamilaham';
  const isMarathaSelected = selectedEntity?.type === 'empire' && selectedEntity.data.id === 'maratha';

  return (
    <g 
      id="territories-group" 
      className="transition-opacity duration-700 select-none" 
      opacity={territoryGroupOpacity}
    >
      <defs>
        <radialGradient id="mauryaFill" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#C5A059" stopOpacity={isMauryaSelected ? 0.55 : 0.38} />
          <stop offset="70%" stopColor="#936D26" stopOpacity={isMauryaSelected ? 0.35 : 0.22} />
          <stop offset="100%" stopColor="#735216" stopOpacity="0.05" />
        </radialGradient>
        <radialGradient id="cholaFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E25B36" stopOpacity={isTamilSelected ? 0.55 : 0.38} />
          <stop offset="100%" stopColor="#9E2A0A" stopOpacity="0.06" />
        </radialGradient>
        <radialGradient id="marathaFill" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#E07A5F" stopOpacity={isMarathaSelected ? 0.6 : 0.42} />
          <stop offset="100%" stopColor="#B23B1E" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      {/* 1. MAURYAN SAMRAJYA TERRITORIAL SPHERE (Primary demonstration) */}
      <g
        id="territory-maurya"
        className="cursor-pointer transition-all duration-300 group"
        onClick={() => selectEmpire('maurya')}
        onMouseEnter={() => setHoveredEntity({ name: 'Maurya Samrājya', details: 'c. 322–185 BCE • Pan-subcontinental imperial realm' })}
        onMouseLeave={() => setHoveredEntity(null)}
      >
        <path
          d="
            M 200 190 
            C 350 150, 600 170, 780 240 
            C 840 280, 850 360, 770 420 
            C 710 460, 630 520, 560 620 
            C 500 690, 430 680, 380 640 
            C 330 580, 310 500, 280 440 
            C 230 400, 160 330, 170 250 Z"
          fill="url(#mauryaFill)"
          stroke="#C5A059"
          strokeWidth={isMauryaSelected ? 3.5 : 2}
          className="transition-all duration-300 group-hover:stroke-width-3 group-hover:stroke-[#F1D699] filter drop-shadow-[0_0_15px_rgba(197,160,89,0.35)]"
        />

        {/* Southern Frontier Uncertainty Boundary Line */}
        <path
          d="M 380 640 C 430 680, 500 690, 560 620"
          fill="none"
          stroke="#C5A059"
          strokeWidth="2.5"
          strokeDasharray="6,4"
          className="opacity-75"
        />
        <text
          x="470"
          y="665"
          fontFamily="'EB Garamond', serif"
          fontSize="9.5"
          fill="#D8BF82"
          fontStyle="italic"
          textAnchor="middle"
        >
          [Contested/Tributary Southern Frontier]
        </text>

        {/* Territory Label Inscription */}
        <text
          x="490"
          y="340"
          fontFamily="'Cinzel', serif"
          fontSize={isMauryaActive ? 28 : 22}
          fontWeight="700"
          fill="#F4E6C3"
          letterSpacing="8"
          textAnchor="middle"
          className="pointer-events-none drop-shadow-md transition-all"
        >
          MAURYA SAMRĀJYA
        </text>
        <text
          x="490"
          y="365"
          fontFamily="'EB Garamond', serif"
          fontSize="13.5"
          fill="#C5A059"
          fontStyle="italic"
          textAnchor="middle"
          className="pointer-events-none"
        >
          c. 322 – 185 BCE • Realm of Ashoka & Chanakya
        </text>
      </g>

      {/* 2. TAMIḺAKAM / DEEP SOUTH POLITIES (CHOLAS, CHERAS, PANDYAS) */}
      <g
        id="territory-tamilaham"
        className="cursor-pointer transition-all duration-300 group"
        onClick={() => selectEmpire('tamilaham')}
        onMouseEnter={() => setHoveredEntity({ name: 'TamiḺakam (Mūvēntar)', details: 'Chola, Chera, Pandya realms • Maritime spice emporia' })}
        onMouseLeave={() => setHoveredEntity(null)}
      >
        <path
          d="
            M 380 650 
            C 440 680, 520 660, 550 710 
            C 570 760, 510 820, 440 825 
            C 380 810, 350 750, 360 700 Z"
          fill="url(#cholaFill)"
          stroke="#E25B36"
          strokeWidth={isTamilSelected ? 2.5 : 1.5}
          strokeDasharray="4,2"
          className="transition-all duration-300 group-hover:stroke-width-2.5 filter drop-shadow-[0_0_10px_rgba(226,91,54,0.3)]"
        />
        <text
          x="460"
          y="750"
          fontFamily="'Cinzel', serif"
          fontSize="14"
          fontWeight="600"
          fill="#ECA08B"
          letterSpacing="3"
          textAnchor="middle"
          className="pointer-events-none"
        >
          TAMIḺAKAM
        </text>
        <text
          x="460"
          y="768"
          fontFamily="'EB Garamond', serif"
          fontSize="11"
          fill="#C77864"
          fontStyle="italic"
          textAnchor="middle"
          className="pointer-events-none"
        >
          Mūvēntar: Chola • Chera • Pandya
        </text>
      </g>

      {/* 3. GANDHARA / NORTHWEST FRONTIER */}
      <g
        id="territory-gandhara"
        className="cursor-pointer transition-all duration-300 group"
        onClick={() => selectEmpire('maurya')}
        onMouseEnter={() => setHoveredEntity({ name: 'Gandhāra Satrapy', details: 'Northwestern frontier gateway & university crossroads' })}
        onMouseLeave={() => setHoveredEntity(null)}
      >
        <ellipse
          cx="230"
          cy="190"
          rx="45"
          ry="32"
          fill="#202A3C"
          stroke="#7E90B0"
          strokeWidth="1.2"
          strokeDasharray="3,2"
          className="group-hover:stroke-[#C5A059] transition-colors"
        />
        <text
          x="230"
          y="194"
          fontFamily="'Cinzel', serif"
          fontSize="10.5"
          fill="#CAD3E3"
          textAnchor="middle"
          className="pointer-events-none"
        >
          GANDHĀRA
        </text>
      </g>

      {/* 4. MARATHA SVARAJYA HIGHLIGHT (Active when 1674 CE Shivaji is chosen) */}
      {(isDeccanActive || isMarathaSelected) && (
        <g
          id="territory-maratha"
          className="cursor-pointer transition-all duration-300 group animate-pulse-subtle"
          onClick={() => selectEmpire('maratha')}
          onMouseEnter={() => setHoveredEntity({ name: 'Maratha Swarajya', details: '1674 CE • Sovereign coronation of Chhatrapati Shivaji Maharaj at Raigad' })}
          onMouseLeave={() => setHoveredEntity(null)}
        >
          <path
            d="
              M 270 450 
              C 330 450, 360 480, 365 540 
              C 370 590, 320 630, 290 620 
              C 270 580, 260 520, 270 450 Z"
            fill="url(#marathaFill)"
            stroke="#E07A5F"
            strokeWidth="2.5"
            className="filter drop-shadow-[0_0_15px_rgba(224,122,95,0.45)]"
          />
          <text
            x="320"
            y="525"
            fontFamily="'Cinzel', serif"
            fontSize="12.5"
            fontWeight="bold"
            fill="#FFD2C4"
            letterSpacing="2"
            textAnchor="middle"
          >
            HINDAVĪ SVARĀJYA
          </text>
          <text
            x="320"
            y="540"
            fontFamily="'EB Garamond', serif"
            fontSize="10"
            fill="#E07A5F"
            fontStyle="italic"
            textAnchor="middle"
          >
            Coronation Horizon (1674 CE)
          </text>
        </g>
      )}
    </g>
  );
};
