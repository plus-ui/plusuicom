import fs from 'fs'
import path from 'path'

export interface CodeExample {
  html?: string
  react?: string
  vue?: string
  astro?: string
}

export async function loadCodeExample(
  category: string,
  componentName: string,
  variationId: string
): Promise<CodeExample> {
  // Validate inputs
  if (!category || !componentName || !variationId) {
    console.warn(`Invalid parameters for loadCodeExample: category=${category}, componentName=${componentName}, variationId=${variationId}`)
    return {}
  }

  const basePath = path.join(process.cwd(), 'src/content/ui-code-examples', category, componentName, variationId)
  const codeExample: CodeExample = {}

  const frameworks = [
    { key: 'html' as keyof CodeExample, filename: 'index.html' },
    { key: 'react' as keyof CodeExample, filename: 'index.jsx' },
    { key: 'vue' as keyof CodeExample, filename: 'index.vue' },
    { key: 'astro' as keyof CodeExample, filename: 'index.astro' }
  ]

  for (const framework of frameworks) {
    const filePath = path.join(basePath, framework.filename)
    
    try {
      if (fs.existsSync(filePath)) {
        codeExample[framework.key] = await fs.promises.readFile(filePath, 'utf-8')
      }
    } catch (error) {
      console.warn(`Failed to load ${framework.key} code for ${variationId}:`, error)
    }
  }

  return codeExample
}

export function getCodeExamplePath(
  category: string,
  componentName: string,
  variationId: string,
  framework: string
): string {
  const extensions: Record<string, string> = {
    html: 'html',
    react: 'jsx',
    vue: 'vue',
    astro: 'astro'
  }
  
  const extension = extensions[framework] || 'html'
  return path.join('src/content/ui-code-examples', category, componentName, variationId, `index.${extension}`)
}