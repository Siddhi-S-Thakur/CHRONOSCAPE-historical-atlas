import React, { useEffect, useRef, useCallback, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { gsap } from 'gsap';
import { useTemporal } from '../../context/TemporalContext';
import { EMPIRE_TERRITORIES, EmpireGeoFeature } from '../../map/geometry/territories';
import { REVOLT_GEO_CENTERS } from '../../map/geometry/revoltCenters';
import { PLACES } from '../../data/places';
import { Place } from '../../types';
import { Layers } from 'lucide-react';

// Historical era map center/zoom configs
const ERA_MAP_CONFIGS: Record<string, { center: [number, number]; zoom: number; pitch: number; bearing?: number }> = {
  geology:      { center: [79.0, 20.0], zoom: 3.2, pitch: 0 },
  harappan:     { center: [71.5, 27.5], zoom: 4.8, pitch: 20 },
  ancient:      { center: [79.5, 25.0], zoom: 4.5, pitch: 20 },
  maurya:       { center: [79.0, 23.0], zoom: 4.2, pitch: 25 },
  gupta:        { center: [80.5, 24.5], zoom: 4.4, pitch: 20 },
  chola:        { center: [80.5, 13.0], zoom: 5.2, pitch: 28 },
  mughal:       { center: [78.5, 26.0], zoom: 4.3, pitch: 25 },
  deccan:       { center: [75.5, 18.0], zoom: 5.4, pitch: 32, bearing: -10 },
  plassey:      { center: [87.5, 24.0], zoom: 5.4, pitch: 20 },
  revolt:       { center: [80.0, 26.5], zoom: 5.2, pitch: 20 },
  independence: { center: [79.0, 23.0], zoom: 4.2, pitch: 15 },
};

// Basemap styles
const BASEMAP_STYLES = {
  satellite: {
    name: 'Satellite',
    style: {
      version: 8 as const,
      sources: {
        'esri-satellite': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          ],
          tileSize: 256,
          attribution: 'Esri, Maxar, Earthstar Geographics',
        },
      },
      layers: [
        {
          id: 'satellite-layer',
          type: 'raster',
          source: 'esri-satellite',
          paint: {
            'raster-brightness-max': 0.85,
            'raster-contrast': 0.15,
            'raster-saturation': -0.1,
          },
        },
      ],
    },
  },
  dark: {
    name: 'Dark Atlas',
    style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  },
  parchment: {
    name: 'Parchment',
    style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
  },
};

type BasemapKey = keyof typeof BASEMAP_STYLES;

interface MapGLProps {
  onCityClick: (placeId: string) => void;
  onTerritoryClick: (empireId: string) => void;
  onRevoltCenterClick: (centerId: string) => void;
}

