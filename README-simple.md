# Type-Safe Environment Variables (astro:env API)

Modern Astro yöntemi! Type-safe ve güvenli.

## 1. `.env` dosyasında tanımlayın:

```bash
# .env
PUBLIC_DOCS_BASE_URL=https://new-docs.plusui.com
PUBLIC_DOCS_API_URL=https://new-docs.plusui.com/api
PUBLIC_DOCS_COMPONENTS_URL=https://new-docs.plusui.com/components
PUBLIC_DOCS_GUIDES_URL=https://new-docs.plusui.com/guides
```

## 2. Schema tanımlayın (astro.config.mjs):

```js
env: {
  schema: {
    PUBLIC_DOCS_BASE_URL: envField.string({ 
      context: "client", 
      access: "public",
      default: "https://new-docs.plusui.com"
    }),
    // ...diğer değişkenler
  }
}
```

## 3. Kodda type-safe kullanın:

### Direkt kullanım:
```astro
---
import { PUBLIC_DOCS_BASE_URL } from 'astro:env/client';
---

<a href={PUBLIC_DOCS_BASE_URL}>Documentation</a>
```

### Constants üzerinden (önerilen):
```astro
---
import { SITE_URLS } from '@/constants/urls';
---

<a href={SITE_URLS.docs.base}>Documentation</a>
```

## Domain değiştirmek için:

Sadece `.env` dosyasını güncelleyin:
```bash
# Eski
PUBLIC_DOCS_BASE_URL=https://new-docs.plusui.com

# Yeni  
PUBLIC_DOCS_BASE_URL=https://docs.plusui.com
```

## Avantajları 🚀

- ✅ **Type Safety**: Full TypeScript desteği
- ✅ **Runtime Validation**: Hataları erken yakalar  
- ✅ **Auto-complete**: IDE desteği
- ✅ **Default Values**: Schema'da tanımlı
- ✅ **Security**: Client/server ayrımı
- ✅ **Performance**: Build-time optimization
- ✅ **Future Proof**: Astro'nun önerdiği yöntem
