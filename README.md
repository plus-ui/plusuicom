# Plus UI Community

Modern ve kullanıcı dostu UI bileşenleri ve tasarım sistemleri için topluluk platformu.

## 🚀 Özellikler

- **Design System**: Figma tabanlı tasarım sistemi
- **UI Library**: React bileşenleri
- **PlusHub**: Topluluk kaynakları
- **Templates**: Hazır şablonlar
- **Authentication**: Supabase ile güvenli kimlik doğrulama

## 🛠️ Kurulum

### Gereksinimler

- Node.js 18+ 
- pnpm (önerilen) veya npm
- Supabase projesi

### 1. Projeyi klonlayın

```bash
git clone https://github.com/yourusername/plusuicom.git
cd plusuicom
```

### 2. Bağımlılıkları yükleyin

```bash
pnpm install
```

### 3. Supabase kurulumu

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni proje oluşturun
3. **Settings > API** sekmesinden URL ve anonim anahtarı alın
4. `.env` dosyası oluşturun:

```bash
cp .env.example .env
```

5. `.env` dosyasını düzenleyin:

```env
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### 4. Geliştirme sunucusunu başlatın

```bash
pnpm dev
```

## 🔐 Authentication

Proje Supabase Authentication kullanır:

- **Email/Password**: Klasik giriş
- **OAuth**: Google, GitHub, Discord desteği
- **PKCE Flow**: Güvenli OAuth implementasyonu
- **Session Management**: HTTP-only cookies ile güvenli

### OAuth Kurulumu

1. Supabase Dashboard'da **Authentication > Providers** sekmesine gidin
2. İstediğiniz provider'ı etkinleştirin (Google, GitHub, Discord)
3. Provider'ın OAuth credentials'larını girin
4. Redirect URL'yi `https://your-domain.com/api/auth/callback` olarak ayarlayın

## 📁 Proje Yapısı

```
src/
├── components/          # React bileşenleri
├── pages/              # Astro sayfaları
│   └── api/           # API endpoints
│       └── auth/      # Auth API'leri
├── lib/               # Utility fonksiyonlar
│   ├── supabase.ts   # Supabase client
│   └── auth.ts       # Auth utilities
├── layouts/           # Sayfa layout'ları
└── middleware.ts      # Auth middleware
```

## 🚀 Deployment

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'feat: add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🆘 Destek

- [Issues](https://github.com/yourusername/plusuicom/issues)
- [Discussions](https://github.com/yourusername/plusuicom/discussions)
- [Documentation](https://docs.plusui.com)
