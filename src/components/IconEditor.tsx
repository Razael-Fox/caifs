'use client';

import React, { useState, useRef } from 'react';
import { Title, Text, Group, Stack, Select, ColorInput, Slider, Button, Card, Badge, Modal } from '@mantine/core';
import { IconConfig, DEFAULT_CONFIG } from '../../types/icon';
import { IconCanvas } from '../../components/IconCanvas';
import { t } from '../../lib/strings';

const IconDownload = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
);

const IconSparkles = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#82ddf0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/>
  </svg>
);

interface IconEditorProps {
  initialConfig?: Partial<IconConfig>;
  title: string;
  subtitle: string;
  inputControl: React.ReactNode;
}

export function IconEditor({ title, subtitle, inputControl, initialConfig }: IconEditorProps) {
  const [config, setConfig] = useState<IconConfig>({ ...DEFAULT_CONFIG, ...initialConfig });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  return (
    <Stack gap="xl">
      <Stack align="center" justify="center" className="text-center">
        <Group gap="xs">
          <IconSparkles />
          <Title order={1} className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-sky-400 via-teal-300 to-amber-200 bg-clip-text text-transparent">
            {title}
          </Title>
        </Group>
        <Text c="dimmed" size="lg" className="max-w-2xl">
          {subtitle}
        </Text>
      </Stack>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Preview */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="glass-panel p-6">
            <Group justify="space-between" mb="md">
              <Text fw={700} size="lg" c="white">
                {t('preview.title')}
              </Text>
              <Badge color="pacificCyan" variant="filled">
                {config.exportResolution} x {config.exportResolution} px
              </Badge>
            </Group>

            <IconCanvas config={config} canvasRef={canvasRef} />

            <Stack mt="lg" gap="md">
              <Group grow>
                <Select
                  label={t('preview.exportFormatLabel')}
                  data={[
                    { value: 'png', label: 'PNG (Transparent / Solid)' },
                    { value: 'jpeg', label: 'JPG / JPEG (Solid BG)' },
                    { value: 'webp', label: 'WEBP' },
                  ]}
                  value={config.exportFormat}
                  onChange={(val) => setConfig({ ...config, exportFormat: (val as any) || 'png' })}
                />
                <Select
                  label={t('preview.resolutionLabel')}
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
                color="pacificCyan"
                leftSection={<IconDownload />}
                onClick={handleExport}
                className="shadow-lg shadow-cyan-900/30"
              >
                {t('preview.downloadButton')} ({config.exportFormat.toUpperCase()})
              </Button>
            </Stack>
          </Card>
        </div>

        {/* Right: Input & Customization */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Card className="glass-panel p-6">
            <Stack gap="lg">
              {/* Specialized Input Component */}
              {typeof inputControl === 'function' 
                ? (inputControl as any)(config, setConfig)
                : React.cloneElement(inputControl as React.ReactElement, { config, setConfig })}

              {/* Customization Options */}
              <div className="border-t border-slate-700/50 pt-4">
                <Text fw={700} size="md" mb="md" c="white">
                  {t('customization.title')}
                </Text>
                
                <Stack gap="md">
                  <Group grow>
                    <ColorInput
                      label={t('customization.fillColor')}
                      format="hex"
                      value={config.fillColor}
                      onChange={(val) => setConfig({ ...config, fillColor: val })}
                    />
                    <Select
                      label={t('customization.bgType')}
                      data={[
                        { value: 'transparent', label: t('customization.bgOptions.transparent') },
                        { value: 'solid', label: t('customization.bgOptions.solid') },
                        { value: 'gradient', label: t('customization.bgOptions.gradient') },
                      ]}
                      value={config.bgColorType}
                      onChange={(val) => setConfig({ ...config, bgColorType: (val as any) || 'transparent' })}
                    />
                  </Group>

                  {config.bgColorType !== 'transparent' && (
                    <Group grow>
                      <ColorInput
                        label={t('customization.bgColor1')}
                        format="hex"
                        value={config.bgColor1}
                        onChange={(val) => setConfig({ ...config, bgColor1: val })}
                      />
                      {config.bgColorType === 'gradient' && (
                        <ColorInput
                          label={t('customization.bgColor2')}
                          format="hex"
                          value={config.bgColor2}
                          onChange={(val) => setConfig({ ...config, bgColor2: val })}
                        />
                      )}
                    </Group>
                  )}

                  <div>
                    <Text size="sm" mb={4}>{t('customization.padding')}: {config.paddingPercent}%</Text>
                    <Slider
                      value={config.paddingPercent}
                      onChange={(val) => setConfig({ ...config, paddingPercent: val })}
                      min={0}
                      max={40}
                      step={1}
                      color="pacificCyan"
                    />
                  </div>
                </Stack>
              </div>
            </Stack>
          </Card>
        </div>
      </div>
    </Stack>
  );
}
