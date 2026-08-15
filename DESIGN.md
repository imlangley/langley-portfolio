# DESIGN.md — Langley Workspace

## 0. Research Log
- Existing surfaces: `Hero.tsx` + `ProjectWorkspace.tsx` already define the live contract — Explorer rail, editor tabs, composition viewport, AE timeline. Interior routes still used marketing cards, glass, and gradients.
- User constraint (hard): After Effects + VS Code collaboration is the theme; no gradient AI slop; responsive on every device; stack may be replaced if a better idea exists.
- Rejected: purple-to-cyan washes, glass morphism, fake chrome, centered hero posters, decorative marquees, shine/shimmer CTAs.

## 1. Product
Portfolio of a developer and motion editor. The site is the workspace, not a poster about a workspace.

## 2. Tokens
- Surfaces: `shell-bg` `#12141c`, `shell-bg-alt` `#0b0d14`, `shell-surface` `#171a24`, `shell-border` 16% white/blue-gray, `shell-active` `#1c2030`.
- Accents (flat, never blended): AE purple `#9999ff`, AE cyan `#00c8ff`, AE magenta `#d896ff`.
- Syntax: VS Code Dark+ (`syn-blue`, `syn-teal`, `syn-yellow`, `syn-magenta`, `syn-orange`, `syn-green`).
- Type: UI sans for titles; `ui-monospace` / SF Mono for chrome, tabs, labels, counts.
- Radius: `4–6px` on panels and chips. No 2xl/3xl marketing pills.
- Motion: opacity + transform only. Spring `260/26` for layout, `0.16,1,0.3,1` for bars. Honor `prefers-reduced-motion`.
- Forbidden: `bg-gradient-*`, `linear-gradient`, `radial-gradient`, `conic-gradient`, `text-gradient*`, glass shine overlays, blur orbs.

## 3. Layout grammar
Desktop (`lg+`): Explorer 224px + editor pane + optional inspector.
Tablet: drop explorer; keep tabs + horizontal category/type strip; docks sit at the bottom.
Mobile (`<768`): single column, thumb-reachable dock, no hover-only actions.
Every route uses the same chrome: tab bar, panel header, 1px `shell-border`, flat fill.

## 4. Primitives
- `WorkspaceFrame`: full-height shell with optional explorer.
- `EditorTab`: filename + icon + active dot.
- `FileCard`: header row (icon + slug + ext) + media + title + summary.
- `InspectorRow`: label / value mono pair.
- `TimelineBar`: named layer + flat color span (solid, not gradient).
- CTA: solid `bg-ae-purple text-[#0b0b14]` hover `bg-ae-cyan`. Secondary: bordered shell surface.

## 5. 3D
WebGL lives only inside a composition viewport (homepage hero). It is a preview, not wallpaper. Reduced-motion and missing-WebGL fall back to a static panel.

## 6. Accessibility
Native buttons/links, `aria-pressed` / `aria-current`, visible focus, 44px touch on docks, no color-only status (pair with label). Decorative icons `aria-hidden`.

## 7. Accepted debt
- `/showcase` is an internal reactbits gallery, not a public product surface.
- `/shop/payment` stays a functional checkout adapter; chrome only, no redesign of payment logic.
- `@sanity/icons@3`, `lucide-react@0.561`, `eslint@9` stay pinned for API compatibility.
