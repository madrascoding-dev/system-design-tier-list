# Design Plan: System Design Tier List Renovation

## Subject & Audience
- **Product**: Tier list ranking tool for 20+ system design concepts (caching, load balancing, sharding, consensus, etc.)
- **Audience**: Backend engineers, system architects, developers studying for system design interviews
- **Primary Job**: Rank concepts by importance, learn concept details, export/share rankings

---

## Color Palette (Dark Mode Default)

| Token | Hex | Role |
|-------|-----|------|
| `base` | `#0D1117` | Page background (GitHub dark) |
| `surface` | `#161B22` | Cards, panels, elevated surfaces |
| `surface-hover` | `#1C2128` | Hover states |
| `border` | `#30363D` | All borders, dividers |
| `border-strong` | `#484F58` | Focus rings, active borders |
| `text` | `#E6EDF3` | Primary text |
| `text-muted` | `#8B949E` | Secondary text, labels |
| `text-dim` | `#6E7681` | Placeholder, disabled |
| `accent` | `#58A6FF` | Primary actions, links, focus |
| `accent-hover` | `#79B8FF` | Hover states |
| `danger` | `#F85149` | Destructive actions |

**Tier Colors** (preserved from original, optimized for dark bg):
| Tier | Color | Text |
|------|-------|------|
| S | `#FF6B6B` | `#0D1117` |
| A | `#FFD93D` | `#0D1117` |
| B | `#6BCB77` | `#0D1117` |
| C | `#4D96FF` | `#FFFFFF` |
| D | `#A0AEC0` | `#0D1117` |

---

## Typography

**Single Family: JetBrains Mono** (monospace-first, technical identity)

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Heading | `1.5rem` (24px) | 600 | 1.25 | `-0.02em` |
| Subheading | `0.875rem` (14px) | 500 | 1.4 | `0.01em` |
| Body | `0.8125rem` (13px) | 400 | 1.6 | `0` |
| Small | `0.75rem` (12px) | 400 | 1.5 | `0.02em` |
| Micro | `0.6875rem` (11px) | 500 | 1.4 | `0.05em` |
| Tier Badge | `0.625rem` (10px) | 700 | 1 | `0.1em` |

**No font switching.** Everything in JetBrains Mono. Hierarchy through weight, size, case, color.

---

## Layout Concept

