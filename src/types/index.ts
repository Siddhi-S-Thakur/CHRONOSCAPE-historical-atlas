export type EvidenceLevel = 
  | 'FACT' 
  | 'PRIMARY SOURCE' 
  | 'SCHOLARLY INTERPRETATION' 
  | 'CONTESTED' 
  | 'UNCERTAIN';

export type MapViewMode = 'political' | 'trade' | 'tectonic';

export interface ContemporaryContextItem {
  region: string;
  description: string;
}

export interface InscriptionItem {
  title: string;
  description: string;
}

export interface TemporalAnchor {
  id: string;
  yearNumber: number; // for sorting/math, e.g. -70000000, -2500, -500, -260, 375, 1014, 1580, 1674, 1757, 1857, 1947
  yearDisplay: string;
  region: string;
  badge: string;
  desc: string;
  extent: string;
  hegemon: string;
  capital: string;
  timelinePercent: number; // 0 to 100 for visual scrubber
  layerMode: 'geology' | 'historical' | 'revolt';
  defaultSelectedEmpireId?: string;
  defaultZoom?: number;
}

export interface Empire {
  id: string;
  name: string;
  subtitle: string;
  startYear: string;
  endYear: string;
  periodLabel: string;
  region: string;
  capital: string;
  rulers: string[];
  description: string;
  territoryLayer: string;
  associatedPlaces: string[];
  associatedEvents: string[];
  sources: string[];
  evidenceLevel: EvidenceLevel;
  uncertaintyNotes?: string;
  contemporaryContext?: ContemporaryContextItem[];
  inscriptions?: InscriptionItem[];
}

export interface Place {
  id: string;
  name: string;
  alternateName?: string;
  coordinates: [number, number]; // [x, y] in the 1000 x 850 SVG viewport
  period: string;
  role: string;
  significance: string;
  associatedPeople: string[];
  associatedEvents: string[];
  sources: string[];
  evidenceLevel: EvidenceLevel;
  associatedAnchorId?: string;
}

export interface Person {
  id: string;
  name: string;
  title: string;
  period: string;
  region: string;
  description: string;
  associatedPlaces: string[];
  associatedEvents: string[];
  sources: string[];
  evidenceLevel: EvidenceLevel;
  syncAnchorId?: string;
  syncPlaceId?: string;
}

export interface HistoricalEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  coordinates?: [number, number];
  description: string;
  participants: string[];
  relatedEntities: string[];
  sources: string[];
  evidenceLevel: EvidenceLevel;
  syncAnchorId?: string;
  syncPlaceId?: string;
}

export interface RevoltCenter {
  id: string;
  name: string;
  leader: string;
  date: string;
  coordinates: [number, number];
  description: string;
  evidenceLevel: EvidenceLevel;
  primaryNotes: string;
}

export interface Perspective {
  id: 'soldier' | 'civilian' | 'political' | 'observer';
  title: string;
  subtitle: string;
  shortDesc: string;
  historicalContext: string;
  eyewitnessAccount: string;
  sourceAttribution: string;
  evidenceNote: string;
}

export interface HistoriographicalSource {
  id: string;
  title: string;
  type: EvidenceLevel;
  typeBadge: string;
  badgeColor: string;
  era: string;
  description: string;
  citation: string;
}

export type SelectedEntity = 
  | { type: 'empire'; data: Empire }
  | { type: 'place'; data: Place }
  | { type: 'person'; data: Person }
  | { type: 'event'; data: HistoricalEvent }
  | { type: 'revoltCenter'; data: RevoltCenter }
  | null;
