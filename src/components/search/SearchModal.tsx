import React, { useState, useMemo } from 'react';
import { useTemporal } from '../../context/TemporalContext';
import { Search, X, ArrowRight } from 'lucide-react';
import { PEOPLE } from '../../data/people';
import { EMPIRES } from '../../data/empires';
import { PLACES } from '../../data/places';
import { EVENTS } from '../../data/events';
import { REVOLT_CENTERS } from '../../data/places/revoltCenters';

type FilterCategory = 'all' | 'people' | 'empires' | 'places' | 'events';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    selectPerson, 
    selectEmpire, 
    selectPlace, 
    selectEvent,
    selectRevoltCenter,
    setAnchorById 
  } = useTemporal();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<FilterCategory>('all');

  // Search indexing
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const items: Array<{
      id: string;
      title: string;
      subtitle: string;
      type: 'person' | 'empire' | 'place' | 'event' | 'revolt';
      typeLabel: string;
      badgeColor: string;
      period: string;
      action: () => void;
    }> = [];

    // 1. People
    if (category === 'all' || category === 'people') {
      Object.values(PEOPLE).forEach(p => {
        if (!q || p.name.toLowerCase().includes(q) || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) {
          items.push({
            id: `person_${p.id}`,
            title: p.name,
            subtitle: p.description,
            type: 'person',
            typeLabel: 'HISTORICAL FIGURE',
            badgeColor: 'bg-[#2A1E14] text-[#E07A5F] border-[#E07A5F]/30',
            period: p.period,
            action: () => {
              selectPerson(p.id);
              setIsSearchOpen(false);
            }
          });
        }
      });
    }

    // 2. Empires
    if (category === 'all' || category === 'empires') {
      Object.values(EMPIRES).forEach(emp => {
        if (!q || emp.name.toLowerCase().includes(q) || emp.subtitle.toLowerCase().includes(q) || emp.description.toLowerCase().includes(q)) {
          items.push({
            id: `empire_${emp.id}`,
            title: emp.name,
            subtitle: emp.description,
            type: 'empire',
            typeLabel: 'POLITICAL HEGEMON',
            badgeColor: 'bg-[#252014] text-[#C5A059] border-[#C5A059]/30',
            period: emp.periodLabel,
            action: () => {
              if (emp.id === 'maurya') setAnchorById('maurya');
              else if (emp.id === 'maratha') setAnchorById('deccan');
              else if (emp.id === 'gupta') setAnchorById('gupta');
              else if (emp.id === 'chola') setAnchorById('chola');
              else if (emp.id === 'mughal') setAnchorById('mughal');
              selectEmpire(emp.id);
              setIsSearchOpen(false);
            }
          });
        }
      });
    }

    // 3. Places
    if (category === 'all' || category === 'places') {
      Object.values(PLACES).forEach(pl => {
        if (!q || pl.name.toLowerCase().includes(q) || (pl.alternateName && pl.alternateName.toLowerCase().includes(q)) || pl.role.toLowerCase().includes(q)) {
          items.push({
            id: `place_${pl.id}`,
            title: pl.name,
            subtitle: pl.significance,
            type: 'place',
            typeLabel: 'URBAN CITADEL',
            badgeColor: 'bg-[#14261C] text-[#4ADE80] border-[#4ADE80]/30',
            period: pl.period,
            action: () => {
              if (pl.associatedAnchorId) setAnchorById(pl.associatedAnchorId);
              selectPlace(pl.id);
              setIsSearchOpen(false);
            }
          });
        }
      });

      // Also 1857 centres as places
      Object.values(REVOLT_CENTERS).forEach(rc => {
        if (!q || rc.name.toLowerCase().includes(q) || rc.leader.toLowerCase().includes(q) || rc.description.toLowerCase().includes(q)) {
          items.push({
            id: `revolt_${rc.id}`,
            title: `1857: ${rc.name}`,
            subtitle: `Leader: ${rc.leader} — ${rc.description}`,
            type: 'revolt',
            typeLabel: '1857 UPRISING HUB',
            badgeColor: 'bg-[#2B1418] text-[#FFA5AB] border-[#E63946]/40',
            period: rc.date,
            action: () => {
              setAnchorById('revolt');
              selectRevoltCenter(rc.id);
              setIsSearchOpen(false);
            }
          });
        }
      });
    }

    // 4. Events
    if (category === 'all' || category === 'events') {
      Object.values(EVENTS).forEach(ev => {
        if (!q || ev.name.toLowerCase().includes(q) || ev.location.toLowerCase().includes(q) || ev.description.toLowerCase().includes(q)) {
          items.push({
            id: `event_${ev.id}`,
            title: ev.name,
            subtitle: ev.description,
            type: 'event',
            typeLabel: 'TURNING POINT',
            badgeColor: 'bg-[#22162B] text-[#D47AE8] border-[#D47AE8]/30',
            period: ev.date,
            action: () => {
              selectEvent(ev.id);
              setIsSearchOpen(false);
            }
          });
        }
      });
    }

    return items;
  }, [query, category, selectPerson, selectEmpire, selectPlace, selectEvent, selectRevoltCenter, setAnchorById, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#06080C]/85 backdrop-blur-md flex items-start justify-center pt-16 p-4 select-none">
      <div className="bg-[#0E121A] border border-[#2D364A] rounded-xl max-w-2xl w-full p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#242D40] pb-3 mb-3">
          <Search className="w-5 h-5 text-[#C5A059] mr-3" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search people, empires, places, events (e.g. Shivaji, 1857, Taxila)..."
            className="bg-transparent w-full text-[#F3EFE6] text-sm focus:outline-none placeholder-[#657187] font-serif-title"
            autoFocus
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-[#6D778E] hover:text-[#CCD2E0] text-xs font-mono ml-2 p-1"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 text-[10px] font-mono text-[#8C95A8] mb-3 overflow-x-auto pb-1">
          <span className="text-[#5B6579] uppercase">FILTER:</span>
          {(['all', 'people', 'empires', 'places', 'events'] as FilterCategory[]).map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-2.5 py-0.5 rounded capitalize transition-colors ${
                category === cat
                  ? 'bg-[#1B2332] text-[#C5A059] border border-[#C5A059]/30 font-semibold'
                  : 'bg-[#131722] hover:bg-[#1B2332] text-[#939DAF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {results.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#7A859B] font-mono">
              No historical records found for "{query}". Try searching "Shivaji", "1857", "Ashoka", or "Pataliputra".
            </div>
          ) : (
            results.map(item => (
              <div
                key={item.id}
                onClick={item.action}
                className="p-3 rounded-lg bg-[#121620] hover:bg-[#1A202D] border border-[#1E2536] hover:border-[#C5A059]/60 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="pr-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono border ${item.badgeColor}`}>
                      {item.typeLabel}
                    </span>
                    <span className="text-xs text-[#7A859A] font-mono">{item.period}</span>
                  </div>
                  <h4 className="font-serif-title font-bold text-sm text-[#F3EFE6] group-hover:text-[#E2C37A] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#8C96A8] line-clamp-1 mt-0.5">{item.subtitle}</p>
                </div>
                <button className="px-2.5 py-1 rounded bg-[#202738] group-hover:bg-[#C5A059] text-[11px] font-mono text-[#C5A059] group-hover:text-[#0C0F16] transition-colors whitespace-nowrap flex items-center gap-1 shrink-0">
                  <span>SHOW ON MAP</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
