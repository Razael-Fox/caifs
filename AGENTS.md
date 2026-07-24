# AGENTS.md

## Overview & Architecture

Project ini adalah aplikasi web modern berbasis **Next.js** yang menggunakan stack berikut:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Package Manager**: [pnpm](https://pnpm.io/) (Node.js)
- **UI Component Library**: [Mantine UI](https://mantine.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Backend / API**: VPS NAT (Python FastAPI Proxy Backend `api-razael-fox` dengan Rate Limiting & Whitelist Support)
- **Frontend Deployment**: [Vercel](https://vercel.com/)
- **Source Control**: [GitHub](https://github.com/)

---

## Agent Rules & Guidelines

### 1. Framework (Next.js)
- Gunakan **App Router** (`src/app`) secara konsisten.
- Gunakan React Server Components (RSC) secara default. Tambahkan directive `'use client'` hanya pada komponen yang membutuhkan state, event listener, atau hook interaktif.
- Ikuti konvensi routing Next.js (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`).

### 2. Package Manager (pnpm)
- Gunakan `pnpm` untuk semua manajemen package dan eksekusi script:
  - Install dependensi: `pnpm install` / `pnpm add <package>`
  - Install dev dependensi: `pnpm add -D <package>`
  - Jalankan script: `pnpm <script-name>`
- Jangan gunakan `npm` atau `yarn` secara langsung untuk menghindari konflik lockfile.

### 3. UI Component Library (Mantine)
- Manfaatkan komponen bawaan Mantine UI untuk layout, form, dan elemen UI mendasar.
- Selalu bungkus komponen Mantine dalam Provider yang sesuai (`MantineProvider`) di root layout.
- Styling disesuaikan menggunakan Mantine theme override atau CSS Modules / PostCSS jika diperlukan.

### 4. Animation (Framer Motion)
- Gunakan `framer-motion` untuk animasi dan transisi mikro.
- Karena Framer Motion memerlukan modul client-side, selalu sertakan `'use client'` pada komponen yang menggunakan `motion` atau hook dari Framer Motion.
- Jaga agar animasi tetap halus, performan, dan tidak mengganggu usability.

### 5. Backend (VPS NAT)
- Semua koneksi ke backend VPS NAT harus memperhatikan alokasi port & domain/ip forwarding yang berlaku.
- Amankan endpoint API dan tangani CORS serta SSL/TLS proxy jika mengakses backend dari frontend Vercel.
- Simpan base URL dan credential backend di environment variables (`.env.local` / Vercel Environment Variables).

### 6. Frontend Deployment (Vercel)
- Konfigurasikan build command dan environment variables di Vercel Dashboard.
- Pastikan build tidak error secara lokal (`pnpm build`) sebelum melakukan push ke repositori.

### 7. Source Control (GitHub)
- Gunakan branch-based workflow (misal: `main` untuk produksi, feature branches untuk pengembangan).
- Tulis pesan commit yang jelas dan deskriptif.
- Jangan commit file kredensial, API key, atau `.env.local` ke repositori.
