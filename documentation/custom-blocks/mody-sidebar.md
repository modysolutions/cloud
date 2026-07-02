# mody/sidebar — Sidebar Navigation

_Block file:_ `app/web/plugins/mody/blocks/sidebar/`  
_Edit source:_ `src/plugins/mody/sidebar/index.js`  
_Styles:_ `src/plugins/mody/sidebar.scss`

---

## Overview

`mody/sidebar` is the top-level navigation container block. It renders a `<nav>` landmark that holds a vertical list of L1 `mody/item` blocks. On desktop the list is always visible inside the sidebar column. On mobile (below 1024 px) the list is hidden and revealed through a slide-in modal overlay triggered by a hamburger button.

---

## Block metadata

| Field | Value |
|---|---|
| Name | `mody/sidebar` |
| API version | 3 |
| Category | `theme` |
| Editor script | `mody-editor` |
| Style handle | `mody-style` |
| View script | `mody-frontend` |
| Allowed children | `mody/item` only |

---

## Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `ariaLabel` | `string` | `"Sidebar navigation"` | Value of the `aria-label` attribute on the `<nav>` element. Exposed in the editor via an Inspector Controls text field under the **Accessibility** panel. |
| `sidebarBackgroundColor` | `string` | `""` | Optional custom background colour applied directly to the `<nav class="mody-sidebar">` wrapper. |
| `navLevel` | `integer` | `1` | Context value provided to all child `mody/item` blocks so they know they are at depth 1. Not editable directly. |

### Block supports

| Support | Detail |
|---|---|
| `color.background` | Yes — editor colour picker, stored as `backgroundColor` / `style` attributes |
| `color.text` | Yes — editor colour picker, stored as `textColor` / `style` attributes |
| `spacing.padding` | Yes — editor spacing control |
| `html` | `false` — HTML editing disabled |
| `interactivity` | `true` |

### Context provided

`mody/navLevel` → `1` — consumed by direct `mody/item` children so they restrict inner blocks to `mody/submenu`.

---

## Saved HTML structure

```html
<nav class="mody-sidebar wp-block-mody-sidebar [color/spacing classes]"
     aria-label="Sidebar navigation">

  <!-- Hamburger — visible only below 1024 px -->
  <button type="button"
          class="mody-sidebar__toggle"
          aria-label="Open navigation"
          aria-expanded="false">
    <span class="mody-sidebar__hamburger" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </span>
  </button>

  <!-- Desktop always-visible / mobile nav-wrap target -->
  <div class="mody-sidebar__nav-wrap">
    <ul class="mody-sidebar__list">
      <!-- mody/item blocks rendered here -->
    </ul>
  </div>

</nav>
```

---

## CSS classes

| Class | Element | Notes |
|---|---|---|
| `.mody-sidebar` | `<nav>` | Primary block class |
| `.wp-block-mody-sidebar` | `<nav>` | WordPress-generated class |
| `.mody-sidebar__toggle` | `<button>` | Hamburger, `display:none` above breakpoint |
| `.mody-sidebar__hamburger` | `<span>` | Three-bar icon container |
| `.mody-sidebar__nav-wrap` | `<div>` | Hidden on mobile via CSS; cloned into modal by JS |
| `.mody-sidebar__list` | `<ul>` | Flex column container, `gap: 0.125rem` |

**Responsive behaviour (SCSS):**

- Above `1024px` — `.mody-sidebar__toggle` is `display:none`; `.mody-sidebar__nav-wrap` is always visible.
- Below `1024px` — `.mody-sidebar__toggle` becomes `display:flex`; `.mody-sidebar__nav-wrap` is `display:none` (moved into the modal by JS).

---

## Frontend interactivity (`mody-frontend.js`)

`initSidebar(sidebar)` is called for every `.mody-sidebar` element found on page load.

1. **Empty-panel cleanup** — iterates all `.mody-item__panel` descendants; removes the panel `<div>` and its sibling toggle button if the panel has no child elements (leaf items).
2. **Accordion setup** — attaches `click` and `keydown` listeners to every `.mody-item__toggle` that survives the cleanup.
3. **Hamburger setup** — attaches a `click` listener to `.mody-sidebar__toggle` that opens the mobile modal.

### Mobile modal

`openModal(sidebar, trigger)` builds a `mody-modal` overlay dynamically:
- Clones `.mody-sidebar__nav-wrap` into the modal so the original sidebar remains in the DOM.
- Re-attaches all accordion listeners on the clone.
- Traps focus within the modal (Tab / Shift+Tab cycle).
- Closes on backdrop click, close button click, or `Escape` key.
- Auto-closes when the viewport widens past `1024px`.

---

## Usage in templates

The block is used inside `app/web/themes/theme/parts/sidebar.html`, wrapped in group blocks that provide the background colour and padding:

```html
<!-- wp:mody/sidebar {"ariaLabel":"Sidebar navigation","textColor":"cultured"} -->
  <!-- wp:mody/item ... /-->
  <!-- wp:mody/item ... /-->
<!-- /wp:mody/sidebar -->
```

---

## Editor behaviour

- **InnerBlocks** is restricted to `mody/item` only.
- The `<ul class="mody-sidebar__list">` wrapper is rendered in the editor canvas so the flex-column gap layout matches the frontend.
- The hamburger button is not rendered in the editor (it is part of `save()` only).
- A custom **Sidebar colors** inspector panel exposes a background colour control that applies to the whole sidebar container.

