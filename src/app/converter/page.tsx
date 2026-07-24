'use client';

import React from 'react';
import { Stack, Group, Text, Badge, Textarea } from '@mantine/core';
import { IconConfig } from '../../types/icon';
import { IconEditor } from '../../components/IconEditor';
import { t } from '../../lib/strings';

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

export default function SVGConverterPage() {
  return (
    <IconEditor
      title="SVG Converter"
      subtitle="Kustomisasi dan ubah kode SVG menjadi icon PNG, JPEG, atau WEBP"
      initialConfig={{ inputType: 'svg-code' }}
      inputControl={(config: IconConfig, setConfig: any) => (
        <Stack gap="xs">
          <Group justify="space-between">
            <Text size="sm" c="gray.3">{t('input.svg.label')}</Text>
            <Group gap={6}>
              <Text size="xs" c="gray.4">{t('input.svg.sample')}</Text>
              {SAMPLE_SVGS.map((sample, idx) => (
                <Badge 
                  key={idx} 
                  variant="filled" 
                  color="pacificCyan" 
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
            aria-label={t('input.svg.label')}
            placeholder={t('input.svg.placeholder')}
            value={config.svgCode}
            onChange={(e) => setConfig({ ...config, svgCode: e.currentTarget.value })}
          />
        </Stack>
      )}
    />
  );
}
