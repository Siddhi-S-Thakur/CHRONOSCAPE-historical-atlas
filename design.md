# Chronoscape --- Design System & UX

## 1. Design Direction

Chronoscape should feel like a **cinematic historical cartographic
instrument**.

The supplied Stitch reference establishes the target direction:

-   dark cartographic workspace
-   warm ivory typography
-   antique gold accents
-   muted blue-gray secondary tones
-   historical/editorial typography
-   subtle map grid
-   restrained borders
-   layered information
-   persistent timeline
-   map-first composition

The design should feel scholarly and premium without becoming ornamental
for its own sake.

------------------------------------------------------------------------

## 2. Visual Character

### Background

Use near-black / charcoal tones.

The background should allow the map and gold historical accents to
remain visually dominant.

### Primary text

Use warm ivory rather than pure white.

### Accent

Use antique gold for:

-   active timeline position
-   important labels
-   selected territories
-   focus indicators
-   primary historical emphasis

### Secondary colours

Use restrained slate, blue-gray and desaturated tones for:

-   rivers
-   secondary labels
-   interface metadata
-   inactive controls
-   supporting map information

### Typography

Use an elegant serif for:

-   Chronoscape branding
-   historical titles
-   major temporal headings
-   map inscriptions

Use a clean sans-serif for:

-   controls
-   metadata
-   navigation
-   buttons
-   search
-   interface labels

The Stitch prototype uses Cinzel, EB Garamond and Plus Jakarta Sans as
its typographic direction.

------------------------------------------------------------------------

## 3. Layout

Desktop is the primary experience.

### Top navigation

The top HUD should contain:

-   Chronoscape brand
-   tagline
-   temporal shortcuts
-   Search Atlas
-   Step Into Era
-   Sources
-   optional map perspective/layer controls

The navigation should remain compact and cinematic.

### Main map

The majority of the viewport belongs to the historical map.

The map should contain:

-   historical territories
-   regional boundaries where appropriate
-   cities
-   rivers and geographic references
-   labels
-   event markers
-   subtle cartographic grid
-   compass / coordinate ornamentation where useful

### Left temporal HUD

The left overlay communicates the current temporal state.

It should show:

-   CURRENT TEMPORAL FOCUS
-   current date
-   current period/region
-   short historical description
-   extent or contextual metadata
-   hegemon / political formation when applicable
-   capital when applicable

### Right entity inspector

The inspector appears when an entity is selected.

It should preserve map visibility while providing deeper context.

Possible content:

-   entity type
-   date range
-   name
-   subtitle
-   capital
-   rulers / associated people
-   historical context
-   evidence classification
-   related places
-   related people
-   related events
-   source references

### Bottom timeline

The timeline is persistent.

It should include:

-   current chronological position
-   draggable/scrubbable position
-   milestone labels
-   playback control
-   auto-flow/playback
-   historical period labels

------------------------------------------------------------------------

## 4. Interaction Principles

### Timeline

Dragging or selecting a timeline position must change the historical
state.

Do not make the timeline a decorative progress bar.

### Territory hover

Hovering a territory should:

-   visually emphasize it
-   update a concise interaction hint or preview
-   preserve the rest of the map

### Territory selection

Clicking a territory should:

-   select the entity
-   open/update the inspector
-   preserve the current map
-   make the selected state visually clear

### City selection

Clicking a city should:

-   highlight the city
-   zoom toward it
-   update the inspector
-   show historical significance
-   expose related people/events when available

### Search

Search should not merely open a visual modal.

It should query structured local data and synchronize the result with:

**SEARCH → TIMELINE → MAP → INSPECTOR**

### Step Into the Era

This should open a focused perspective experience without hiding the
historical context or fabricating testimony.

### Sources

Sources should make evidence visible without overwhelming the main map
workspace.

------------------------------------------------------------------------

## 5. Motion

Motion should communicate change.

Important transitions:

-   timeline → map state transition
-   territory hover → territory emphasis
-   territory selection → inspector reveal
-   city selection → map zoom
-   search result → temporal/map synchronization
-   switching to 1857 → regional-centre transition

Use motion deliberately.

Avoid constant animation, excessive parallax, or decorative effects that
distract from exploration.

------------------------------------------------------------------------

## 6. Map Design

The map should look historical without pretending to be a literal
scanned antique map.

Use:

-   subtle grid
-   restrained topographic/geographic lines
-   rivers
-   coastline
-   mountain systems
-   territory overlays
-   labels
-   markers
-   subdued texture

Avoid:

-   modern Google Maps styling
-   bright satellite imagery
-   neon map colours
-   excessive 3D terrain
-   modern political borders treated as timeless
-   visually exact borders where historical evidence is uncertain

Different periods should have different map layers or state-specific
geometry.

------------------------------------------------------------------------

## 7. Responsive Design

Desktop is the primary experience.

On smaller screens:

-   map remains primary
-   timeline becomes horizontally scrollable/draggable
-   inspector becomes a bottom sheet or compact overlay
-   search becomes an overlay
-   controls remain accessible

Do not simply stack all desktop panels vertically.

------------------------------------------------------------------------

## 8. Accessibility & Usability

The visual style must not compromise usability.

Ensure:

-   readable text sizes
-   sufficient contrast
-   keyboard-accessible controls
-   visible focus states
-   clear selected states
-   tooltips or labels for icon-only actions
-   logical tab order
-   reduced-motion consideration

------------------------------------------------------------------------

## 9. Avoid

Do not use:

-   neon cyberpunk styling
-   childish visuals
-   generic SaaS card grids
-   excessive glassmorphism
-   excessive rounded containers
-   unnecessary gradients
-   giant hero sections
-   stock-history website aesthetics
-   decorative UI that has no functional purpose

Chronoscape should feel like an instrument for historical exploration.
