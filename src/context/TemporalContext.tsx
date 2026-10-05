import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  TemporalAnchor, 
  SelectedEntity, 
  MapViewMode,
  Place,
  Empire,
  RevoltCenter,
  Person,
  HistoricalEvent
} from '../types';
import { TEMPORAL_ANCHORS } from '../data/timeline/anchors';
import { EMPIRES } from '../data/empires';
import { PLACES } from '../data/places';
import { REVOLT_CENTERS } from '../data/places/revoltCenters';
import { PEOPLE } from '../data/people';
import { EVENTS } from '../data/events';
import { PERSPECTIVES } from '../data/perspectives';
import { sound } from '../utils/sound';

interface TemporalContextType {
  currentAnchor: TemporalAnchor;
  setAnchorById: (id: string) => void;
  setAnchorByIndex: (index: number) => void;
  currentZoom: number;
  panOffset: { x: number; y: number };
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  focusCoordinates: (coords: [number, number], targetZoom?: number) => void;
  selectedEntity: SelectedEntity;
  setSelectedEntity: (entity: SelectedEntity) => void;
  hoveredEntity: { name: string; details?: string } | null;
  setHoveredEntity: (hover: { name: string; details?: string } | null) => void;
  isInspectorOpen: boolean;
  setIsInspectorOpen: (open: boolean) => void;
  toggleInspector: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isStepIntoEraOpen: boolean;
  setIsStepIntoEraOpen: (open: boolean) => void;
  isSourcesOpen: boolean;
  setIsSourcesOpen: (open: boolean) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  viewMode: MapViewMode;
  setViewMode: (mode: MapViewMode) => void;
  globeMode: '2d' | '3d';
  setGlobeMode: (mode: '2d' | '3d') => void;
  toggleGlobeMode: () => void;
  isAmbientAudio: boolean;
  toggleAmbientAudio: () => void;
  
  // Selection helpers
  selectEmpire: (id: string) => void;
  selectPlace: (id: string) => void;
  selectRevoltCenter: (id: string) => void;
  selectPerson: (id: string) => void;
  selectEvent: (id: string) => void;
  selectPerspective: (id: string) => void;
}

const TemporalContext = createContext<TemporalContextType | undefined>(undefined);

// Default state starts at Maurya (260 BCE) as primary demonstration per specs
const DEFAULT_ANCHOR_ID = 'maurya';

