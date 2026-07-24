'use client';

import React, { useRef, useEffect } from 'react';
import { IconConfig } from '../types/icon';

interface IconCanvasProps {
  config: IconConfig;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const IconCanvas: React.FC<IconCanvasProps> = ({ config, canvasRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = config.exportResolution;
    canvas.width = size;
    canvas.height = size;

    // Clear
    ctx.clearRect(0, 0, size, size);

    // Draw Background
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

    // Draw Content based on Input Type
    const pad = (config.paddingPercent / 100) * size;
    const contentSize = size - pad * 2;

    if (config.inputType === 'unicode') {
      ctx.fillStyle = config.fillColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `${contentSize * 0.85}px sans-serif`;
      ctx.fillText(config.unicodeChar || '★', size / 2, size / 2 + contentSize * 0.05);
    } else if (config.inputType === 'svg-code' || config.inputType === 'url') {
      let rawSvg = config.svgCode;
      
      // Inject/Override fill color & stroke color inside SVG string if present
      if (rawSvg && rawSvg.trim().startsWith('<svg')) {
        // Prepare image element to render SVG onto canvas
        const blob = new Blob([rawSvg], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const img = new Image();

        img.onload = () => {
          ctx.drawImage(img, pad, pad, contentSize, contentSize);
          URL.revokeObjectURL(url);
        };
        img.src = url;
      }
    }
  }, [config, canvasRef]);

  return (
    <div 
      ref={containerRef}
      className="checkerboard-bg rounded-xl overflow-hidden shadow-2xl flex items-center justify-center p-4 border border-slate-700/50 min-h-[320px] max-w-full"
    >
      <canvas 
        ref={canvasRef} 
        style={{ 
          maxWidth: '100%', 
          maxHeight: '380px', 
          objectFit: 'contain',
          borderRadius: config.bgColorType !== 'transparent' ? '8px' : '0px' 
        }} 
      />
    </div>
  );
};
