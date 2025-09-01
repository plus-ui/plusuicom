import { z, defineCollection } from "astro:content";

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

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  legal: legalCollection,
};
