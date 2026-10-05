# CHRONOSCAPE

> **"Explore the past. Don't just read it."**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![deck.gl](https://img.shields.io/badge/deck.gl-9.4_WebGL_Globe-125A69?logo=webgl&logoColor=white)](https://deck.gl/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_Geology-black?logo=threedotjs&logoColor=white)](https://threejs.org/)
[![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-Interactive_Maps-396B94?logo=maplibre&logoColor=white)](https://maplibre.org/)
[![Web Audio](https://img.shields.io/badge/Web_Audio-Procedural_Sound-D946EF?logo=audio&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![GSAP](https://img.shields.io/badge/GSAP-Cinematics-88CE02?logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

**Chronoscape** is an interactive, map-first, time-driven historical atlas of the Indian subcontinent. Spanning deep-time tectonic collisions 70 million years ago to the dawn of constitutional independence in 1947 CE, Chronoscape replaces conventional static history pages and dashboards with a museum-grade spatiotemporal cartographic workspace.

---

## 🧭 Core Philosophy

Traditional history resources reduce the past to static timelines, isolated encyclopedic entries, and modern national boundaries retrofitted onto antiquity. Chronoscape is built on the inverse principle:

1. **Map-First & Time-First:** The historical map canvas *is* the application workspace. Geography, frontiers, trade arteries, and settlement hubs transform dynamically as time scrubbers advance.
2. **3D Spherical & Planetary Context:** India's history was never isolated. Trans-oceanic monsoon navigation, the Silk Roads, and ancient maritime networks spanned the Indian Ocean, Mediterranean, and South China Sea. Chronoscape renders these on a **3D deck.gl Globe** with great-circle orbital arcs.
3. **Historiographical Rigor:** Strict demarcation between established epigraphic/archaeological evidence and scholarly interpretations. Primary inscriptions and archival records are explicitly attributed.
4. **Deep Time to Modern Horizons:** South Asian history begins not with dynasties, but with the northward drift of the Indian plate across the Neo-Tethys Ocean, the eruption of the Deccan Traps, and the Himalayan orogeny that forged the subcontinent's climate, rivers, and natural barriers.

---

## ⚡ Key Features

### 1. 3D Deck.gl Globe & Trans-Regional Trade Arcs
* **GPU-Powered 3D Globe Projection (`_GlobeView`):** Native WebGL spherical projection with camera orbit controls, celestial graticules, and offline Natural Earth landmasses.
* **3D Great-Circle Maritime & Overland Arcs (`ArcLayer`):**
  * **Imperial Chola Thalassocracy (1014 CE):** Trans-oceanic naval expeditions across the Bay of Bengal linking Nagapattinam, the Andaman archipelago, Kadaram (Kedah), Srivijaya (Palembang), and Guangzhou (Song Dynasty China).
  * **Indo-Roman Monsoon Pepper Highway (1st c. BCE – 3rd c. CE):** Open-sea monsoon crossings connecting Muziris (Pattanam) and Barygaza (Bharuch) across the Arabian Sea to Berenike, Alexandria, and Rome.
  * **Meluhha–Dilmun–Ur Bronze Highway (c. 2500 BCE):** The world's earliest verified intercontinental maritime network connecting Lothal dockyard with Dilmun (Bahrain) and Mesopotamia (Ur).
  * **Uttarapatha & Trans-Himalayan Silk Road:** Imperial highway linking Pataliputra, Taxila, Bactria, and Chang'an (Xi'an).
  * **Mughal & Early Modern Indian Ocean Route:** Surat ("The Gate of Mecca") to Mocha (Yemen) and Bandar Abbas / Hormuz.
* **Camera Theater Presets:**
  * 🇮🇳 **Subcontinent:** Centers onto the Gangetic heartland and Deccan plateau.
  * 🌊 **Chola Sea:** Rotates eastward to highlight Bay of Bengal naval expeditions and Southeast Asian straits.
  * 🐪 **Spice Route:** Pivots westward across the Arabian Sea, Persian Gulf, and the Red Sea.
  * 🌏 **Global:** Zooms out to frame trans-Eurasian trade connections.
* **Global Trading Emporia (`ScatterplotLayer` & `TextLayer`):** Concentric glowing beacons at major subcontinental and world ports (Muziris, Lothal, Barygaza, Rome, Alexandria, Chang'an, Palembang).

### 2. Procedural Web Audio Sound Engine
* **100% In-Browser Procedural Synthesis:** Zero external MP3/WAV files required; uses the Web Audio API for instantaneous response.
* **Harmonic Epoch Chimes:** 432 Hz bronze singing bowl / temple bell overtone chimes that play on every historical transition.
* **Ambient Historical Soundscape:** Generative ocean-breeze and meditative tanpura drone for deep documentary immersion.
* **Live Audio Visualizer:** Header HUD includes animated waveform equalizer bars reflecting live audio state.

### 3. Deep-Time Geological Globe (70 Ma Tectonic Drift)
* **Interactive Three.js Earth Simulation:** Dedicated vertex-level mesh engine for modeling continental plate kinematics.
* **Tectonic Trajectory & Hotspots:** Visualizes the ~18–20 cm/year northward sprint of the Indian Craton, the **Tethys Ocean suture zone**, and the pulsating **Réunion Mantle Plume / Deccan Traps** flood basalt province (~66 Ma).
* **Cinematic GSAP Milestones:**
  - `71 Ma`: Gondwana Breakup & Oceanic Sprint
  - `66 Ma`: Deccan Traps Volcanism & K-Pg Extinction Horizon
  - `55 Ma`: First Continental Contact with Proto-Tibet
  - `38 Ma`: Neo-Tethys Closure & Higher Himalayan Crustal Shortening
  - `Present Day`: Ongoing Underthrusting (~4–5 cm/year) & Mountain Growth

### 4. High-Resolution 2D Cartographic Atlas (MapLibre GL)
* **Seamless Projection Switcher:** Instant toggling between **`[ 🗺️ 2D ATLAS | 🌐 3D GLOBE ]`** at any point in historical eras.
* **Satellite & Historic Basemaps:**
  - 🛰️ **Satellite:** High-resolution ESRI World Imagery orbital photography.
  - 🗺️ **Dark Atlas:** Carto Dark Matter cartography.
  - 📜 **Parchment:** Antique cartographic parchment (Carto Voyager).
* **Dynamic Empire Formations:** Translucent glowing territorial polygons and frontier boundaries across all major epochs:
  - *Indus-Sarasvatī Civilisation* (c. 2500 BCE)
  - *Soḷasa Mahājanapadas* (c. 500 BCE)
  - *Maurya Samrājya* (c. 260 BCE)
  - *Imperial Guptas* (c. 375 CE)
  - *Imperial Cholas* (c. 1014 CE)
  - *Mughal Empire* (c. 1580 CE)
  - *Maratha Hindavī Swarājya* (1674 CE)
  - *East India Company Bengal Hegemony* (1757 CE)
  - *Polycentric 1857 Uprising* (1857 CE)
  - *Dominions of India & Pakistan* (1947 CE)

### 5. Master Temporal Engine & Keyboard Navigation
* **Full Keyboard Arrow Controls:**
  - Press <kbd>←</kbd> / <kbd>→</kbd> to step smoothly backward and forward through time.
  - Press <kbd>Spacebar</kbd> to pause or resume timeline auto-flow.
* **Floating Cursor Tooltip:** Hovering over the timeline track displays a live preview pill showing the year, hegemon, and region before clicking.
* **Jewel Node Breakpoints:** Glowing nodes color-coded by epoch type (Amber for classical samrājyas, Cyan for maritime Chola, Ruby for 1857 Uprising, Amethyst for Deep Time).

### 6. Royal Dossier Entity Inspector
* **Contextual Slideout Panel:** Rulers list, royal seats, territory area statistics, and epigraphic excerpts.
* **Interactive Strategic Hubs:** Associated citadels and ports (Pāṭaliputra, Takṣaśilā, Ujjayinī, Thanjavur, Muziris) are interactive quick-action chips that pan the map and select the entity.
* **Historiographical Certainty Badges:** (`FACT`, `PRIMARY SOURCE`, `SCHOLARLY INTERPRETATION`, `CONTESTED`, `UNCERTAIN`).

### 7. Global Spotlight Command Search (`⌘K` / `Ctrl+K`)
* **Indexed Trade Routes & Global Ports:** Instant search indexing ancient figures, polities, battles, and maritime trade routes (e.g. typing *"Muziris"*, *"Rome"*, *"Silk"*, *"Pepper"*, *"Dilmun"*, or *"Chola"* instantly surfaces their historical context and triggers the 3D globe camera).
* **Category Filters:** Quick one-click pills for Figures, Empires, Citadels, Trade Routes, and Turning Points.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) |
| **Build & Bundling** | [Vite 6](https://vitejs.dev/) |
| **3D Spherical Globe & Arcs** | [deck.gl 9](https://deck.gl/) (`GlobeView`, `ArcLayer`, `GeoJsonLayer`, `ScatterplotLayer`, `TextLayer`) |
| **3D Geological Simulation** | [Three.js](https://threejs.org/) + `OrbitControls` (70 Ma Tectonics & Deccan Traps) |
| **2D Cartographic Atlas** | [MapLibre GL 6](https://maplibre.org/) + ESRI World Imagery & Carto Styles |
| **Procedural Audio Synthesis** | [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) (Zero external audio files) |
| **Animation & Cinematics** | [GSAP 3](https://greensock.com/gsap/) + [Framer Motion](https://www.framer.com/motion/) |
| **Styling & Cartographic UI** | [Tailwind CSS 3](https://tailwindcss.com/) + Custom Glassmorphism Theme |
| **Iconography** | [Lucide React](https://lucide.dev/) |

---

## 📁 Project Directory Structure

```
Chronoscape/
├── public/
│   ├── data/
│   │   └── ne_110m_land.json        # Offline Natural Earth landmasses
│   └── images/
│       └── geology/
│           ├── collision.gif          # 71 Ma continental collision simulation
│           ├── drift_71mya.jpg        # Paleomagnetic reconstruction diagram
│           └── tectonic_summary.png   # Himalayan thrust cross-section
├── src/
│   ├── components/
│   │   ├── entities/
│   │   │   └── EntityInspector.tsx   # Royal dossier synthesis drawer & strategic hubs
│   │   ├── layout/
│   │   │   ├── HeaderHUD.tsx         # Navbar with Soundscape, Epoch drawer & Tour
│   │   │   └── TemporalHUD.tsx       # Floating temporal focus card with filigree & 2D/3D toggle
│   │   ├── map/
│   │   │   ├── GeologicalGlobe.tsx   # Three.js 3D Earth & plate drift engine
│   │   │   ├── HistoricalGlobeDeck.tsx # deck.gl 3D spherical globe with trade arcs
│   │   │   ├── HistoricalMapGL.tsx   # MapLibre GL satellite map & territory layers
│   │   │   └── MapWorkspace.tsx      # Viewport orchestrator (3D Globe vs 2D Map)
│   │   ├── search/
│   │   │   └── SearchModal.tsx       # Cmd+K spotlight search indexing trade & empires
│   │   ├── sources/
│   │   │   └── SourcesModal.tsx      # Historiographical evidence guide
│   │   ├── stepIntoEra/
│   │   │   └── StepIntoEraModal.tsx  # Eyewitness perspectives modal
│   │   └── timeline/
│   │       └── Timeline.tsx          # Master temporal scrubber with keyboard nav & jewel nodes
│   ├── context/
│   │   └── TemporalContext.tsx       # Central state management & sound synchronization
│   ├── data/
│   │   ├── empires/                  # Dynasty & state profiles
│   │   ├── events/                   # Pivotal events & campaigns
│   │   ├── people/                   # Historical biographies
│   │   ├── perspectives/             # Primary eyewitness accounts
│   │   ├── places/                   # Urban settlements & 1857 centers
│   │   ├── sources/                  # Historiographical metadata
│   │   ├── timeline/                 # Temporal anchors (-70 Ma to 1947 CE)
│   │   └── tradeRoutes.ts            # Global trade arcs & ancient trading hubs
│   ├── map/
│   │   └── geometry/
│   │       ├── revoltCenters.ts      # 1857 geodetic coordinates
│   │       └── territories.ts        # Historical empire GeoJSON polygons
│   ├── types/
│   │   └── index.ts                  # TypeScript entity interfaces
│   ├── utils/
│   │   └── sound.ts                  # Procedural Web Audio synthesis engine
│   ├── App.tsx                       # Master application component
│   ├── index.css                     # Cartographic styling, animations & typography
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

1. **Navigate to the repository:**
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

Compile the TypeScript bundle and generate the optimized production build:

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
| <kbd>→</kbd> / <kbd>↓</kbd> | Travel forward to next historical epoch |
| <kbd>←</kbd> / <kbd>↑</kbd> | Travel backward to previous historical epoch |
| <kbd>Space</kbd> | Toggle timeline auto-flow tour |
| <kbd>⌘</kbd> + <kbd>K</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd> | Open Search Atlas command palette |
| <kbd>Esc</kbd> | Close any open modal or search dialog |

---

## 📜 Historiographical Methodology & Primary Sources

Chronoscape adheres strictly to peer-reviewed archaeological, epigraphic, and historical research:
* **Epigraphy:** *Corpus Inscriptionum Indicarum*, *Epigraphia Indica*, Edicts of Ashoka (Hultzsch, 1925; Sircar, 1965), Thanjavur Brihadisvara Temple inscriptions of Rajendra Chola I (1025 CE).
* **Maritime & Numismatics:** *The Muziris Papyrus* (Vienna National Library), *Periplus of the Erythraean Sea*, Roman gold coin hoards in South India (Arikamedu, Kottayam), *Song Shi* (History of Song).
* **Archaeology:** Archaeological Survey of India (ASI) excavation reports for Taxila, Pāṭaliputra, Lothal, and Dholavira.
* **Geology:** *Paleogeographic Mapping Project* (Scotese), Molnar & Tapponnier (Science 1975), Geological Survey of India, and Wadia Institute of Himalayan Geology.
* **Archival Documents:** *National Archives of India* Mutiny Papers, Fort William Despatches, Mirza Ghalib's *Dastanbuy*.

---

## 📄 License

This project is created for educational and historical exploration. All source code is released under the **MIT License**.
All satellite imagery is attributed to Esri, Maxar, Earthstar Geographics, and OpenStreetMap.
Geological diagrams and animations are utilized under Wikimedia Commons educational licenses.
