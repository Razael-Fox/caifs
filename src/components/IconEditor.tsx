'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Title, Text, Group, Stack, Select, ColorInput, Slider, Button, Card, Badge } from '@mantine/core';
import { Download } from 'lucide-react';
import { IconConfig, DEFAULT_CONFIG } from '../types/icon';
import { IconCanvas } from './IconCanvas';
import { t } from '../lib/strings';

interface IconEditorProps {
  initialConfig?: Partial<IconConfig>;
  title: string;
  subtitle: string;
  inputControl: React.ReactNode | ((config: IconConfig, setConfig: React.Dispatch<React.SetStateAction<IconConfig>>) => React.ReactNode);
}

export function IconEditor({ title, subtitle, inputControl, initialConfig }: IconEditorProps) {
  const [config, setConfig] = useState<IconConfig>(() => ({ ...DEFAULT_CONFIG, ...initialConfig }));
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleExport = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mimeMap: Record<string, string> = {
      png: 'image/png',
      jpeg: 'image/jpeg',
      webp: 'image/webp',
    };
    const mimeType = mimeMap[config.exportFormat] || 'image/png';

    const dataUrl = canvas.toDataURL(mimeType, 0.95);
    const link = document.createElement('a');
    link.download = `icon-${config.exportResolution}x${config.exportResolution}.${config.exportFormat}`;
    link.href = dataUrl;
    link.click();
  }, [config.exportFormat, config.exportResolution]);

  return (
    <Stack gap="xl">
      {/* Page Header */}
      <Stack align="center" style={{ textAlign: 'center' }}>
        <Title
          order={1}
          className="gradient-text"
          style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 800 }}
        >
          {title}
        </Title>
        <Text c="dimmed" size="lg" style={{ maxWidth: '36rem' }}>
          {subtitle}
        </Text>
      </Stack>

      {/* 2-Column Grid */}
      <div className="editor-grid">
        {/* Preview Column */}
        <div className="editor-preview-col">
          <Card
            className="glass-panel"
            style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Group justify="space-between" mb="md">
              <Text fw={700} size="lg" c="white">
                {t('preview.title')}
              </Text>
              <Badge color="pacificCyan" variant="filled" size="lg" radius="md">
                {config.exportResolution} × {config.exportResolution} px
              </Badge>
            </Group>

            <IconCanvas config={config} canvasRef={canvasRef} />

            <Stack mt="lg" gap="md">
              <Group grow>
                <Select
                  label={t('preview.exportFormatLabel')}
                  data={[
                    { value: 'png', label: 'PNG (Transparent)' },
                    { value: 'jpeg', label: 'JPG / JPEG (Solid)' },
                    { value: 'webp', label: 'WEBP' },
                  ]}
                  value={config.exportFormat}
                  onChange={(val) => setConfig((c) => ({ ...c, exportFormat: (val as any) || 'png' }))}
                />
                <Select
                  label={t('preview.resolutionLabel')}
                  data={[
                    { value: '32', label: '32 × 32 px' },
                    { value: '64', label: '64 × 64 px' },
                    { value: '128', label: '128 × 128 px' },
                    { value: '512', label: '512 × 512 px (HD)' },
                    { value: '1024', label: '1024 × 1024 px (4K)' },
                  ]}
                  value={config.exportResolution.toString()}
                  onChange={(val) => setConfig((c) => ({ ...c, exportResolution: parseInt(val || '512') }))}
                />
              </Group>

              <Button
                size="lg"
                color="pacificCyan"
                leftSection={<Download size={20} />}
                onClick={handleExport}
                style={{ fontWeight: 700 }}
              >
                {t('preview.downloadButton')} ({config.exportFormat.toUpperCase()})
              </Button>
            </Stack>
          </Card>
        </div>

        {/* Controls Column */}
        <div className="editor-controls-col">
          <Card
            className="glass-panel"
            style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Stack gap="lg">
              <div>
                <Text fw={700} size="md" mb="xs" c="cyan.3">
                  Input Source
                </Text>
                {typeof inputControl === 'function'
                  ? (inputControl as any)(config, setConfig)
                  : React.cloneElement(inputControl as React.ReactElement, { config, setConfig } as any)}
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
                <Text fw={700} size="md" mb="md" c="white">
                  {t('customization.title')}
                </Text>

                <Stack gap="md">
                  <Group grow>
                    <ColorInput
                      label={t('customization.fillColor')}
                      format="hex"
                      value={config.fillColor}
                      onChange={(val) => setConfig((c) => ({ ...c, fillColor: val }))}
                    />
                    <Select
                      label={t('customization.bgType')}
                      data={[
                        { value: 'transparent', label: t('customization.bgOptions.transparent') },
                        { value: 'solid', label: t('customization.bgOptions.solid') },
                        { value: 'gradient', label: t('customization.bgOptions.gradient') },
                      ]}
                      value={config.bgColorType}
                      onChange={(val) => setConfig((c) => ({ ...c, bgColorType: (val as any) || 'transparent' }))}
                    />
                  </Group>

                  {config.bgColorType !== 'transparent' && (
                    <Group grow>
                      <ColorInput
                        label={t('customization.bgColor1')}
                        format="hex"
                        value={config.bgColor1}
                        onChange={(val) => setConfig((c) => ({ ...c, bgColor1: val }))}
                      />
                      {config.bgColorType === 'gradient' && (
                        <ColorInput
                          label={t('customization.bgColor2')}
                          format="hex"
                          value={config.bgColor2}
                          onChange={(val) => setConfig((c) => ({ ...c, bgColor2: val }))}
                        />
                      )}
                    </Group>
                  )}

                  <div>
                    <Text size="sm" mb={6} fw={600} c="dimmed">
                      {t('customization.padding')}: {config.paddingPercent}%
                    </Text>
                    <Slider
                      value={config.paddingPercent}
                      onChange={(val) => setConfig((c) => ({ ...c, paddingPercent: val }))}
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
