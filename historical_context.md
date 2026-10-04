# Chronoscape --- Historical Context & Accuracy Rules

## 1. Purpose

This document defines the historical scope, chronology model and
evidence rules for Chronoscape.

Historical content must be treated as structured knowledge rather than
decorative copy.

When the application does not have sufficient evidence for a claim, it
should acknowledge uncertainty rather than silently inventing precision.

------------------------------------------------------------------------

## 2. Core Historical Principle

Chronoscape represents historical geography as **time-dependent and
interpretive**.

A present-day political map must not be treated as if it existed
unchanged throughout history.

Historical territories, political authority, cultural regions and
spheres of influence can differ substantially from modern national
borders.

------------------------------------------------------------------------

## 3. Initial Temporal Anchors

The initial product architecture should support these anchors:

  -----------------------------------------------------------------------
  Anchor                  Chronoscape State       Initial Context
  ----------------------- ----------------------- -----------------------
  c. 70 Ma                Geological              Indian Plate /
                                                  deep-time tectonic
                                                  context

  c. 2500 BCE             Harappan                Harappan civilisation

  c. 500 BCE              Mahajanapadas           Early historic
                                                  political landscape

  c. 260 BCE              Maurya                  Mauryan imperial period

  c. 375 CE               Gupta                   Gupta-period context

  c. 1014 CE              Chola                   Chola maritime/regional
                                                  context

  c. 1580 CE              Mughal                  Mughal-period context

  1674 CE                 Shivaji / Maratha       Western Deccan /
                                                  Maratha context

  1757 CE                 Plassey                 Eighteenth-century
                                                  political transition

  1857 CE                 Uprising                Polycentric 1857
                                                  context

  1947 CE                 Independence            End of British colonial
                                                  rule / independence
                                                  context
  -----------------------------------------------------------------------

These anchors are starting points for the application and should
eventually be expanded into a richer continuous chronology.

------------------------------------------------------------------------

## 4. Geological State

The geological state is fundamentally different from later historical
states.

It should communicate:

-   Indian Plate / Gondwana context
-   Tethys Ocean context
-   Eurasian landmass
-   northward plate movement
-   collision-related geological context

It must not display modern national borders.

The Stitch prototype treats this as a dedicated geological SVG layer
rather than a political map.

------------------------------------------------------------------------

## 5. Mauryan State

The default detailed demonstration state is approximately **260 BCE**.

Important places represented in the prototype include:

-   Pataliputra
-   Taxila
-   Ujjain
-   Kalinga-related geography

The Mauryan political sphere should be shown as a historically
interpreted territory, not as an artificially exact GIS polygon.

The prototype identifies the Mauryan imperial seat as Pataliputra and
associates the period with Chandragupta Maurya, Bindusara and Ashoka.

Where boundaries or territorial extent are debated or difficult to
establish precisely, the interface should communicate that uncertainty.

------------------------------------------------------------------------

## 6. Southern / Regional Context

Chronoscape should avoid implying that the Mauryan political sphere
represented all of South Asia.

The prototype provides a separate southern regional context associated
with Tamilakam and the Chola, Chera and Pandya polities.

Regional political formations should remain visible where relevant even
when a larger empire is the temporal focus.

------------------------------------------------------------------------

## 7. 1857 Case Study

The 1857 state should be represented as a **polycentric historical
event**.

Initial centres:

-   Barrackpore
-   Meerut
-   Delhi
-   Kanpur
-   Lucknow / Awadh
-   Jhansi / Central India
-   Bihar

The application should not reduce 1857 to a single route or one uniform
experience.

Each centre should be independently selectable.

------------------------------------------------------------------------

## 8. Evidence Classification

Historical claims should be capable of carrying an evidence
classification.

Use these labels:

### FACT

A claim treated as well-supported historical information in the
application's source set.

### PRIMARY SOURCE

Information grounded directly in a historical primary source.

### SCHOLARLY INTERPRETATION

A conclusion, synthesis or interpretation drawn from historical
scholarship.

### CONTESTED

A claim for which significant scholarly disagreement or competing
interpretations exist.

### UNCERTAIN

A claim for which available evidence does not justify confident
precision.

These labels are part of the product's trust model.

------------------------------------------------------------------------

## 9. Source Rules

Do not invent:

-   sources
-   citations
-   quotations
-   archival references
-   scholarly claims

Every future historical entity should be capable of referencing source
metadata.

If a claim requires verification, development data should explicitly
use:

**TODO: VERIFY**

rather than silently presenting an uncertain claim as fact.

------------------------------------------------------------------------

## 10. Historical Geography Rules

### Do not fabricate precision

Historical boundaries are often reconstructed from incomplete evidence.

Avoid presenting a smooth, modern GIS-style border as an unquestionable
historical fact.

### Distinguish political authority from influence

A territory may represent:

-   direct administration
-   tributary relationship
-   military control
-   cultural influence
-   trade influence
-   contested territory

The data model should eventually allow these distinctions.

### Avoid modern-national anachronism

Do not use modern countries as if they were timeless historical
entities.

Use period-appropriate political and regional terminology.

------------------------------------------------------------------------

## 11. Scope Beyond Rulers

Chronoscape should not reduce history to rulers and wars.

Where the data permits, include:

-   society
-   economy
-   trade
-   religion/philosophy
-   technology
-   culture
-   urban centres
-   maritime networks
-   regional interactions
-   everyday life

These dimensions should eventually become map layers or contextual
perspectives.

------------------------------------------------------------------------

## 12. Step Into the Era

The feature can use perspectives such as:

-   Soldier
-   Civilian
-   Political Actor
-   Observer / Chronicler

These are analytical perspectives.

Do not invent dialogue and present it as a historical person's words.

Do not fabricate first-person testimony.

When using a perspective, distinguish clearly between:

-   documented evidence
-   scholarly interpretation
-   reconstructed context

------------------------------------------------------------------------

## 13. Historical Data Policy for Development

Each historical entity should be represented with structured fields such
as:

-   id
-   name
-   type
-   date/period
-   region
-   description
-   associated people
-   associated places
-   associated events
-   evidence classification
-   sources
-   uncertainty notes

Historical content should remain separate from UI components.

------------------------------------------------------------------------

## 14. Development Rule

When historical information is uncertain, incomplete or not supported by
the current source set:

**Do not guess.**

Use:

**TODO: VERIFY**

and continue building the interface around the structured data model.

Historical accuracy is more important than visual completeness.
