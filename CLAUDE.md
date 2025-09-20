# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on http://localhost:4321
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run astro` - Run Astro CLI commands

Note: No specific linting or testing commands are configured in package.json.

## Project Architecture

This is an Astro-based UI component library website built with server-side rendering and deployed on Vercel.

### Tech Stack
- **Framework**: Astro 5.x with SSR enabled (`output: "server"`)
- **Styling**: Tailwind CSS 4.x with Vite plugin
- **Interactive Components**: React 19.x for client-side interactivity
- **Content Management**: Astro Content Collections with Zod schemas
- **Icons**: Astro Icon with Iconify integration, FontAwesome icons
- **Animations**: Framer Motion for React components
- **Core Library**: `@plusui/library` as the component system foundation
- **Deployment**: Vercel serverless adapter
- **Code Formatting**: Prettier with Astro and Tailwind plugins

### Content Collections
The site uses three main content collections defined in `src/content/config.ts`:
- `blog` - Blog posts with standard frontmatter
- `legal` - Legal documents and pages  
- `ui-elements` - UI components with variations, code examples, and metadata

The `ui-elements` collection supports multiple categories: foundations, components, blocks, pages, templates, layouts.

**UI Elements Features**:
- Pricing tiers: free, pro, premium
- Display modes: playground, codepreview, both
- Multi-framework code examples (HTML, React, Vue, Astro)
- Playground parameters for interactive components
- Variations with individual pricing tiers

### Key Architecture Patterns

**Component Organization**: Components are organized in a hierarchical structure under `src/components/`:
- `layout/` - Base layout components (Container, Section, Navbar, Footer)
- `sections/` - Page sections with templates for different page types
- `ui-elements/` - UI element showcase components
- `navigation/` - Navigation-specific components

**Page Structure**:
- Static pages in `src/pages/` for main routes (index, design-system, ui-library, playground)
- Dynamic routes for blog (`[...page].astro`, `[slug].astro`) and UI elements (`[category]/[slug].astro`)
- Error pages (404.astro, 500.astro)
- Legal pages with dynamic routing (`[slug].astro`)
- Content-driven pages using Astro Content Collections

**Navigation System**: Complex mega-dropdown navigation defined in `src/constants/navigation.ts` with support for:
- Multi-level mega dropdowns with different types (products, discover)
- Product cards with features, integrations, and status badges
- Link collections with icons and badges
- Featured content sections with CTAs
- External links and internal routing
- Disabled/coming soon states

### Environment Configuration
Uses Astro's type-safe environment variables with defaults:
- `PUBLIC_DOCS_BASE_URL` (default: https://new-docs.plusui.com)
- `PUBLIC_DOCS_API_URL` (default: https://new-docs.plusui.com/api)
- `PUBLIC_DOCS_COMPONENTS_URL` (default: https://new-docs.plusui.com/components)  
- `PUBLIC_DOCS_GUIDES_URL` (default: https://new-docs.plusui.com/guides)

### Build Optimization
- Manual chunk splitting for vendor libraries (React) and icons (FontAwesome)
- SSR configuration for `@plusui/library` components with noExternal config
- Image optimization with Sharp service and unlimited input pixels
- Build caching and optimization for performance
- Syntax highlighting with Shiki for multiple languages
- Optimized dependency handling with explicit includes

### Component Library Integration
Uses `@plusui/library` as the core component system. Components are imported and used throughout the site for consistent UI patterns.

## Important Files

- `astro.config.mjs` - Main Astro configuration with SSR, integrations, and build settings
- `src/content/config.ts` - Content collection schemas and validation
- `src/constants/navigation.ts` - Site navigation structure and mega-dropdown configuration
- `src/layouts/` - Main layout templates
- `src/components/sections/hero/templates/` - Different hero variations for each page type

## Working with Content

When adding new UI elements, ensure they follow the schema in the `ui-elements` collection with proper categorization and code examples for multiple frameworks (HTML, React, Vue, Astro).

Blog posts should include proper frontmatter with image objects containing both `src` and `alt` properties.

## Custom Tailwind CSS Usage

This project uses a custom design token system with Tailwind CSS 4.x. **Do not use standard Tailwind colors** - instead use the custom color system defined in the theme files.

### Color System Pattern
The project uses semantic color naming with this pattern:

**Background Colors**: `bg-color-{variant}-{state}`
- `bg-color-surface` - Base surface color
- `bg-color-default-default` - Default neutral state
- `bg-color-default-hovered` - Hovered state
- `bg-color-primary-default` - Primary brand color
- `bg-color-primary-invert-default` - Inverted primary
- Status colors: `bg-color-info-default`, `bg-color-success-default`, `bg-color-warning-default`, `bg-color-danger-default`

**Text Colors**: `text-color-{variant}`
- `text-color-default` - Main text color
- `text-color-primary` - Primary brand text
- `text-color-caption` - Secondary/caption text
- `text-color-placeholder` - Placeholder text
- `text-color-disabled` - Disabled state text
- Inverted versions: `text-color-default-invert`, `text-color-primary-invert`, etc.

**Border Colors**: `border-color-{variant}`
- `border-color-default` - Default border
- `border-color-primary` - Primary borders
- `border-color-ring` - Focus ring color

### Design Preferences
- **Shadows**: Rarely used, avoid unless specifically needed
- **Border Radius**: Use default `rounded` class when borders are needed
- **Interactive States**: Use the provided state variants (default, hovered, pressed, focused, loading)
- **Color Variants**: Available semantic colors are primary, info, success, warning, danger, and default/neutral

### Theme Files Location
- `src/styles/theme/light.css` - Light theme color definitions
- `src/styles/theme/dark.css` - Dark theme color definitions  
- `src/styles/theme/brand.css` - Brand-specific colors
- `src/styles/global.css` - Global styles and imports

Always refer to these theme files for available color tokens before using any color classes.

## Code Formatting

The project uses Prettier with specific plugins:
- `prettier-plugin-astro` for Astro file formatting
- `prettier-plugin-tailwindcss` for Tailwind class sorting

Always ensure code formatting is consistent with the project's Prettier configuration.