# Chronoscape --- Implementation Plan

## 1. Product Architecture

Chronoscape is a map-first, time-driven historical exploration
application.

The primary experience is:

**TIME → MAP → ENTITY → CONTEXT**

The map and timeline are the core product interface.

Build the application as a proper React application rather than a single
HTML file.

------------------------------------------------------------------------

## 2. Recommended Stack

-   React
-   Vite
-   TypeScript
-   Tailwind CSS
-   Framer Motion for selected UI transitions
-   SVG for initial historical map layers
-   Lucide React for interface icons

Initial version:

-   no backend
-   no database
-   no authentication
-   no AI/LLM API
-   no real-time services
-   no complex GIS infrastructure
-   no unnecessary 3D
-   no unnecessary global state-management library

Use structured local historical data.

------------------------------------------------------------------------

## 3. Architecture

Separate four concerns:

**UI**\
React components and presentation.

**Historical Data**\
Timeline, entities, descriptions, relationships and source metadata.

**Map Geometry**\
SVG paths, map layers, markers and visual geographic data.

**Application State**\
Current year, current temporal state, selected entity, map zoom, search
state and playback state.

Do not place all historical content directly inside React components.

------------------------------------------------------------------------

## 4. Suggested Folder Structure

``` text
Chronoscape/
│
├── project_context.md
├── design.md
├── historical_context.md
├── implementation_plan.md
│
├── stitch_reference.png
├── stitch_reference.html
│
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── README.md
│
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    │
    ├── components/
    │   ├── layout/
    │   ├── map/
    │   ├── timeline/
    │   ├── entities/
    │   ├── search/
    │   ├── sources/
    │   └── stepIntoEra/
    │
    ├── data/
    │   ├── timeline/
    │   ├── empires/
    │   ├── kingdoms/
    │   ├── people/
    │   ├── places/
    │   ├── events/
    │   └── sources/
    │
    ├── map/
    │   ├── layers/
    │   ├── geometry/
    │   └── markers/
    │
    ├── hooks/
    ├── types/
    ├── utils/
    ├── pages/
    └── assets/
```

------------------------------------------------------------------------

## 5. Core Application State

The central temporal/application state should include concepts such as:

``` text
currentYear
currentEra
selectedEmpire
selectedKingdom
selectedPerson
selectedPlace
selectedEvent
selectedPerspective
mapZoom
mapCenter
searchQuery
isTimelinePlaying
activeMapLayer
isInspectorOpen
```

Use a coherent state model rather than independent components modifying
the DOM directly.

------------------------------------------------------------------------

## 6. Temporal Engine

The timeline is the primary navigation mechanism.

Initial anchors:

-   c.  70 Ma
-   c.  2500 BCE
-   c.  500 BCE
-   c.  260 BCE
-   c.  375 CE
-   c.  1014 CE
-   c.  1580 CE
-   1674 CE
-   1757 CE
-   1857 CE
-   1947 CE

Do not hardcode the whole application around these states.

Represent temporal states as data so new periods can be added later.

Conceptual flow:

``` text
timeline data
      ↓
temporal state
      ↓
map layer
      ↓
visible entities
      ↓
selected entity
      ↓
inspector
```

------------------------------------------------------------------------

## 7. Map Strategy

Use SVG-based historical map layers initially.

Do not use a modern political map of India as the permanent base for
every period.

Initial map states:

1.  Geological / Indian Plate
2.  Harappan
3.  Mahajanapadas
4.  Mauryan
5.  Gupta
6.  Chola / regional medieval
7.  Mughal
8.  Maratha / Deccan
9.  1857
10. 1947

The map should support:

-   hover
-   click
-   selection
-   territory highlighting
-   city markers
-   event markers
-   zoom
-   reset
-   labels
-   contextual overlays

------------------------------------------------------------------------

## 8. Entity Model

### Empire

``` text
id
name
startYear
endYear
region
capital
rulers
description
territoryLayer
associatedPlaces
associatedEvents
sources
evidenceLevel
uncertaintyNotes
```

### Person

``` text
id
name
period
region
associatedPlaces
associatedEvents
description
sources
evidenceLevel
```

### Place

``` text
id
name
coordinates
periods
significance
associatedPeople
associatedEvents
sources
evidenceLevel
```

### Event

``` text
id
name
date
location
description
participants
relatedEntities
sources
evidenceLevel
```

------------------------------------------------------------------------

## 9. Search Architecture

Search across:

-   people
-   empires
-   kingdoms
-   places
-   events
-   historical periods

Search result selection should synchronize:

``` text
SEARCH RESULT
      ↓
TIMELINE
      ↓
MAP
      ↓
ENTITY INSPECTOR
```

