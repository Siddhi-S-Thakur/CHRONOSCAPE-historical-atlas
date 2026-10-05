import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import DeckGL from '@deck.gl/react';
import { _GlobeView as GlobeView, PickingInfo } from '@deck.gl/core';
import { GeoJsonLayer, ArcLayer, ScatterplotLayer, TextLayer, PathLayer } from '@deck.gl/layers';
import { useTemporal } from '../../context/TemporalContext';
import { EMPIRE_TERRITORIES } from '../../map/geometry/territories';
import { HISTORICAL_TRADE_ROUTES, TRADING_HUBS, TradeRoute, TradingHub } from '../../data/tradeRoutes';
import { Play, Pause, RotateCcw, Compass, Anchor, Filter, Info, Shield, Ship, MapPin } from 'lucide-react';

interface GlobeViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  minZoom: number;
  maxZoom: number;
}

const INITIAL_VIEW_STATE: GlobeViewState = {
  longitude: 78.96,
  latitude: 20.59,
  zoom: 1.6,
  minZoom: 0.7,
  maxZoom: 6,
};

// Generate graticule lines (latitude parallels & longitude meridians)
function generateGraticules() {
  const paths: { path: [number, number][]; isMajor: boolean; label?: string }[] = [];

  // Parallels (Latitude lines every 15 deg from -75 to 75)
  for (let lat = -75; lat <= 75; lat += 15) {
    const isMajor = lat === 0 || Math.abs(lat) === 23.5; // Equator & Tropics
    const coords: [number, number][] = [];
    for (let lng = -180; lng <= 180; lng += 5) {
      coords.push([lng, lat]);
    }
    paths.push({ path: coords, isMajor });
  }

  // Meridians (Longitude lines every 30 deg)
  for (let lng = -180; lng < 180; lng += 30) {
    const isMajor = lng === 0 || lng === 78; // Prime Meridian & India Longitude
    const coords: [number, number][] = [];
    for (let lat = -80; lat <= 80; lat += 5) {
      coords.push([lng, lat]);
    }
    paths.push({ path: coords, isMajor });
  }

  return paths;
}

