import React from 'react';
import { useTemporal } from '../../context/TemporalContext';
import { X, ExternalLink, ShieldCheck, Compass, ArrowRight, Eye } from 'lucide-react';

export const EntityInspector: React.FC = () => {
  const { 
    selectedEntity, 
    isInspectorOpen, 
    toggleInspector,
    setIsSourcesOpen,
    setIsStepIntoEraOpen,
    focusCoordinates,
    selectPlace,
    selectPerson
  } = useTemporal();

  if (!isInspectorOpen || !selectedEntity) {
    return (
      <button
        onClick={toggleInspector}
        className="absolute top-20 right-4 z-20 px-3 py-1.5 rounded-lg bg-[#0E121A]/90 hover:bg-[#161D2A] border border-[#232B3B] text-[#CCD2E0] hover:text-[#C5A059] text-xs font-mono shadow-xl backdrop-blur-md transition-all flex items-center gap-1.5"
        title="Open Entity Context Inspector"
      >
        <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
        <span>INSPECTOR</span>
      </button>
    );
  }

  // Render according to selected entity type
  const renderContent = () => {
    switch (selectedEntity.type) {
      case 'empire': {
        const emp = selectedEntity.data;
        return (
          <>
            {/* Header Tag Strip */}
            <div className="p-5 border-b border-[#1E2534] flex items-start justify-between bg-[#10141D]">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[9px] uppercase font-mono tracking-widest bg-[#202738] text-[#C5A059] border border-[#C5A059]/30">
                    IMPERIAL POLITY
                  </span>
                  <span className="text-[10px] text-[#7A859B] font-mono">{emp.periodLabel}</span>
                </div>
                <h2 className="text-2xl font-serif-title font-bold text-[#F3EFE6] tracking-wide">
                  {emp.name}
                </h2>
                <p className="text-xs font-serif-body italic text-[#C5A059] mt-0.5">
                  {emp.subtitle}
                </p>
              </div>
              <button
                onClick={toggleInspector}
                className="text-[#727D93] hover:text-[#E2DDD3] p-1.5 rounded-md hover:bg-[#1C2332] transition-colors"
                title="Collapse inspector"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
              {/* Metric Strip */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-[#111622] border border-[#1E2536]">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#636E84] block">
                    IMPERIAL SEAT
                  </span>
                  <span className="text-xs font-serif-title text-[#E2DDD3] font-semibold mt-0.5 block">
                    {emp.capital}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#636E84] block">
                    PROMINENT RULERS
                  </span>
                  <span className="text-xs text-[#E2DDD3] font-medium mt-0.5 block">
                    {emp.rulers.join(' • ')}
                  </span>
                </div>
              </div>

              {/* Evidence Level Banner */}
              <div className="flex items-center justify-between px-3 py-2 rounded bg-[#161B26] border border-[#252E42]">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-mono text-[#CCD4E5]">EVIDENCE LEVEL:</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#132A1C] text-[#4ADE80] border border-[#225435]">
                    {emp.evidenceLevel}
                  </span>
                  <button
                    onClick={() => setIsSourcesOpen(true)}
                    className="text-[10px] text-[#C5A059] underline hover:text-[#E2C37A]"
                  >
                    Inspect Edicts
                  </button>
                </div>
              </div>

              {/* Overview */}
              <div>
                <h3 className="text-xs uppercase font-mono tracking-widest text-[#8C95A8] mb-1.5">
                  HISTORICAL SYNTHESIS
                </h3>
                <p className="text-xs text-[#B8C0D0] leading-relaxed">{emp.description}</p>
              </div>

              {/* Uncertainty Notes */}
              {emp.uncertaintyNotes && (
                <div className="p-3 rounded bg-[#17141A] border border-[#3D252C] text-xs">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#E07A5F] block font-semibold mb-1">
                    HISTORIOGRAPHICAL NOTE & BOUNDARIES
                  </span>
                  <p className="text-[#C4B2B6] text-[11px] leading-relaxed">
                    {emp.uncertaintyNotes}
                  </p>
                </div>
              )}

              {/* Contemporary Parallel Context */}
              {emp.contemporaryContext && emp.contemporaryContext.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-[#C5A059] mb-2 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    SOUTH ASIA AT THIS TIME
                  </h3>
                  <div className="space-y-2">
                    {emp.contemporaryContext.map((c, i) => (
                      <div
                        key={i}
                        className="p-3 rounded bg-[#10141D] border border-[#1B2230] text-xs text-[#B4BAC8] leading-relaxed"
                      >
                        <strong className="text-[#E2DDD3] block font-serif-title text-xs mb-1">
                          {c.region}
                        </strong>
                        {c.description}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inscriptions / Archaeology */}
              {emp.inscriptions && emp.inscriptions.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-[#8C95A8] mb-2">
                    INSCRIPTIONS & MATERIAL ARCHAEOLOGY
                  </h3>
                  <div className="border border-[#202737] rounded-lg p-3 bg-[#0F131C] space-y-2.5">
                    {emp.inscriptions.map((ins, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1.5 shrink-0" />
                        <div>
                          <strong className="text-xs text-[#E2DDD3] block">{ins.title}</strong>
                          <p className="text-[11px] text-[#A6AFBF] mt-0.5">{ins.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="pt-2 flex flex-col space-y-2">
                <button
                  onClick={() => setIsStepIntoEraOpen(true)}
                  className="w-full py-2.5 px-4 rounded bg-[#C5A059] hover:bg-[#D4B36D] text-[#0C0F16] font-serif-title font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Step Into This Era</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <button
                  onClick={() => {
                    // Focus center of South Asia
                    focusCoordinates([500, 400], 1.15);
                  }}
                  className="w-full py-2 px-4 rounded bg-[#151A26] hover:bg-[#1E2536] border border-[#273145] text-[#C2CAD8] text-xs font-mono transition-colors"
                >
                  Focus Continental Extent
                </button>
              </div>
            </div>
          </>
        );
      }

      case 'place': {
        const pl = selectedEntity.data;
        return (
          <>
            <div className="p-5 border-b border-[#1E2534] flex items-start justify-between bg-[#10141D]">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[9px] uppercase font-mono tracking-widest bg-[#162520] text-[#4ADE80] border border-[#4ADE80]/30">
                    HISTORICAL CITADEL
                  </span>
                  <span className="text-[10px] text-[#7A859B] font-mono">{pl.period}</span>
                </div>
                <h2 className="text-2xl font-serif-title font-bold text-[#F3EFE6] tracking-wide">
                  {pl.name}
                </h2>
                <p className="text-xs font-serif-body italic text-[#C5A059] mt-0.5">
                  {pl.role}
                </p>
              </div>
              <button
                onClick={toggleInspector}
                className="text-[#727D93] hover:text-[#E2DDD3] p-1.5 rounded-md hover:bg-[#1C2332] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
              <div className="p-3 rounded bg-[#161B26] border border-[#252E42] flex items-center justify-between text-xs">
                <span className="font-mono text-[#CCD4E5]">HISTORICAL EVIDENCE:</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#132A1C] text-[#4ADE80] border border-[#225435]">
                  {pl.evidenceLevel}
                </span>
              </div>

              <div>
                <h3 className="text-xs uppercase font-mono tracking-widest text-[#8C95A8] mb-1.5">
                  HISTORICAL SIGNIFICANCE
                </h3>
                <p className="text-xs text-[#B8C0D0] leading-relaxed">{pl.significance}</p>
              </div>

              {/* Associated People */}
              {pl.associatedPeople && pl.associatedPeople.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-[#C5A059] mb-2">
                    PROMINENT HISTORICAL FIGURES
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {pl.associatedPeople.map((person, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-[#131824] border border-[#222B3D] text-xs text-[#E2DDD3] font-serif-title"
                      >
                        {person}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sources */}
              {pl.sources && pl.sources.length > 0 && (
                <div className="p-3 rounded bg-[#0F131C] border border-[#1E2536]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#636E84] block mb-1">
                    ATTESTED SOURCES
                  </span>
                  <ul className="text-xs text-[#A2ABB8] space-y-1 list-disc pl-4">
                    {pl.sources.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => focusCoordinates(pl.coordinates, 1.8)}
                className="w-full py-2.5 px-4 rounded bg-[#C5A059] hover:bg-[#D4B36D] text-[#0C0F16] font-serif-title font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Zoom To Citadel</span>
              </button>
            </div>
          </>
        );
      }

      case 'revoltCenter': {
        const rc = selectedEntity.data;
        return (
          <>
            <div className="p-5 border-b border-[#1E2534] flex items-start justify-between bg-[#1B1114]">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[9px] uppercase font-mono tracking-widest bg-[#2E1418] text-[#FFA5AB] border border-[#E63946]/40">
                    1857 UPRISING REGIONAL CENTRE
                  </span>
                  <span className="text-[10px] text-[#FFCCD2] font-mono">{rc.date}</span>
                </div>
                <h2 className="text-2xl font-serif-title font-bold text-[#F3EFE6] tracking-wide">
                  {rc.name}
                </h2>
                <p className="text-xs font-serif-body italic text-[#FFA5AB] mt-0.5">
                  Leader: {rc.leader}
                </p>
              </div>
              <button
                onClick={toggleInspector}
                className="text-[#727D93] hover:text-[#E2DDD3] p-1.5 rounded-md hover:bg-[#1C2332] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
              <div className="p-3.5 rounded bg-[#1C1417] border border-[#3E1F25]">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#FF858F] block font-semibold mb-1">
                  AUTONOMOUS REGIONAL DYNAMICS
                </span>
                <p className="text-xs text-[#E8D1D5] leading-relaxed">{rc.description}</p>
              </div>

              <div className="p-3 rounded bg-[#10141D] border border-[#1E2536]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#636E84] block mb-1">
                  ARCHIVAL EVIDENCE BASE
                </span>
                <p className="text-xs text-[#B2B9C8]">{rc.primaryNotes}</p>
              </div>

              <button
                onClick={() => setIsStepIntoEraOpen(true)}
                className="w-full py-2.5 px-4 rounded bg-[#E63946] hover:bg-[#F24C5A] text-white font-serif-title font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>View Eyewitness Accounts of 1857</span>
              </button>
            </div>
          </>
        );
      }

      case 'person': {
        const per = selectedEntity.data;
        return (
          <>
            <div className="p-5 border-b border-[#1E2534] flex items-start justify-between bg-[#10141D]">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[9px] uppercase font-mono tracking-widest bg-[#2A1E14] text-[#E07A5F] border border-[#E07A5F]/30">
                    HISTORICAL FIGURE
                  </span>
                  <span className="text-[10px] text-[#7A859B] font-mono">{per.period}</span>
                </div>
                <h2 className="text-xl font-serif-title font-bold text-[#F3EFE6] tracking-wide">
                  {per.name}
                </h2>
                <p className="text-xs font-serif-body italic text-[#C5A059] mt-0.5">
                  {per.title}
                </p>
              </div>
              <button
                onClick={toggleInspector}
                className="text-[#727D93] hover:text-[#E2DDD3] p-1.5 rounded-md hover:bg-[#1C2332] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
              <p className="text-xs text-[#B8C0D0] leading-relaxed">{per.description}</p>

              {per.associatedPlaces && per.associatedPlaces.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-[#C5A059] mb-2">
                    ASSOCIATED SEATS & REGIONS
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {per.associatedPlaces.map((pl, i) => (
                      <button
                        key={i}
                        onClick={() => selectPlace(pl)}
                        className="px-2.5 py-1 rounded bg-[#131824] hover:bg-[#1D2538] border border-[#222B3D] text-xs text-[#E2DDD3] capitalize font-mono transition-colors"
                      >
                        {pl} →
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        );
      }

      case 'event': {
        const ev = selectedEntity.data;
        return (
          <>
            <div className="p-5 border-b border-[#1E2534] flex items-start justify-between bg-[#10141D]">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[9px] uppercase font-mono tracking-widest bg-[#201726] text-[#D47AE8] border border-[#D47AE8]/30">
                    HISTORICAL TURNING POINT
                  </span>
                  <span className="text-[10px] text-[#7A859B] font-mono">{ev.date}</span>
                </div>
                <h2 className="text-xl font-serif-title font-bold text-[#F3EFE6] tracking-wide">
                  {ev.name}
                </h2>
                <p className="text-xs font-serif-body italic text-[#C5A059] mt-0.5">
                  {ev.location}
                </p>
              </div>
              <button
                onClick={toggleInspector}
                className="text-[#727D93] hover:text-[#E2DDD3] p-1.5 rounded-md hover:bg-[#1C2332] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
              <p className="text-xs text-[#B8C0D0] leading-relaxed whitespace-pre-line">
                {ev.description}
              </p>

              {ev.participants && ev.participants.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-[#C5A059] mb-1.5">
                    KEY PARTICIPANTS
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {ev.participants.map((p, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-[#141A26] border border-[#232D3F] text-xs text-[#E2DDD3]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {ev.sources && ev.sources.length > 0 && (
                <div className="p-3 rounded bg-[#0F131C] border border-[#1E2536]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#636E84] block mb-1">
                    PRIMARY SOURCES
                  </span>
                  <ul className="text-xs text-[#A2ABB8] space-y-1 list-disc pl-4">
                    {ev.sources.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        );
      }

      default:
        return null;
    }
  };

  return (
    <aside
      id="side-inspector"
      aria-label="Entity Inspector"
      className="w-full sm:w-[420px] border-l border-[#222938] bg-[#0C0F16]/95 backdrop-blur-xl flex flex-col h-full z-20 shadow-2xl transition-all duration-300 overflow-hidden shrink-0"
    >
      {renderContent()}
    </aside>
  );
};
