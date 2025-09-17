---
title: "Colors"
description: "Comprehensive color system with semantic design tokens"
category: "foundations"
subcategory: "design-tokens"
slug: "colors"
variableCount: 100
modeSupport: true
isPremium: false
hasPlayground: false
figmaUrl: "https://www.figma.com/design/ShZ3wQGgTDbKft8dG4oqqe/System-16"
docsUrl: "/docs/foundations/colors"
variations:
  - id: "background-colors"
    name: "Background Colors"
    description: "Surface, modal, and component background tokens"
    isPremium: false
    preview: "/images/foundations/background-colors.jpg"
    code:
      html: '<div class="bg-tokens"><div class="token-swatch" style="background: var(--background-color-color-surface)">Surface</div><div class="token-swatch" style="background: var(--background-color-color-modal)">Modal</div><div class="token-swatch" style="background: var(--background-color-color-default-default)">Default</div></div>'
      react: 'const BackgroundColors = () => (<div className="bg-tokens"><div className="token-swatch" style={{background: "var(--background-color-color-surface)"}}>Surface</div></div>)'
  - id: "text-colors"
    name: "Text Colors"
    description: "Typography and text color tokens"
    isPremium: false
    preview: "/images/foundations/text-colors.jpg"
    code:
      html: '<div class="text-tokens"><div class="token-swatch" style="color: var(--text-color-color-default)">Default Text</div><div class="token-swatch" style="color: var(--text-color-color-primary)">Primary Text</div><div class="token-swatch" style="color: var(--text-color-color-caption)">Caption Text</div></div>'
      react: 'const TextColors = () => (<div className="text-tokens"><div className="token-swatch" style={{color: "var(--text-color-color-default)"}}>Default Text</div></div>)'
  - id: "border-colors"
    name: "Border Colors"
    description: "Border and outline color tokens"
    isPremium: false
    preview: "/images/foundations/border-colors.jpg"
    code:
      html: '<div class="border-tokens"><div class="token-swatch" style="border: 2px solid var(--border-color-color-default)">Default Border</div><div class="token-swatch" style="border: 2px solid var(--border-color-color-primary)">Primary Border</div><div class="token-swatch" style="border: 2px solid var(--border-color-color-ring)">Focus Ring</div></div>'
      react: 'const BorderColors = () => (<div className="border-tokens"><div className="token-swatch" style={{border: "2px solid var(--border-color-color-default)"}}>Default Border</div></div>)'
  - id: "semantic-colors"
    name: "Semantic Colors"
    description: "Success, warning, danger, and info color tokens"
    isPremium: false
    preview: "/images/foundations/semantic-colors.jpg"
    code:
      html: '<div class="semantic-tokens"><div class="token-swatch" style="background: var(--background-color-color-success-default)">Success</div><div class="token-swatch" style="background: var(--background-color-color-warning-default)">Warning</div><div class="token-swatch" style="background: var(--background-color-color-danger-default)">Danger</div><div class="token-swatch" style="background: var(--background-color-color-info-default)">Info</div></div>'
      react: 'const SemanticColors = () => (<div className="semantic-tokens"><div className="token-swatch" style={{background: "var(--background-color-color-success-default)"}}>Success</div></div>)'
---

# Color System

A comprehensive design token system built for modern web applications with semantic naming and state-based color management.

## Features

- **100+ Design Tokens**: Semantic color tokens for backgrounds, text, and borders
- **State-Based Tokens**: Default, hovered, pressed, focused, and loading states
- **Semantic Naming**: Intuitive token names that describe purpose and context
- **Invert Support**: Light and dark mode variants for all tokens
- **Accessibility First**: WCAG 2.1 AA compliant contrast ratios
- **Component Ready**: Tokens designed for direct component usage

## Token Categories

### Background Colors
- **Surface**: `--background-color-color-surface` - Main surface backgrounds
- **Modal**: `--background-color-color-modal` - Modal and overlay backgrounds
- **Default**: `--background-color-color-default-*` - Default component backgrounds
- **Primary**: `--background-color-color-primary-*` - Primary brand backgrounds
- **Semantic**: `--background-color-color-{success|warning|danger|info}-*` - State-based backgrounds

### Text Colors
- **Base**: `--text-color-color-base` - Base text color
- **Default**: `--text-color-color-default` - Primary text color
- **Semantic**: `--text-color-color-{primary|success|warning|danger|info}` - Colored text
- **Utility**: `--text-color-color-{placeholder|caption|link|disabled}` - Special text states

### Border Colors
- **Default**: `--border-color-color-default` - Standard border color
- **Semantic**: `--border-color-color-{primary|success|warning|danger|info}` - Colored borders
- **Utility**: `--border-color-color-{ring|disabled}` - Focus and disabled states

## State Management

Each color token supports multiple states:

- **Default**: Base state appearance
- **Hovered**: Mouse hover state
- **Pressed**: Active/clicked state
- **Focused**: Keyboard focus state
- **Loading**: Loading/disabled state

## Invert Variants

All tokens include invert variants for dark mode:

```css
/* Light mode */
background-color: var(--background-color-color-primary-default);

/* Dark mode (invert) */
background-color: var(--background-color-color-primary-invert-default);
```

## Implementation

Use tokens directly in your components:

```css
.button {
  background-color: var(--background-color-color-primary-default);
  color: var(--text-color-color-primary-invert);
  border: 1px solid var(--border-color-color-primary);
}

.button:hover {
  background-color: var(--background-color-color-primary-hovered);
}

.button:focus {
  border-color: var(--border-color-color-ring);
}

.text-muted {
  color: var(--text-color-color-caption);
}

.surface {
  background-color: var(--background-color-color-surface);
}
```

## Accessibility

- All color combinations meet WCAG 2.1 AA standards
- 4.5:1 contrast ratio minimum for normal text
- 3:1 contrast ratio minimum for large text
- Color is never the only means of conveying information
- Focus states clearly visible with ring colors