Example:

``` text
Shivaji
→ 1674 CE
→ Western Deccan
→ Raigad
→ Shivaji context panel
```

Search should use structured local data in the initial version.

------------------------------------------------------------------------

## 10. Entity Inspector

Create one reusable inspector component capable of displaying:

-   Empire
-   Kingdom
-   Place
-   Person
-   Event

For an empire, support:

-   entity type
-   name
-   date range
-   capital
-   rulers
-   historical context
-   evidence classification
-   related places
-   related people
-   related events
-   source metadata

The inspector should be scrollable when required.

The map must remain visible whenever practical.

------------------------------------------------------------------------

## 11. City / Place Interaction

Historical cities should be clickable.

Selecting a place should:

1.  highlight the marker
2.  zoom the map
3.  update the inspector
4.  show historical significance
5.  show associated people/events when available

Create a reusable place-marker interaction rather than hardcoding
individual city behaviour.

------------------------------------------------------------------------

## 12. 1857 Map State

When the timeline reaches 1857:

-   switch to the 1857 map state
-   display multiple regional centres
-   allow each centre to be selected independently

Initial centres:

-   Barrackpore
-   Meerut
-   Delhi
-   Kanpur
-   Lucknow / Awadh
-   Jhansi / Central India
-   Bihar

Do not represent 1857 as a single linear route.

------------------------------------------------------------------------

## 13. Step Into the Era

Create a reusable modal/panel.

Initial perspectives:

-   Soldier
-   Civilian
-   Political Actor
-   Observer / Chronicler

This should be evidence-informed.

Never present fabricated dialogue as historical testimony.

------------------------------------------------------------------------

## 14. Sources / Evidence

Create a reusable evidence interface.

Support:

-   FACT
-   PRIMARY SOURCE
-   SCHOLARLY INTERPRETATION
-   CONTESTED
-   UNCERTAIN

Do not invent sources.

Historical claims should eventually be linked to source metadata.

------------------------------------------------------------------------

## 15. Prototype Reimplementation

The supplied Stitch HTML is a behavioural reference.

Useful existing prototype concepts include:

-   temporal state switching
-   timeline playback
-   map layer switching
-   empire hover
-   empire selection
-   city selection
-   map zoom
-   search
-   sources
-   Step Into the Era
-   1857 regional centres

Do not copy its direct DOM manipulation architecture.

Convert the behaviour into:

-   React components
-   typed data
-   centralized application state
-   reusable hooks
-   reusable map interactions

------------------------------------------------------------------------

## 16. Implementation Order

### Phase 1 --- Foundation

1.  Project setup
2.  Design system
3.  Application shell
4.  Historical map workspace
5.  Timeline
6.  Temporal state engine

### Phase 2 --- Core Interaction

7.  Maurya map state
8.  Entity inspector
9.  City markers
10. Map zoom
11. Search synchronization

### Phase 3 --- Historical Demonstration

12. 1857 map state
13. Regional centres
14. Step Into the Era
15. Sources/evidence

### Phase 4 --- Polish

16. Responsive behaviour
17. Motion polish
18. Accessibility
19. Performance
20. Code cleanup

Do not attempt to populate all of Indian history before the core
interaction system works.

------------------------------------------------------------------------

## 17. Engineering Rules

### Do

-   Keep data separate from UI.
-   Use TypeScript types.
-   Build reusable components.
-   Use data-driven temporal states.
-   Keep map geometry separate from historical metadata.
-   Make core interactions functional.
-   Keep uncertain claims explicitly marked.
-   Test the timeline-to-map synchronization.

### Do not

-   Create dozens of empty pages.
-   Create fake search.
-   Create buttons that do nothing.
-   Hardcode historical data into presentation components.
-   Treat screenshots as the application.
-   Copy the Stitch monolithic architecture.
-   Add a backend just because it sounds more advanced.
-   Add AI just because the project is historical.
-   Introduce complex GIS infrastructure before it is needed.

------------------------------------------------------------------------

## 18. Definition of Done

The first implementation is successful only if:

1.  Opening the app presents the historical map.
2.  Timeline is the primary navigation.
3.  Timeline changes update the historical map.
4.  Maurya looks and behaves like the supplied Stitch reference.
5.  An empire can be hovered and selected.
6.  Selecting an empire opens the inspector.
7.  Cities can be selected and zoomed.
8.  Search finds multiple entity types.
9.  Search synchronizes timeline and map.
10. 1857 has multiple regional centres.
11. Step Into the Era opens and works.
12. Sources opens and works.
13. The app is responsive.
14. Historical data is separated from UI.
15. The architecture is maintainable and extensible.
