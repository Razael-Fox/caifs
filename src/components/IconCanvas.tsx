'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { IconConfig } from '../types/icon';

interface IconCanvasProps {
  config: IconConfig;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const IconCanvas: React.FC<IconCanvasProps> = ({ config, canvasRef }) => {
  // Debounce timer ref — agar canvas tidak re-draw setiap keystroke
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Cached object URL agar tidak leak
  const blobUrlRef = useRef<string | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = config.exportResolution;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    // Background
    if (config.bgColorType === 'solid') {
      ctx.fillStyle = config.bgColor1;
      ctx.fillRect(0, 0, size, size);
    } else if (config.bgColorType === 'gradient') {
      const grad = ctx.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, config.bgColor1);
      grad.addColorStop(1, config.bgColor2);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
    }

    const pad = (config.paddingPercent / 100) * size;
    const contentSize = size - pad * 2;

    if (config.inputType === 'unicode') {
      ctx.fillStyle = config.fillColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `${contentSize * 0.85}px sans-serif`;
      ctx.fillText(config.unicodeChar || '★', size / 2, size / 2 + contentSize * 0.05);
    } else if (config.inputType === 'svg-code' || config.inputType === 'url') {
      const rawSvg = config.svgCode;
      if (rawSvg && rawSvg.trim().startsWith('<svg')) {
        // Revoke previous blob URL sebelum buat yang baru
        if (blobUrlRef.current) {
          URL.revokeObjectURL(blobUrlRef.current);
        }

        const blob = new Blob([rawSvg], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;

        const img = new Image();
        img.onload = () => {
          // Pastikan canvas masih mounted sebelum draw
          if (canvasRef.current) {
            ctx.drawImage(img, pad, pad, contentSize, contentSize);
          }
          URL.revokeObjectURL(url);
          blobUrlRef.current = null;
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          blobUrlRef.current = null;
        };
        img.src = url;
      }
    }
  }, [config, canvasRef]);

  useEffect(() => {
    // Debounce 80ms — balance antara responsif & tidak re-draw tiap karakter
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(draw, 80);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [draw]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  return (
    <div
      className="checkerboard-bg"
      style={{
        borderRadius: '0.75rem',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        minHeight: '320px',
        border: '1px solid rgba(71, 85, 105, 0.4)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          maxWidth: '100%',
          maxHeight: '380px',
          objectFit: 'contain',
          borderRadius: config.bgColorType !== 'transparent' ? '6px' : '0px',
          display: 'block',
        }}
      />
    </div>
  );
};
