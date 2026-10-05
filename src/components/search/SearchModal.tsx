import React, { useState, useMemo, useEffect } from 'react';
import { useTemporal } from '../../context/TemporalContext';
import { Search, X, ArrowRight, Ship, MapPin, Globe } from 'lucide-react';
import { PEOPLE } from '../../data/people';
import { EMPIRES } from '../../data/empires';
import { PLACES } from '../../data/places';
import { EVENTS } from '../../data/events';
import { REVOLT_CENTERS } from '../../data/places/revoltCenters';
import { HISTORICAL_TRADE_ROUTES, TRADING_HUBS } from '../../data/tradeRoutes';
import { sound } from '../../utils/sound';

type FilterCategory = 'all' | 'people' | 'empires' | 'places' | 'routes' | 'events';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    selectPerson,
    selectEmpire,
    selectPlace,
    selectEvent,
    selectRevoltCenter,
    setSelectedEntity,
    setIsInspectorOpen,
    setAnchorById,
    setGlobeMode,
  } = useTemporal();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<FilterCategory>('all');

  // Keyboard shortcut ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Search indexing
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const items: Array<{
      id: string;
      title: string;
      subtitle: string;
      type: 'person' | 'empire' | 'place' | 'route' | 'event' | 'revolt';
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
              sound.playClick(800);
              selectPerson(p.id);
              setIsSearchOpen(false);
            },
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
              sound.playClick(800);
              if (emp.id === 'maurya') setAnchorById('maurya');
              else if (emp.id === 'maratha') setAnchorById('deccan');
              else if (emp.id === 'gupta') setAnchorById('gupta');
              else if (emp.id === 'chola') setAnchorById('chola');
              else if (emp.id === 'mughal') setAnchorById('mughal');
              selectEmpire(emp.id);
              setIsSearchOpen(false);
            },
          });
        }
      });
    }

    // 3. Trade Routes & Sea Lanes
    if (category === 'all' || category === 'routes') {
      HISTORICAL_TRADE_ROUTES.forEach(route => {
        if (!q || route.name.toLowerCase().includes(q) || route.goodsExported.join(' ').toLowerCase().includes(q) || route.sourceName.toLowerCase().includes(q) || route.targetName.toLowerCase().includes(q)) {
          items.push({
            id: `route_${route.id}`,
            title: route.name,
            subtitle: `${route.sourceName} ↔ ${route.targetName} | Goods: ${route.goodsExported.slice(0, 3).join(', ')}`,
            type: 'route',
            typeLabel: `${route.type.toUpperCase()} HIGHWAY`,
            badgeColor: 'bg-[#0E2238] text-[#40BEEF] border-[#40BEEF]/40',
            period: route.era.toUpperCase(),
            action: () => {
              sound.playClick(800);
              if (route.era !== 'all') {
                const anchor = route.era === 'tamilaham' ? 'gupta' : route.era;
                setAnchorById(anchor);
              }
              setGlobeMode('3d');
              setSelectedEntity({
                type: 'event',
                data: {
                  id: route.id,
                  name: route.name,
                  date: 'Historical Trade Era',
                  location: `${route.sourceName} ↔ ${route.targetName}`,
                  description: `${route.significance}\n\nNavigational & Route Context:\n${route.navigationNotes}\n\nCommodities Exported: ${route.goodsExported.join(', ')}\nCommodities Imported: ${route.goodsImported.join(', ')}`,
                  participants: [route.sourceName, route.targetName],
                  relatedEntities: ['Indian Ocean Maritime Network'],
                  sources: [route.historicalEvidence],
                  evidenceLevel: 'PRIMARY SOURCE',
                },
              });
              setIsInspectorOpen(true);
              setIsSearchOpen(false);
            },
          });
        }
      });
    }

    // 4. Places & Global Ports
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
              sound.playClick(800);
              if (pl.associatedAnchorId) setAnchorById(pl.associatedAnchorId);
              selectPlace(pl.id);
              setIsSearchOpen(false);
            },
          });
        }
      });

      // Global Trading Hubs
      TRADING_HUBS.forEach(hub => {
        if (!q || hub.name.toLowerCase().includes(q) || hub.alternateName.toLowerCase().includes(q) || hub.region.toLowerCase().includes(q)) {
          items.push({
            id: `hub_${hub.id}`,
            title: `${hub.name} (${hub.alternateName})`,
            subtitle: `${hub.region}: ${hub.role}`,
            type: 'place',
            typeLabel: hub.isIndianSubcontinent ? 'SUBCONTINENTAL PORT' : 'GLOBAL EMPORIUM',
            badgeColor: hub.isIndianSubcontinent ? 'bg-[#2A2210] text-[#FBBF24] border-[#FBBF24]/30' : 'bg-[#0E2030] text-[#38BDF8] border-[#38BDF8]/30',
            period: 'Trade Hub',
            action: () => {
              sound.playClick(800);
              setGlobeMode('3d');
              setSelectedEntity({
                type: 'place',
                data: {
                  id: hub.id,
                  name: hub.name,
                  alternateName: hub.alternateName,
                  coordinates: [500, 425],
                  period: 'Classical & Medieval Trade',
                  role: hub.role,
                  significance: `Major trading terminus in ${hub.region} directly interconnected with the Indian subcontinent.`,
                  associatedPeople: [],
                  associatedEvents: [],
                  sources: ['Archaeological excavation reports & historical itineraries'],
                  evidenceLevel: 'FACT',
                },
              });
              setIsInspectorOpen(true);
              setIsSearchOpen(false);
            },
          });
        }
      });

      // 1857 centres
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
              sound.playClick(800);
              setAnchorById('revolt');
              selectRevoltCenter(rc.id);
              setIsSearchOpen(false);
            },
          });
        }
      });
    }

    // 5. Events
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
              sound.playClick(800);
              selectEvent(ev.id);
              setIsSearchOpen(false);
            },
          });
        }
      });
    }

    return items;
  }, [
    query,
    category,
    selectPerson,
    selectEmpire,
    selectPlace,
    selectEvent,
    selectRevoltCenter,
    setSelectedEntity,
    setIsInspectorOpen,
    setAnchorById,
    setGlobeMode,
    setIsSearchOpen,
  ]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#05070D]/85 backdrop-blur-xl flex items-start justify-center pt-16 p-4 select-none animate-in fade-in duration-200">
      <div className="bg-[#0A0E18]/95 border border-[#C5A059]/40 rounded-2xl max-w-2xl w-full p-5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#1E2538] pb-3 mb-3">
          <Search className="w-5 h-5 text-[#C5A059] mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search figures, empires, citadels, trade routes (e.g. Chola, Muziris, Ashoka)..."
            className="bg-transparent w-full text-[#F3EFE6] text-sm focus:outline-none placeholder-[#64748B] font-serif-title tracking-wide"
            autoFocus
          />
          <button
            onClick={() => {
              sound.playClick(500);
              setIsSearchOpen(false);
            }}
            className="text-[#64748B] hover:text-[#CCD2E0] text-[10px] font-mono ml-2 px-2 py-1 rounded bg-[#101420] border border-[#1E2538]"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#8C95A8] mb-3 overflow-x-auto pb-1">
          <span className="text-[#64748B] uppercase mr-1">FILTER:</span>
          {(['all', 'people', 'empires', 'places', 'routes', 'events'] as FilterCategory[]).map(cat => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick(600);
                setCategory(cat);
              }}
              className={`px-3 py-1 rounded-full uppercase tracking-wider transition-all ${
                category === cat
                  ? 'bg-[#C5A059] text-[#0A0D14] font-bold shadow-md'
                  : 'bg-[#121622] hover:bg-[#1A2234] text-[#939DAF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="space-y-2 max-h-88 overflow-y-auto pr-1">
          {results.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#64748B] font-mono">
              No historical records found for "{query}". Try searching "Chola", "Muziris", "Ashoka", or "1857".
            </div>
          ) : (
            results.map(item => (
              <div
                key={item.id}
                onClick={item.action}
                className="p-3.5 rounded-xl bg-[#0D121F]/90 hover:bg-[#141B2D] border border-[#1C2538] hover:border-[#C5A059]/60 cursor-pointer transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="pr-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[8.5px] font-mono uppercase font-bold border ${item.badgeColor}`}>
                      {item.typeLabel}
                    </span>
                    <span className="text-[11px] text-[#717E96] font-mono">{item.period}</span>
                  </div>
                  <h4 className="font-serif-title font-bold text-sm text-[#F3EFE6] group-hover:text-[#FDE047] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#94A3B8] line-clamp-1 mt-0.5 leading-snug">{item.subtitle}</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-[#141A28] group-hover:bg-[#C5A059] text-[11px] font-mono text-[#C5A059] group-hover:text-[#0C0F16] transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 font-semibold shadow">
                  <span>DISCOVER</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
