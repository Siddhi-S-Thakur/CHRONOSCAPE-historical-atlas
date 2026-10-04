import React, { useRef } from 'react';
import { useTemporal } from '../../context/TemporalContext';
import { TEMPORAL_ANCHORS } from '../../data/timeline/anchors';
import { Play, Pause } from 'lucide-react';

export const Timeline: React.FC = () => {
  const { 
    currentAnchor, 
    setAnchorById, 
    isPlaying, 
    togglePlay 
  } = useTemporal();

  const trackRef = useRef<HTMLDivElement>(null);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));

    // Find nearest anchor
    let nearest = TEMPORAL_ANCHORS[0];
    let minDiff = 100;
    TEMPORAL_ANCHORS.forEach(anchor => {
      const diff = Math.abs(anchor.timelinePercent - clickPercent);
      if (diff < minDiff) {
        minDiff = diff;
        nearest = anchor;
      }
    });

    setAnchorById(nearest.id);
  };

  return (
    <footer aria-label="Master Temporal Engine" className="h-28 w-full border-t border-[#1F2636] bg-[#0A0D13]/95 backdrop-blur-lg flex flex-col justify-between px-7 py-2.5 z-30 select-none shrink-0">
      {/* Upper Control Strip */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          {/* Play / Auto-flow Toggle */}
          <button
            onClick={togglePlay}
            className={`flex items-center space-x-2 px-3 py-1 rounded border transition-colors ${
              isPlaying
                ? 'bg-[#2E2012] border-[#C5A059] text-[#F3EFE6]'
                : 'bg-[#1B2232] hover:bg-[#252F44] border-[#2E394E] text-[#E2DDD3]'
            }`}
            title="Auto-step through historical eras"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-[#C5A059]" />
            ) : (
              <Play className="w-3.5 h-3.5 text-[#C5A059]" />
            )}
            <span className="font-mono text-[11px] font-medium">
              {isPlaying ? 'PAUSE AUTO-FLOW' : 'TIMELINE AUTO-FLOW'}
            </span>
          </button>

          <span className="text-[#67738B] font-mono text-[11px] hidden md:inline">
            Drag scrubber or click milestones to evolve historical geography
          </span>
        </div>

        {/* Selected Temporal Anchor Display Badge */}
        <div className="flex items-center space-x-3">
          <span className="text-[11px] font-mono text-[#8C95A8] uppercase tracking-wider hidden sm:inline">
            CHRONOLOGICAL POSITION:
          </span>
          <div className="bg-[#121722] border border-[#C5A059]/50 px-3.5 py-0.5 rounded text-sm font-serif-title font-bold text-[#F3EFE6] tracking-widest shadow-[0_0_12px_rgba(197,160,89,0.15)]">
            {currentAnchor.yearDisplay}
          </div>
        </div>
      </div>

      {/* The Tactile Interactive Timeline Track */}
      <div className="relative w-full py-1">
        {/* Track Background */}
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className="h-2 w-full bg-[#171E2B] rounded-full relative flex items-center cursor-pointer hover:bg-[#1D2637] transition-colors"
        >
          {/* Progress Fill */}
          <div
            className="h-full bg-gradient-to-r from-[#8E6F2E] via-[#C5A059] to-[#E5C16C] rounded-full shadow-[0_0_10px_rgba(197,160,89,0.6)] transition-all duration-300"
            style={{ width: `${currentAnchor.timelinePercent}%` }}
          />

          {/* Draggable Scrubber Cursor */}
          <div
            className="absolute -translate-x-1/2 w-4 h-7 bg-[#E8C87A] border-2 border-[#0B0D12] rounded shadow-xl flex items-center justify-center cursor-ew-resize hover:scale-110 transition-all"
            style={{ left: `${currentAnchor.timelinePercent}%` }}
          >
            <div className="w-0.5 h-3 bg-[#0B0D12]" />
          </div>
        </div>

        {/* Milestone Node Breakpoints */}
        <div className="w-full flex justify-between items-start mt-2 px-0.5 text-[10px] font-mono text-[#788399] overflow-x-auto">
          {TEMPORAL_ANCHORS.map(anchor => {
            const isActive = currentAnchor.id === anchor.id;
            const isRevolt = anchor.id === 'revolt';

            return (
              <button
                key={anchor.id}
                onClick={() => setAnchorById(anchor.id)}
                className="flex flex-col items-center group focus:outline-none transition-all"
              >
                <div
                  className={`transition-all mb-1 ${
                    isActive
                      ? isRevolt
                        ? 'w-1.5 h-3 bg-[#E63946] shadow-[0_0_8px_#E63946]'
                        : 'w-1.5 h-3 bg-[#C5A059] shadow-[0_0_8px_#C5A059]'
                      : 'w-1 h-2 bg-[#3B465D] group-hover:bg-[#C5A059]'
                  }`}
                />
                <span
                  className={`font-serif-title transition-colors whitespace-nowrap ${
                    isActive
                      ? isRevolt
                        ? 'font-bold text-[#FFA0A8]'
                        : 'font-bold text-[#E5C378]'
                      : 'text-[#8E97AA] group-hover:text-[#F3EFE6]'
                  }`}
                >
                  {anchor.yearDisplay.replace('c. ', '')}
                </span>
                <span
                  className={`text-[8px] uppercase tracking-tighter truncate max-w-[65px] transition-colors ${
                    isActive
                      ? isRevolt
                        ? 'text-[#E63946] font-semibold'
                        : 'text-[#C5A059] font-semibold'
                      : 'text-[#556075] group-hover:text-[#8894A8]'
                  }`}
                >
                  {anchor.badge.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
