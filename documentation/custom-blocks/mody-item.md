# mody/item — Navigation Item

_Block file:_ `app/web/plugins/mody/blocks/item/`  
_Edit source:_ `src/plugins/mody/item/index.js`  
_Styles:_ `src/plugins/mody/item.scss`

---

## Overview

`mody/item` is the core building block of the navigation tree. It represents a single navigation link and can optionally contain one child block:

- At **level 1** (direct child of `mody/sidebar`): may contain one `mody/submenu`.
- At **level 2** (direct child of `mody/submenu`): may contain one `mody/mega-panel`.

The current depth is received through block context (`mody/navLevel`) from the parent block and stored as the `navLevel` attribute so the `save()` function can include the correct CSS modifier class.

---

## Block metadata

| Field | Value |
|---|---|
| Name | `mody/item` |
| API version | 3 |
| Category | `theme` |
| Valid parents | `mody/sidebar`, `mody/submenu` |
| Editor script | `mody-editor` |
| Style handle | `mody-style` |

---

## Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `""` | The visible link text. Edited via a `RichText` component with all formats disabled (plain text only). |
| `url` | `string` | `""` | The link destination. Edited via a `URLInput` field below the label. When empty, the label renders as a non-interactive `<span>` instead of an `<a>`. |
| `target` | `string` | `"_self"` | Link target. Enum: `_self` \| `_blank`. Controlled by the **Open in** select in the inspector. When `_blank`, `rel="noopener noreferrer"` is added automatically in the saved HTML. |
| `itemStyle` | `string` | `"default"` | Visual variant of the link. Enum: `default` \| `button` \| `pill`. Controlled by the **Style** select in the inspector. Maps to a CSS modifier class on the `<li>` element. |
| `navLevel` | `integer` | `1` | The depth of this item in the navigation tree. Read from the `mody/navLevel` block context and written back via `useEffect` so `save()` can include the correct level class. Not editable directly. |
| `itemBackgroundColor` | `string` | `""` | Optional custom background colour applied directly to `.mody-item__link`. |
| `itemTextColor` | `string` | `""` | Optional custom text colour applied directly to `.mody-item__link`. |
| `itemPadding` | `string` | `""` | Optional CSS padding shorthand applied directly to `.mody-item__link`. Example: `0.5rem 1rem`. |
| `itemMargin` | `string` | `""` | Optional CSS margin shorthand applied to the root `<li>`. Example: `0 0 1rem`. |
| `itemBorderColor` | `string` | `""` | Optional custom border colour applied directly to `.mody-item__link`. |
| `itemBorderWidth` | `string` | `""` | Optional CSS border width applied directly to `.mody-item__link`. Example: `1px`. |
| `itemBorderStyle` | `string` | `""` | Optional border style. Enum: empty/default, `none`, `solid`, `dashed`, `dotted`, `double`. If a width or colour is provided without a style, `solid` is used automatically. |
| `itemBorderRadius` | `string` | `""` | Optional CSS border radius applied directly to `.mody-item__link`. Example: `8px`, `999px`. |
| `itemChildrenGap` | `string` | `""` | Optional CSS value applied as `margin-top` on `.mody-item__panel`, creating space between the item row and submenu/mega-panel container. |

### Block supports

| Support | Detail |
|---|---|
| `html` | `false` |
| `multiple` | `true` — many items can exist at the same level |
| `reusable` | `false` |
| `lock` | `false` |

### Style control implementation

The block uses explicit item style attributes instead of native block-support selectors. This is intentional: the visual button/pill element is the nested `.mody-item__link`, while the root block wrapper is a structural `<li>`. Applying styles directly in `edit()` and `save()` guarantees editor/frontend parity and stores the exact rendered result in post content.

### Context consumed

`mody/navLevel` — provided by the parent `mody/sidebar` (value `1`) or `mody/submenu` (value `2`).

---

## Inspector controls

The custom controls appear inside a single **Item settings** panel.

| Control | Type | Condition | Attribute |
|---|---|---|---|
| Style | `SelectControl` | Always visible | `itemStyle` |
| Open in | `SelectControl` | Always visible | `target` |

Additional custom inspector controls are also enabled for:

- Item colours: background, text, and border colour.
- Item spacing: padding, margin, and children panel gap CSS fields.
- Item border: style, width, and radius.

These controls save to explicit `mody/item` attributes and are applied as inline styles to `.mody-item__link` (for visual button styles) or the root `<li>` (for margin).

---

## Saved HTML structure

### Leaf item (no inner blocks)

After `frontend.js` cleanup, the toggle and panel are removed at runtime.

```html
<li class="mody-item mody-item--level-1 mody-item--default wp-block-mody-item">
  <div class="mody-item__row">
    <a class="mody-item__link" href="/path">Label text</a>
    <!-- toggle removed by frontend.js (empty panel) -->
  </div>
  <!-- panel removed by frontend.js (empty panel) -->
</li>
```

### Item with children (submenu or mega-panel)

