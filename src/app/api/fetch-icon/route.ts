import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL icon tidak valid' }, { status: 400 });
    }

    // Validasi URL dasar
    const parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: 'Protokol URL tidak didukung' }, { status: 400 });
    }

    // Fetch icon dari sumber eksternal via proxy server
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (IconConverter-FallbackFetcher/1.0)',
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Gagal mengunduh icon: HTTP ${res.status}` },
        { status: res.status }
      );
    }

    const contentType = res.headers.get('content-type') || '';
    const textContent = await res.text();

    // Verifikasi konten SVG
    if (textContent.includes('<svg') || contentType.includes('image/svg+xml')) {
      return NextResponse.json({
        type: 'svg',
        content: textContent,
      });
    }

    return NextResponse.json({
      error: 'Konten dari URL bukan format SVG yang valid',
    }, { status: 422 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Terjadi kesalahan pada Proxy Fetcher' },
      { status: 500 }
    );
  }
}
