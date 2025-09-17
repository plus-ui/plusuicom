import { z, defineCollection } from "astro:content";

// 2. Define your collection(s)
const blogCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.string().transform((str) => new Date(str)),
    author: z.string().default("Astroship"),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

const legalCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    publishDate: z.string().transform((str) => new Date(str)),
    updatedDate: z.string().transform((str) => new Date(str)),
    category: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
  }),
});

const uiElementsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['foundations', 'components', 'blocks', 'pages', 'templates', 'layouts']),
    subcategory: z.string().optional(),
    slug: z.string().optional(),
    
    // Metadata
    variantCount: z.number().optional(),
    variableCount: z.number().optional(),
    modeSupport: z.boolean().default(false),
    
    // Pricing tiers: free, pro, premium
    pricingTier: z.enum(['free', 'pro', 'premium']).default('free'),
    
    // External links
    figmaUrl: z.string().optional(),
    docsUrl: z.string().optional(),
    
    // Content type - Choose where to display variants
    displayMode: z.enum(['playground', 'codepreview', 'both']).default('codepreview'),
    hasPlayground: z.boolean().default(false),
    
    // Code examples
    htmlCode: z.string().optional(),
    reactCode: z.string().optional(),
    vueCode: z.string().optional(),
    astroCode: z.string().optional(),
    
    // Playground parameters
    playgroundParams: z.record(z.object({
      type: z.enum(['select', 'boolean', 'text', 'number']),
      label: z.string(),
      options: z.array(z.string()).optional(),
      default: z.union([z.string(), z.boolean(), z.number()]).optional(),
      placeholder: z.string().optional(),
    })).optional(),
    
    // Variations with pricing tiers
    variations: z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      pricingTier: z.enum(['free', 'pro', 'premium']).default('free'),
      displayMode: z.enum(['playground', 'codepreview']).default('codepreview'),
      code: z.object({
        html: z.string().optional(),
        react: z.string().optional(),
        vue: z.string().optional(),
        astro: z.string().optional(),
      }).optional(),
      preview: z.string(),
    })).default([])
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  blog: blogCollection,
  legal: legalCollection,
  'ui-elements': uiElementsCollection,
};