export const HistoricalGlobeDeck: React.FC = () => {
  const {
    currentAnchor,
    selectEmpire,
    selectPlace,
    setSelectedEntity,
    setIsInspectorOpen,
  } = useTemporal();

  const [viewState, setViewState] = useState<GlobeViewState>(INITIAL_VIEW_STATE);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [showAllRoutes, setShowAllRoutes] = useState<boolean>(false);
  const [hoveredRoute, setHoveredRoute] = useState<TradeRoute | null>(null);
  const [hoveredHub, setHoveredHub] = useState<TradingHub | null>(null);
  const [hoveredTerritory, setHoveredTerritory] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const graticules = useMemo(() => generateGraticules(), []);

  // ── Auto-rotation ticker ──────────────────────────────────────────────────
  useEffect(() => {
    if (!isRotating) return;
    let animId: number;
    const rotate = () => {
      setViewState(prev => ({
        ...prev,
        longitude: (prev.longitude + 0.08) % 360,
      }));
      animId = requestAnimationFrame(rotate);
    };
    animId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animId);
  }, [isRotating]);

  // Pause rotation on user interaction
  const handleViewStateChange = useCallback(({ viewState: newViewState }: { viewState: GlobeViewState }) => {
    setViewState(newViewState);
  }, []);

  // ── Filter routes for active era ──────────────────────────────────────────
  const activeRoutes = useMemo(() => {
    if (showAllRoutes) return HISTORICAL_TRADE_ROUTES;
    // Map anchor id to matching routes
    const matched = HISTORICAL_TRADE_ROUTES.filter(r => {
      if (r.era === currentAnchor.id) return true;
      if (currentAnchor.id === 'maurya' && (r.era === 'ancient' || r.era === 'maurya')) return true;
      if (currentAnchor.id === 'gupta' && (r.era === 'tamilaham' || r.era === 'gupta')) return true;
      if (currentAnchor.id === 'chola' && r.era === 'chola') return true;
      if (currentAnchor.id === 'mughal' && r.era === 'mughal') return true;
      return false;
    });
    // Fallback: if no specific routes for this exact anchor, display high-profile maritime & silk routes
    return matched.length > 0 ? matched : HISTORICAL_TRADE_ROUTES.slice(0, 4);
  }, [currentAnchor.id, showAllRoutes]);

  // ── Territories GeoJSON FeatureCollection ──────────────────────────────────
  const territoriesGeoJson = useMemo(() => {
    const rawTerritories = EMPIRE_TERRITORIES[currentAnchor.id] || [];
    const features: GeoJSON.Feature[] = rawTerritories.map(t => ({
      type: 'Feature',
      id: t.id,
      properties: {
        id: t.id,
        name: t.name,
        color: t.color,
        borderColor: t.borderColor,
        opacity: t.opacity,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [t.polygon],
      },
    }));
    return { type: 'FeatureCollection', features };
  }, [currentAnchor.id]);

  // ── Route selection handler ───────────────────────────────────────────────
  const handleRouteClick = useCallback((route: TradeRoute) => {
    setSelectedEntity({
      type: 'event',
      data: {
        id: route.id,
        name: route.name,
        date: currentAnchor.yearDisplay,
        location: `${route.sourceName} ↔ ${route.targetName}`,
        description: `${route.significance}\n\nNavigational & Route Context:\n${route.navigationNotes}\n\nCommodities Exported: ${route.goodsExported.join(', ')}\nCommodities Imported: ${route.goodsImported.join(', ')}`,
        participants: [route.sourceName, route.targetName],
        relatedEntities: [currentAnchor.hegemon, 'Indian Ocean Maritime Network'],
        sources: [route.historicalEvidence],
        evidenceLevel: 'PRIMARY SOURCE',
      },
    });
    setIsInspectorOpen(true);
  }, [currentAnchor, setSelectedEntity, setIsInspectorOpen]);

  // ── Layers definition ─────────────────────────────────────────────────────
  const layers = useMemo(() => {
    return [
      // 1. Celestial / Armillary Graticules
      new PathLayer({
        id: 'globe-graticules',
        data: graticules,
        getPath: d => d.path,
        getColor: d => (d.isMajor ? [197, 160, 89, 70] : [120, 140, 180, 25]),
        getWidth: d => (d.isMajor ? 1.5 : 0.8),
        widthMinPixels: 1,
      }),

      // 2. Base World Continents (Natural Earth)
      new GeoJsonLayer({
        id: 'world-continents',
        data: '/data/ne_110m_land.json',
        filled: true,
        stroked: true,
        getFillColor: [12, 17, 28, 240], // Deep charcoal/obsidian
        getLineColor: [36, 48, 70, 200], // Subtle continent outlines
        lineWidthMinPixels: 1,
        pickable: false,
      }),

      // 3. Historical Empire Territories
      new GeoJsonLayer({
        id: 'historical-territories',
        data: territoriesGeoJson as any,
        filled: true,
        stroked: true,
        getFillColor: (f: any): [number, number, number, number] => [
          Number(f.properties?.color?.[0] ?? 197),
          Number(f.properties?.color?.[1] ?? 160),
          Number(f.properties?.color?.[2] ?? 89),
          Math.round((f.properties?.opacity || 0.45) * 255),
        ],
        getLineColor: (f: any): [number, number, number, number] => [
          Number(f.properties?.borderColor?.[0] ?? 240),
          Number(f.properties?.borderColor?.[1] ?? 210),
          Number(f.properties?.borderColor?.[2] ?? 140),
          255,
        ],
        lineWidthMinPixels: 2.5,
        pickable: true,
        onHover: (info: PickingInfo) => {
          if (info.object && info.coordinate) {
            setHoveredTerritory(info.object.properties?.name || null);
            setTooltipPos({ x: info.x, y: info.y });
          } else {
            setHoveredTerritory(null);
          }
        },
        onClick: (info: PickingInfo) => {
          if (info.object?.properties?.id) {
            const empId = String(info.object.properties.id).split('-')[0];
            selectEmpire(empId);
          }
        },
      }),

      // 4. Historical Trade & Naval Arcs (3D Great Circles)
      new ArcLayer<TradeRoute>({
        id: 'trade-arcs',
        data: activeRoutes,
        getSourcePosition: d => d.sourceCoord,
        getTargetPosition: d => d.targetCoord,
        getSourceColor: d => [...d.color, 240],
        getTargetColor: d => [
          Math.min(255, d.color[0] + 30),
          Math.min(255, d.color[1] + 40),
          Math.min(255, d.color[2] + 40),
          210,
        ],
        getWidth: 3,
        getHeight: 0.65, // Soaring 3D altitude over curvature
        pickable: true,
        onHover: (info: PickingInfo<TradeRoute>) => {
          if (info.object) {
            setHoveredRoute(info.object);
            setTooltipPos({ x: info.x, y: info.y });
          } else {
            setHoveredRoute(null);
          }
        },
        onClick: (info: PickingInfo<TradeRoute>) => {
          if (info.object) {
            handleRouteClick(info.object);
          }
        },
      }),

      // 5. Global Trading Emporia Pins (Scatterplot)
      new ScatterplotLayer<TradingHub>({
        id: 'trading-hubs',
        data: TRADING_HUBS,
        getPosition: d => [d.coordinates[0], d.coordinates[1], 100],
        getRadius: d => (d.isIndianSubcontinent ? 45000 : 38000),
        getFillColor: d => (d.isIndianSubcontinent ? [245, 194, 66, 240] : [90, 200, 250, 220]),
        getLineColor: [255, 255, 255, 230],
        lineWidthMinPixels: 1.5,
        stroked: true,
        radiusMinPixels: 4.5,
        radiusMaxPixels: 9,
        pickable: true,
        onHover: (info: PickingInfo<TradingHub>) => {
          if (info.object) {
            setHoveredHub(info.object);
            setTooltipPos({ x: info.x, y: info.y });
          } else {
            setHoveredHub(null);
          }
        },
        onClick: (info: PickingInfo<TradingHub>) => {
          if (info.object) {
            if (info.object.isIndianSubcontinent) {
              selectPlace(info.object.id);
            } else {
              setSelectedEntity({
                type: 'place',
                data: {
                  id: info.object.id,
                  name: info.object.name,
                  alternateName: info.object.alternateName,
                  coordinates: [500, 425],
                  period: currentAnchor.yearDisplay,
                  role: info.object.role,
                  significance: `Major international trading terminus connected to India during the ${currentAnchor.yearDisplay} epoch. Located in ${info.object.region}.`,
                  associatedPeople: [],
                  associatedEvents: [],
                  sources: ['Historical Trade Records & Archaeological Excavations'],
                  evidenceLevel: 'FACT',
                },
              });
              setIsInspectorOpen(true);
            }
          }
        },
      }),

      // 6. Hub Labels (TextLayer)
      new TextLayer<TradingHub>({
        id: 'hub-labels',
        data: TRADING_HUBS,
        getPosition: d => [d.coordinates[0], d.coordinates[1], 150],
        getText: d => d.name,
        getSize: 11,
        getColor: d => (d.isIndianSubcontinent ? [243, 239, 230, 240] : [175, 215, 245, 220]),
        getTextAnchor: 'start',
        getAlignmentBaseline: 'center',
        getPixelOffset: [10, 0],
        fontFamily: "'Cinzel', serif",
        fontWeight: 'bold',
        outlineWidth: 2,
        outlineColor: [10, 14, 22, 230],
        pickable: false,
      }),
    ];
  }, [
    graticules,
    territoriesGeoJson,
    activeRoutes,
    selectEmpire,
    selectPlace,
    setSelectedEntity,
    setIsInspectorOpen,
    handleRouteClick,
    currentAnchor,
  ]);

  // Center camera back to India
  const resetToSubcontinent = useCallback(() => {
    setViewState({
      longitude: 78.96,
      latitude: 20.59,
      zoom: 1.8,
      minZoom: 0.7,
      maxZoom: 6,
    });
  }, []);

  return (
    <div className="relative w-full h-full bg-[#05070D] overflow-hidden select-none">
      {/* ── Deep Space Radial Background & Star Dust ─────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(20,28,45,0.4) 0%, rgba(5,7,13,0.98) 75%)',
        }}
      />

      {/* ── DeckGL WebGL Canvas with GlobeView ───────────────────────────── */}
      <DeckGL
        views={new GlobeView({ id: 'globe', resolution: 5 })}
        viewState={viewState}
        onViewStateChange={handleViewStateChange as any}
        controller={{
          dragPan: true,
          dragRotate: true,
          scrollZoom: true,
          doubleClickZoom: true,
        }}
        layers={layers}
        getCursor={({ isHovering }) => (isHovering ? 'pointer' : 'grab')}
      />

      {/* ── Top-Right Globe Controls & Floating HUD ──────────────────────── */}
      <div className="absolute top-5 right-6 z-20 flex flex-col items-end gap-2.5">
        {/* Badge: 3D Deck.gl Engine Active */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0E18]/90 border border-[#C5A059]/40 backdrop-blur-md shadow-xl text-xs font-mono text-[#E2DDD3]">
          <span className="w-2 h-2 rounded-full bg-[#40BEEF] animate-pulse" />
          <span className="text-[#C5A059] font-bold">DECK.GL 3D GLOBE</span>
          <span className="text-[#6A7590]">|</span>
          <span className="text-[#9BA5B9] text-[11px]">{currentAnchor.yearDisplay}</span>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090D16]/95 border border-[#1E2538] shadow-2xl backdrop-blur-md">
          {/* Play/Pause Rotation */}
          <button
            onClick={() => setIsRotating(prev => !prev)}
            title={isRotating ? 'Pause globe rotation' : 'Start auto-rotation'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all text-[#A0ABC0] hover:text-[#F3EFE6] hover:bg-[#182032]"
          >
            {isRotating ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#40BEEF]" />
                <span>SPIN</span>
              </>
            )}
          </button>

          <div className="w-px h-5 bg-[#1F2637]" />

          {/* Reset View */}
          <button
            onClick={resetToSubcontinent}
            title="Focus camera on the Indian Subcontinent"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all text-[#A0ABC0] hover:text-[#F3EFE6] hover:bg-[#182032]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>INDIA</span>
          </button>

          <div className="w-px h-5 bg-[#1F2637]" />

          {/* Toggle All Routes vs Era */}
          <button
            onClick={() => setShowAllRoutes(prev => !prev)}
            title="Toggle between active era trade routes and all historical networks"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              showAllRoutes
                ? 'bg-[#C5A059]/20 border border-[#C5A059]/50 text-[#F3EFE6]'
                : 'text-[#A0ABC0] hover:text-[#F3EFE6] hover:bg-[#182032]'
            }`}
          >
            <Filter className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{showAllRoutes ? 'ALL NETWORKS' : 'ERA ROUTES'}</span>
          </button>
        </div>
      </div>

      {/* ── Bottom-Left Legend & Telemetry ───────────────────────────────── */}
      <div className="absolute bottom-28 left-6 z-20 pointer-events-none max-w-sm">
        <div className="p-3.5 rounded-xl bg-[#090D16]/95 border border-[#1E2538] backdrop-blur-md shadow-2xl space-y-2 pointer-events-auto">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#C5A059] tracking-wider uppercase border-b border-[#1A2234] pb-1.5">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              GLOBAL MARITIME & TRADE HORIZON
            </span>
            <span className="text-[#64748B]">{activeRoutes.length} ROUTES ACTIVE</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="flex items-center gap-2 text-[#CCD3E2]">
              <div className="w-4 h-1 rounded-full bg-gradient-to-r from-[#40BEEF] to-[#60A5FA]" />
              <span>Maritime Sea Lanes</span>
            </div>
            <div className="flex items-center gap-2 text-[#CCD3E2]">
              <div className="w-4 h-1 rounded-full bg-gradient-to-r from-[#C5A059] to-[#EAB308]" />
              <span>Silk / Overland Roads</span>
            </div>
            <div className="flex items-center gap-2 text-[#CCD3E2]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F5C242] border border-[#FFF]" />
              <span>Subcontinental Ports</span>
            </div>
            <div className="flex items-center gap-2 text-[#CCD3E2]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#5AC8FA] border border-[#FFF]" />
              <span>Global Emporia</span>
            </div>
          </div>

          <p className="text-[10px] font-serif-body italic text-[#94A3B8] border-t border-[#1A2234] pt-1.5 leading-snug">
            Drag to orbit globe • Scroll to zoom • Click trade arcs to inspect commodities & primary sources
          </p>
        </div>
      </div>

      {/* ── Interactive Floating Tooltip ─────────────────────────────────── */}
      {hoveredRoute && tooltipPos && (
        <div
          className="absolute z-30 pointer-events-none p-3 rounded-lg bg-[#080B13]/95 border border-[#C5A059]/60 shadow-[0_12px_36px_rgba(0,0,0,0.8)] backdrop-blur-md max-w-xs transition-all duration-150"
          style={{
            left: Math.min(window.innerWidth - 320, tooltipPos.x + 16),
            top: Math.min(window.innerHeight - 200, tooltipPos.y - 40),
          }}
        >
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#40BEEF] uppercase tracking-wider mb-1">
            <Ship className="w-3 h-3" />
            <span>{hoveredRoute.type.toUpperCase()} TRADE HIGHWAY</span>
          </div>
          <h4 className="font-serif-title text-sm font-bold text-[#F3EFE6] leading-tight mb-1">
            {hoveredRoute.name}
          </h4>
          <div className="text-[11px] font-mono text-[#E2DDD3]/90 mb-2">
            <span className="text-[#C5A059]">{hoveredRoute.sourceName}</span>
            <span className="text-[#64748B] mx-1.5">⇄</span>
            <span className="text-[#40BEEF]">{hoveredRoute.targetName}</span>
          </div>
          <div className="text-[10px] font-sans text-[#94A3B8] line-clamp-2 mb-2">
            {hoveredRoute.significance}
          </div>
          <div className="border-t border-[#1C2538] pt-1.5 flex items-center justify-between text-[9px] font-mono text-[#C5A059]">
            <span>CLICK TO INSPECT SOURCE CITATION</span>
            <span>↗</span>
          </div>
        </div>
      )}

      {hoveredHub && tooltipPos && !hoveredRoute && (
        <div
          className="absolute z-30 pointer-events-none p-2.5 rounded-lg bg-[#080B13]/95 border border-[#40BEEF]/60 shadow-xl backdrop-blur-md max-w-xs"
          style={{
            left: Math.min(window.innerWidth - 280, tooltipPos.x + 14),
            top: Math.min(window.innerHeight - 150, tooltipPos.y - 30),
          }}
        >
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#C5A059] uppercase">
            <MapPin className="w-3 h-3" />
            <span>{hoveredHub.region}</span>
          </div>
          <h4 className="font-serif-title text-xs font-bold text-[#F3EFE6] mt-0.5">
            {hoveredHub.name} ({hoveredHub.alternateName})
          </h4>
          <p className="text-[10px] text-[#AAB4C8] mt-1">{hoveredHub.role}</p>
        </div>
      )}

      {hoveredTerritory && tooltipPos && !hoveredRoute && !hoveredHub && (
        <div
          className="absolute z-30 pointer-events-none px-3 py-1.5 rounded-md bg-[#080B13]/95 border border-[#C5A059]/50 shadow-lg backdrop-blur-md text-xs font-serif-title font-semibold text-[#F3EFE6]"
          style={{
            left: Math.min(window.innerWidth - 200, tooltipPos.x + 12),
            top: Math.min(window.innerHeight - 80, tooltipPos.y - 25),
          }}
        >
          {hoveredTerritory}
        </div>
      )}
    </div>
  );
};