```
┌─────────────────────────────────────────────────────────────────┐
│  SYSTEM DESIGN TIER LIST                    [Reset] [Export]    │  ← Header: minimal, right-aligned actions
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─ S ──────────────────────────────────────────────────────┐  │  ← Tier rows: full-width bands
│  │  [Caching]  [Load Balancing]  [CDN]                       │  │
│  └────────────────────────────────────────────────────────────┘  │
│  ┌─ A ──────────────────────────────────────────────────────┐  │
│  │  [Message Queues]  [Rate Limiting]                        │  │
│  └────────────────────────────────────────────────────────────┘  │
│  ┌─ B ──────────────────────────────────────────────────────┐  │
│  │  [Read Replicas]  [Circuit Breaker]                       │  │
│  └────────────────────────────────────────────────────────────┘  │
│  ┌─ C ──────────────────────────────────────────────────────┐  │
│  │  [Service Discovery]                                      │  │
│  └────────────────────────────────────────────────────────────┘  │
│  ┌─ D ──────────────────────────────────────────────────────┐  │
│  │  (empty)                                                  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─ UNRANKED ───────────────────────────────────────────────┐  │  ← Staging area
│  │  [Database Sharding] [Event Sourcing] [Saga Pattern] ...  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ (click concept → slides from right)
┌─────────────────────────────────────────────────────────────────┐
│  DETAIL PANEL (320px)                    [×]                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ CACHING                                                  │   │
│  │ Store frequently accessed data in fast storage to...    │   │
│  │                                                         │   │
│  │ WHEN IS IT USEFUL                                       │   │
│  │ • Read-heavy workloads                                  │   │
│  │ • Session storage                                       │   │
│  │ • API response caching                                  │   │
│  │                                                         │   │
│  │ TOOLS                                                   │   │
│  │ Redis  Memcached  Varnish  Cloudflare  ElastiCache     │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Alignment**: Left-aligned throughout (terminal convention). Max width `960px` centered.

**Spacing Scale**: 4px base unit. `4, 8, 12, 16, 24, 32, 48`.

---

## Component Principles

### Tier Rows
- Full-width horizontal bands, alternating subtle surface/base
- Tier badge: `40px` wide, fixed, colored background, white/dark text
- Drop zone: `1px` dashed border, no border-radius, minimum height `60px`
- Concept chips: Sharp rectangles (`0` border-radius), `1px` border, `8px 12px` padding
- Drag handle: `≡` (three horizontal bars) on left, mono, subtle

### Concept Chips
- **Not cards**. Chips. Compact, dense, scannable.
- Format: `[≡] Concept Name`
- Selected: `2px` accent border, no shadow
- Dragging: `opacity: 0.6`, `transform: rotate(1deg)`, accent border

### Unranked Pool
- Wrapping grid (not list), tighter density
- Label: "UNRANKED — drag up to rank" (mono, uppercase, muted)
- Empty state: Dashed outline, "No unranked concepts" in muted text

### Detail Panel
- Slides from right (`320px` fixed), full height
- Backdrop: `rgba(13, 17, 23, 0.6)` + `backdrop-filter: blur(4px)`
- Sections: Uppercase micro labels, no borders between sections
- Tools: Inline chips, mono, `1px` border, `4px 8px` padding

### Header
- Minimal: Title left, actions right
- Title: "System Design Tier List" (heading weight)
- Actions: Export PNG, Reset (secondary), keyboard hint `[?]`

---

## Motion & Interaction

- **One orchestrated entrance**: Page load → tier rows stagger in (50ms each), unranked fades in
- **Drag**: Immediate response, no entrance animation
- **Detail panel**: Slide `200ms` cubic-bezier(0.16, 1, 0.3, 1)
- **Hover**: `80ms` color/border transitions only
- **Focus**: `2px` accent outline, `2px` offset — always visible
- **Reduced motion**: Respect `prefers-reduced-motion`, disable all but panel slide

---

## Copy & Tone

| Current | Revised |
|---------|---------|
| "Rank the system design stack." | "Rank system design concepts by importance." |
| "Drag each concept into a tier..." | "Drag concepts from Unranked into tiers. Click for details." |
| "Tool · Fig B" | (removed) |
| "Arjay McCandless" + nav links | (removed — not the product) |
| "What is it?" / "When is it useful?" / "Tools" | "DESCRIPTION" / "USE CASES" / "TOOLS" |
| "Download PNG" | "Export PNG" |
| "Reset" | "Clear All" |

**Tone**: Direct, technical, imperative. No marketing fluff.

---

## Accessibility & Quality Floor

- WCAG AA contrast on all text (verified against dark base)
- Visible focus rings on every interactive element
- Keyboard operable: `Tab`/`Shift+Tab` navigate, `Enter`/`Space` select, `Arrow keys` reorder in tier, `Escape` close panel
- ARIA labels on drag handles, tier regions, detail panel
- `prefers-reduced-motion` respected
- `prefers-color-scheme`: Dark default, light mode available (invert base/surface, adjust borders)

---

## What Makes This Distinctive

1. **Monospace-only** — no font switching, pure technical identity
2. **Sharp rectangles** — zero border-radius, like code blocks/terminals
3. **Borders as structure** — 1px everywhere, no shadows
4. **Density** — tight padding, engineers scan fast
5. **Tier badges as vertical rails** — fixed left edge, colored, scannable
6. **Dark default** — matches engineer tooling (VS Code, terminal, GitHub)
7. **No decorative gradients/washes** — color only as signal (tier badges, focus, accent)
8. **Copy as UI** — uppercase micro labels, imperative verbs, no filler

---

## Anti-Patterns Avoided

- ❌ Warm cream background + terracotta accent
- ❌ Near-black + acid green
- ❌ Broadsheet newspaper columns
- ❌ Identical rounded cards with soft shadows
- ❌ ALL-CAPS eyebrow labels above every heading
- ❌ Middle-dot meta strings ("A · B · C")
- ❌ "WORD — fragment" spaced em dash labels
- ❌ Monospace only for data labels (here: monospace for everything)
- ❌ `→` appended to buttons/links