export const HistoricalMapGL: React.FC<MapGLProps> = ({
  onCityClick,
  onTerritoryClick,
  onRevoltCenterClick,
}) => {
  const { currentAnchor, selectedEntity, isInspectorOpen } = useTemporal();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const prevAnchorRef = useRef<string>('');
  const [activeBasemap, setActiveBasemap] = useState<BasemapKey>('satellite');

  // ─── Clear dynamic layers/sources ───────────────────────────────────────
  const clearDynamicLayers = useCallback((map: maplibregl.Map) => {
    const layerIds = ['territories-fill', 'territories-border', 'revolt-circles'];
    const sourceIds = ['territories', 'revolt-centers'];
    layerIds.forEach(id => { try { if (map.getLayer(id)) map.removeLayer(id); } catch {} });
    sourceIds.forEach(id => { try { if (map.getSource(id)) map.removeSource(id); } catch {} });

    // Remove DOM markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
  }, []);

  // ─── Add territory polygon layers ───────────────────────────────────────
  const addTerritoryLayers = useCallback((map: maplibregl.Map, territories: EmpireGeoFeature[]) => {
    if (!territories.length) return;

    const geojson: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: territories.map(t => ({
        type: 'Feature',
        id: t.id,
        properties: {
          id: t.id,
          name: t.name,
          color: `rgba(${t.color[0]},${t.color[1]},${t.color[2]},${t.opacity})`,
          borderColor: `rgb(${t.borderColor[0]},${t.borderColor[1]},${t.borderColor[2]})`,
        },
        geometry: {
          type: 'Polygon',
          coordinates: [t.polygon],
        },
      })),
    };

    try {
      if (map.getSource('territories')) {
        (map.getSource('territories') as maplibregl.GeoJSONSource).setData(geojson);
        return;
      }

      map.addSource('territories', { type: 'geojson', data: geojson });

      // Translucent polygon fill
      map.addLayer({
        id: 'territories-fill',
        type: 'fill',
        source: 'territories',
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.85,
        },
      });

      // Highlighted boundary line
      map.addLayer({
        id: 'territories-border',
        type: 'line',
        source: 'territories',
        paint: {
          'line-color': ['get', 'borderColor'],
          'line-width': 2.5,
          'line-blur': 0.8,
        },
      });

      // Territory click handler
      map.on('click', 'territories-fill', (e: maplibregl.MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => {
        if (e.features && e.features[0]) {
          const empId = String(e.features[0].properties?.id || '').split('-')[0];
          onTerritoryClick(empId);
        }
      });
      map.on('mouseenter', 'territories-fill', () => { map.getCanvas().style.cursor = 'pointer'; });
      map.on('mouseleave', 'territories-fill', () => { map.getCanvas().style.cursor = ''; });
    } catch (err) {
      console.warn('Territory layer error:', err);
    }
  }, [onTerritoryClick]);

  // ─── Add city markers as interactive DOM elements ───────────────────────
  const addCityMarkers = useCallback((map: maplibregl.Map) => {
    const places = Object.values(PLACES) as Place[];
    places.forEach(place => {
      const isCapital = place.id === 'pataliputra' || place.id === 'delhi' || place.id === 'thanjavur';
      const el = document.createElement('div');
      el.className = 'city-marker-pin';
      el.style.cssText = `
        width: ${isCapital ? 14 : 9}px;
        height: ${isCapital ? 14 : 9}px;
        background: ${isCapital ? '#FCE77D' : '#C5A059'};
        border: 2px solid ${isCapital ? '#FFF' : '#0B0E14'};
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 0 ${isCapital ? '18px 8px rgba(252,231,125,0.7)' : '10px 4px rgba(197,160,89,0.6)'};
        transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        position: relative;
        z-index: 10;
      `;

      // Tooltip / Name pill
      const tooltip = document.createElement('div');
      tooltip.style.cssText = `
        position: absolute;
        bottom: 150%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(10, 14, 22, 0.95);
        border: 1px solid rgba(197, 160, 89, 0.6);
        border-radius: 4px;
        padding: 4px 8px;
        font-family: 'Cinzel', serif;
        font-size: 11px;
        font-weight: 600;
        color: #F3EFE6;
        white-space: nowrap;
        pointer-events: none;
        opacity: ${isCapital ? 0.9 : 0};
        transition: opacity 0.2s, transform 0.2s;
        letter-spacing: 0.08em;
        box-shadow: 0 4px 14px rgba(0,0,0,0.7);
      `;
      tooltip.textContent = place.name;
      el.appendChild(tooltip);

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.5)';
        tooltip.style.opacity = '1';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
        if (!isCapital) tooltip.style.opacity = '0';
      });
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        onCityClick(place.id);
      });

      // SVG coordinate space conversion (0-1000 x, 0-850 y to longitude / latitude)
      const lngGeo = 60 + (place.coordinates[0] / 1000) * 40;
      const latGeo = 37 - (place.coordinates[1] / 850) * 29;

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([lngGeo, latGeo])
        .addTo(map);
      markersRef.current.push(marker);
    });
  }, [onCityClick]);

  // ─── Add 1857 Revolt Regional Center Markers ────────────────────────────
  const addRevoltMarkers = useCallback((map: maplibregl.Map) => {
    REVOLT_GEO_CENTERS.forEach(center => {
      const el = document.createElement('div');
      el.style.cssText = `
        width: ${center.size + 4}px;
        height: ${center.size + 4}px;
        background: #E63946;
        border: 2px solid #FFA69E;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 0 25px 10px rgba(230,57,70,0.65);
        animation: revolt-pulse 2s ease-in-out infinite;
        position: relative;
        z-index: 15;
      `;

      const label = document.createElement('div');
      label.style.cssText = `
        position: absolute;
        bottom: 140%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(26, 6, 8, 0.95);
        border: 1px solid rgba(230, 57, 70, 0.7);
        border-radius: 4px;
        padding: 4px 8px;
        font-family: 'Cinzel', serif;
        font-size: 11px;
        color: #FFB3BA;
        white-space: nowrap;
        pointer-events: none;
        letter-spacing: 0.05em;
        box-shadow: 0 4px 14px rgba(0,0,0,0.8);
      `;
      label.textContent = `${center.name} • ${center.leader.split('•')[0].trim()}`;
      el.appendChild(label);

      el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.35)'; });
      el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)'; });
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        onRevoltCenterClick(center.id);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(center.coordinates)
        .addTo(map);
      markersRef.current.push(marker);
    });
  }, [onRevoltCenterClick]);

  // ─── Fly Camera to Era ──────────────────────────────────────────────────
  const flyToEra = useCallback((map: maplibregl.Map, anchorId: string, instant = false) => {
    const config = ERA_MAP_CONFIGS[anchorId] || ERA_MAP_CONFIGS.maurya;
    if (instant) {
      map.jumpTo({
        center: config.center,
        zoom: config.zoom,
        pitch: config.pitch,
        bearing: config.bearing || 0,
      });
    } else {
      map.flyTo({
        center: config.center,
        zoom: config.zoom,
        pitch: config.pitch,
        bearing: config.bearing || 0,
        duration: 1800,
        easing: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
      });
    }
  }, []);

  // ─── Synchronize Map Layers with Active Era ─────────────────────────────
  const updateHistoricalState = useCallback((map: maplibregl.Map, anchorId: string, instant = false) => {
    if (!map.isStyleLoaded()) return;

    clearDynamicLayers(map);
    flyToEra(map, anchorId, instant);

    const territories = EMPIRE_TERRITORIES[anchorId] || [];
    if (territories.length > 0) {
      addTerritoryLayers(map, territories);
    }

    if (anchorId !== 'geology') {
      addCityMarkers(map);
    }

    if (anchorId === 'revolt') {
      addRevoltMarkers(map);
    }
  }, [clearDynamicLayers, flyToEra, addTerritoryLayers, addCityMarkers, addRevoltMarkers]);

  // ─── Initialize MapLibre GL ─────────────────────────────────────────────
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialStyle = BASEMAP_STYLES[activeBasemap].style;
    const initialConfig = ERA_MAP_CONFIGS[currentAnchor.id] || ERA_MAP_CONFIGS.maurya;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: initialStyle as any,
      center: initialConfig.center,
      zoom: initialConfig.zoom,
      pitch: initialConfig.pitch,
      bearing: initialConfig.bearing || 0,
    });

    mapRef.current = map;

    // Inject pulse CSS animation
    if (!document.getElementById('chronoscape-map-css')) {
      const style = document.createElement('style');
      style.id = 'chronoscape-map-css';
      style.textContent = `
        @keyframes revolt-pulse {
          0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 25px 10px rgba(230,57,70,0.65); }
          50% { transform: scale(1.3); opacity: 0.85; box-shadow: 0 0 35px 16px rgba(230,57,70,0.9); }
        }
      `;
      document.head.appendChild(style);
    }

    map.on('load', () => {
      map.resize();
      updateHistoricalState(map, currentAnchor.id, true);
      prevAnchorRef.current = currentAnchor.id;
    });

    // Ensure map updates dimensions on resize
    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    // GSAP Intro Fade-in
    gsap.fromTo(mapContainerRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' });

    return () => {
      resizeObserver.disconnect();
      clearDynamicLayers(map);
      map.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Switch Basemap Style ───────────────────────────────────────────────
  const handleBasemapChange = (newKey: BasemapKey) => {
    const map = mapRef.current;
    if (!map || newKey === activeBasemap) return;
    setActiveBasemap(newKey);

    const newStyle = BASEMAP_STYLES[newKey].style;
    map.setStyle(newStyle as any);

    map.once('style.load', () => {
      updateHistoricalState(map, currentAnchor.id, true);
    });
  };

  // ─── Era Changes ────────────────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    if (prevAnchorRef.current === currentAnchor.id) return;

    prevAnchorRef.current = currentAnchor.id;

    gsap.to(mapContainerRef.current, {
      filter: 'brightness(0.5)',
      duration: 0.25,
      onComplete: () => {
        updateHistoricalState(map, currentAnchor.id);
        gsap.to(mapContainerRef.current, {
          filter: 'brightness(1)',
          duration: 0.5,
          ease: 'power2.out',
        });
      },
    });
  }, [currentAnchor.id, updateHistoricalState]);

  // ─── Resize Map when Inspector Toggles ──────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      mapRef.current?.resize();
    }, 320);
    return () => clearTimeout(timer);
  }, [isInspectorOpen]);

  // ─── Place Selection Flight ─────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    if (selectedEntity?.type !== 'place') return;

    const pl = selectedEntity.data as Place;
    if (pl && pl.coordinates) {
      const lngGeo = 60 + (pl.coordinates[0] / 1000) * 40;
      const latGeo = 37 - (pl.coordinates[1] / 850) * 29;
      map.flyTo({ center: [lngGeo, latGeo], zoom: 6.8, pitch: 35, duration: 1600 });
    }
  }, [selectedEntity]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* MapLibre WebGL Canvas Container */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

      {/* ── Basemap Switcher Pill (Bottom Left) ─────────────────────────── */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-[#090D16]/90 border border-[#232C3E] backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-1.5 px-2 text-[10px] font-mono text-[#8C97AC] uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="hidden sm:inline">Basemap:</span>
        </div>
        {(['satellite', 'dark', 'parchment'] as BasemapKey[]).map((key) => {
          const isActive = activeBasemap === key;
          return (
            <button
              key={key}
              onClick={() => handleBasemapChange(key)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                isActive
                  ? 'bg-[#C5A059] text-[#0A0E17] font-bold shadow-md'
                  : 'text-[#8E97AA] hover:text-[#F3EFE6] hover:bg-[#151B27]'
              }`}
            >
              {BASEMAP_STYLES[key].name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
