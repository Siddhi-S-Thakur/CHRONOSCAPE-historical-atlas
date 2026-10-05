import React, { useCallback } from 'react';
import { useTemporal } from '../../context/TemporalContext';
import { GeologicalGlobe } from './GeologicalGlobe';
import { HistoricalGlobeDeck } from './HistoricalGlobeDeck';
import { HistoricalMapGL } from './HistoricalMapGL';
import { RotateCcw, Globe, Map as MapIcon } from 'lucide-react';

export const MapWorkspace: React.FC = () => {
  const {
    currentAnchor,
    resetView,
    selectPlace,
    selectEmpire,
    selectRevoltCenter,
    globeMode,
    setGlobeMode,
  } = useTemporal();

  const isGeology = currentAnchor.id === 'geology';
  const isDeckGlobe = !isGeology && globeMode === '3d';

  const handleCityClick = useCallback((placeId: string) => {
    selectPlace(placeId);
  }, [selectPlace]);

  const handleTerritoryClick = useCallback((empireId: string) => {
    selectEmpire(empireId);
  }, [selectEmpire]);

  const handleRevoltCenterClick = useCallback((centerId: string) => {
    selectRevoltCenter(centerId);
  }, [selectRevoltCenter]);

  return (
    <main
      id="map-viewport"
      aria-label="Historical Map Workspace"
      className="relative flex-1 h-full w-full overflow-hidden bg-[#060810]"
    >
      {/* GEOLOGICAL ERA: Three.js 3D Globe */}
      {isGeology && (
        <div className="absolute inset-0 w-full h-full">
          <GeologicalGlobe />
        </div>
      )}

      {/* HISTORICAL ERAS: 3D Deck.gl Globe */}
      {!isGeology && isDeckGlobe && (
        <div className="absolute inset-0 w-full h-full">
          <HistoricalGlobeDeck />
        </div>
      )}

      {/* HISTORICAL ERAS: Real MapLibre GL map with territory overlays */}
      {!isGeology && !isDeckGlobe && (
        <HistoricalMapGL
          onCityClick={handleCityClick}
          onTerritoryClick={handleTerritoryClick}
          onRevoltCenterClick={handleRevoltCenterClick}
        />
      )}

      {/* ── Projection Switcher (Planar 2D Map vs 3D Deck.gl Globe) ───────── */}
      {!isGeology && (
        <div className="absolute top-6 right-8 z-20 flex items-center p-1 rounded-xl bg-[#090D16]/95 border border-[#C5A059]/35 shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-md">
          <button
            onClick={() => setGlobeMode('2d')}
            title="Switch to Planar 2.5D Cartographic Atlas"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
              !isDeckGlobe
                ? 'bg-gradient-to-r from-[#C5A059] to-[#E2C37A] text-[#0A0D14] font-bold shadow-md'
                : 'text-[#8A95A8] hover:text-[#F3EFE6] hover:bg-[#182032]'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>2D ATLAS</span>
          </button>
          <button
            onClick={() => setGlobeMode('3d')}
            title="Switch to 3D Deck.gl Spherical Globe with Trade Arcs"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
              isDeckGlobe
                ? 'bg-gradient-to-r from-[#40BEEF] to-[#60A5FA] text-[#0A0D14] font-bold shadow-md'
                : 'text-[#8A95A8] hover:text-[#F3EFE6] hover:bg-[#182032]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>3D GLOBE</span>
          </button>
        </div>
      )}

      {/* Compass Rose — decorative, top-right (only in 2D Atlas mode) */}
      {!isDeckGlobe && (
        <div className="absolute right-8 top-24 pointer-events-none z-10 flex flex-col items-center opacity-50">
          <div className="w-14 h-14 rounded-full border border-[#C5A059]/35 flex items-center justify-center relative">
            <div className="w-10 h-10 rounded-full border border-[#2A3040]/60" />
            <span className="absolute -top-2 text-[9px] font-serif-title font-bold text-[#C5A059] tracking-widest">N</span>
            <span className="absolute -bottom-2.5 text-[8px] font-mono text-[#5A6475]">S</span>
            <span className="absolute -right-2.5 text-[8px] font-mono text-[#5A6475]">E</span>
            <span className="absolute -left-2.5 text-[8px] font-mono text-[#5A6475]">W</span>
            <div className="w-px h-11 bg-[#C5A059]/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="h-px w-11 bg-[#C5A059]/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            {/* North indicator tick */}
            <div className="w-1 h-4 bg-[#C5A059]/70 absolute top-0.5 left-1/2 -translate-x-1/2 rounded-full" />
          </div>
          <span className="text-[9px] font-mono text-[#4A5468] mt-1.5 tracking-widest">20°35'N</span>
          <span className="text-[9px] font-mono text-[#4A5468] tracking-widest">78°57'E</span>
        </div>
      )}

      {/* Reset view button */}
      {!isDeckGlobe && (
        <div className="absolute bottom-28 right-4 z-20">
          <button
            onClick={resetView}
            title="Reset map view"
            className="w-8 h-8 rounded-lg bg-[#0B0E18]/90 border border-[#1F2535] hover:border-[#C5A059]/40 text-[#6A7590] hover:text-[#F3EFE6] transition-all flex items-center justify-center backdrop-blur-md shadow-xl"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Scale bar — bottom-left (only in 2D Atlas mode) */}
      {!isDeckGlobe && !isGeology && (
        <div className="absolute bottom-28 left-4 z-10 pointer-events-none">
          <div className="flex flex-col items-start gap-1 opacity-60">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-16 h-px bg-[#C5A059]/50" />
                <div className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-px h-2 bg-[#C5A059]/50" />
                <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-px h-2 bg-[#C5A059]/50" />
              </div>
              <span className="text-[9px] font-mono text-[#7A8494] tracking-widest">~500 KM</span>
            </div>
            <span className="text-[8px] font-mono text-[#4A5468] tracking-widest">
              PROJ: MERCATOR • WGS84
            </span>
          </div>
        </div>
      )}
    </main>
  );
};
