import React from 'react';
import { useTemporal } from '../../context/TemporalContext';
import { MousePointer, Eye, Sparkles, Map, Globe, Shield } from 'lucide-react';
import { sound } from '../../utils/sound';

export const TemporalHUD: React.FC = () => {
  const {
    currentAnchor,
    hoveredEntity,
    globeMode,
    setGlobeMode,
    setIsStepIntoEraOpen,
  } = useTemporal();

  if (currentAnchor.id === 'geology') {
    return null;
  }

  return (
    <aside
      aria-label="Temporal Focus HUD"
      className="absolute top-6 left-7 z-20 pointer-events-auto select-none max-w-sm"
    >
      <div className="relative bg-[#0A0D15]/95 border border-[#C5A059]/30 rounded-2xl p-4 shadow-[0_16px_45px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden group">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Decorative Brass Corner Filigrees */}
        <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[#C5A059]/50" />
        <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[#C5A059]/50" />
        <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[#C5A059]/50" />
        <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[#C5A059]/50" />

        {/* Header Strip */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#C5A059] flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] inline-block animate-pulse shadow-[0_0_8px_#C5A059]" />
            CURRENT TEMPORAL FOCUS
          </span>
          <span className="px-2.5 py-0.5 text-[9px] rounded-full font-mono bg-[#182030] text-[#E2C37A] border border-[#C5A059]/30 shadow-sm">
            {currentAnchor.badge}
          </span>
        </div>

        {/* Date & Region */}
        <div className="flex items-baseline space-x-3">
          <h1 className="text-3xl font-serif-title font-bold text-[#F3EFE6] tracking-wide drop-shadow">
            {currentAnchor.yearDisplay}
          </h1>
          <span className="text-xs uppercase font-medium tracking-wider text-[#A2ABB8]">
            {currentAnchor.region}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-[#CBD5E1] font-serif-body italic mt-1.5 leading-relaxed border-t border-[#1C2538] pt-2">
          {currentAnchor.desc}
        </p>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-[#1A2234] text-[10px] font-mono text-[#7B8599]">
          <div>
            <span className="block text-[8px] uppercase tracking-wider text-[#64748B]">EXTENT</span>
            <span className="text-[#E2E8F0] font-semibold">{currentAnchor.extent}</span>
          </div>
          <div>
            <span className="block text-[8px] uppercase tracking-wider text-[#64748B]">HEGEMON</span>
            <span className="text-[#FDE047] font-semibold truncate block" title={currentAnchor.hegemon}>
              {currentAnchor.hegemon}
            </span>
          </div>
          <div>
            <span className="block text-[8px] uppercase tracking-wider text-[#64748B]">CAPITAL</span>
            <span className="text-[#E2E8F0] font-semibold truncate block" title={currentAnchor.capital}>
              {currentAnchor.capital}
            </span>
          </div>
        </div>

        {/* ── Action Strip: Projection Toggle + Step Into Era ───────────────── */}
        <div className="flex items-center justify-between gap-2 mt-3.5 pt-2.5 border-t border-[#1A2234]">
          {/* Projection View Toggle */}
          <div className="flex items-center gap-1 bg-[#101522] p-0.5 rounded-lg border border-[#222E44]">
            <button
              onClick={() => {
                sound.playClick(600);
                setGlobeMode('2d');
              }}
              className={`flex items-center gap-1 px-2 py-1 text-[9px] font-mono rounded-md transition-all ${
                globeMode === '2d'
                  ? 'bg-gradient-to-r from-[#C5A059] to-[#E2C37A] text-[#0A0D14] font-bold shadow'
                  : 'text-[#8A95A8] hover:text-[#CCD3E2]'
              }`}
            >
              <Map className="w-3 h-3" />
              <span>2D</span>
            </button>
            <button
              onClick={() => {
                sound.playClick(600);
                setGlobeMode('3d');
              }}
              className={`flex items-center gap-1 px-2 py-1 text-[9px] font-mono rounded-md transition-all ${
                globeMode === '3d'
                  ? 'bg-gradient-to-r from-[#40BEEF] to-[#60A5FA] text-[#0A0D14] font-bold shadow'
                  : 'text-[#8A95A8] hover:text-[#CCD3E2]'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>3D</span>
            </button>
          </div>

          {/* "Step Into Era" Quick Action */}
          <button
            onClick={() => {
              sound.playClick(850);
              setIsStepIntoEraOpen(true);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-lg bg-gradient-to-r from-[#C5A059]/20 to-[#C5A059]/10 hover:from-[#C5A059]/30 hover:to-[#C5A059]/20 border border-[#C5A059]/40 hover:border-[#C5A059]/80 text-[#FDE047] text-[10px] font-mono font-semibold tracking-wider transition-all duration-200 shadow-md group/btn"
          >
            <Eye className="w-3 h-3 text-[#FDE047] group-hover/btn:scale-110 transition-transform" />
            <span>STEP INTO ERA</span>
          </button>
        </div>
      </div>

      {/* Dynamic Interactive Hint Pill */}
      <div className="mt-2.5 bg-[#0C101A]/95 border border-[#C5A059]/20 rounded-full px-3.5 py-1.5 flex items-center space-x-2 text-[11px] text-[#A0ABC0] w-fit shadow-lg backdrop-blur-md">
        <MousePointer className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
        {hoveredEntity ? (
          <span className="truncate max-w-xs">
            <strong className="text-[#FDE047] font-semibold">{hoveredEntity.name}</strong>
            {hoveredEntity.details ? ` — ${hoveredEntity.details}` : ' • Click to inspect'}
          </span>
        ) : (
          <span>
            {currentAnchor.id === 'revolt'
              ? 'Click any red revolt marker to inspect polycentric regional struggles'
              : globeMode === '3d'
              ? 'Drag globe to rotate • Click 3D arcs to inspect trade cargo & sources'
              : 'Hover an empire to inspect borders • Click city marker to zoom'}
          </span>
        )}
      </div>
    </aside>
  );
};
