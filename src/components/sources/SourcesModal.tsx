import React, { useState } from 'react';
import { useTemporal } from '../../context/TemporalContext';
import { X, BookOpen, ShieldCheck } from 'lucide-react';
import { SOURCES } from '../../data/sources';
import { EvidenceLevel } from '../../types';

export const SourcesModal: React.FC = () => {
  const { isSourcesOpen, setIsSourcesOpen } = useTemporal();
  const [filterType, setFilterType] = useState<string>('ALL');

  if (!isSourcesOpen) return null;

  const filteredSources = filterType === 'ALL'
    ? SOURCES
    : SOURCES.filter(s => s.type === filterType);

  return (
    <div className="fixed inset-0 z-50 bg-[#06080C]/85 backdrop-blur-md flex items-center justify-center p-6 select-none">
      <div className="bg-[#0E121A] border border-[#2D364A] rounded-xl max-w-2xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        <button
          onClick={() => setIsSourcesOpen(false)}
          className="absolute top-5 right-5 text-[#7E899E] hover:text-[#F3EFE6] p-1 rounded hover:bg-[#1A202E] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#1B2332] text-[#C5A059] border border-[#C5A059]/30">
            HISTORIOGRAPHICAL EVIDENCE BASE
          </span>
          <h3 className="text-xl font-serif-title font-bold text-[#F3EFE6] mt-1">
            SOURCES, EDITIONS & CERTAINTY LEVELS
          </h3>
          <p className="text-xs text-[#959EAF] mt-1">
            History is not a monolithic single narrative. Chronoscape grades claims by empirical certainty to maintain scholarly integrity and acknowledge uncertainty.
          </p>
        </div>

        {/* Category Legend & Filter */}
        <div className="flex flex-wrap gap-1.5 mb-4 p-2.5 rounded bg-[#131722] border border-[#202737] text-[10px] font-mono">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-2 py-0.5 rounded transition-colors ${filterType === 'ALL' ? 'bg-[#C5A059] text-[#0B0D12] font-bold' : 'text-[#8E97AA] hover:text-[#CCD2E0]'}`}
          >
            ALL (7)
          </button>
          <button
            onClick={() => setFilterType('FACT')}
            className={`px-2 py-0.5 rounded transition-colors ${filterType === 'FACT' ? 'bg-emerald-800 text-emerald-100 font-bold' : 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'}`}
          >
            FACT / EPIGRAPHY
          </button>
          <button
            onClick={() => setFilterType('PRIMARY SOURCE')}
            className={`px-2 py-0.5 rounded transition-colors ${filterType === 'PRIMARY SOURCE' ? 'bg-amber-800 text-amber-100 font-bold' : 'bg-amber-950/80 text-amber-300 border border-amber-700/60'}`}
          >
            PRIMARY SOURCE
          </button>
          <button
            onClick={() => setFilterType('SCHOLARLY INTERPRETATION')}
            className={`px-2 py-0.5 rounded transition-colors ${filterType === 'SCHOLARLY INTERPRETATION' ? 'bg-blue-800 text-blue-100 font-bold' : 'bg-blue-950/80 text-blue-300 border border-blue-700/60'}`}
          >
            SCHOLARLY INTERPRETATION
          </button>
          <button
            onClick={() => setFilterType('CONTESTED')}
            className={`px-2 py-0.5 rounded transition-colors ${filterType === 'CONTESTED' ? 'bg-rose-800 text-rose-100 font-bold' : 'bg-rose-950/80 text-rose-300 border border-rose-700/60'}`}
          >
            CONTESTED / UNCERTAIN
          </button>
        </div>

        {/* Evidence Items Scrollable List */}
        <div className="space-y-2.5 overflow-y-auto pr-1 flex-1">
          {filteredSources.map(s => (
            <div key={s.id} className="p-3.5 rounded bg-[#131722] border border-[#1E2536]">
              <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                <span className="font-serif-title font-bold text-[#E2DDD3] text-xs">
                  {s.title}
                </span>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${s.badgeColor}`}>
                  {s.typeBadge}
                </span>
              </div>
              <p className="text-[#A2ABB8] text-xs leading-relaxed">{s.description}</p>
              <div className="mt-2 pt-2 border-t border-[#1C2230] text-[10px] font-mono text-[#78859B]">
                <strong className="text-[#96A2B8]">Citation: </strong>
                {s.citation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
