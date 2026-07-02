# mody/mega-panel — Navigation Mega Panel

_Block file:_ `app/web/plugins/mody/blocks/mega-panel/`  
_Edit source:_ `src/plugins/mody/mega-panel/index.js`  
_Styles:_ `src/plugins/mody/mega-panel.scss`

---

## Overview

`mody/mega-panel` is the level-3 content panel block. It lives as the sole inner block of a level-2 `mody/item` and can contain **any Gutenberg block**. It is absolutely positioned to the right of the sidebar on desktop, presenting a rich flyout area for links, images, calls-to-action, or any other content an editor wants to expose.

The panel supports four column layout variants and three width variants, giving editors full control over the visual footprint of the flyout.

---

## Block metadata

| Field | Value |
|---|---|
| Name | `mody/mega-panel` |
| API version | 3 |
| Category | `theme` |
| Valid parent | `mody/item` |
| Editor script | `mody-editor` |
| Style handle | `mody-style` |
| `multiple` | `false` — only one mega-panel per item |
| `reusable` | `false` |

---

## Attributes

| Attribute | Type | Default | Enum | Description |
|---|---|---|---|---|
| `layout` | `string` | `"single"` | `single` \| `two-column` \| `three-column` \| `featured` | Controls the CSS grid layout of the panel content area. |
| `width` | `string` | `"auto"` | `auto` \| `full` \| `container` | Controls how wide the absolutely-positioned panel stretches. |

### Block supports

| Support | Detail |
|---|---|
| `color.background` | Yes |
| `color.text` | Yes |
| `html` | `false` |
| `reusable` | `false` |

### Context consumed

`mody/navLevel` — received from the parent `mody/item` (value `2`). Currently unused in the block's own output but available for future use.

---

## Inspector controls

Both controls appear inside a single **Mega-panel settings** panel.

| Control | Label | Attribute | Options |
|---|---|---|---|
| `SelectControl` | Column layout | `layout` | Single column / Two columns / Three columns / Featured (2:1) |
| `SelectControl` | Panel width | `width` | Auto (fits content) / Full width (100vw) / Container (1160px) |

---

## Saved HTML structure

```html
<div class="mody-mega-panel mody-mega-panel--layout-single mody-mega-panel--width-auto wp-block-mody-mega-panel">
  <!-- any inner blocks -->
</div>
```

The div is placed inside the parent `mody/item`'s `.mody-item__panel` wrapper. Full expanded tree:

```html
<li class="mody-item mody-item--level-2 mody-item--open">
  <div class="mody-item__row">
    <a class="mody-item__link" href="/cloud">Cloud</a>
    <button class="mody-item__toggle" aria-expanded="true">…</button>
  </div>
  <div class="mody-item__panel">
    <div class="mody-mega-panel mody-mega-panel--layout-two-column mody-mega-panel--width-container wp-block-mody-mega-panel">
      <!-- core/columns, core/image, core/paragraph, etc. -->
    </div>
  </div>
</li>
```

---

## CSS classes and modifiers

| Class | Applied when | Notes |
|---|---|---|
| `.mody-mega-panel` | Always | Primary block class |
| `.wp-block-mody-mega-panel` | Always | WordPress-generated class |
| `.mody-mega-panel--layout-single` | `layout = "single"` | Default — no grid applied |
| `.mody-mega-panel--layout-two-column` | `layout = "two-column"` | `grid-template-columns: 1fr 1fr` |
| `.mody-mega-panel--layout-three-column` | `layout = "three-column"` | `grid-template-columns: 1fr 1fr 1fr` |
| `.mody-mega-panel--layout-featured` | `layout = "featured"` | `grid-template-columns: 2fr 1fr` |
| `.mody-mega-panel--width-auto` | `width = "auto"` | Default — `min-width: 240px`, size fits content |
| `.mody-mega-panel--width-full` | `width = "full"` | `width: 100vw; left: 0; right: 0` |
| `.mody-mega-panel--width-container` | `width = "container"` | `width: 1160px; max-width: 100vw` |

---

## Visual design (from `mega-panel.scss`)

**Desktop positioning:**
```scss
position: absolute;
top: 0;
left: 100%;          // flush to the right edge of the sidebar
z-index: 100;        // $mody-mega-panel-z

min-width: 240px;
padding: 1.25rem;

background-color: var(--wp--preset--color--cultured);
border: 1px solid var(--wp--preset--color--green-100);
box-shadow: 2px 4px 16px rgb(0 0 0 / 10%);
```

**Column headings (`<h6>` inside the panel):**
- Font: Montserrat, 0.875 rem, 700 weight
- Uppercase with `0.08em` letter-spacing
- Colour: `--midnight-moss`

**Links inside the panel:**
- 0.875 rem, block display, `0.25rem 0` padding
- Colour: `--dark-charcoal`; hover: underline + `--skobeloff`

---

## Layout options

### Single column (default)
No CSS grid — content flows in a single vertical column. Suitable for a short list of links.

### Two columns
```
┌────────────┬────────────┐
│  Column 1  │  Column 2  │
└────────────┴────────────┘
```

### Three columns
```
┌──────────┬──────────┬──────────┐
│ Column 1 │ Column 2 │ Column 3 │
└──────────┴──────────┴──────────┘
```

### Featured (2:1)
```
┌────────────────┬────────┐
│  Featured (2)  │ Side(1)│
└────────────────┴────────┘
```
Ideal for a prominent featured item alongside a shorter secondary list.

---

## Default inner blocks template

When a new `mody/mega-panel` is inserted, it is pre-populated with a template:

```
core/columns
  └── core/column
        ├── core/heading (level 6, placeholder: "Category heading…")
        └── core/list
```

`templateLock` is `false` — editors can freely add, remove, or rearrange blocks after insertion.

---

## Mobile behaviour

On screens narrower than `1024px`, absolute positioning is removed and layout variants collapse to a single block display:

```scss
@media (max-width: 1023px) {
  .mody-mega-panel {
    position: static;
    width: auto;
    min-width: 0;
    padding: 0.5rem 0 0.5rem 1rem;
    border: none;
    box-shadow: none;

    &--layout-two-column,
    &--layout-three-column,
    &--layout-featured {
      display: block;   // columns stack vertically
    }
  }
}
```

The same rule is applied when the mega-panel appears inside the mobile modal overlay (via `.mody-modal .mody-mega-panel` in `modal.scss`).

---

## Editor behaviour

- InnerBlocks accepts **any block** (`templateLock: false`).
- The pre-populated template (heading + list inside a columns block) gives editors a sensible starting point.
- Layout and width attributes immediately update the modifier classes on the `<div>` wrapper in the editor canvas, so column grids and width changes are visible while editing.
- The panel is always visible in the editor (it is never hidden), since the `hidden` attribute and accordion logic belong to the parent `mody/item`.