```html
<li class="mody-item mody-item--level-1 mody-item--default wp-block-mody-item">
  <div class="mody-item__row">
    <a class="mody-item__link" href="/path">Label text</a>
    <button type="button"
            class="mody-item__toggle"
            aria-expanded="false">
      <span class="mody-item__toggle-icon" aria-hidden="true"></span>
    </button>
  </div>
  <div class="mody-item__panel" hidden>
    <!-- mody/submenu or mody/mega-panel rendered here -->
  </div>
</li>
```

### External link

When `target` is `_blank`:

```html
<a class="mody-item__link"
   href="https://example.com"
   target="_blank"
   rel="noopener noreferrer">
  Label text
</a>
```

### No URL (non-interactive label)

When `url` is empty:

```html
<span class="mody-item__link mody-item__link--no-href">Label text</span>
```

---

## CSS classes and modifiers

| Class | Element | Notes |
|---|---|---|
| `.mody-item` | `<li>` | Base class |
| `.wp-block-mody-item` | `<li>` | WordPress-generated class |
| `.mody-item--level-1` | `<li>` | Applied when `navLevel` is `1` |
| `.mody-item--level-2` | `<li>` | Applied when `navLevel` is `2` |
| `.mody-item--default` | `<li>` | Applied when `itemStyle` is `default` |
| `.mody-item--button` | `<li>` | Applied when `itemStyle` is `button` |
| `.mody-item--pill` | `<li>` | Applied when `itemStyle` is `pill` |
| `.mody-item--has-children` | `<li>` | **Removed** — was used by render.php; not included in save output |
| `.mody-item--open` | `<li>` | Added at runtime by `frontend.js` when the panel is expanded |
| `.mody-item__row` | `<div>` | Flex row: link + optional toggle |
| `.mody-item__link` | `<a>` or `<span>` | The link/label element |
| `.mody-item__link--no-href` | `<span>` | Additional class when there is no URL |
| `.mody-item__toggle` | `<button>` | Expand/collapse chevron button |
| `.mody-item__toggle-icon` | `<span>` | CSS-drawn chevron arrow |
| `.mody-item__panel` | `<div>` | Collapsible container for inner blocks |

---

## Style variants

Defined in `src/plugins/mody/item.scss`. All selectors use child combinators to avoid leaking into nested items. `.mody-item__link` uses `box-sizing: border-box` for all variants so custom padding and borders do not unexpectedly expand the visual button beyond its configured dimensions.

### Default
Standard link style: text colour `--dark-charcoal`, hover colour `--skobeloff`, hover background `--green-50`.

If editors set a custom text/background colour, the default hover colour/background does not override it. Hover defaults only apply when the root block does not have WordPress's `.has-text-color` or `.has-background` support classes.

### Button
```scss
.mody-item--button > .mody-item__row > .mody-item__link {
  padding: 0.5rem 1.25rem;
  font-weight: 600;
  color: var(--wp--preset--color--cultured);
  background-color: var(--wp--preset--color--bright-purple);
  border-radius: 0;
}
```

### Pill
```scss
.mody-item--pill > .mody-item__row > .mody-item__link {
  padding: 0.375rem 1.25rem;
  font-weight: 600;
  color: var(--wp--preset--color--cultured);
  background-color: var(--wp--preset--color--skobeloff);
  border-radius: 999px;
}
```

---

## Accordion behaviour (`frontend.js`)

The accordion is set up by `initSidebar` on the parent `mody/sidebar` element.

1. **Empty-panel cleanup** — if `.mody-item__panel` has no child elements (leaf item), the panel and the sibling toggle are removed from the DOM before event listeners are attached.
2. **Toggle click** — calls `togglePanel(btn)`:
   - Closes any open sibling at the same depth.
   - Calls `openPanel` or `closePanel` depending on current `aria-expanded` state.
3. **`openPanel(btn)`** — removes `hidden` from `.mody-item__panel`, sets `aria-expanded="true"`, adds `.mody-item--open`.
4. **`closePanel(btn)`** — adds `hidden` back, sets `aria-expanded="false"`, removes `.mody-item--open`, recursively closes any open descendants.
5. **`getPanelFor(btn)`** — finds the panel using `:scope > .mody-item__panel` (DOM traversal). Falls back to `aria-controls` / `getElementById` if a panel ID is present.
6. **Keyboard** — `Enter` / `Space` trigger the toggle; `Escape` closes an open panel and returns focus to the button.

---

## Editor behaviour

- **Level 1 item**: InnerBlocks accepts `mody/submenu` only.
- **Level 2 item**: InnerBlocks accepts `mody/mega-panel` only.
- The `navLevel` context is synced to the `navLevel` attribute via `useEffect` on every render where they differ. This ensures the saved HTML always carries the correct level modifier class.
- The `RichText` component renders as `<span class="mody-item__link">` in the editor canvas, matching the CSS selectors so button/pill styles are visible while editing.
- The `URLInput` field is rendered below `.mody-item__row` (editor only; not part of the `save` output directly — the URL is instead used as the `href` of the anchor in the saved HTML).

