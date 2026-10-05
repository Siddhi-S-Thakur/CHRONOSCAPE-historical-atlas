import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useTemporal } from '../../context/TemporalContext';
import { TEMPORAL_ANCHORS } from '../../data/timeline/anchors';
import { TemporalAnchor } from '../../types';
import { Play, Pause, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { sound } from '../../utils/sound';

export const Timeline: React.FC = () => {
  const {
    currentAnchor,
    setAnchorById,
    isPlaying,
    togglePlay,
  } = useTemporal();

  const trackRef = useRef<HTMLDivElement>(null);
  const [hoveredAnchor, setHoveredAnchor] = useState<TemporalAnchor | null>(null);
  const [cursorPercent, setCursorPercent] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // ── Keyboard Arrow Navigation ─────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in search or input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const currentIndex = TEMPORAL_ANCHORS.findIndex(a => a.id === currentAnchor.id);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = Math.min(TEMPORAL_ANCHORS.length - 1, currentIndex + 1);
        if (nextIndex !== currentIndex) {
          setAnchorById(TEMPORAL_ANCHORS[nextIndex].id);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = Math.max(0, currentIndex - 1);
        if (prevIndex !== currentIndex) {
          setAnchorById(TEMPORAL_ANCHORS[prevIndex].id);
        }
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentAnchor.id, setAnchorById, togglePlay]);

  // ── Find Nearest Anchor from percentage ───────────────────────────────────
  const getNearestAnchor = useCallback((percent: number) => {
    let nearest = TEMPORAL_ANCHORS[0];
    let minDiff = 100;
    TEMPORAL_ANCHORS.forEach(anchor => {
      const diff = Math.abs(anchor.timelinePercent - percent);
      if (diff < minDiff) {
        minDiff = diff;
        nearest = anchor;
      }
    });
    return nearest;
  }, []);

  // ── Mouse Scrubber Handlers ───────────────────────────────────────────────
  const handleTrackInteraction = useCallback((e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setCursorPercent(clickPercent);

    const nearest = getNearestAnchor(clickPercent);
    if (nearest.id !== currentAnchor.id) {
      setAnchorById(nearest.id);
    }
  }, [currentAnchor.id, getNearestAnchor, setAnchorById]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleTrackInteraction(e);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleTrackInteraction(e);
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleTrackInteraction]);

  // ── Step to previous / next epoch ─────────────────────────────────────────
  const currentIndex = TEMPORAL_ANCHORS.findIndex(a => a.id === currentAnchor.id);
  const prevAnchor = currentIndex > 0 ? TEMPORAL_ANCHORS[currentIndex - 1] : null;
  const nextAnchor = currentIndex < TEMPORAL_ANCHORS.length - 1 ? TEMPORAL_ANCHORS[currentIndex + 1] : null;

  return (
    <footer
      aria-label="Master Temporal Engine"
      className="h-28 w-full border-t border-[#C5A059]/20 bg-[#07090F]/95 backdrop-blur-2xl flex flex-col justify-between px-6 py-2.5 z-40 select-none shrink-0 relative shadow-[0_-8px_32px_rgba(0,0,0,0.7)]"
    >
      {/* ── Upper Control Strip ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between text-xs">
        {/* Play/Step Controls */}
        <div className="flex items-center space-x-3">
          {/* Step Back */}
          <button
            onClick={() => prevAnchor && setAnchorById(prevAnchor.id)}
            disabled={!prevAnchor}
            title={prevAnchor ? `Step backward to ${prevAnchor.yearDisplay}` : 'Start of timeline'}
            className="w-8 h-8 rounded-lg bg-[#121622] hover:bg-[#1A2234] border border-[#222B3D] disabled:opacity-30 disabled:pointer-events-none text-[#A0ABC0] hover:text-[#F3EFE6] transition-all flex items-center justify-center shadow"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Auto-Flow Button */}
          <button
            onClick={() => {
              sound.playClick(600);
              togglePlay();
            }}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg border transition-all duration-300 shadow-md ${
              isPlaying
                ? 'bg-gradient-to-r from-[#8E2822] to-[#B33930] border-[#E63946] text-[#FFF] shadow-[0_0_15px_rgba(230,57,70,0.5)]'
                : 'bg-[#141A28] hover:bg-[#1B2336] border-[#2E3B52] hover:border-[#C5A059]/40 text-[#E2DDD3]'
            }`}
            title="Auto-step through historical eras (Spacebar)"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-[#FFF] animate-pulse" />
            ) : (
              <Play className="w-3.5 h-3.5 text-[#C5A059]" />
            )}
            <span className="font-mono text-[11px] font-semibold tracking-wider">
              {isPlaying ? 'PAUSE AUTO-FLOW' : 'TIMELINE AUTO-FLOW'}
            </span>
          </button>

          {/* Step Forward */}
          <button
            onClick={() => nextAnchor && setAnchorById(nextAnchor.id)}
            disabled={!nextAnchor}
            title={nextAnchor ? `Step forward to ${nextAnchor.yearDisplay}` : 'End of timeline'}
            className="w-8 h-8 rounded-lg bg-[#121622] hover:bg-[#1A2234] border border-[#222B3D] disabled:opacity-30 disabled:pointer-events-none text-[#A0ABC0] hover:text-[#F3EFE6] transition-all flex items-center justify-center shadow"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="text-[#64748B] font-mono text-[11px] hidden lg:inline-flex items-center gap-1.5 pl-2">
            <span>Use</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#10141F] border border-[#222B3D] text-[9px] text-[#A0ABC0]">←</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-[#10141F] border border-[#222B3D] text-[9px] text-[#A0ABC0]">→</kbd>
            <span>keys to travel time • Drag scrubber to sweep</span>
          </span>
        </div>

        {/* Selected Temporal Anchor Display Badge */}
        <div className="flex items-center space-x-2.5">
          <span className="text-[10px] font-mono text-[#78859E] uppercase tracking-wider hidden sm:inline">
            TEMPORAL HORIZON:
          </span>
          <div className="bg-[#0F1420] border border-[#C5A059]/60 px-3.5 py-1 rounded-lg text-sm font-serif-title font-bold text-[#FDE047] tracking-widest shadow-[0_0_16px_rgba(197,160,89,0.25)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span>{currentAnchor.yearDisplay}</span>
          </div>
        </div>
      </div>

      {/* ── Interactive Timeline Track & Node Breakpoints ─────────────────── */}
      <div className="relative w-full py-1">
        {/* Floating Tooltip when hovering track */}
        {hoveredAnchor && (
          <div
            className="absolute -top-12 z-50 pointer-events-none -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[#0C101A]/95 border border-[#C5A059]/50 shadow-xl backdrop-blur-md flex items-center gap-2 text-xs transition-all duration-150"
            style={{ left: `${hoveredAnchor.timelinePercent}%` }}
          >
            <span className="font-serif-title text-[#FDE047] font-bold">
              {hoveredAnchor.yearDisplay}
            </span>
            <span className="text-[#7A859B]">|</span>
            <span className="text-[10px] font-mono text-[#A2ABB8] uppercase">
              {hoveredAnchor.hegemon}
            </span>
          </div>
        )}

        {/* Track Background */}
        <div
          ref={trackRef}
          onMouseDown={handleMouseDown}
          className="h-2.5 w-full bg-[#121724] rounded-full relative flex items-center cursor-pointer hover:bg-[#171E2E] transition-colors shadow-inner"
        >
          {/* Progress Glowing Fill */}
          <div
            className="h-full bg-gradient-to-r from-[#63481B] via-[#C5A059] to-[#FDE047] rounded-full shadow-[0_0_12px_rgba(197,160,89,0.7)] transition-all duration-200"
            style={{ width: `${currentAnchor.timelinePercent}%` }}
          />

          {/* Draggable Scrubber Cursor */}
          <div
            className="absolute -translate-x-1/2 w-5 h-8 bg-gradient-to-b from-[#FFF2B2] via-[#E8C87A] to-[#A07828] border-2 border-[#090C14] rounded-md shadow-[0_0_18px_rgba(253,224,71,0.65)] flex items-center justify-center cursor-ew-resize hover:scale-125 transition-transform z-30"
            style={{ left: `${currentAnchor.timelinePercent}%` }}
          >
            <div className="w-0.5 h-4 bg-[#090C14] rounded-full" />
          </div>
        </div>

        {/* Milestone Node Breakpoints */}
        <div className="w-full flex justify-between items-start mt-2.5 px-0.5 text-[10px] font-mono text-[#788399]">
          {TEMPORAL_ANCHORS.map(anchor => {
            const isActive = currentAnchor.id === anchor.id;
            const isRevolt = anchor.id === 'revolt';
            const isChola = anchor.id === 'chola';
            const isGeology = anchor.id === 'geology';

            return (
              <button
                key={anchor.id}
                onClick={() => {
                  sound.playClick(anchor.id === 'revolt' ? 400 : 750);
                  setAnchorById(anchor.id);
                }}
                onMouseEnter={() => setHoveredAnchor(anchor)}
                onMouseLeave={() => setHoveredAnchor(null)}
                className="flex flex-col items-center group focus:outline-none transition-all py-0.5"
              >
                {/* Jewel Node Marker */}
                <div
                  className={`transition-all duration-300 rounded-sm mb-1 ${
                    isActive
                      ? isRevolt
                        ? 'w-2 h-3.5 bg-[#E63946] shadow-[0_0_12px_#E63946]'
                        : isChola
                        ? 'w-2 h-3.5 bg-[#40BEEF] shadow-[0_0_12px_#40BEEF]'
                        : isGeology
                        ? 'w-2 h-3.5 bg-[#A855F7] shadow-[0_0_12px_#A855F7]'
                        : 'w-2 h-3.5 bg-[#FDE047] shadow-[0_0_12px_#FDE047]'
                      : 'w-1 h-2 bg-[#2D374D] group-hover:bg-[#C5A059] group-hover:h-3'
                  }`}
                />
                <span
                  className={`font-serif-title transition-colors whitespace-nowrap ${
                    isActive
                      ? isRevolt
                        ? 'font-bold text-[#FFA0A8]'
                        : isChola
                        ? 'font-bold text-[#7DD3FC]'
                        : 'font-bold text-[#FDE047]'
                      : 'text-[#8591A8] group-hover:text-[#F3EFE6]'
                  }`}
                >
                  {anchor.yearDisplay.replace('c. ', '')}
                </span>
                <span
                  className={`text-[8px] uppercase tracking-tighter truncate max-w-[65px] transition-colors ${
                    isActive
                      ? isRevolt
                        ? 'text-[#E63946] font-semibold'
                        : isChola
                        ? 'text-[#38BDF8] font-semibold'
                        : 'text-[#C5A059] font-semibold'
                      : 'text-[#475569] group-hover:text-[#78859E]'
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
