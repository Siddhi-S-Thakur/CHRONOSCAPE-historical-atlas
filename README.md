# CHRONOSCAPE

> **"Explore the past. Don't just read it."**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=threedotjs&logoColor=white)](https://threejs.org/)
[![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-Interactive_Maps-396B94?logo=maplibre&logoColor=white)](https://maplibre.org/)
[![GSAP](https://img.shields.io/badge/GSAP-Cinematics-88CE02?logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

**Chronoscape** is an interactive, map-first and time-first historical atlas of the Indian subcontinent. Spanning deep-time tectonic collisions 70 million years ago to the dawn of constitutional independence in 1947 CE, Chronoscape replaces conventional static history pages and dashboards with an exploratory, spatiotemporal cartographic workspace.

---

## 🧭 Core Philosophy

Traditional history resources reduce the past to static timelines, isolated encyclopedic entries, and modern national boundaries retrofitted onto antiquity. Chronoscape is built on the inverse principle:

1. **Map-First & Time-First:** The historical map canvas *is* the application workspace. Geography, frontiers, trade arteries, and settlement hubs transform dynamically as time scrubbers advance.
2. **Historiographical Rigor:** Strict demarcation between established epigraphic/archaeological evidence and scholarly interpretations. Primary inscriptions and archival records are explicitly attributed.
3. **Deep Time to Modern Horizons:** South Asian history begins not with dynasties, but with the northward drift of the Indian plate across the Neo-Tethys Ocean, the eruption of the Deccan Traps, and the Himalayan orogeny that forged the subcontinent's climate, rivers, and natural barriers.

---

## ⚡ Key Features

### 1. 3D Paleogeographic Engine (70 Ma Tectonic Drift)
* **Interactive Three.js Earth Globe:** Full WebGL 3D simulation with orbit controls, realistic specular oceans, starfield particles, and atmospheric scattering.
* **Tectonic Trajectory & Hotspots:** Visualizes the rapid ~18–20 cm/year northward sprint of the Indian Craton, the **Tethys Ocean suture zone**, and the pulsating **Réunion Mantle Plume / Deccan Traps** flood basalt province (~66 Ma).
* **Cinematic GSAP Milestones:** Smooth camera transitions across 5 key geological stages:
  - `71 Ma`: Gondwana Breakup & Oceanic Sprint
  - `66 Ma`: Deccan Traps Volcanism & K-Pg Extinction Horizon
  - `55 Ma`: First Continental Contact with Proto-Tibet
  - `38 Ma`: Neo-Tethys Closure & Higher Himalayan Crustal Shortening
  - `Present Day`: Ongoing Underthrusting (~4–5 cm/year) & Mountain Growth
* **Scientific Evidence Viewer:** Authentic paleogeographic reconstructions integrated directly from geological surveys:
  - Collision time-lapse kinematics (`collision.gif`)
  - 71 Ma to present paleomagnetic drift tracking (`drift_71mya.jpg`)
  - Himalayan thrust fault cross-section architecture (MCT, MBT, HFT) (`tectonic_summary.png`)

### 2. High-Resolution Historical Map Workspace
* **Real Satellite Basemap:** MapLibre GL integration powered by high-resolution **ESRI World Imagery** satellite photography and global digital elevation.
* **Live Basemap Switcher:**
  - 🛰️ **Satellite:** Authentic Earth orbital photography revealing real river basins, mountain passes, and coastlines.
  - 🗺️ **Dark Atlas:** High-contrast Carto Dark matter cartography.
  - 📜 **Parchment:** Antique cartographic parchment style (Carto Voyager).
* **Dynamic Empire Formations:** Translucent glowing GeoJSON territorial polygons and frontier boundaries:
  - *Indus-Sarasvatī Civilisation* (c. 2500 BCE)
  - *Soḷasa Mahājanapadas* (c. 500 BCE)
  - *Maurya Samrājya* (c. 260 BCE)
  - *Imperial Guptas* (c. 375 CE)
  - *Imperial Cholas & Maritime Sea-Lanes* (c. 1014 CE)
  - *Mughal Empire* (c. 1580 CE)
  - *Maratha Hindavī Swarājya* (1674 CE)
  - *East India Company Bengal Hegemony* (1757 CE)
  - *Polycentric 1857 Uprising* (1857 CE)
  - *Dominions of India & Pakistan* (1947 CE)

### 3. Polycentric 1857 Uprising Layer
* Replaces monolithic narratives with autonomous regional beacons across **Meerut**, **Delhi**, **Lucknow**, **Kanpur**, **Jhansi**, **Jagdishpur**, and **Barrackpore**.
* Each hotspot features animated pulse rings, prominent regional leaders (Rani Lakshmibai, Begum Hazrat Mahal, Kunwar Singh, Nana Saheb, Mangal Pandey), and court-martial / archival dispatch notes.

### 4. Spatiotemporal Entity Inspector
* Contextual slide-out drawer presenting structured historical synthesis:
  - **Capital & Regional Seats**
  - **Prominent Rulers & Viceroys**
  - **Primary Epigraphic Evidence** (Ashokan Pillar/Rock Edicts, Heliodorus Pillar, Allahabad Pillar Inscriptions)
  - **Contemporary Global Context** (Achaemenid Persia, Hellenistic Mediterranean, Tang China, Ottoman Empire)
  - **Historiographical Certainty Badges** (`FACT`, `PRIMARY SOURCE`, `SCHOLARLY INTERPRETATION`, `CONTESTED`, `UNCERTAIN`)

### 5. Eyewitness Perspectives & Primary Sources
* **Step Into Era Modal:** Contextual accounts from historical contemporaries:
  - *Megasthenes' Indica* on Pāṭaliputra's civic administration
  - *Mirza Ghalib's Dastanbuy* on the siege and fall of Delhi in 1857
  - *Begum Hazrat Mahal's 1858 Counter-Proclamation*
* **Search Atlas (`⌘K` / `Ctrl+K`):** Instant fuzzy search across historical figures, ancient cities, imperial states, and decisive battles.
* **Sources Modal:** Detailed historiographical matrix clarifying methodology, epigraphic gazetteers, and primary research archives.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) |
| **Build & Bundling** | [Vite 6](https://vitejs.dev/) |
| **3D Graphics & WebGL** | [Three.js](https://threejs.org/) + `OrbitControls` |
| **Interactive Geospatial Maps** | [MapLibre GL](https://maplibre.org/) + GeoJSON Polygon Topologies |
| **Animation & Cinematics** | [GSAP 3](https://greensock.com/gsap/) (GreenSock Animation Platform) + [Framer Motion](https://www.framer.com/motion/) |
| **Styling & Cartographic UI** | [Tailwind CSS 3](https://tailwindcss.com/) + Custom Glassmorphism Theme |
| **Iconography** | [Lucide React](https://lucide.dev/) |

---

## 📁 Project Directory Structure

```
Chronoscape/
├── public/
│   └── images/
│       └── geology/
│           ├── collision.gif          # 71 Ma continental collision simulation
│           ├── drift_71mya.jpg        # Paleomagnetic reconstruction diagram
│           └── tectonic_summary.png   # Himalayan thrust cross-section
├── src/
│   ├── components/
│   │   ├── entities/
│   │   │   └── EntityInspector.tsx   # Contextual synthesis drawer
│   │   ├── layout/
│   │   │   ├── HeaderHUD.tsx         # Minimalist navbar (Title, Search, Sources)
│   │   │   └── TemporalHUD.tsx       # Floating temporal focus card
│   │   ├── map/
│   │   │   ├── GeologicalGlobe.tsx   # Three.js 3D Earth & plate drift engine
│   │   │   ├── HistoricalMapGL.tsx   # MapLibre GL satellite map & territory layers
│   │   │   └── MapWorkspace.tsx      # Viewport orchestrator (3D Globe vs 2D Map)
│   │   ├── search/
│   │   │   └── SearchModal.tsx       # Cmd+K global search dialog
│   │   ├── sources/
│   │   │   └── SourcesModal.tsx      # Historiographical evidence guide
│   │   ├── stepIntoEra/
│   │   │   └── StepIntoEraModal.tsx  # Eyewitness perspectives modal
│   │   └── timeline/
│   │       └── Timeline.tsx          # Persistent spatiotemporal scrubber & auto-play
│   ├── context/
│   │   └── TemporalContext.tsx       # Central state management engine
│   ├── data/
│   │   ├── empires/                  # Dynasty & state profiles
│   │   ├── events/                   # Pivotal events & campaigns
│   │   ├── people/                   # Historical biographies
│   │   ├── perspectives/             # Primary eyewitness accounts
│   │   ├── places/                   # Urban settlements & 1857 centers
│   │   ├── sources/                  # Historiographical metadata
│   │   └── timeline/                 # Temporal anchors (-70 Ma to 1947 CE)
│   ├── map/
│   │   └── geometry/
│   │       ├── revoltCenters.ts      # 1857 geodetic coordinates
│   │       └── territories.ts        # Historical empire GeoJSON polygons
│   ├── types/
│   │   └── index.ts                  # TypeScript entity interfaces
│   ├── App.tsx                       # Master application component
│   ├── index.css                     # Cartographic styling & typography
│   └── main.tsx                      # Entry point
├── index.html                        # HTML5 shell & Google Fonts
├── package.json                      # Dependencies & npm scripts
├── tailwind.config.js                # Theme tokens & cartographic palettes
├── tsconfig.json                     # TypeScript compiler configuration
└── vite.config.ts                    # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Installation

1. **Clone or navigate to the repository:**
   ```bash
   cd Chronoscape
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   ```
   http://localhost:5173/
   ```

### Building for Production

Compile the TypeScript bundle and create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>⌘</kbd> + <kbd>K</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd> | Open Search Atlas |
| <kbd>Esc</kbd> | Close any open modal or inspector |
| <kbd>Space</kbd> | Play / Pause timeline auto-flow (when timeline is focused) |

---

## 📜 Historiographical Methodology & Primary Sources

Chronoscape adheres strictly to peer-reviewed archaeological, epigraphic, and historical research:
* **Epigraphy:** *Corpus Inscriptionum Indicarum*, *Epigraphia Indica*, Edicts of Ashoka (Hultzsch, 1925; Sircar, 1965).
* **Archaeology:** Archaeological Survey of India (ASI) excavation reports for Taxila, Pāṭaliputra, Lothal, and Dholavira.
* **Geology:** *Paleogeographic Mapping Project* (Scotese), Molnar & Tapponnier (Science 1975), Geological Survey of India, and Wadia Institute of Himalayan Geology.
* **Archival Documents:** *National Archives of India* Mutiny Papers, Fort William Despatches, Mirza Ghalib's *Dastanbuy*.

---

## 📄 License

This project is created for educational and historical exploration. All source code is released under the **MIT License**.
All satellite imagery is attributed to Esri, Maxar, Earthstar Geographics, and OpenStreetMap.
Geological diagrams and animations are utilized under Wikimedia Commons educational licenses.
