'use client';

import React from 'react';
import { Stack, TextInput } from '@mantine/core';
import { IconConfig } from '../../types/icon';
import { IconEditor } from '../../components/IconEditor';
import { t } from '../../lib/strings';

export default function UnicodeGeneratorPage() {
  return (
    <IconEditor
      title="Unicode Icon Generator"
      subtitle="Buat icon resolusi tinggi dari karakter emoji atau simbol Unicode favoritmu"
      initialConfig={{ inputType: 'unicode', unicodeChar: '⚡' }}
      inputControl={(config: IconConfig, setConfig: any) => (
        <Stack gap="xs">
          <TextInput
            label={t('input.unicode.label')}
            aria-label={t('input.unicode.label')}
            placeholder={t('input.unicode.placeholder')}
            value={config.unicodeChar}
            onChange={(e) => setConfig({ ...config, unicodeChar: e.currentTarget.value })}
          />
        </Stack>
      )}
    />
  );
}
