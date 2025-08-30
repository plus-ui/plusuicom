# Proje Yapısı ve Organizasyon

Bu dokümantasyon, Plus UI projesinin yeni organize edilmiş klasör yapısını açıklamaktadır.

## 📁 Components Klasör Yapısı

### `/src/components/`

```
components/
├── index.ts              # Ana barrel export dosyası
├── common/               # Ortak kullanılan componentler
│   ├── index.ts
│   ├── container.astro
│   └── ReadMore.astro
├── layout/               # Layout componentleri
│   ├── index.ts
│   ├── footer.astro
│   └── navbar/
│       ├── navbar.astro
│       ├── auth-dropdown.astro
│       ├── dropdown.astro
│       └── mega-dropdown/
│           ├── MegaDropdownContainer.astro
│           ├── discover/
│           │   ├── CompareSection.astro
│           │   ├── DiscoverView.astro
│           │   ├── FeaturedSection.astro
│           │   └── LinksSection.astro
│           └── products/
│               ├── ProductCard.astro
│               └── ProductsView.astro
├── feature/              # Feature-specific componentler
│   ├── index.ts
│   ├── WidgetPreview.tsx
│   └── sections/         # Sayfa bölümleri
│       ├── FAQ.astro
│       ├── Features.astro
│       ├── Hero.astro
│       ├── Proof.astro
│       ├── Resources.astro
│       ├── Showcase.astro
│       ├── Specifications.astro
│       ├── Templates.astro
│       ├── Testimonial.astro
│       └── UnifiedDocs.astro
└── ui/                   # UI componentleri
    ├── index.ts
    ├── primitives/       # Temel UI elementleri
    │   └── Accordion.tsx
    ├── interactive/      # Etkileşimli componentler
    │   ├── Counter.tsx
    │   ├── ScrollBasedFeatures.tsx
    │   └── ShowcaseTabs.tsx
    └── display/          # Gösterim componentleri
        └── TokenArchitecture.tsx
```

### Kullanım Örnekleri

#### Barrel Export ile Import
```typescript
// Artık böyle import edebilirsiniz:
import { Container, ReadMore } from '@components/common';
import { Footer, Navbar } from '@components/layout';
import { Hero, Features, FAQ } from '@components/feature';
import { Accordion, Counter } from '@components/ui';

// Veya hepsini tek seferde:
import { Container, Footer, Hero, Accordion } from '@components';
```

#### Eski vs Yeni Import Yapısı
```typescript
// ESKI
import Container from '@components/container.astro';
import Footer from '@components/footer.astro';
import Hero from '@components/sections/Hero.astro';

// YENİ
import { Container } from '@components/common';
import { Footer } from '@components/layout';
import { Hero } from '@components/feature';
```

## 📁 Assets Klasör Yapısı

### `/src/assets/`

```
assets/
└── images/
    ├── icons/            # İkonlar ve logolar
    │   ├── logo.svg
    │   ├── logos.png
    │   ├── analytics.png
    │   ├── design-system.png
    │   ├── plus-ai.png
    │   ├── ui-library.png
    │   └── cover.png
    ├── illustrations/    # İllüstrasyonlar ve feature görselleri
    │   ├── unified-styling.png
    │   ├── cross-framework.png
    │   ├── ui-monitoring.png
    │   ├── documentation.png
    │   ├── blog.png
    │   ├── community.png
    │   ├── contribute.png
    │   ├── foundation.png
    │   ├── components.png
    │   ├── blocks.png
    │   └── templates.png
    └── ui-examples/      # UI örnekleri ve widget görselleri
        ├── widget-1x1.png
        ├── widget-1x2.png
        ├── widget-1x3.png
        ├── widget-2x1.png
        ├── widget-2x2.png
        ├── widget-2x3.png
        ├── widget-3x1.png
        ├── widget-3x2.png
        ├── widget-3x3.png
        ├── widget-4x1.png
        ├── widget-4x2.png
        ├── widget-4x3.png
        ├── widget-5x1.png
        ├── widget-5x2.png
        └── widget-5x3.png
```

### Asset Import Örnekleri

```typescript
// İkonlar
import logo from '@assets/images/icons/logo.svg';
import analytics from '@assets/images/icons/analytics.png';

// İllüstrasyonlar
import unifiedStyling from '@assets/images/illustrations/unified-styling.png';
import documentation from '@assets/images/illustrations/documentation.png';

// UI Örnekleri
import widget1x1 from '@assets/images/ui-examples/widget-1x1.png';
```

## 🎯 Avantajlar

### 1. **Daha İyi Organizasyon**
- Her component türü kendi klasöründe
- Benzer görevli dosyalar bir arada
- Hiyerarşik yapı ile kolay navigasyon

### 2. **Ölçeklenebilirlik**
- Yeni componentler için net yerleşim yerleri
- Büyük projelerde karışıklığın önlenmesi
- Mantıklı gruplama

### 3. **Geliştirici Deneyimi**
- Barrel exports ile temiz importlar
- Daha az typing
- Otomatik tamamlama desteği
- Kod okunabilirliğinin artması

### 4. **Bakım Kolaylığı**
- Componentlerin bulunması kolay
- Refactoring işlemleri daha güvenli
- Dependency tracking iyileştirildi

## 📋 Component Kategorileri

### **Common Components**
Projenin her yerinde kullanılabilecek, genel amaçlı componentler.
- `Container`: Layout wrapper
- `ReadMore`: Metin genişletme componenti

### **Layout Components**
Sayfa düzeni ve navigasyon ile ilgili componentler.
- `Footer`: Sayfa alt bilgisi
- `Navbar`: Ana navigasyon

### **Feature Components**
Belirli özellikler ve sayfa bölümleri için özel componentler.
- `WidgetPreview`: Widget önizleme
- `sections/*`: Sayfa bölümleri (Hero, Features, FAQ, vb.)

### **UI Components**
Kullanıcı arayüzü elementleri, 3 alt kategoride:

#### **Primitives**
Temel UI blokları (butonlar, inputlar, vb.)

#### **Interactive**
Etkileşimli elementler (tablar, sayaçlar, vb.)

#### **Display**
Gösterim amaçlı componentler (grafikler, tablolar, vb.)

## 🚀 Gelecek Genişletmeler

Bu yeni yapı ile gelecekte:
- Yeni component türleri kolayca eklenebilir
- Her kategori bağımsız olarak genişletilebilir
- Test dosyaları yanına eklenebilir
- Storybook entegrasyonu yapılabilir

## ⚠️ Önemli Notlar

1. **Import Path Değişiklikleri**: Tüm import pathler güncellenmiştir
2. **Barrel Exports**: Index dosyaları üzerinden export yapılmaktadır
3. **Asset Paths**: Görseller yeni klasör yapısına taşınmıştır
4. **Backward Compatibility**: Eski pathler artık çalışmayacaktır

---

Bu reorganizasyon projenin sürdürülebilirliğini ve geliştirici deneyimini önemli ölçüde iyileştirecektir. 🎉
