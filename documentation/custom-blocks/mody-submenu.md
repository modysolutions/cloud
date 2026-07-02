# mody/submenu — Navigation Submenu

_Block file:_ `app/web/plugins/mody/blocks/submenu/`  
_Edit source:_ `src/plugins/mody/submenu/index.js`  
_Styles:_ `src/plugins/mody/submenu.scss`

---

## Overview

`mody/submenu` is the level-2 container block. It lives as the sole inner block of a level-1 `mody/item` and holds a list of level-2 `mody/item` blocks. It provides the `mody/navLevel = 2` context to its children so they know to allow `mody/mega-panel` as an inner block instead of another submenu.

On the frontend, the submenu is rendered inside a `.mody-item__panel` div that is hidden by default and revealed by the parent item's accordion toggle.

---

## Block metadata

| Field | Value |
|---|---|
| Name | `mody/submenu` |
| API version | 3 |
| Category | `theme` |
| Valid parent | `mody/item` |
| Editor script | `mody-editor` |
| Style handle | `mody-style` |
| `multiple` | `false` — only one submenu per item |
| `reusable` | `false` |

---

## Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `submenuBackgroundColor` | `string` | `""` | Optional custom background colour applied directly to `<ul class="mody-submenu">`. |
| `navLevel` | `integer` | `2` | Static value. Provided to children via `providesContext` so child `mody/item` blocks know they are at depth 2. Not editable. |

### Context provided

`mody/navLevel` → `2` — consumed by direct `mody/item` children so they restrict inner blocks to `mody/mega-panel`.

---

## Saved HTML structure

```html
<ul class="mody-submenu wp-block-mody-submenu">
  <!-- mody/item blocks at level 2 rendered here -->
</ul>
```

The `<ul>` is placed inside the parent `mody/item`'s `.mody-item__panel` div. Together the full expanded structure is:

```html
<li class="mody-item mody-item--level-1 mody-item--open">
  <div class="mody-item__row">
    <a class="mody-item__link" href="/services">Services</a>
    <button class="mody-item__toggle" aria-expanded="true">…</button>
  </div>
  <div class="mody-item__panel">               <!-- no longer hidden -->
    <ul class="mody-submenu wp-block-mody-submenu">
      <li class="mody-item mody-item--level-2 …">…</li>
      <li class="mody-item mody-item--level-2 …">…</li>
    </ul>
  </div>
</li>
```

---

## CSS classes

| Class | Element | Notes |
|---|---|---|
| `.mody-submenu` | `<ul>` | Primary block class |
| `.wp-block-mody-submenu` | `<ul>` | WordPress-generated class |

**Styles from `submenu.scss`:**

```scss
.mody-submenu {
  margin: 0;
  padding: 0 0 0 1rem;   // indents L2 items under their L1 parent
  list-style: none;

  .mody-item__link {
    padding: 0.4rem 0.75rem;
    font-size: var(--wp--preset--font-size--small, 0.875rem);
    color: var(--wp--preset--color--dark-charcoal);
  }
}
```

The `1rem` left padding provides the visual indentation that distinguishes L2 items from L1 items. L2 items also use a slightly smaller font size.

---

## Editor behaviour

- Includes a **Submenu colors** inspector panel with a background colour picker for the submenu container.
- Renders as `<ul class="mody-submenu">` in the editor canvas with `InnerBlocks` restricted to `mody/item`.
- The editor placeholder text is **"Add Level 2 submenu items."**
- Because `multiple: false` is set, only one `mody/submenu` can be added per `mody/item`.

---

## Frontend interactivity

`mody/submenu` itself has no direct JavaScript. Its visibility is controlled by the parent `mody/item`'s toggle button through the `mody-frontend.js` accordion logic. See [mody/item](./mody-item.md) for accordion behaviour details.

---

## Mobile behaviour

On screens narrower than `1024px`, the submenu is displayed inside the mobile modal overlay. The modal clones `.mody-sidebar__nav-wrap` (which contains the full navigation tree including submenus) and re-attaches accordion event listeners on the clone. The submenu indentation and smaller font size are preserved inside the modal.

