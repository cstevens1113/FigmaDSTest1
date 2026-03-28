# Brand Design System

A React component library generated directly from the [Brand Design System Figma file](https://www.figma.com/design/7OvPI7Yeydx3cOv1FBBaKM/Brand-Design-System).

**shadcn/ui-inspired · Indigo primary · Light + Dark modes · WCAG AA accessible**

---

## Stack

- **React 18** + **TypeScript**
- **Tailwind CSS v3** — extended with all design tokens
- **CSS custom properties** — semantic color variables for light/dark theming
- **Inter** — primary typeface (system-ui fallback)

---

## Design Tokens

All tokens live in `src/tokens/index.css` as CSS custom properties and are extended into Tailwind via `tailwind.config.ts`.

### Semantic Colors (Light / Dark)

| Token                  | Light          | Dark       |
|------------------------|----------------|------------|
| `--background`         | `#ffffff`      | `#09090b`  |
| `--foreground`         | `#09090b`      | `#fafafa`  |
| `--primary`            | `#4f46e5`      | `#6366f1`  |
| `--primary-foreground` | `#ffffff`      | `#ffffff`  |
| `--secondary`          | `#f4f4f5`      | `#27272a`  |
| `--muted`              | `#f4f4f5`      | `#27272a`  |
| `--muted-foreground`   | `#71717a`      | `#a1a1aa`  |
| `--accent`             | `#f4f4f5`      | `#27272a`  |
| `--destructive`        | `#ef4444`      | `#b91c1c`  |
| `--border`             | `#e4e4e7`      | `#27272a`  |
| `--input`              | `#e4e4e7`      | `#27272a`  |
| `--ring`               | `#4f46e5`      | `#6366f1`  |
| `--card`               | `#ffffff`      | `#09090b`  |

### Palettes

**Zinc (neutral):** `#fafafa` → `#09090b` (50–950)
**Indigo (brand):** `#eef2ff` → `#312e81` (50–900)

### Border Radius

`none/0` · `sm/4px` · `md/6px` · `lg/8px` · `xl/12px` · `2xl/16px` · `3xl/24px` · `full`

### Shadows

`shadow-sm` · `shadow-base` · `shadow-md` · `shadow-lg` · `shadow-xl` · `shadow-2xl`

### Typography Scale

| Name         | Size / Line-height | Weight   |
|--------------|--------------------|----------|
| Display 2xl  | 60 / 72            | Bold     |
| Display xl   | 48 / 60            | Bold     |
| Display lg   | 36 / 44            | Bold     |
| Display md   | 30 / 38            | Bold     |
| Heading xl   | 24 / 32            | Bold     |
| Heading lg   | 20 / 28            | SemiBold |
| Heading md   | 18 / 28            | SemiBold |
| Body lg      | 18 / 28            | Regular  |
| Body md      | 16 / 24            | Regular  |
| Body sm      | 14 / 20            | Regular  |
| Label md     | 14 / 20            | Medium   |
| Label sm     | 12 / 18            | Medium   |
| Caption      | 12 / 16            | Regular  |

---

## Components

| Component    | Variants / Notes |
|--------------|-----------------|
| `Button`     | `primary` `secondary` `outline` `ghost` `destructive` `link` · sizes `sm/md/lg/icon` · loading state |
| `Input`      | label, hint, error, left/right element, disabled |
| `Textarea`   | label, hint, error, resize |
| `Select`     | label, hint, error, placeholder |
| `Checkbox`   | label, description, checked, disabled |
| `Switch`     | label, description, checked, disabled |
| `Card`       | `CardHeader` `CardTitle` `CardDescription` `CardContent` `CardFooter` · shadow levels |
| `Badge`      | `default` `secondary` `outline` `destructive` `success` `warning` · dot indicator |
| `Avatar`     | sizes `xs/sm/md/lg/xl` · image + initials fallback |
| `Alert`      | `default` `success` `warning` `destructive` · `AlertTitle` `AlertDescription` |
| `Display`    | Typography — `2xl/xl/lg/md` |
| `Heading`    | Typography — `xl/lg/md` |
| `Text`       | Typography — `lg/md/sm` · muted variant |
| `LabelText`  | Typography — `md/sm` |
| `Caption`    | Typography — 12/16 Regular |

---

## Usage

```tsx
// 1. Import tokens in your app root
import '@brand-ds/ui/tokens'

// 2. Enable dark mode by adding `class="dark"` to <html>

// 3. Use components
import { Button, Card, CardHeader, CardTitle, Badge } from '@brand-ds/ui'

export default function MyPage() {
  return (
    <Card shadow="md">
      <CardHeader>
        <CardTitle>Hello world</CardTitle>
      </CardHeader>
    </Card>
  )
}
```

### Dark mode

```tsx
// Toggle by adding/removing the `dark` class on <html>
document.documentElement.classList.toggle('dark')
```

---

## Development

```bash
npm install
npm run dev        # Vite dev server with live demo
npm run build      # Build library to dist/
npm run type-check # TypeScript type check
```

---

## Project Structure

```
src/
├── tokens/
│   └── index.css          # All CSS custom properties (light + dark)
├── components/
│   ├── Alert/
│   ├── Avatar/
│   ├── Badge/
│   ├── Button/
│   ├── Card/
│   ├── Checkbox/
│   ├── Input/
│   ├── Select/
│   ├── Switch/
│   ├── Textarea/
│   └── Typography/
└── demo/
    └── App.tsx            # Interactive component showcase
tailwind.config.ts         # Tokens wired into Tailwind
```

---

*Generated from [Figma: Brand Design System](https://www.figma.com/design/7OvPI7Yeydx3cOv1FBBaKM/Brand-Design-System) · Foundation v1.0*
