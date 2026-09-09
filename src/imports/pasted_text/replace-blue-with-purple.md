# SPOT Color System Update — Replace Blue with Purple

Update the entire SPOT application color system so that the current **blue primary color is replaced with purple `#9961F7`**.

This is a **color-system change only**.

**Do not change any functionality, layout, component behavior, interactions, content, navigation, business logic, API calls, database logic, booking logic, or responsive behavior.**

## Primary Color

Use:

**Primary Purple: `#9961F7`**

`#9961F7` must become the new primary brand/accent color throughout SPOT.

---

## Replace the Existing Blue System

Do NOT simply replace every blue hex value with `#9961F7`.

Instead, create a proper **purple color scale** derived from `#9961F7` and replace the existing blue shades with appropriate purple equivalents.

Apply the purple scale consistently to:

* Primary buttons
* Active buttons
* Links
* Active navigation items
* Selected states
* Focus states
* Icons
* Active tabs
* Status indicators where blue is currently used
* Seat/booking states where blue is currently used
* Borders
* Outlines
* Dividers that currently use blue
* Card borders
* Input focus borders
* Component highlights
* Background tints
* Gradients
* Shadows
* Glows
* Hover states
* Pressed states
* Disabled states where applicable

---

## Purple Color Tokens

Establish reusable design tokens instead of hardcoding individual purple values.

Use `#9961F7` as the base and generate lighter/darker variants as required.

Suggested semantic structure:

* `primary-50` — very light purple tint
* `primary-100` — light purple
* `primary-200`
* `primary-300`
* `primary-400`
* `primary-500` — `#9961F7`
* `primary-600` — darker purple
* `primary-700` — deeper purple
* `primary-800`
* `primary-900` — darkest purple

Do not blindly use the same purple for every element.

Choose the appropriate shade based on hierarchy, contrast, interaction state, and visual weight.

---

## Shadows

All shadows that currently have a blue tint must be converted to an appropriate **purple-tinted shadow**.

Do not make shadows fully saturated purple.

Use subtle purple variants with appropriate opacity so the shadows remain natural and professional.

For example:

* Cards → subtle neutral/purple elevation
* Primary buttons → subtle purple glow/shadow
* Selected elements → subtle purple emphasis
* Floating elements → subtle purple-tinted elevation

Avoid excessive neon/glowing effects.

---

## Borders

Replace blue borders with appropriate purple shades.

Examples:

* Default accent border → `primary-500`
* Subtle border → lighter purple token
* Hover border → stronger purple
* Focus border → `primary-500`
* Selected border → `primary-500`
* Active border → appropriate darker purple

Do not make every border `#9961F7`. Use the correct shade according to hierarchy.

---

## Backgrounds

Where the existing UI uses blue backgrounds or blue-tinted surfaces:

* Replace them with appropriate purple-tinted backgrounds.
* Use very light purple tints for subtle surfaces.
* Use the primary purple for strong brand surfaces.
* Use darker purple variants where the existing design uses dark blue.

Maintain sufficient contrast with text and icons.

---

## Gradients

Any existing blue gradient must become a purple-based gradient.

Do not use random purple gradients.

Gradients should be derived from the new purple palette and remain visually consistent across the application.

---

## This Screen Specifically

For the screen shown in the reference:

### Header / Hero Area

The current blue header background should become a purple-based brand background.

Use the new purple palette while preserving the existing visual hierarchy.

### Occupancy / Available / Layout

Replace blue icons, dividers, and active visual elements with appropriate purple variants.

### Checked-In Card

Replace blue:

* Icons
* Borders
* Accent elements
* Success-related blue elements, if any

with appropriate purple variants.

**Do not change the green "Confirmed" status.**

Green is a semantic success color and must remain green.

### Book Seat / My Bookings

Replace:

* Blue circular icons
* Blue icon backgrounds
* Blue borders
* Blue shadows
* Blue active states

with purple equivalents.

### Bottom Navigation

Replace the active blue home icon and active blue text with purple.

Inactive navigation items should remain neutral.

### Layout Icon

Replace the blue/blue-tinted layout icon with the appropriate purple token.

---

## Semantic Colors Must NOT Be Changed

Do not convert every color in the application to purple.

Preserve semantic colors where they communicate meaning.

For example:

* Success → Green
* Warning → Amber/Yellow
* Error → Red
* Information → Use the established semantic information color unless it is specifically part of the old brand-blue system
* Neutral → Gray/Black/White

Purple is the **brand/primary color**, not the replacement for every semantic color.

---

## Critical Implementation Rule

First identify the existing color tokens/styles used by the application.

Then:

1. Create the new purple token system.
2. Map existing blue tokens to the new purple tokens.
3. Update components to consume the new tokens.
4. Replace remaining hardcoded blue values.
5. Check shadows, borders, gradients, icons, hover states and focus states.
6. Check every screen for leftover unintended blue.
7. Ensure all components use the same purple system.

Do not patch individual screens independently.

**The color change must happen at the Design System/token level wherever possible so that every component automatically receives the new visual language.**

---

## Important

Do not alter:

* Layout
* Spacing
* Typography
* Component dimensions
* Content
* Icons themselves
* Navigation
* Interactions
* Animations
* Booking workflows
* Seat availability logic
* Check-in logic
* Permissions
* APIs
* Database behavior
* Business rules

Only update the visual color system.

The final result should look like the **same SPOT application and same UI**, but with the entire existing blue visual language systematically replaced by a polished purple system based on **`#9961F7`**.

Before finishing, perform a full application-wide scan and ensure there are **no unintended blue remnants** anywhere in the UI.