export const TemporalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentAnchor, setCurrentAnchor] = useState<TemporalAnchor>(() => {
    return TEMPORAL_ANCHORS.find(a => a.id === DEFAULT_ANCHOR_ID) || TEMPORAL_ANCHORS[3];
  });

  const [currentZoom, setCurrentZoom] = useState<number>(1.0);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Default entity selected is the Maurya Empire
  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity>(() => {
    return { type: 'empire', data: EMPIRES['maurya'] };
  });

  const [hoveredEntity, setHoveredEntity] = useState<{ name: string; details?: string } | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isStepIntoEraOpen, setIsStepIntoEraOpen] = useState<boolean>(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<MapViewMode>('political');
  const [globeMode, setGlobeMode] = useState<'2d' | '3d'>('2d');
  const [isAmbientAudio, setIsAmbientAudio] = useState<boolean>(false);

  const toggleGlobeMode = useCallback(() => {
    setGlobeMode(prev => (prev === '2d' ? '3d' : '2d'));
  }, []);

  const toggleAmbientAudio = useCallback(() => {
    const active = sound.toggleAmbient();
    setIsAmbientAudio(active);
  }, []);

  // Zoom controls
  const zoomIn = useCallback(() => {
    setCurrentZoom(z => Math.min(Number((z * 1.25).toFixed(2)), 2.8));
  }, []);

  const zoomOut = useCallback(() => {
    setCurrentZoom(z => Math.max(Number((z * 0.8).toFixed(2)), 0.65));
  }, []);

  const resetView = useCallback(() => {
    setCurrentZoom(1.0);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const focusCoordinates = useCallback(([x, y]: [number, number], targetZoom: number = 1.45) => {
    setCurrentZoom(targetZoom);
    // SVG center is [500, 425] in a 1000 x 850 viewBox
    const offsetX = (500 - x) * 0.45;
    const offsetY = (425 - y) * 0.45;
    setPanOffset({ x: offsetX, y: offsetY });
  }, []);

  const setAnchorById = useCallback((id: string) => {
    const anchor = TEMPORAL_ANCHORS.find(a => a.id === id);
    if (!anchor) return;
    setCurrentAnchor(anchor);
    resetView();
    sound.playEpochChime(anchor.id === 'revolt' ? 360 : anchor.id === 'chola' ? 480 : 432);

    // Auto-select corresponding empire if available
    if (anchor.defaultSelectedEmpireId && EMPIRES[anchor.defaultSelectedEmpireId]) {
      setSelectedEntity({
        type: 'empire',
        data: EMPIRES[anchor.defaultSelectedEmpireId]
      });
      setIsInspectorOpen(true);
    } else if (anchor.id === 'revolt') {
      // For 1857, select the catalyst centre: Meerut
      if (REVOLT_CENTERS['meerut']) {
        setSelectedEntity({
          type: 'revoltCenter',
          data: REVOLT_CENTERS['meerut']
        });
        setIsInspectorOpen(true);
      }
    } else if (anchor.id === 'deccan') {
      if (EMPIRES['maratha']) {
        setSelectedEntity({
          type: 'empire',
          data: EMPIRES['maratha']
        });
        setIsInspectorOpen(true);
      }
    } else if (anchor.id === 'geology') {
      setIsInspectorOpen(false);
    }
  }, [resetView]);

  const setAnchorByIndex = useCallback((index: number) => {
    const boundedIndex = Math.max(0, Math.min(index, TEMPORAL_ANCHORS.length - 1));
    const targetAnchor = TEMPORAL_ANCHORS[boundedIndex];
    if (targetAnchor) {
      setAnchorById(targetAnchor.id);
    }
  }, [setAnchorById]);

  // Direct entity selectors
  const selectEmpire = useCallback((id: string) => {
    const empire = EMPIRES[id];
    if (empire) {
      setSelectedEntity({ type: 'empire', data: empire });
      setIsInspectorOpen(true);
    }
  }, []);

  const selectPlace = useCallback((id: string) => {
    const place = PLACES[id];
    if (place) {
      setSelectedEntity({ type: 'place', data: place });
      setIsInspectorOpen(true);
      focusCoordinates(place.coordinates, 1.55);
    }
  }, [focusCoordinates]);

  const selectRevoltCenter = useCallback((id: string) => {
    const center = REVOLT_CENTERS[id];
    if (center) {
      setSelectedEntity({ type: 'revoltCenter', data: center });
      setIsInspectorOpen(true);
      focusCoordinates(center.coordinates, 1.6);
    }
  }, [focusCoordinates]);

  const selectPerson = useCallback((id: string) => {
    const person = PEOPLE[id];
    if (person) {
      setSelectedEntity({ type: 'person', data: person });
      setIsInspectorOpen(true);
      if (person.syncAnchorId) {
        const anchor = TEMPORAL_ANCHORS.find(a => a.id === person.syncAnchorId);
        if (anchor) setCurrentAnchor(anchor);
      }
      if (person.syncPlaceId && PLACES[person.syncPlaceId]) {
        focusCoordinates(PLACES[person.syncPlaceId].coordinates, 1.5);
      }
    }
  }, [focusCoordinates]);

  const selectEvent = useCallback((id: string) => {
    const event = EVENTS[id];
    if (event) {
      setSelectedEntity({ type: 'event', data: event });
      setIsInspectorOpen(true);
      if (event.syncAnchorId) {
        const anchor = TEMPORAL_ANCHORS.find(a => a.id === event.syncAnchorId);
        if (anchor) setCurrentAnchor(anchor);
      }
      if (event.coordinates) {
        focusCoordinates(event.coordinates, 1.55);
      } else if (event.syncPlaceId && PLACES[event.syncPlaceId]) {
        focusCoordinates(PLACES[event.syncPlaceId].coordinates, 1.55);
      }
    }
  }, [focusCoordinates]);

  const selectPerspective = useCallback((id: string) => {
    const perspective = PERSPECTIVES[id];
    if (perspective) {
      setIsStepIntoEraOpen(false);
      // Reveal in inspector as special contextual viewpoint
      setSelectedEntity({
        type: 'event',
        data: {
          id: `perspective_${perspective.id}`,
          name: `${perspective.title} (Witness Context)`,
          date: '1857 Historical Horizon',
          location: perspective.subtitle,
          description: `${perspective.historicalContext}\n\nEvidence Excerpt:\n"${perspective.eyewitnessAccount}"`,
          participants: [perspective.title],
          relatedEntities: ['1857 Uprising'],
          sources: [perspective.sourceAttribution, perspective.evidenceNote],
          evidenceLevel: 'PRIMARY SOURCE'
        }
      });
      setIsInspectorOpen(true);
    }
  }, []);

  const toggleInspector = useCallback(() => {
    setIsInspectorOpen(prev => !prev);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Timeline Auto-flow engine
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentAnchor(current => {
        const currentIndex = TEMPORAL_ANCHORS.findIndex(a => a.id === current.id);
        const nextIndex = (currentIndex + 1) % TEMPORAL_ANCHORS.length;
        const nextAnchor = TEMPORAL_ANCHORS[nextIndex];

        // Also select default entity
        if (nextAnchor.defaultSelectedEmpireId && EMPIRES[nextAnchor.defaultSelectedEmpireId]) {
          setSelectedEntity({
            type: 'empire',
            data: EMPIRES[nextAnchor.defaultSelectedEmpireId]
          });
        } else if (nextAnchor.id === 'revolt' && REVOLT_CENTERS['meerut']) {
          setSelectedEntity({
            type: 'revoltCenter',
            data: REVOLT_CENTERS['meerut']
          });
          setIsInspectorOpen(true);
        } else if (nextAnchor.id === 'geology') {
          setIsInspectorOpen(false);
        }
        return nextAnchor;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Global Keyboard Shortcuts (⌘K / Ctrl+K for search, Escape to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsStepIntoEraOpen(false);
        setIsSourcesOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <TemporalContext.Provider
      value={{
        currentAnchor,
        setAnchorById,
        setAnchorByIndex,
        currentZoom,
        panOffset,
        zoomIn,
        zoomOut,
        resetView,
        focusCoordinates,
        selectedEntity,
        setSelectedEntity,
        hoveredEntity,
        setHoveredEntity,
        isInspectorOpen,
        setIsInspectorOpen,
        toggleInspector,
        isSearchOpen,
        setIsSearchOpen,
        isStepIntoEraOpen,
        setIsStepIntoEraOpen,
        isSourcesOpen,
        setIsSourcesOpen,
        isPlaying,
        togglePlay,
        viewMode,
        setViewMode,
        globeMode,
        setGlobeMode,
        toggleGlobeMode,
        isAmbientAudio,
        toggleAmbientAudio,
        selectEmpire,
        selectPlace,
        selectRevoltCenter,
        selectPerson,
        selectEvent,
        selectPerspective
      }}
    >
      {children}
    </TemporalContext.Provider>
  );
};

export const useTemporal = (): TemporalContextType => {
  const context = useContext(TemporalContext);
  if (!context) {
    throw new Error('useTemporal must be used within a TemporalProvider');
  }
  return context;
};
