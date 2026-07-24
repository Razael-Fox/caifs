# CAIFS — Create An Icon From the Source

**CAIFS** adalah web application modern khusus desainer & developer untuk ekstraksi dan konversi ikon secara instan.

## 🚀 Fitur Utama
- **Multi-Input Converter**: Dukungan input raw SVG `<svg>`, file `.svg`, serta simbol Unicode & Glyph.
- **Dynamic Image Export**: Ekspor ikon ke format PNG, JPG/JPEG, atau WEBP hingga resolusi 1024x1024 px.
- **Kustomisasi Live Canvas**:
  - Pengaturan warna fill icon & stroke.
  - Opsi background: Transparent, Solid Color, atau Gradient.
  - Pengaturan padding canvas icon.
- **Opt-In Fallback Icon Fetcher**: Fitur fetch ikon dari URL eksternal secara terisolasi via VPS Proxy API terpisah (`api-razael-fox`).

## 🛠️ Tech Stack
- **Frontend Framework**: Next.js 15 (App Router) + React 19
- **UI & Styling**: Mantine UI 7 + CSS Modules / Glassmorphism
- **Icons**: `@tabler/icons-react`
- **Backend API**: Python FastAPI (Standalone VPS Proxy)
- **Package Manager**: `pnpm`

## 💻 Penggunaan Lokal
```bash
# Install dependensi
pnpm install

# Jalankan server dev
pnpm dev
```
