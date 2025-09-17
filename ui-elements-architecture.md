# UI Elements System Architecture

## Content Structure

```typescript
// src/content/config.ts - Updated structure
const uiElementsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['foundations', 'components', 'blocks', 'pages', 'templates', 'layouts', 'free']),
    subcategory: z.string().optional(), // action, feedback, etc.
    
    // Metadata
    variantCount: z.number().optional(),
    variableCount: z.number().optional(),
    modeSupport: z.boolean().default(false),
    isPremium: z.boolean().default(false),
    
    // External links
    figmaUrl: z.string().optional(),
    docsUrl: z.string().optional(),
    
    // Content type
    hasPlayground: z.boolean().default(false), // Only components
    variations: z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      isPremium: z.boolean().default(false),
      code: z.object({
        html: z.string().optional(),
        react: z.string().optional(),
        vue: z.string().optional(),
        astro: z.string().optional(),
      }),
      preview: z.string(), // Preview image or component
    })).default([])
  })
});
```

## File Organization

```
src/
├── content/
│   └── ui-elements/
│       ├── components/
│       │   ├── button.md
│       │   ├── input.md
│       │   └── ...
│       ├── blocks/
│       │   ├── testimonial.md
│       │   ├── hero.md
│       │   └── ...
│       ├── foundations/
│       ├── pages/
│       ├── templates/
│       └── layouts/
├── pages/
│   └── ui-elements/
│       ├── index.astro          // Main listing page
│       ├── [category]/
│       │   └── index.astro      // Category listing
│       └── [category]/
│           └── [slug].astro     // Detail page
└── components/
    └── ui-elements/
        ├── FilterSidebar.astro
        ├── CategoryGrid.astro
        ├── ElementCard.astro
        ├── DetailHeader.astro
        ├── Playground.astro
        ├── CodePreview.astro
        └── VariationsList.astro
```

## Component Specifications

### FilterSidebar Component
- Category filtering (All, Foundations, Components, etc.)
- Future subcategory filtering
- Count display per category

### CategoryGrid Component  
- 3x2 grid layout per category
- Category headers with counts
- "Show more" functionality

### DetailHeader Component
- Breadcrumb navigation
- Action buttons (Preview in Figma, Go to Docs)
- Title, description
- Feature chips (360 Variant, 42 Variables, Mode Support)

### Playground Component (Components only)
- Interactive preview
- Live editing capabilities
- Framework switching

### CodePreview Component (Blocks)
- Preview/Code/Data tabs
- Framework dropdown
- Copy functionality
- Premium badge system

### VariationsList Component (Blocks)
- Vertical list layout
- Individual CodePreview for each variation
- Premium filtering