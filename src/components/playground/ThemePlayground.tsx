'use client';

import { useState, useEffect } from 'react';
import { colors, type ColorName } from '@/constants/colors';

interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

interface ThemeSettings {
  primaryColor: string;
  neutralColor: string;
  appearance: 'light' | 'dark';
  fontFamily: string;
  borderRadius: number;
}

const predefinedColors = {
  primary: [
    { name: 'Indigo', value: colors.indigo[500], colorName: 'indigo' as ColorName },
    { name: 'Blue', value: colors.blue[500], colorName: 'blue' as ColorName },
    { name: 'Purple', value: colors.purple[500], colorName: 'purple' as ColorName },
    { name: 'Pink', value: colors.pink[500], colorName: 'pink' as ColorName },
    { name: 'Red', value: colors.red[500], colorName: 'red' as ColorName },
    { name: 'Orange', value: colors.orange[500], colorName: 'orange' as ColorName },
    { name: 'Amber', value: colors.amber[500], colorName: 'amber' as ColorName },
    { name: 'Yellow', value: colors.yellow[500], colorName: 'yellow' as ColorName },
    { name: 'Lime', value: colors.lime[500], colorName: 'lime' as ColorName },
    { name: 'Green', value: colors.green[500], colorName: 'green' as ColorName },
    { name: 'Emerald', value: colors.emerald[500], colorName: 'emerald' as ColorName },
    { name: 'Teal', value: colors.teal[500], colorName: 'teal' as ColorName },
    { name: 'Cyan', value: colors.cyan[500], colorName: 'cyan' as ColorName },
    { name: 'Sky', value: colors.sky[500], colorName: 'sky' as ColorName },
    { name: 'Violet', value: colors.violet[500], colorName: 'violet' as ColorName },
    { name: 'Fuchsia', value: colors.fuchsia[500], colorName: 'fuchsia' as ColorName },
    { name: 'Rose', value: colors.rose[500], colorName: 'rose' as ColorName },
  ],
  neutral: [
    { name: 'Slate', value: colors.slate[500], colorName: 'slate' as ColorName },
    { name: 'Gray', value: colors.gray[500], colorName: 'gray' as ColorName },
    { name: 'Zinc', value: colors.zinc[500], colorName: 'zinc' as ColorName },
    { name: 'Neutral', value: colors.neutral[500], colorName: 'neutral' as ColorName },
    { name: 'Stone', value: colors.stone[500], colorName: 'stone' as ColorName },
  ]
};

const fontFamilies = [
  'Inter Variable, Inter',
  'System UI',
  'Roboto',
  'Open Sans',
  'Poppins',
  'Montserrat'
];

const borderRadiusOptions = [
  { name: 'None', value: 0 },
  { name: '4px', value: 4 },
  { name: '6px', value: 6 },
  { name: '8px', value: 8 },
  { name: '12px', value: 12 },
  { name: '16px', value: 16 },
];

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generateColorPalette(baseColor: string): ColorPalette {
  const [h, s, l] = hexToHsl(baseColor);

  // Tailwind-like color generation
  const shades = {
    50: hslToHex(h, Math.max(s * 0.3, 10), Math.min(l + 45, 97)),
    100: hslToHex(h, Math.max(s * 0.5, 15), Math.min(l + 35, 94)),
    200: hslToHex(h, Math.max(s * 0.7, 20), Math.min(l + 25, 87)),
    300: hslToHex(h, Math.max(s * 0.8, 25), Math.min(l + 15, 77)),
    400: hslToHex(h, Math.max(s * 0.9, 30), Math.min(l + 5, 65)),
    500: baseColor,
    600: hslToHex(h, Math.min(s * 1.1, 100), Math.max(l - 8, 45)),
    700: hslToHex(h, Math.min(s * 1.2, 100), Math.max(l - 18, 35)),
    800: hslToHex(h, Math.min(s * 1.3, 100), Math.max(l - 28, 25)),
    900: hslToHex(h, Math.min(s * 1.4, 100), Math.max(l - 38, 15)),
    950: hslToHex(h, Math.min(s * 1.5, 100), Math.max(l - 48, 8)),
  };

  return shades;
}

