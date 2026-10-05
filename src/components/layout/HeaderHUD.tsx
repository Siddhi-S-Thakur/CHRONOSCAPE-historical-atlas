import React, { useEffect, useRef, useState } from 'react';
import { useTemporal } from '../../context/TemporalContext';
import { TEMPORAL_ANCHORS } from '../../data/timeline/anchors';
import { Search, BookOpen, Compass, Volume2, VolumeX, Sparkles, ChevronDown, Play, Pause } from 'lucide-react';
import { gsap } from 'gsap';
import { sound } from '../../utils/sound';

export const HeaderHUD: React.FC = () => {
  const {
    currentAnchor,
    setAnchorById,
    setIsSearchOpen,
    setIsSourcesOpen,
    isAmbientAudio,
    toggleAmbientAudio,
    isPlaying,
    togglePlay,
  } = useTemporal();

  const brandRef = useRef<HTMLDivElement>(null);
  const [isEpochMenuOpen, setIsEpochMenuOpen] = useState(false);

  // GSAP intro animation
  useEffect(() => {
    if (!brandRef.current) return;
    gsap.fromTo(
      brandRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
    );
  }, []);

  return (
    <header
      className="h-16 w-full px-6 flex items-center justify-between z-40 border-b border-[#C5A059]/15 select-none shrink-0 relative"
      style={{
        background: 'linear-gradient(to right, rgba(6,8,14,0.96) 0%, rgba(10,14,24,0.94) 50%, rgba(6,8,14,0.96) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 1px 0 rgba(197,160,89,0.12), 0 8px 32px rgba(0,0,0,0.6)',
      }}
    >
      {/* ── Brand Mark ─────────────────────────────────────────────────── */}
      <div
        ref={brandRef}
        className="flex items-center space-x-3.5 cursor-pointer group"
        onClick={() => {
          sound.playClick(800);
          setAnchorById('maurya');
        }}
        title="Return to 260 BCE Mauryan state"
      >
        {/* Emblem */}
        <div className="relative w-9 h-9">
          <div className="absolute inset-0 rounded-full border border-[#C5A059]/60 bg-gradient-to-br from-[#241A0B] via-[#120E06] to-[#080A0E] shadow-[0_0_25px_rgba(197,160,89,0.3)] group-hover:shadow-[0_0_35px_rgba(197,160,89,0.55)] transition-all duration-500" />
          <Compass
            className="absolute inset-0 m-auto text-[#C5A059] group-hover:text-[#FDE047] transition-all duration-300 group-hover:rotate-45"
            style={{ width: 19, height: 19, margin: 'auto', top: 0, left: 0, right: 0, bottom: 0, position: 'absolute' }}
          />
          {/* Outer Celestial Ring */}
          <div
            className="absolute -inset-1 rounded-full border border-[#C5A059]/20 group-hover:border-[#C5A059]/50 transition-all duration-500"
            style={{ animation: 'spin 14s linear infinite' }}
          />
        </div>

        {/* Title & Tagline */}
        <div>
          <div className="flex items-center gap-2">
            <span
              className="block font-serif-title text-[1.38rem] font-bold tracking-[0.24em] text-[#F3EFE6] group-hover:text-[#E8CF91] transition-colors duration-300 drop-shadow-sm"
              style={{ letterSpacing: '0.24em', lineHeight: 1 }}
            >
              CHRONOSCAPE
            </span>
            <span className="hidden xl:inline-block px-1.5 py-0.5 rounded text-[8px] font-mono tracking-widest uppercase bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#E5C16C]">
              ATLAS OF INDIA
            </span>
          </div>
          <span
            className="block text-[8.5px] uppercase tracking-[0.3em] text-[#7A8494] group-hover:text-[#9BA5B9] transition-colors duration-300"
            style={{ marginTop: 2, letterSpacing: '0.3em' }}
          >
            Explore the past. Don't just read it.
          </span>
        </div>
      </div>

      {/* ── Interactive Era Indicator / Epoch Quick-Menu (Center) ───────── */}
      <div className="relative">
        <button
          onClick={() => {
            sound.playClick(700);
            setIsEpochMenuOpen(prev => !prev);
          }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111624]/90 border border-[#C5A059]/30 hover:border-[#C5A059]/70 hover:bg-[#161D2E] transition-all duration-200 group shadow-lg backdrop-blur-md"
          title="Click to view all epochs"
        >
          <div className="flex flex-col items-center">
            <span className="font-serif-title text-[#F3EFE6] group-hover:text-[#FDE047] text-xs font-bold tracking-[0.18em] transition-colors">
              {currentAnchor.yearDisplay}
            </span>
            <span className="font-mono text-[8px] tracking-[0.22em] text-[#A2ABB8] uppercase">
              {currentAnchor.badge}
            </span>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#C5A059] transition-transform duration-300 ${
              isEpochMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Epoch Dropdown Drawer */}
        {isEpochMenuOpen && (
          <div
            className="absolute top-12 left-1/2 -translate-x-1/2 w-80 max-h-96 overflow-y-auto p-2 rounded-2xl bg-[#090D16]/98 border border-[#C5A059]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl z-50 flex flex-col gap-1"
          >
            <div className="px-3 py-1.5 border-b border-[#1A2234] flex items-center justify-between text-[9px] font-mono text-[#C5A059] uppercase tracking-wider">
              <span>SELECT HISTORICAL EPOCH</span>
              <span>11 ANCHORS</span>
            </div>
            {TEMPORAL_ANCHORS.map((anchor, idx) => {
              const isActive = anchor.id === currentAnchor.id;
              return (
                <button
                  key={anchor.id}
                  onClick={() => {
                    setAnchorById(anchor.id);
                    setIsEpochMenuOpen(false);
                  }}
                  className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C5A059]/25 to-[#C5A059]/10 border border-[#C5A059]/50 text-[#F3EFE6]'
                      : 'hover:bg-[#141A28] text-[#94A3B8] hover:text-[#F3EFE6]'
                  }`}
                >
                  <div>
                    <div className="font-serif-title text-xs font-bold tracking-wider">
                      {anchor.yearDisplay}
                    </div>
                    <div className="text-[9px] text-[#64748B] font-mono truncate max-w-[170px]">
                      {anchor.hegemon}
                    </div>
                  </div>
                  <span className="text-[8px] font-mono uppercase px-2 py-0.5 rounded bg-[#10141F] border border-[#1E2536] text-[#A0ABC0]">
                    {anchor.badge.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Right Controls: Audio + Auto-Odyssey + Search + Sources ─────── */}
      <div className="flex items-center gap-2.5">
        {/* Ambient Historical Soundscape Toggle */}
        <button
          onClick={() => {
            sound.playClick(900);
            toggleAmbientAudio();
          }}
          title={isAmbientAudio ? 'Mute ambient soundscape' : 'Enable ambient meditative soundscape'}
          className={`group flex items-center gap-2 h-9 px-3 rounded-full border transition-all duration-300 ${
            isAmbientAudio
              ? 'bg-[#C5A059]/20 border-[#C5A059]/60 text-[#FDE047] shadow-[0_0_15px_rgba(197,160,89,0.3)]'
              : 'bg-white/[0.03] border-white/10 text-[#7E889B] hover:text-[#F3EFE6] hover:bg-white/[0.08]'
          }`}
        >
          {isAmbientAudio ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#FDE047]" />
              {/* Dynamic Animated Waveform Bars */}
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-3 bg-[#FDE047] rounded-full animate-pulse" />
                <span className="w-0.5 h-1.5 bg-[#FDE047] rounded-full animate-pulse delay-75" />
                <span className="w-0.5 h-2.5 bg-[#FDE047] rounded-full animate-pulse delay-150" />
              </div>
              <span className="hidden sm:inline text-[10px] font-mono font-medium">SOUNDSCAPE</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[10px] font-mono">SOUND</span>
            </>
          )}
        </button>

        {/* Cinematic Odyssey (Auto-Play Timeline) */}
        <button
          onClick={() => {
            sound.playClick(650);
            togglePlay();
          }}
          title="Auto-play chronological journey across 70 million years"
          className={`flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-xs font-mono transition-all duration-300 ${
            isPlaying
              ? 'bg-gradient-to-r from-[#E63946]/30 to-[#E63946]/15 border-[#E63946] text-[#FFA69E] shadow-[0_0_15px_rgba(230,57,70,0.4)]'
              : 'bg-white/[0.03] border-white/10 text-[#8E97AA] hover:text-[#F3EFE6] hover:bg-white/[0.08]'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-[#E63946]" />
              <span className="hidden sm:inline text-[10px] font-bold">PAUSE TOUR</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline text-[10px] font-bold text-[#E2DDD3]">TOUR</span>
            </>
          )}
        </button>

        <div className="w-px h-5 bg-[#1F2535] mx-0.5" />

        {/* Search */}
        <button
          id="search-button"
          onClick={() => {
            sound.playClick(750);
            setIsSearchOpen(true);
          }}
          title="Search people, places, empires, events (Cmd+K)"
          className="group flex items-center gap-2 h-9 pl-3 pr-3.5 rounded-full transition-all duration-200 bg-white/[0.04] border border-[#C5A059]/25 hover:border-[#C5A059]/60 hover:bg-[#C5A059]/10 shadow-sm"
        >
          <Search className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="hidden md:inline text-[#B8C0CF] text-xs font-medium tracking-wide">Search</span>
          <kbd className="hidden lg:inline-flex items-center text-[9px] font-mono text-[#6A7590] bg-[#0A0C12] border border-[#1F2535] px-1.5 py-0.5 rounded">
            ⌘K
          </kbd>
        </button>

        {/* Sources */}
        <button
          id="sources-button"
          onClick={() => {
            sound.playClick(750);
            setIsSourcesOpen(true);
          }}
          title="Historiographical evidence & citations"
          className="group flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-medium tracking-wide transition-all duration-200 bg-white/[0.04] border border-white/10 hover:border-[#C5A059]/40 hover:bg-white/[0.08] text-[#8E97AA] hover:text-[#F3EFE6]"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="hidden md:inline">Sources</span>
        </button>
      </div>
    </header>
  );
};
