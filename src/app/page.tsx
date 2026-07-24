'use client';

import React, { useState, useRef } from 'react';
import { 
  Title, Text, Group, Stack, SegmentedControl, Textarea, TextInput, 
  Select, Slider, ColorInput, Button, Card, Badge, Modal, ActionIcon, Notification 
} from '@mantine/core';
import { IconConfig, DEFAULT_CONFIG } from '../types/icon';
import { IconCanvas } from '../components/IconCanvas';

const IconSparkles = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/>
  </svg>
);

const IconDownload = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
);

const IconInfoCircle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
  </svg>
);

export default function IconConverterApp() {
  const [config, setConfig] = useState<IconConfig>(DEFAULT_CONFIG);
  const [fetchingUrl, setFetchingUrl] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchSuccess, setFetchSuccess] = useState<string | null>(null);
  const [tosModalOpened, setTosModalOpened] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Preset icon SVG samples
  const SAMPLE_SVGS = [
    {
      name: 'Layer Stack',
      code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
    },
    {
      name: 'Rocket Launch',
      code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.79-1.81.79-1.81l-3.79-3.79s-1.1.08-1.79.79z"/><path d="M12 15l-3-3 7.35-7.35c.78-.78 2.05-.78 2.83 0v0c.78.78.78 2.05 0 2.83L12 15z"/><path d="M9 18l3 3"/></svg>`
    },
    {
      name: 'Sparkles Star',
      code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/></svg>`
    }
  ];

  // Download logic
  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let mimeType = 'image/png';
    if (config.exportFormat === 'jpeg') mimeType = 'image/jpeg';
    if (config.exportFormat === 'webp') mimeType = 'image/webp';

    const dataUrl = canvas.toDataURL(mimeType, 0.95);
    const link = document.createElement('a');
    link.download = `icon-${config.exportResolution}x${config.exportResolution}.${config.exportFormat}`;
    link.href = dataUrl;
    link.click();
  };

  // Proxy Fetcher ke VPS API (api-razael-fox)
  const handleProxyFetch = async () => {
    if (!config.urlInput.trim()) return;
    setFetchingUrl(true);
    setFetchError(null);
    setFetchSuccess(null);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_PROXY_API_URL || 'https://api.razael-fox.my.id';
      const fetchUrl = `${apiBaseUrl}/icon/fetch?url=${encodeURIComponent(config.urlInput)}`;
      
      const res = await fetch(fetchUrl);

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.error || 'Gagal mengambil icon');

      if (data.type === 'svg' && data.content) {
        setConfig((prev) => ({
          ...prev,
          inputType: 'svg-code',
          svgCode: data.content,
        }));
        setFetchSuccess('SVG Icon berhasil ditarik via VPS Proxy API!');
      }
    } catch (err: any) {
      setFetchError(err.message || 'Kesalahan saat koneksi ke fetcher proxy');
    } finally {
      setFetchingUrl(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen">
      {/* Header */}
      <Stack align="center" justify="center" mb="xl" className="text-center">
        <Group gap="xs">
          <IconSparkles />
          <Title order={1} className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
            Icon Converter & Fallback Fetcher
          </Title>
        </Group>
        <Text c="dimmed" maxOverflow="ellipsis" size="lg" className="max-w-2xl">
          Konversi SVG, Unicode Glyph, atau Asset Web Icon ke image PNG, JPG, & WEBP secara instan dengan resolusi & warna kustom.
        </Text>
      </Stack>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Canvas Preview & Quick Export */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="glass-panel p-6">
            <Group justify="space-between" mb="md">
              <Text fw={700} size="lg" c="white">
                Live Preview
              </Text>
              <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                {config.exportResolution} x {config.exportResolution} px
              </Badge>
            </Group>

            <IconCanvas config={config} canvasRef={canvasRef} />

            {/* Quick Export Controls */}
            <Stack mt="lg" gap="md">
              <Group grow>
                <Select
                  label="Format Export"
                  data={[
                    { value: 'png', label: 'PNG (Transparent / Solid)' },
                    { value: 'jpeg', label: 'JPG / JPEG (Solid BG)' },
                    { value: 'webp', label: 'WEBP' },
                  ]}
                  value={config.exportFormat}
                  onChange={(val) => setConfig({ ...config, exportFormat: (val as any) || 'png' })}
                />

                <Select
                  label="Preset Resolusi"
                  data={[
                    { value: '32', label: '32 x 32 px' },
                    { value: '64', label: '64 x 64 px' },
                    { value: '128', label: '128 x 128 px' },
                    { value: '512', label: '512 x 512 px (HD)' },
                    { value: '1024', label: '1024 x 1024 px (4K)' },
                  ]}
                  value={config.exportResolution.toString()}
                  onChange={(val) => setConfig({ ...config, exportResolution: parseInt(val || '512') })}
                />
              </Group>

              <Button 
                size="lg" 
                variant="gradient" 
                gradient={{ from: 'indigo', to: 'cyan' }}
                leftSection={<IconDownload />}
                onClick={handleExport}
                className="shadow-lg shadow-indigo-500/20"
              >
                Download Icon ({config.exportFormat.toUpperCase()})
              </Button>
            </Stack>
          </Card>
        </div>

        {/* Right Column: Controls & Input Source */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Card className="glass-panel p-6">
            <Stack gap="lg">
              {/* Input Mode Switcher */}
              <div>
                <Text fw={600} mb="xs" c="gray.3">
                  Pilih Sumber Input Icon
                </Text>
                <SegmentedControl
                  fullWidth
                  color="indigo"
                  data={[
                    { label: 'SVG Code', value: 'svg-code' },
                    { label: 'Unicode Glyph', value: 'unicode' },
                    { label: 'URL Fetcher (Opt-In)', value: 'url' },
                  ]}
                  value={config.inputType}
                  onChange={(val) => setConfig({ ...config, inputType: val as any })}
                />
              </div>

              {/* Input: SVG Code */}
              {config.inputType === 'svg-code' && (
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Paste SVG XML Markup di bawah:</Text>
                    <Group gap={6}>
                      <Text size="xs" c="dimmed">Sample:</Text>
                      {SAMPLE_SVGS.map((sample, idx) => (
                        <Badge 
                          key={idx} 
                          variant="light" 
                          color="indigo" 
                          style={{ cursor: 'pointer' }}
                          onClick={() => setConfig({ ...config, svgCode: sample.code })}
                        >
                          {sample.name}
                        </Badge>
                      ))}
                    </Group>
                  </Group>
                  <Textarea
                    rows={6}
                    placeholder="<svg ...> ... </svg>"
                    value={config.svgCode}
                    onChange={(e) => setConfig({ ...config, svgCode: e.currentTarget.value })}
                  />
                </Stack>
              )}

              {/* Input: Unicode */}
              {config.inputType === 'unicode' && (
                <Stack gap="xs">
                  <TextInput
                    label="Karakter / Simbol Unicode"
                    placeholder="Masukkan emoji atau karakter (e.g. ⚡, ★, 🚀)"
                    value={config.unicodeChar}
                    onChange={(e) => setConfig({ ...config, unicodeChar: e.currentTarget.value })}
                  />
                </Stack>
              )}

              {/* Input: Fallback URL Fetcher */}
              {config.inputType === 'url' && (
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" fw={600} c="cyan.3">
                      Fallback Specific Icon Fetcher (Opt-In)
                    </Text>
                    <Button 
                      variant="subtle" 
                      color="gray" 
                      size="xs" 
                      leftSection={<IconInfoCircle />}
                      onClick={() => setTosModalOpened(true)}
                    >
                      ToS & Legal Notice
                    </Button>
                  </Group>
                  <TextInput
                    placeholder="https://example.com/icon.svg"
                    value={config.urlInput}
                    onChange={(e) => setConfig({ ...config, urlInput: e.currentTarget.value })}
                    rightSection={
                      <Button 
                        size="xs" 
                        variant="filled" 
                        color="indigo" 
                        loading={fetchingUrl}
                        onClick={handleProxyFetch}
                      >
                        Fetch
                      </Button>
                    }
                  />
                  {fetchError && (
                    <Notification color="red" onClose={() => setFetchError(null)}>
                      {fetchError}
                    </Notification>
                  )}
                  {fetchSuccess && (
                    <Notification color="teal" onClose={() => setFetchSuccess(null)}>
                      {fetchSuccess}
                    </Notification>
                  )}
                </Stack>
              )}

              {/* Customization Options */}
              <div className="border-t border-slate-700/50 pt-4">
                <Text fw={700} size="md" mb="md" c="white">
                  Kustomisasi Tampilan & Canvas
                </Text>
                
                <Stack gap="md">
                  {/* Colors */}
                  <Group grow>
                    <ColorInput
                      label="Warna Fill Icon"
                      format="hex"
                      value={config.fillColor}
                      onChange={(val) => setConfig({ ...config, fillColor: val })}
                    />
                    <Select
                      label="Tipe Background Canvas"
                      data={[
                        { value: 'transparent', label: 'Transparent' },
                        { value: 'solid', label: 'Solid Color' },
                        { value: 'gradient', label: 'Gradient Color' },
                      ]}
                      value={config.bgColorType}
                      onChange={(val) => setConfig({ ...config, bgColorType: (val as any) || 'transparent' })}
                    />
                  </Group>

                  {config.bgColorType !== 'transparent' && (
                    <Group grow>
                      <ColorInput
                        label="Background Color 1"
                        format="hex"
                        value={config.bgColor1}
                        onChange={(val) => setConfig({ ...config, bgColor1: val })}
                      />
                      {config.bgColorType === 'gradient' && (
                        <ColorInput
                          label="Background Color 2"
                          format="hex"
                          value={config.bgColor2}
                          onChange={(val) => setConfig({ ...config, bgColor2: val })}
                        />
                      )}
                    </Group>
                  )}

                  {/* Sliders */}
                  <div>
                    <Text size="sm" mb={4}>Padding Icon: {config.paddingPercent}%</Text>
                    <Slider
                      value={config.paddingPercent}
                      onChange={(val) => setConfig({ ...config, paddingPercent: val })}
                      min={0}
                      max={40}
                      step={1}
                      color="indigo"
                    />
                  </div>
                </Stack>
              </div>
            </Stack>
          </Card>
        </div>
      </div>

      {/* Legal / ToS Modal */}
      <Modal 
        opened={tosModalOpened} 
        onClose={() => setTosModalOpened(false)}
        title="Legal & Term of Service Notice"
        centered
      >
        <Stack gap="sm">
          <Text size="sm">
            Fitur <b>Fallback Icon Fetcher</b> disediakan strictly sebagai fasilitas bantu pribadi (personal utility tool) untuk mengakses dan mengonversi ikon yang URL-nya secara terbuka tersedia.
          </Text>
          <Text size="sm">
            Pengguna secara penuh bertanggung jawab mengecek lisensi hak cipta, ToS provider sumber, serta kepatuhan redistribusi ikon terkait sebelum menggunakannya secara komersial.
          </Text>
          <Button onClick={() => setTosModalOpened(false)} color="indigo" mt="md">
            Saya Mengerti
          </Button>
        </Stack>
      </Modal>
    </main>
  );
}
