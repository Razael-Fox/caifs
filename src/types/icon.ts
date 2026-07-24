export interface IconConfig {
  inputType: 'svg-code' | 'unicode' | 'url';
  svgCode: string;
  unicodeChar: string;
  urlInput: string;
  
  // Customization
  fillColor: string;
  strokeColor: string;
  bgColorType: 'transparent' | 'solid' | 'gradient';
  bgColor1: string;
  bgColor2: string;
  
  // Resolution & Dimensions
  exportResolution: number; // e.g. 512, 1024
  paddingPercent: number; // 0 to 40
  
  // Output format
  exportFormat: 'png' | 'jpeg' | 'webp';
}

export const DEFAULT_CONFIG: IconConfig = {
  inputType: 'svg-code',
  svgCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
</svg>`,
  unicodeChar: '⚡',
  urlInput: '',
  fillColor: '#6366f1',
  strokeColor: '#38bdf8',
  bgColorType: 'transparent',
  bgColor1: '#0f172a',
  bgColor2: '#312e81',
  exportResolution: 512,
  paddingPercent: 10,
  exportFormat: 'png',
};