export default function ThemePlayground() {
  const [settings, setSettings] = useState<ThemeSettings>({
    primaryColor: '#6366f1', // Tailwind Indigo-500
    neutralColor: '#6b7280', // Tailwind Gray-500
    appearance: 'light',
    fontFamily: 'Inter Variable, Inter',
    borderRadius: 4,
  });

  const [primaryPalette, setPrimaryPalette] = useState<ColorPalette>(generateColorPalette('#6366f1'));
  const [neutralPalette, setNeutralPalette] = useState<ColorPalette>(generateColorPalette('#6b7280'));
  const [showMorePrimaryColors, setShowMorePrimaryColors] = useState(false);
  const [showMoreNeutralColors, setShowMoreNeutralColors] = useState(false);
  const [showMoreRadius, setShowMoreRadius] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);

  // Accordion states
  const [accordionStates, setAccordionStates] = useState({
    primaryColor: true,
    neutralColor: true,
    appearance: true,
    fontFamily: true,
    radius: true,
  });

  const toggleAccordion = (section: keyof typeof accordionStates) => {
    setAccordionStates(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    setPrimaryPalette(generateColorPalette(settings.primaryColor));
  }, [settings.primaryColor]);

  useEffect(() => {
    setNeutralPalette(generateColorPalette(settings.neutralColor));
  }, [settings.neutralColor]);

  const updateSetting = (key: keyof ThemeSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const generateCSSVariables = () => {
    const primaryPalette = generateColorPalette(settings.primaryColor);
    const neutralPalette = generateColorPalette(settings.neutralColor);

    return `/* Generated Theme Variables */
@theme {
  /* Primary Colors */
  --color-primary-50: ${primaryPalette[50]};
  --color-primary-100: ${primaryPalette[100]};
  --color-primary-200: ${primaryPalette[200]};
  --color-primary-300: ${primaryPalette[300]};
  --color-primary-400: ${primaryPalette[400]};
  --color-primary-500: ${primaryPalette[500]};
  --color-primary-600: ${primaryPalette[600]};
  --color-primary-700: ${primaryPalette[700]};
  --color-primary-800: ${primaryPalette[800]};
  --color-primary-900: ${primaryPalette[900]};
  --color-primary-950: ${primaryPalette[950]};

  /* Neutral Colors */
  --color-neutral-50: ${neutralPalette[50]};
  --color-neutral-100: ${neutralPalette[100]};
  --color-neutral-200: ${neutralPalette[200]};
  --color-neutral-300: ${neutralPalette[300]};
  --color-neutral-400: ${neutralPalette[400]};
  --color-neutral-500: ${neutralPalette[500]};
  --color-neutral-600: ${neutralPalette[600]};
  --color-neutral-700: ${neutralPalette[700]};
  --color-neutral-800: ${neutralPalette[800]};
  --color-neutral-900: ${neutralPalette[900]};
  --color-neutral-950: ${neutralPalette[950]};

  /* Font Family */
  --font-sans: '${settings.fontFamily}', ui-sans-serif, system-ui, sans-serif;

  /* Border Radius */
  --rounded: ${settings.borderRadius}px;
}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCSSVariables());
      setShowCopyModal(false);
      // Simple notification instead of alert
      const notification = document.createElement('div');
      notification.textContent = 'CSS variables copied to clipboard!';
      notification.className = 'fixed top-4 right-4 bg-color-success-default text-color-base px-4 py-2 rounded shadow-lg z-50';
      document.body.appendChild(notification);
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const openCopyModal = () => {
    setShowCopyModal(true);
  };

  // Create custom CSS properties for the preview area only
  const previewStyles = {
    '--preview-color-primary-50': primaryPalette[50],
    '--preview-color-primary-100': primaryPalette[100],
    '--preview-color-primary-200': primaryPalette[200],
    '--preview-color-primary-300': primaryPalette[300],
    '--preview-color-primary-400': primaryPalette[400],
    '--preview-color-primary-500': primaryPalette[500],
    '--preview-color-primary-600': primaryPalette[600],
    '--preview-color-primary-700': primaryPalette[700],
    '--preview-color-primary-800': primaryPalette[800],
    '--preview-color-primary-900': primaryPalette[900],
    '--preview-color-primary-950': primaryPalette[950],

    '--preview-color-neutral-50': neutralPalette[50],
    '--preview-color-neutral-100': neutralPalette[100],
    '--preview-color-neutral-200': neutralPalette[200],
    '--preview-color-neutral-300': neutralPalette[300],
    '--preview-color-neutral-400': neutralPalette[400],
    '--preview-color-neutral-500': neutralPalette[500],
    '--preview-color-neutral-600': neutralPalette[600],
    '--preview-color-neutral-700': neutralPalette[700],
    '--preview-color-neutral-800': neutralPalette[800],
    '--preview-color-neutral-900': neutralPalette[900],
    '--preview-color-neutral-950': neutralPalette[950],

    // Add fixed colors for semantic states
    '--preview-color-red-700': colors.red[700],

    '--preview-font-family': `'${settings.fontFamily}', ui-sans-serif, system-ui, sans-serif`,
    '--preview-border-radius': `${settings.borderRadius}px`,
  } as React.CSSProperties;

  return (
    <div className="min-h-screen bg-neutral-50 flex gap-9 items-start justify-center py-8">
        {/* Left Panel - Controls */}
        <div className="flex flex-col gap-4 bg-white rounded-lg border border-gray-200 p-6 min-w-[320px]">
          {/* Primary Color Section */}
          <div className="border border-gray-200 rounded overflow-hidden">
            <button
              onClick={() => toggleAccordion('primaryColor')}
              className="w-full bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <div className="w-7 h-7 flex items-center justify-center text-gray-500">
                <span className="text-lg">🎨</span>
              </div>
              <span className="text-gray-900 font-medium flex-1 text-left">Primary color</span>
              <span className={`text-gray-900 text-sm transition-transform duration-200 ${
                accordionStates.primaryColor ? 'rotate-180' : ''
              }`}>⌄</span>
            </button>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              accordionStates.primaryColor ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-4 space-y-2">
                <div className="relative bg-color-surface border border-color-default rounded px-3 py-2.5 flex items-center gap-2 cursor-pointer hover:border-color-primary group">
                <div
                  className="w-5 h-5 rounded-full border border-color-default"
                  style={{ backgroundColor: settings.primaryColor }}
                />
                <span className="text-color-caption text-sm flex-1 group-hover:text-color-primary">Pick your own color</span>
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => updateSetting('primaryColor', e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span className="text-color-default text-xs group-hover:text-color-primary">⌄</span>
              </div>

              <div className="flex items-center justify-center py-2">
                <div className="flex-1 h-px bg-color-default"></div>
                <span className="px-2 text-color-caption text-sm">Or</span>
                <div className="flex-1 h-px bg-color-default"></div>
              </div>

              <div className="flex gap-1.5 flex-wrap">
                {predefinedColors.primary.slice(0, showMorePrimaryColors ? undefined : 3).map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => updateSetting('primaryColor', color.value)}
                    className={`flex flex-col items-center p-3 rounded border min-w-[85px] transition-all hover:scale-105 hover:shadow-sm ${
                      settings.primaryColor === color.value
                        ? 'border-color-primary bg-color-primary-invert-default ring-2 ring-color-primary ring-opacity-20'
                        : 'border-color-default bg-color-surface hover:border-color-primary'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-full mb-1 border border-white shadow-sm"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="text-xs text-color-caption font-medium">{color.name}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowMorePrimaryColors(!showMorePrimaryColors)}
                className="w-full text-center text-color-default text-sm py-2 flex items-center justify-center gap-1 hover:text-color-primary transition-colors"
              >
                {showMorePrimaryColors ? 'See less colors' : 'See more colors'}
                <span className={`text-xs transition-transform ${showMorePrimaryColors ? 'rotate-180' : ''}`}>⌄</span>
              </button>
              </div>
            </div>
          </div>

          {/* Default Color Section */}
          <div className="border border-color-default rounded overflow-hidden">
            <button
              onClick={() => toggleAccordion('neutralColor')}
              className="w-full bg-color-surface border-b border-color-default px-4 py-2 flex items-center gap-3 hover:bg-color-default-hovered transition-colors"
            >
              <div className="w-7 h-7 flex items-center justify-center text-color-caption">
                <span className="text-lg">💧</span>
              </div>
              <span className="text-color-default font-medium flex-1 text-left">Default color</span>
              <span className={`text-color-default text-sm transition-transform duration-200 ${
                accordionStates.neutralColor ? 'rotate-180' : ''
              }`}>⌄</span>
            </button>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              accordionStates.neutralColor ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-4 space-y-2">
                <div className="relative bg-color-surface border border-color-default rounded px-3 py-2.5 flex items-center gap-2 cursor-pointer hover:border-color-primary group">
                  <div
                    className="w-5 h-5 rounded-full border border-color-default"
                    style={{ backgroundColor: settings.neutralColor }}
                  />
                <span className="text-color-caption text-sm flex-1 group-hover:text-color-primary">Pick your own color</span>
                <input
                  type="color"
                  value={settings.neutralColor}
                  onChange={(e) => updateSetting('neutralColor', e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span className="text-color-default text-xs group-hover:text-color-primary">⌄</span>
              </div>

              <div className="flex items-center justify-center py-2">
                <div className="flex-1 h-px bg-color-default"></div>
                <span className="px-2 text-color-caption text-sm">Or</span>
                <div className="flex-1 h-px bg-color-default"></div>
              </div>

              <div className="flex gap-1.5 flex-wrap">
                {predefinedColors.neutral.slice(0, showMoreNeutralColors ? undefined : 3).map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => updateSetting('neutralColor', color.value)}
                    className={`flex flex-col items-center p-3 rounded border min-w-[85px] transition-all hover:scale-105 hover:shadow-sm ${
                      settings.neutralColor === color.value
                        ? 'border-color-primary bg-color-primary-invert-default ring-2 ring-color-primary ring-opacity-20'
                        : 'border-color-default bg-color-surface hover:border-color-primary'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-full mb-1 border border-white shadow-sm"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="text-xs text-color-caption font-medium">{color.name}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowMoreNeutralColors(!showMoreNeutralColors)}
                className="w-full text-center text-color-default text-sm py-2 flex items-center justify-center gap-1 hover:text-color-primary transition-colors"
              >
                {showMoreNeutralColors ? 'See less colors' : 'See more colors'}
                <span className={`text-xs transition-transform ${showMoreNeutralColors ? 'rotate-180' : ''}`}>⌄</span>
              </button>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="border border-color-default rounded overflow-hidden">
            <button
              onClick={() => toggleAccordion('appearance')}
              className="w-full bg-color-surface border-b border-color-default px-4 py-2 flex items-center gap-3 hover:bg-color-default-hovered transition-colors"
            >
              <div className="w-7 h-7 flex items-center justify-center text-color-caption">
                <span className="text-lg">☀️</span>
              </div>
              <span className="text-color-default font-medium flex-1 text-left">Appearance</span>
              <span className={`text-color-default text-sm transition-transform duration-200 ${
                accordionStates.appearance ? 'rotate-180' : ''
              }`}>⌄</span>
            </button>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              accordionStates.appearance ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-4">
                <div className="flex gap-1.5">
                <button
                  onClick={() => updateSetting('appearance', 'light')}
                  className={`flex-1 flex flex-col items-center p-3 rounded border ${
                    settings.appearance === 'light'
                      ? 'border-color-primary bg-color-primary-invert-default'
                      : 'border-color-default bg-color-surface'
                  }`}
                >
                  <div className="w-8 h-7 flex items-center justify-center mb-1">
                    <span className="text-xl">☀️</span>
                  </div>
                  <span className="text-xs font-medium text-color-default">Light Mode</span>
                </button>

                <button
                  onClick={() => updateSetting('appearance', 'dark')}
                  className={`flex-1 flex flex-col items-center p-3 rounded border ${
                    settings.appearance === 'dark'
                      ? 'border-color-primary bg-color-primary-invert-default'
                      : 'border-color-default bg-color-surface'
                  }`}
                >
                  <div className="w-8 h-7 flex items-center justify-center mb-1">
                    <span className="text-xl">🌙</span>
                  </div>
                  <span className="text-xs text-color-caption">Dark Mode</span>
                </button>
                </div>
              </div>
            </div>
          </div>

          {/* Font Family Section */}
          <div className="border border-color-default rounded overflow-hidden">
            <button
              onClick={() => toggleAccordion('fontFamily')}
              className="w-full bg-color-surface border-b border-color-default px-4 py-2 flex items-center gap-3 hover:bg-color-default-hovered transition-colors"
            >
              <div className="w-7 h-7 flex items-center justify-center text-color-caption">
                <span className="text-lg">🔤</span>
              </div>
              <span className="text-color-default font-medium flex-1 text-left">Font family</span>
              <span className={`text-color-default text-sm transition-transform duration-200 ${
                accordionStates.fontFamily ? 'rotate-180' : ''
              }`}>⌄</span>
            </button>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              accordionStates.fontFamily ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-4 space-y-1.5">
                <span className="text-color-caption text-sm">Choose a font type</span>
                <div className="relative">
                <select
                  value={settings.fontFamily}
                  onChange={(e) => updateSetting('fontFamily', e.target.value)}
                  className="w-full bg-color-surface border border-color-default rounded px-3 py-2.5 text-color-default appearance-none pr-8"
                >
                  {fontFamilies.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-color-default text-xs pointer-events-none">⌄</span>
                </div>
              </div>
            </div>
          </div>

          {/* Border Radius Section */}
          <div className="border border-color-default rounded overflow-hidden">
            <button
              onClick={() => toggleAccordion('radius')}
              className="w-full bg-color-surface border-b border-color-default px-4 py-2 flex items-center gap-3 hover:bg-color-default-hovered transition-colors"
            >
              <div className="w-7 h-7 flex items-center justify-center text-color-caption">
                <span className="text-lg">⬜</span>
              </div>
              <span className="text-color-default font-medium flex-1 text-left">Radius</span>
              <span className={`text-color-default text-sm transition-transform duration-200 ${
                accordionStates.radius ? 'rotate-180' : ''
              }`}>⌄</span>
            </button>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              accordionStates.radius ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-4 space-y-3">
                <div className="space-y-1.5">
                <span className="text-color-caption text-sm">Choose size manually</span>
                <div className="relative">
                  <input
                    type="number"
                    value={settings.borderRadius}
                    onChange={(e) => updateSetting('borderRadius', parseInt(e.target.value) || 0)}
                    className="w-full bg-color-surface border border-color-default rounded px-3 py-2.5 text-color-default pl-12"
                    min="0"
                    max="50"
                  />
                  <div className="absolute left-1.5 top-1.5 bg-color-default-default border border-color-default rounded w-7 h-7 flex items-center justify-center text-sm text-color-caption">
                    {settings.borderRadius}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center py-2">
                <div className="flex-1 h-px bg-color-default"></div>
                <span className="px-2 text-color-caption text-sm">Or</span>
                <div className="flex-1 h-px bg-color-default"></div>
              </div>

              <div className="flex gap-1.5 flex-wrap">
                {borderRadiusOptions.slice(0, showMoreRadius ? undefined : 3).map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => updateSetting('borderRadius', option.value)}
                    className={`flex flex-col items-center p-3 border min-w-[85px] ${
                      settings.borderRadius === option.value
                        ? 'border-color-primary bg-color-primary-invert-default'
                        : 'border-color-default bg-color-surface'
                    }`}
                    style={{ borderRadius: option.value }}
                  >
                    <div
                      className="w-7 h-7 bg-color-default-default border-l-2 border-t-2 border-color-primary mb-1"
                      style={{ borderRadius: `${option.value}px 0 0 0` }}
                    />
                    <span className="text-xs text-color-caption">{option.name}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowMoreRadius(!showMoreRadius)}
                className="w-full text-center text-color-default text-sm py-2 flex items-center justify-center gap-1 hover:text-color-primary transition-colors"
              >
                {showMoreRadius ? 'See less sizes' : 'See more sizes'}
                <span className={`text-xs transition-transform ${showMoreRadius ? 'rotate-180' : ''}`}>⌄</span>
              </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-color-default-pressed min-h-[600px]" />

        {/* Right Panel - Preview */}
        <div className="flex-1 space-y-6">
          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-50">
              <span>♡</span>
              Add Favorite
            </button>
            <button
              onClick={openCopyModal}
              className="bg-white border-2 border-dashed border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50"
            >
              Copy Code
            </button>
          </div>

          {/* Color Palette Preview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-gray-900 font-medium mb-4">Primary Color Palette</h3>
            <div className="flex justify-between items-start gap-2">
              {Object.entries(primaryPalette).map(([shade, color]) => (
                <div key={shade} className="flex flex-col items-center min-w-[74px]">
                  <div
                    className="w-full h-16 rounded mb-2 relative overflow-hidden flex items-end justify-center p-2"
                    style={{ backgroundColor: color }}
                  >
                    <div className="text-center">
                      <div className={`text-sm font-medium ${parseInt(shade) >= 500 ? 'text-white' : 'text-gray-900'}`}>
                        {shade}
                      </div>
                      <div className={`text-xs ${parseInt(shade) >= 500 ? 'text-white' : 'text-gray-900'}`}>
                        {color.toUpperCase().slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Theme Preview Grid */}
          <div
            className="rounded-lg p-6 bg-color-surface"
            data-theme={settings.appearance}
            style={{
              ...previewStyles
            }}
          >
            <h3 className="font-medium mb-6 text-color-default">Theme Preview</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Card 1: Music Player */}
              <div className="overflow-hidden" style={{ backgroundColor: 'var(--preview-color-neutral-50)', borderColor: 'var(--preview-color-neutral-300)', border: '1px solid', borderRadius: `${settings.borderRadius * 2}px` }}>
                <div className="px-7 py-4 space-y-4">
                  {/* Album Cover */}
                  <div
                    className="w-full h-36 bg-gradient-to-br from-green-400 to-blue-500 shadow-lg relative overflow-hidden"
                    style={{ borderRadius: `${settings.borderRadius * 2}px` }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  </div>

                  {/* Song Info */}
                  <div className="text-center">
                    <h4 className="font-bold text-xl mb-1" style={{ color: 'var(--preview-color-neutral-900)' }}>Calm Down</h4>
                    <p className="text-sm" style={{ color: 'var(--preview-color-neutral-600)' }}>Song by Rema</p>
                  </div>

                  {/* Play Button */}
                  <div className="flex justify-center">
                    <button
                      className="w-16 h-16 transition-colors rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        backgroundColor: 'var(--preview-color-primary-700)',
                        color: 'var(--preview-color-primary-100)'
                      }}
                    >
                      <div className="w-0 h-0 border-l-[8px] border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"
                        style={{ borderLeftColor: 'var(--preview-color-primary-100)' }}></div>
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span style={{ color: 'var(--preview-color-primary-700)' }}>01:26</span>
                      <span style={{ color: 'var(--preview-color-neutral-600)' }}>03:26</span>
                    </div>
                    <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--preview-color-neutral-200)' }}>
                      <div className="w-1/3 h-full rounded-full relative" style={{ backgroundColor: 'var(--preview-color-primary-700)' }}>
                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: 'var(--preview-color-primary-700)' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Product Card */}
              <div className="overflow-hidden" style={{ backgroundColor: 'var(--preview-color-neutral-100)', borderColor: 'var(--preview-color-neutral-300)', border: '1px solid', borderRadius: `${settings.borderRadius * 2}px` }}>
                <div className="p-6 space-y-4">
                  {/* Product Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg" style={{ color: 'var(--preview-color-neutral-900)' }}>Nike ZOOM Vaporfly</h4>
                      <p className="text-sm" style={{ color: 'var(--preview-color-neutral-600)' }}>NEXT Premium</p>
                    </div>
                    <button className="transition-colors" style={{ color: 'var(--preview-color-neutral-600)' }}>
                      <span className="text-xl">♡</span>
                    </button>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(star => (
                      <span key={star} className="text-sm" style={{ color: 'var(--preview-color-primary-700)' }}>★</span>
                    ))}
                  </div>

                  {/* Product Image */}
                  <div
                    className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg relative overflow-hidden"
                    style={{ borderRadius: `${settings.borderRadius * 2}px` }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-1 rounded opacity-50" style={{ backgroundColor: 'var(--preview-color-neutral-200)' }}>
                        <span className="font-semibold" style={{ color: 'var(--preview-color-neutral-600)' }}>$</span>
                      </div>
                      <span className="font-bold text-lg" style={{ color: 'var(--preview-color-neutral-900)' }}>254.99</span>
                    </div>
                    <button
                      className="px-4 py-2 transition-colors"
                      style={{
                        backgroundColor: 'var(--preview-color-primary-700)',
                        color: 'var(--preview-color-primary-100)',
                        borderRadius: `${settings.borderRadius}px`
                      }}
                    >
                      Add to Card
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3: Analytics Widget */}
              <div className="overflow-hidden" style={{ backgroundColor: 'var(--preview-color-neutral-50)', borderColor: 'var(--preview-color-neutral-300)', border: '1px solid', borderRadius: `${settings.borderRadius * 2}px` }}>
                <div className="p-5 space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium" style={{ color: 'var(--preview-color-neutral-900)' }}>Visiting summary</h4>
                    <button className="transition-colors" style={{ color: 'var(--preview-color-neutral-600)' }}>
                      <span className="text-lg">⋮</span>
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: 'var(--preview-color-neutral-600)' }}>Decrease</span>
                      <span className="text-sm" style={{ color: 'var(--preview-color-red-700)' }}>↓</span>
                      <span className="font-bold" style={{ color: 'var(--preview-color-neutral-900)' }}>0%</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-2xl" style={{ color: 'var(--preview-color-neutral-900)' }}>4.4$</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full" style={{ backgroundColor: 'var(--preview-color-neutral-300)' }}></div>

                  {/* Browser Stats */}
                  <div className="space-y-3">
                    {[
                      { name: 'Chrome', progress: 100 },
                      { name: 'Safari', progress: 80 },
                      { name: 'Firefox', progress: 60 },
                      { name: 'Edge', progress: 40 }
                    ].map((browser, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-color-default-default rounded-full"></div>
                          <span className="text-sm" style={{ color: 'var(--preview-color-neutral-900)' }}>{browser.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-2 bg-color-default-default rounded-full overflow-hidden">
                            <div
                              className="h-full bg-color-primary-default rounded-full"
                              style={{ width: `${browser.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium" style={{ color: 'var(--preview-color-primary-700)' }}>100%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full" style={{ backgroundColor: 'var(--preview-color-neutral-300)' }}></div>

                  {/* Income Widget */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative">
                      <div className="w-full h-full border-4 border-color-default-default rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-color-primary-default border-t-transparent border-l-transparent rounded-full rotate-45"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium" style={{ color: 'var(--preview-color-neutral-900)' }}>30%</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{ color: 'var(--preview-color-neutral-900)' }}>Income this week</p>
                      <p className="text-xs" style={{ color: 'var(--preview-color-neutral-600)' }}>$39k less than last week</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Button Examples */}
              <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: 'var(--preview-color-neutral-50)', borderColor: 'var(--preview-color-neutral-300)', border: '1px solid' }}>
                <h4 className="font-medium mb-3" style={{ color: 'var(--preview-color-neutral-900)' }}>Buttons</h4>
                <button
                  className="w-full px-4 py-2 transition-colors"
                  style={{
                    backgroundColor: 'var(--preview-color-primary-700)',
                    color: 'var(--preview-color-primary-100)',
                    borderRadius: `${settings.borderRadius}px`
                  }}
                >
                  Primary Button
                </button>
                <button
                  className="w-full px-4 py-2 transition-colors"
                  style={{
                    backgroundColor: 'var(--preview-color-neutral-200)',
                    color: 'var(--preview-color-neutral-900)',
                    borderColor: 'var(--preview-color-neutral-300)',
                    border: '1px solid',
                    borderRadius: `${settings.borderRadius}px`
                  }}
                >
                  Secondary Button
                </button>
                <button
                  className="w-full bg-transparent px-4 py-2 transition-colors"
                  style={{
                    color: 'var(--preview-color-primary-700)',
                    borderColor: 'var(--preview-color-primary-700)',
                    border: '1px solid',
                    borderRadius: `${settings.borderRadius}px`
                  }}
                >
                  Outline Button
                </button>
              </div>

              {/* Card 5: Form Elements */}
              <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: 'var(--preview-color-neutral-50)', borderColor: 'var(--preview-color-neutral-300)', border: '1px solid' }}>
                <h4 className="font-medium mb-3" style={{ color: 'var(--preview-color-neutral-900)' }}>Form Elements</h4>
                <div>
                  <label className="block text-sm mb-1" style={{ color: 'var(--preview-color-neutral-600)' }}>Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 focus:outline-none transition-colors"
                    style={{
                      backgroundColor: 'var(--preview-color-neutral-50)',
                      borderColor: 'var(--preview-color-neutral-300)',
                      border: '1px solid',
                      color: 'var(--preview-color-neutral-900)',
                      borderRadius: `${settings.borderRadius}px`
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: 'var(--preview-color-neutral-600)' }}>Message</label>
                  <textarea
                    placeholder="Your message here..."
                    className="w-full px-3 py-2 focus:outline-none transition-colors resize-none h-20"
                    style={{
                      backgroundColor: 'var(--preview-color-neutral-50)',
                      borderColor: 'var(--preview-color-neutral-300)',
                      border: '1px solid',
                      color: 'var(--preview-color-neutral-900)',
                      borderRadius: `${settings.borderRadius}px`
                    }}
                  />
                </div>
              </div>

              {/* Card 6: Navigation */}
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--preview-color-neutral-50)', borderColor: 'var(--preview-color-neutral-300)', border: '1px solid' }}>
                <h4 className="font-medium mb-3" style={{ color: 'var(--preview-color-neutral-900)' }}>Navigation</h4>
                <nav className="space-y-1">
                  <a href="#" className="block px-3 py-2 transition-colors" style={{
                    color: 'var(--preview-color-primary-700)',
                    backgroundColor: 'var(--preview-color-primary-100)',
                    borderRadius: `${settings.borderRadius}px`
                  }}>
                    Dashboard
                  </a>
                  <a href="#" className="block px-3 py-2 transition-colors" style={{
                    color: 'var(--preview-color-neutral-900)',
                    borderRadius: `${settings.borderRadius}px`
                  }}>
                    Projects
                  </a>
                  <a href="#" className="block px-3 py-2 transition-colors" style={{
                    color: 'var(--preview-color-neutral-900)',
                    borderRadius: `${settings.borderRadius}px`
                  }}>
                    Team
                  </a>
                  <a href="#" className="block px-3 py-2 transition-colors" style={{
                    color: 'var(--preview-color-neutral-600)',
                    borderRadius: `${settings.borderRadius}px`
                  }}>
                    Settings
                  </a>
                </nav>
              </div>

            </div>
          </div>
        </div>

        {/* Copy Modal */}
        {showCopyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Generated CSS Variables</h3>
                <button
                  onClick={() => setShowCopyModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                <pre className="bg-gray-100 p-4 rounded text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap">
                  {generateCSSVariables()}
                </pre>
              </div>
              <div className="border-t border-gray-200 p-4 flex justify-end gap-2">
                <button
                  onClick={() => setShowCopyModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={copyToClipboard}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}