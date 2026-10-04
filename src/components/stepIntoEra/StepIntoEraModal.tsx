import React from 'react';
import { useTemporal } from '../../context/TemporalContext';
import { X, ShieldAlert, BookOpen, User, Home, Crown, Feather } from 'lucide-react';
import { PERSPECTIVES } from '../../data/perspectives';

export const StepIntoEraModal: React.FC = () => {
  const { isStepIntoEraOpen, setIsStepIntoEraOpen, selectPerspective } = useTemporal();

  if (!isStepIntoEraOpen) return null;

  const icons = {
    soldier: User,
    civilian: Home,
    political: Crown,
    observer: Feather,
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#06080C]/85 backdrop-blur-md flex items-center justify-center p-6 select-none">
      <div className="bg-[#0E121A] border border-[#2D364A] rounded-xl max-w-2xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsStepIntoEraOpen(false)}
          className="absolute top-5 right-5 text-[#7E899E] hover:text-[#F3EFE6] p-1 rounded hover:bg-[#1A202E] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-[#202738] text-[#C5A059] border border-[#C5A059]/30">
            IMMERSIVE HISTORICAL WITNESS
          </span>
          <h3 className="text-2xl font-serif-title font-bold text-[#F3EFE6] mt-2">
            STEP INTO THE ERA
          </h3>
          <p className="text-sm font-serif-body italic text-[#B0B7C6] mt-1">
            Whose vantage do you want to explore through verified historical evidence?
          </p>
        </div>

        {/* 4 Perspectives Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {Object.values(PERSPECTIVES).map(p => {
            const Icon = icons[p.id] || User;
            return (
              <div
                key={p.id}
                onClick={() => selectPerspective(p.id)}
                className="p-4 rounded-lg bg-[#141A25] border border-[#232D3F] hover:border-[#C5A059] cursor-pointer group transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded bg-[#1D2433] flex items-center justify-center text-[#C5A059] mb-3 group-hover:bg-[#C5A059] group-hover:text-[#0E121A] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif-title font-bold text-sm text-[#E2DDD3] group-hover:text-[#F3EFE6]">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[#8C96A8] mt-1.5 leading-relaxed line-clamp-3">
                    {p.shortDesc}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#C5A059] group-hover:text-[#E2C37A] mt-3 block font-semibold">
                  View Witness Evidence →
                </span>
              </div>
            );
          })}
        </div>

        {/* Historical Integrity Guarantee Banner */}
        <div className="mt-5 text-center text-[11px] text-[#7A869C] font-mono border-t border-[#1C2332] pt-3 flex items-center justify-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Evidence Guarantee: No fabricated quotations or fictional roleplay presented as history.</span>
        </div>
      </div>
    </div>
  );
};
