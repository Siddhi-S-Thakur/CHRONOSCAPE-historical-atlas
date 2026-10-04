import React from 'react';
import { useTemporal } from '../../../context/TemporalContext';
import { REVOLT_CENTERS } from '../../../data/places/revoltCenters';
import { RevoltCenter } from '../../../types';

export const Revolt1857Layer: React.FC = () => {
  const { 
    currentAnchor, 
    selectRevoltCenter, 
    selectedEntity, 
    setHoveredEntity 
  } = useTemporal();

  if (currentAnchor.id !== 'revolt') return null;

  const hubs = Object.values(REVOLT_CENTERS) as RevoltCenter[];

  return (
    <g id="layer-1857-centers" className="transition-all duration-500 select-none">
      {/* Central & Gangetic Axis Tension Cloud */}
      <path
        d="M 370 260 Q 520 230 720 290 T 560 480 Z"
        fill="#8B2635"
        fillOpacity="0.22"
        stroke="#E63946"
        strokeWidth="1.8"
        strokeDasharray="5,4"
        className="filter drop-shadow-[0_0_20px_rgba(230,57,70,0.35)]"
      />
      <text
        x="530"
        y="255"
        fontFamily="'Cinzel', serif"
        fontSize="14"
        fill="#FFA5AB"
        fontWeight="bold"
        letterSpacing="4"
        textAnchor="middle"
      >
        THE 1857 REGIONAL UPRISINGS (POLYCENTRIC RESISTANCE)
      </text>

      {/* Polycentric Regional Hubs */}
      {hubs.map((hub: RevoltCenter) => {
        const [cx, cy] = hub.coordinates;
        const isSelected = selectedEntity?.type === 'revoltCenter' && selectedEntity.data.id === hub.id;

        return (
          <g
            key={hub.id}
            className="cursor-pointer group"
            onClick={() => selectRevoltCenter(hub.id)}
            onMouseEnter={() =>
              setHoveredEntity({
                name: `1857: ${hub.name}`,
                details: `${hub.leader} (${hub.date})`,
              })
            }
            onMouseLeave={() => setHoveredEntity(null)}
          >
            {/* Animated Radar Pulse Wave */}
            <circle
              cx={cx}
              cy={cy}
              r={isSelected ? 14 : 9}
              fill="#E63946"
              className="animate-ping-slow opacity-75"
            />

            {/* Core Center Dot */}
            <circle
              cx={cx}
              cy={cy}
              r={isSelected ? 6.5 : 4.5}
              fill={hub.id === 'jhansi' ? '#FFD700' : '#FFFFFF'}
              stroke="#8B2635"
              strokeWidth={isSelected ? 2.5 : 1.5}
              className="filter drop-shadow-[0_0_8px_rgba(230,57,70,0.8)] transition-all group-hover:scale-125"
            />

            {/* Hub Label */}
            <text
              x={cx}
              y={cy - 12}
              fontFamily="'Plus Jakarta Sans', sans-serif"
              fontSize={isSelected ? '11.5' : '10'}
              fontWeight="bold"
              fill={isSelected ? '#FFE0E3' : '#FFCCD2'}
              textAnchor="middle"
              className="filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] transition-all group-hover:fill-[#FFF]"
            >
              {hub.name}
            </text>
            <text
              x={cx}
              y={cy + 16}
              fontFamily="'EB Garamond', serif"
              fontSize="9"
              fontStyle="italic"
              fill="#FFB3BA"
              textAnchor="middle"
              className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            >
              {hub.date}
            </text>
          </g>
        );
      })}
    </g>
  );
};
