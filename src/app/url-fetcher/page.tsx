'use client';

import React, { useState } from 'react';
import { Stack, Group, Text, TextInput, Button, Notification, Modal } from '@mantine/core';
import { Info } from 'lucide-react';
import { IconConfig } from '../../types/icon';
import { IconEditor } from '../../components/IconEditor';
import { t } from '../../lib/strings';

export default function UrlFetcherPage() {
  const [fetchingUrl, setFetchingUrl] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchSuccess, setFetchSuccess] = useState<string | null>(null);
  const [tosModalOpened, setTosModalOpened] = useState(false);

  const handleProxyFetch = async (config: IconConfig, setConfig: any) => {
    if (!config.urlInput.trim()) return;
    setFetchingUrl(true);
    setFetchError(null);
    setFetchSuccess(null);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_PROXY_API_URL || 'https://api.razael-fox.my.id';
      const fetchUrl = `${apiBaseUrl}/icon/fetch?url=${encodeURIComponent(config.urlInput)}`;
      
      const res = await fetch(fetchUrl);
      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || data.error || t('notifications.fetchError'));

      if (data.type === 'svg' && data.content) {
        setConfig({
          ...config,
          inputType: 'svg-code',
          svgCode: data.content,
        });
        setFetchSuccess(t('notifications.fetchSuccess'));
      }
    } catch (err: any) {
      setFetchError(err.message || t('notifications.fetchError'));
    } finally {
      setFetchingUrl(false);
    }
  };

  return (
    <>
      <IconEditor
        title="URL Icon Fetcher"
        subtitle="Ambil icon SVG secara otomatis dari URL web eksternal melalui VPS NAT Proxy"
        initialConfig={{ inputType: 'url' }}
        inputControl={(config: IconConfig, setConfig: any) => (
          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" fw={600} c="sky.2">
                {t('input.url.title')}
              </Text>
              <Button 
                variant="subtle" 
                color="gray.2" 
                size="xs" 
                leftSection={<Info size={14} />}
                onClick={() => setTosModalOpened(true)}
              >
                {t('input.url.tosLink')}
              </Button>
            </Group>
            <TextInput
              aria-label={t('input.url.title')}
              placeholder={t('input.url.placeholder')}
              value={config.urlInput}
              onChange={(e) => setConfig({ ...config, urlInput: e.currentTarget.value })}
              rightSection={
                <Button 
                  size="xs" 
                  variant="filled" 
                  color="pacificCyan" 
                  loading={fetchingUrl}
                  onClick={() => handleProxyFetch(config, setConfig)}
                >
                  {t('input.url.fetchButton')}
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
      />

      <Modal 
        opened={tosModalOpened} 
        onClose={() => setTosModalOpened(false)}
        title={t('modal.title')}
        centered
      >
        <Stack gap="sm">
          <Text size="sm">{t('modal.p1')}</Text>
          <Text size="sm">{t('modal.p2')}</Text>
          <Button onClick={() => setTosModalOpened(false)} color="pacificCyan" mt="md">
            {t('modal.closeButton')}
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
