# Chronoscape --- Project Context

## 1. Product

**Chronoscape** is an interactive historical atlas of the Indian
subcontinent.

**Tagline:**\
\> Explore the past. Don't just read it.

Chronoscape is designed around the idea that history is best understood
as a relationship between **time, place, people, power, events, society,
culture, economy, change, and consequence**.

It is not a conventional history website, article archive, or landing
page.

The primary experience is:

**TIME → MAP → DISCOVERY → CONTEXT**

The map is the primary interface.

------------------------------------------------------------------------

## 2. Product Vision

Chronoscape should make users feel that they are moving through
historical space and time rather than simply reading a chronological
list of facts.

The central question of the product is:

> What was happening here at this point in time?

A user should be able to move along the timeline, observe the historical
geography change, select a place or political entity, and progressively
discover the people, events and context connected to it.

------------------------------------------------------------------------

## 3. Core Experience

The main application consists of:

1.  A persistent historical map workspace.
2.  A temporal timeline that controls the historical state.
3.  A contextual temporal HUD.
4.  Interactive political territories and historical regions.
5.  Clickable cities and places.
6.  An entity inspector.
7.  Search across historical entities.
8.  Evidence and source information.
9.  A "Step Into the Era" perspective experience.
10. Timeline playback and deliberate motion.

The relationship between these systems is fundamental:

**Timeline changes**\
→ **historical state changes**\
→ **map changes**\
→ **visible entities change**\
→ **context changes**

This synchronization is the core product requirement.

------------------------------------------------------------------------

## 4. Primary Users

The initial product is intended for:

-   Students exploring Indian history.
-   Curious learners and general audiences.
-   Teachers and educators.
-   Researchers and history enthusiasts.
-   Users who understand history spatially and chronologically.

The interface should be approachable without becoming simplistic.

------------------------------------------------------------------------

## 5. Product Principles

### Map-first

The map is not decorative background content. It is the primary
navigation and exploration surface.

### Time-first

Time is a first-class interaction. The user should be able to understand
how political and geographic context changes across periods.

### Context over isolated facts

Selecting an entity should reveal relationships rather than only a
paragraph of text.

### Evidence-aware

Historical claims should distinguish established evidence from
interpretation and uncertainty.

### Regional breadth

Indian history should not be reduced to a single succession of rulers
and wars. Regional histories, societies, economies, cultures and
networks should be represented over time.

### Historical humility

Chronoscape must not present uncertain historical boundaries,
interpretations or claims as exact facts.

### Extensible architecture

Adding a new period, empire, person, place or event should primarily
involve adding structured data rather than rewriting UI components.

------------------------------------------------------------------------

## 6. Initial Scope

The first implementation should demonstrate the architecture through
selected temporal anchors:

-   c.  70 Ma --- geological / Indian Plate context
-   c.  2500 BCE --- Harappan civilisation
-   c.  500 BCE --- Mahajanapadas
-   c.  260 BCE --- Mauryan period
-   c.  375 CE --- Gupta period
-   c.  1014 CE --- Chola maritime context
-   c.  1580 CE --- Mughal period
-   1674 CE --- Shivaji / Maratha context
-   1757 CE --- Plassey
-   1857 CE --- Uprising
-   1947 CE --- Independence

These are initial anchors, not the final limits of Chronoscape.

The architecture should eventually support a continuous temporal model
rather than only discrete milestones.

------------------------------------------------------------------------

## 7. Initial Deep-Dive Case Study

The first detailed historical case study is **1857**.

It should be represented as a polycentric historical event rather than
one simplified route.

Initial regional centres:

-   Barrackpore
-   Meerut
-   Delhi
-   Kanpur
-   Lucknow / Awadh
-   Jhansi / Central India
-   Bihar

Each centre should be independently selectable and explorable.

------------------------------------------------------------------------

## 8. Step Into the Era

The initial perspective categories are:

-   Soldier
-   Civilian
-   Political Actor
-   Observer / Chronicler

This feature is intended to provide evidence-informed perspective, not
fictional roleplay presented as history.

Chronoscape must not invent historical dialogue or fabricated quotations
and present them as authentic testimony.

------------------------------------------------------------------------

## 9. What Chronoscape Is Not

Do not turn Chronoscape into:

-   A generic landing page.
-   A collection of static historical cards.
-   A conventional blog.
-   A SaaS dashboard.
-   A modern political map with historical labels pasted on top.
-   A collection of disconnected screens.
-   An AI chatbot disguised as a history product.
-   A fake GIS application with precise-looking boundaries unsupported
    by evidence.

------------------------------------------------------------------------

## 10. Prototype Relationship

The supplied Stitch screenshot is the **visual source of truth**.

The supplied Stitch HTML is the **interaction/prototype reference**.

The prototype demonstrates useful concepts including:

-   temporal states
-   timeline playback
-   map layers
-   empire hover
-   empire selection
-   city selection
-   map zoom
-   search
-   source interface
-   Step Into the Era
-   1857 regional centres

The prototype should be studied and reused conceptually, but its
monolithic HTML/JavaScript architecture should not be copied into the
production application.

------------------------------------------------------------------------

## 11. Success Criteria

The first implementation is successful when:

-   The app opens directly into the historical map workspace.
-   The timeline is clearly the primary navigation.
-   Moving through time changes the map and context.
-   The Mauryan state provides a polished demonstration.
-   Territories can be hovered and selected.
-   Cities can be selected and zoomed.
-   The inspector displays contextual information.
-   Search actually works and synchronizes with the temporal engine.
-   1857 has multiple regional centres.
-   Sources/evidence are accessible.
-   Step Into the Era works.
-   The UI is responsive.
-   Historical data is separated from UI code.
-   The architecture is ready for additional historical periods.
