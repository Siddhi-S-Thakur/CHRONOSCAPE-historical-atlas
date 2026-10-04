import React from 'react';
import { useTemporal } from '../../../context/TemporalContext';

export const HistoricalLayer: React.FC = () => {
  const { viewMode } = useTemporal();

  return (
    <g id="subcontinent-base" className="select-none">
      <defs>
        <linearGradient id="riverBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2F5C8C" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#17304E" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Topography / Himalayan Arc (Himavat) */}
      <g id="himalayan-arc" stroke="#364052" strokeWidth="1.2" fill="none" opacity="0.65">
        <path d="M 220 160 Q 420 130 650 190 T 890 270" strokeWidth="3" stroke="#485670" />
        <path d="M 260 175 Q 440 150 630 205 T 840 280" />
        <path d="M 300 190 Q 470 170 610 220 T 800 295" strokeDasharray="3,3" />
        <text
          x="530"
          y="165"
          fill="#5F6D88"
          fontFamily="'Cinzel', serif"
          fontSize="11.5"
          letterSpacing="4"
          textAnchor="middle"
        >
          HIMALAYAN OROGENY (HIMAVAT)
        </text>
      </g>

      {/* Major River Arteries */}
      <g id="river-systems" stroke="url(#riverBlue)" fill="none">
        {/* Indus / Sindhu & Punjab Tributaries */}
        <path d="M 280 150 C 260 180, 220 220, 230 270 C 240 330, 200 380, 190 430" strokeWidth="2.5" />
        <path d="M 240 230 C 270 240, 280 270, 270 290" strokeWidth="1.3" />
        <text x="175" y="320" fontFamily="'EB Garamond', serif" fontSize="10.5" fill="#4B6A91" fontStyle="italic">
          Sindhu (Indus)
        </text>

        {/* Gaṅgā & Yamunā */}
        <path d="M 390 190 C 450 220, 520 230, 600 260 C 680 290, 750 320, 790 380" strokeWidth="3" />
        <path d="M 380 215 C 440 240, 500 250, 560 270" strokeWidth="1.8" strokeDasharray="4,1" />
        <text x="590" y="248" fontFamily="'EB Garamond', serif" fontSize="11" fill="#4B6A91" fontStyle="italic">
          Gaṅgā
        </text>
        <text x="460" y="235" fontFamily="'EB Garamond', serif" fontSize="9.5" fill="#3E5777" fontStyle="italic">
          Yamunā
        </text>

        {/* Brahmaputra */}
        <path d="M 680 170 C 780 190, 860 220, 890 280 C 870 310, 820 330, 800 370" strokeWidth="2" />
        <text x="810" y="225" fontFamily="'EB Garamond', serif" fontSize="9" fill="#3E5777" fontStyle="italic">
          Brahmaputra
        </text>

        {/* Narmadā & Tapti (Dividing North & Deccan) */}
        <path d="M 320 440 C 390 445, 460 440, 520 445" strokeWidth="2" />
        <text x="410" y="434" fontFamily="'EB Garamond', serif" fontSize="9.5" fill="#425C7C" fontStyle="italic">
          Narmadā (Vindhya-Satpura Divide)
        </text>

        {/* Godavari & Krishna */}
        <path d="M 330 520 C 430 530, 520 560, 620 570" strokeWidth="2" />
        <text x="540" y="555" fontFamily="'EB Garamond', serif" fontSize="9" fill="#425C7C" fontStyle="italic">
          Godāvarī
        </text>
        <path d="M 340 590 C 440 600, 520 630, 580 640" strokeWidth="1.8" />
        <text x="500" y="625" fontFamily="'EB Garamond', serif" fontSize="9" fill="#425C7C" fontStyle="italic">
          Kṛṣṇā
        </text>

        {/* Kaveri */}
        <path d="M 380 700 C 440 710, 480 720, 530 730" strokeWidth="1.6" />
        <text x="450" y="694" fontFamily="'EB Garamond', serif" fontSize="9.5" fill="#425C7C" fontStyle="italic">
          Kāverī
        </text>
      </g>

      {/* Peninsular Physical Coastline (Non-modern National Borders) */}
      <path
        id="coastal-landmass"
        d="
          M 170 380 
          C 180 430, 250 460, 260 480 
          C 280 520, 310 600, 350 710 
          C 380 790, 430 830, 440 830 
          C 460 830, 500 780, 530 720 
          C 580 620, 640 540, 710 440 
          C 750 390, 800 380, 820 370
          C 860 380, 880 410, 890 440"
        fill="none"
        stroke="#273244"
        strokeWidth="1.8"
        strokeDasharray="2,2"
      />

      {/* TRADE & GUILD HIGHWAYS (Uttarāpatha & Dakṣiṇāpatha) */}
      <g
        id="layer-trade-routes"
        stroke="#C5A059"
        strokeWidth="1.3"
        strokeDasharray="4,3"
        fill="none"
        className={`transition-opacity duration-500 ${viewMode === 'trade' ? 'opacity-90' : 'opacity-35'}`}
      >
        {/* Uttarāpatha: Taxila -> Indraprastha -> Pataliputra -> Tamralipti */}
        <path d="M 230 175 Q 400 240 620 285 T 780 370" />
        <text
          x="330"
          y="235"
          fontFamily="'EB Garamond', serif"
          fontSize="10"
          fill="#C5A059"
          fontStyle="italic"
          transform="rotate(18, 330, 235)"
        >
          Uttarāpatha (Northern High Road)
        </text>

        {/* Dakṣiṇāpatha: Varanasi -> Ujjain -> Paithan -> Kaveri */}
        <path d="M 560 290 Q 450 340 390 385 T 350 560" />
        <text
          x="420"
          y="350"
          fontFamily="'EB Garamond', serif"
          fontSize="10"
          fill="#C5A059"
          fontStyle="italic"
          transform="rotate(-25, 420, 350)"
        >
          Dakṣiṇāpatha Route
        </text>
      </g>
    </g>
  );
};
