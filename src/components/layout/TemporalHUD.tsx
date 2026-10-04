import React from 'react';
import { useTemporal } from '../../context/TemporalContext';
import { MousePointer } from 'lucide-react';

export const TemporalHUD: React.FC = () => {
  const { currentAnchor, hoveredEntity } = useTemporal();

  if (currentAnchor.id === 'geology') {
    return null;
  }

  return (
    <aside aria-label="Temporal Focus HUD" className="absolute top-6 left-7 z-20 pointer-events-auto select-none max-w-sm">
      <div className="bg-[#0D1017]/95 border border-[#272F40] rounded-lg p-4 shadow-[0_12px_36px_rgba(0,0,0,0.6)] backdrop-blur-md">
        {/* Header Strip */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#C5A059] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] inline-block animate-pulse"></span>
            CURRENT TEMPORAL FOCUS
          </span>
          <span className="px-2 py-0.5 text-[9px] rounded font-mono bg-[#1E2536] text-[#AAB4C8] border border-[#2E374D]">
            {currentAnchor.badge}
          </span>
        </div>

        {/* Date & Region */}
        <div className="flex items-baseline space-x-3">
          <h1 className="text-3xl font-serif-title font-bold text-[#F3EFE6] tracking-wide">
            {currentAnchor.yearDisplay}
          </h1>
          <span className="text-xs uppercase font-medium tracking-wider text-[#A2ABB8]">
            {currentAnchor.region}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-[#B2B9C8] font-serif-body italic mt-1 leading-relaxed border-t border-[#1F2535] pt-2">
          {currentAnchor.desc}
        </p>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-[#1C2230] text-[10px] font-mono text-[#7B8599]">
          <div>
            <span className="block text-[8px] uppercase tracking-wider text-[#555E72]">EXTENT</span>
            <span className="text-[#CCD3E2] font-semibold">{currentAnchor.extent}</span>
          </div>
          <div>
            <span className="block text-[8px] uppercase tracking-wider text-[#555E72]">HEGEMON</span>
            <span className="text-[#E0C688] font-semibold truncate block" title={currentAnchor.hegemon}>
              {currentAnchor.hegemon}
            </span>
          </div>
          <div>
            <span className="block text-[8px] uppercase tracking-wider text-[#555E72]">CAPITAL</span>
            <span className="text-[#CCD3E2] font-semibold truncate block" title={currentAnchor.capital}>
              {currentAnchor.capital}
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Interactive Hint Pill */}
      <div className="mt-2.5 bg-[#121620]/90 border border-[#222938] rounded-full px-3 py-1 flex items-center space-x-2 text-[11px] text-[#939DAF] w-fit shadow-md backdrop-blur-sm">
        <MousePointer className="w-3.5 h-3.5 text-[#C5A059]" />
        {hoveredEntity ? (
          <span>
            <strong className="text-[#E5C16C] font-semibold">{hoveredEntity.name}</strong>
            {hoveredEntity.details ? ` — ${hoveredEntity.details}` : ' • Click to inspect'}
          </span>
        ) : (
          <span>
            {currentAnchor.id === 'revolt' 
              ? 'Click any red revolt marker to inspect polycentric regional struggles'
              : currentAnchor.id === 'geology'
              ? 'Deep time tectonic drift of Indian Plate into Tethys'
              : 'Hover an empire to inspect borders • Click city marker to zoom'}
          </span>
        )}
      </div>
    </aside>
  );
};
