import React, { useEffect, useRef } from 'react';
import { useTemporal } from '../../context/TemporalContext';
import { Search, BookOpen, Compass } from 'lucide-react';
import { gsap } from 'gsap';

export const HeaderHUD: React.FC = () => {
  const {
    currentAnchor,
    setAnchorById,
    setIsSearchOpen,
    setIsSourcesOpen,
  } = useTemporal();

  const brandRef = useRef<HTMLDivElement>(null);

  // GSAP intro animation
  useEffect(() => {
    if (!brandRef.current) return;
    gsap.fromTo(brandRef.current, 
      { opacity: 0, x: -20 }, 
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
    );
  }, []);

  return (
    <header
      className="h-16 w-full px-6 flex items-center justify-between z-30 border-b border-[#1A1F2C]/90 select-none shrink-0"
      style={{
        background: 'linear-gradient(to right, rgba(6,8,16,0.98) 0%, rgba(10,14,22,0.95) 60%, rgba(6,8,16,0.98) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 1px 0 rgba(197,160,89,0.08), 0 4px 24px rgba(0,0,0,0.5)',
      }}
    >
      {/* ── Brand Mark ─────────────────────────────────────────────────── */}
      <div
        ref={brandRef}
        className="flex items-center space-x-3 cursor-pointer group"
        onClick={() => setAnchorById('maurya')}
        title="Return to 260 BCE Mauryan state"
      >
        {/* Emblem */}
        <div className="relative w-9 h-9">
          <div className="absolute inset-0 rounded-full border border-[#C5A059]/50 bg-gradient-to-br from-[#1A1408] to-[#0B0D12] shadow-[0_0_20px_rgba(197,160,89,0.25)] group-hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] transition-all duration-500" />
          <Compass className="absolute inset-0 m-auto w-4.5 h-4.5 text-[#C5A059] group-hover:text-[#E2C37A] transition-colors duration-300" style={{ width: 18, height: 18, margin: 'auto', top: 0, left: 0, right: 0, bottom: 0, position: 'absolute' }} />
          {/* Orbit ring */}
          <div
            className="absolute -inset-1 rounded-full border border-[#C5A059]/15 group-hover:border-[#C5A059]/35 transition-all duration-500"
            style={{ animation: 'spin 12s linear infinite' }}
          />
        </div>

        {/* Title */}
        <div>
          <span
            className="block font-serif-title text-[1.35rem] font-bold tracking-[0.22em] text-[#F3EFE6] group-hover:text-[#E8CF91] transition-colors duration-300"
            style={{ letterSpacing: '0.22em', lineHeight: 1 }}
          >
            CHRONOSCAPE
          </span>
          <span
            className="block text-[8.5px] uppercase tracking-[0.28em] text-[#7A8494] group-hover:text-[#9BA5B9] transition-colors duration-300"
            style={{ marginTop: 2, letterSpacing: '0.28em' }}
          >
            Explore the past. Don't just read it.
          </span>
        </div>
      </div>

      {/* ── Era indicator (center) ──────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col items-center pointer-events-none">
        <span className="font-serif-title text-[#C5A059] text-sm tracking-[0.2em]">
          {currentAnchor.yearDisplay}
        </span>
        <span className="font-mono text-[9px] tracking-[0.25em] text-[#5A6475] uppercase mt-0.5">
          {currentAnchor.badge}
        </span>
      </div>

      {/* ── Right Controls: Search + Sources only ──────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button
          id="search-button"
          onClick={() => setIsSearchOpen(true)}
          title="Search people, places, empires, events (Cmd+K)"
          className="group flex items-center gap-2.5 h-9 pl-3 pr-4 rounded-full transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(197,160,89,0.2)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(197,160,89,0.08)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(197,160,89,0.5)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(197,160,89,0.2)';
          }}
        >
          <Search className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="hidden sm:inline text-[#B8C0CF] text-xs font-medium tracking-wide">Search Atlas</span>
          <kbd className="hidden md:inline-flex items-center text-[9px] font-mono text-[#5A6475] bg-[#0A0C12] border border-[#1F2535] px-1.5 py-0.5 rounded">
            ⌘K
          </kbd>
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-[#1F2535]" />

        {/* Sources */}
        <button
          id="sources-button"
          onClick={() => setIsSourcesOpen(true)}
          title="Historiographical sources & evidence certainty"
          className="group flex items-center gap-2 h-9 px-3.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            color: '#8E97AA',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)';
            (e.currentTarget as HTMLButtonElement).style.color = '#F3EFE6';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
            (e.currentTarget as HTMLButtonElement).style.color = '#8E97AA';
          }}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sources</span>
        </button>
      </div>
    </header>
  );
};
