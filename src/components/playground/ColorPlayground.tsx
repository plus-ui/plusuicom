'use client';

import { useState, useEffect } from 'react';

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
    { name: 'Indigo', value: '#4338ca', active: true },
    { name: 'Green', value: '#15803d', active: false },
    { name: 'Amber', value: '#d97706', active: false },
  ],
  neutral: [
    { name: 'Stone', value: '#6b7280', active: false },
    { name: 'Pure Black', value: '#000000', active: true },
    { name: 'Gray', value: '#9ca3af', active: false },
  ]
};

const fontFamilies = [
  'Inter Family',
  'System UI',
  'Roboto',
  'Open Sans',
  'Poppins'
];

const borderRadiusOptions = [
  { name: 'None', value: 0 },
  { name: '4px', value: 4 },
  { name: '8px', value: 8 },
  { name: '12px', value: 12 },
  { name: '16px', value: 16 },
];

function generateColorPalette(baseColor: string): ColorPalette {
  // Simple color palette generation - in a real implementation you'd use a proper color library
  const hex = baseColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const generateShade = (factor: number) => {
    const nr = Math.round(r + (255 - r) * factor);
    const ng = Math.round(g + (255 - g) * factor);
    const nb = Math.round(b + (255 - b) * factor);
    return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
  };

  const generateTint = (factor: number) => {
    const nr = Math.round(r * factor);
    const ng = Math.round(g * factor);
    const nb = Math.round(b * factor);
    return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
  };

  return {
    50: generateShade(0.95),
    100: generateShade(0.85),
    200: generateShade(0.7),
    300: generateShade(0.5),
    400: generateShade(0.3),
    500: baseColor,
    600: generateTint(0.9),
    700: generateTint(0.8),
    800: generateTint(0.7),
    900: generateTint(0.6),
    950: generateTint(0.4),
  };
}

export default function ColorPlayground() {
  const [settings, setSettings] = useState<ThemeSettings>({
    primaryColor: '#4338ca',
    neutralColor: '#000000',
    appearance: 'light',
    fontFamily: 'Inter Family',
    borderRadius: 4,
  });

  const [primaryPalette, setPrimaryPalette] = useState<ColorPalette>(generateColorPalette('#4338ca'));
  const [customPrimaryColor, setCustomPrimaryColor] = useState('#4338ca');
  const [customNeutralColor, setCustomNeutralColor] = useState('#000000');
  const [showMorePrimaryColors, setShowMorePrimaryColors] = useState(false);
  const [showMoreNeutralColors, setShowMoreNeutralColors] = useState(false);

  useEffect(() => {
    setPrimaryPalette(generateColorPalette(settings.primaryColor));
  }, [settings.primaryColor]);

  const updateSetting = (key: keyof ThemeSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const generateCSSVariables = () => {
    const primaryPalette = generateColorPalette(settings.primaryColor);
    const neutralPalette = generateColorPalette(settings.neutralColor);

    return `
/* Generated Theme Variables */
:root {
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
}
`.trim();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSSVariables());
  };

  return (
    <div
      className={`min-h-screen flex gap-12 items-start justify-center py-6 px-32 ${
        settings.appearance === 'dark' ? '[data-theme="dark"]' : '[data-theme="light"]'
      }`}
      style={{
        fontFamily: settings.fontFamily,
      }}
      data-theme={settings.appearance}
    >
      {/* Left Panel - Controls */}
      <div className="bg-color-surface flex flex-col w-[300px] gap-3.5">
        {/* Primary Color Section */}
        <div className="bg-color-surface border border-color-default rounded overflow-hidden">
          <div className="bg-color-surface border-b border-color-default px-4 py-2 flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center text-color-caption">
              <span>🎨</span>
            </div>
            <span className="text-color-default font-medium">Primary color</span>
          </div>

          <div className="p-4 space-y-2">
            <div className="bg-color-surface border border-color-default rounded px-3 py-2 flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: customPrimaryColor }}
              />
              <input
                type="color"
                value={customPrimaryColor}
                onChange={(e) => {
                  setCustomPrimaryColor(e.target.value);
                  updateSetting('primaryColor', e.target.value);
                }}
                className="opacity-0 absolute"
              />
              <span className="text-color-caption text-sm">Pick your own color</span>
              <span className="ml-auto text-color-default">⌄</span>
            </div>

            <div className="text-center text-color-caption text-sm py-2">Or</div>

            <div className="flex gap-1.5">
              {predefinedColors.primary.slice(0, showMorePrimaryColors ? undefined : 3).map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => updateSetting('primaryColor', color.value)}
                  className={`flex flex-col items-center p-3 rounded border ${
                    settings.primaryColor === color.value ? 'border-color-primary bg-color-primary-invert-default' : 'border-color-default bg-color-surface'
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-full mb-1"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-xs text-color-caption">{color.name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowMorePrimaryColors(!showMorePrimaryColors)}
              className="w-full text-center text-color-default text-sm py-2"
            >
              See more color ⌄
            </button>
          </div>
        </div>

        {/* Default Color Section */}
        <div className="bg-color-surface border border-color-default rounded overflow-hidden">
          <div className="bg-color-surface border-b border-color-default px-4 py-2 flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center text-color-caption">
              <span>💧</span>
            </div>
            <span className="text-color-default font-medium">Default color</span>
          </div>

          <div className="p-4 space-y-2">
            <div className="bg-color-surface border border-color-default rounded px-3 py-2 flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: customNeutralColor }}
              />
              <input
                type="color"
                value={customNeutralColor}
                onChange={(e) => {
                  setCustomNeutralColor(e.target.value);
                  updateSetting('neutralColor', e.target.value);
                }}
                className="opacity-0 absolute"
              />
              <span className="text-color-caption text-sm">Pick your own color</span>
              <span className="ml-auto text-color-default">⌄</span>
            </div>

            <div className="text-center text-color-caption text-sm py-2">Or</div>

            <div className="flex gap-1.5">
              {predefinedColors.neutral.slice(0, showMoreNeutralColors ? undefined : 3).map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => updateSetting('neutralColor', color.value)}
                  className={`flex flex-col items-center p-3 rounded border ${
                    settings.neutralColor === color.value ? 'border-color-primary bg-color-primary-invert-default' : 'border-color-default bg-color-surface'
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-full mb-1"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-xs text-color-caption">{color.name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowMoreNeutralColors(!showMoreNeutralColors)}
              className="w-full text-center text-color-default text-sm py-2"
            >
              See more color ⌄
            </button>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-color-surface border border-color-default rounded overflow-hidden">
          <div className="bg-color-surface border-b border-color-default px-4 py-2 flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center text-color-caption">
              <span>☀️</span>
            </div>
            <span className="text-color-default font-medium">Appearance</span>
          </div>

          <div className="p-4">
            <div className="flex gap-1.5">
              <button
                onClick={() => updateSetting('appearance', 'light')}
                className={`flex-1 flex flex-col items-center p-3 rounded border ${
                  settings.appearance === 'light' ? 'border-color-primary bg-color-primary-invert-default' : 'border-color-default bg-color-surface'
                }`}
              >
                <div className="w-8 h-7 flex items-center justify-center mb-1">
                  <span className="text-xl">☀️</span>
                </div>
                <span className="text-xs font-medium">Light Mode</span>
              </button>

              <button
                onClick={() => updateSetting('appearance', 'dark')}
                className={`flex-1 flex flex-col items-center p-3 rounded border ${
                  settings.appearance === 'dark' ? 'border-color-primary bg-color-primary-invert-default' : 'border-color-default bg-color-surface'
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

        {/* Font Family Section */}
        <div className="bg-color-surface border border-color-default rounded overflow-hidden">
          <div className="bg-color-surface border-b border-color-default px-4 py-2 flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center text-color-caption">
              <span>🔤</span>
            </div>
            <span className="text-color-default font-medium">Font family</span>
          </div>

          <div className="p-4 space-y-1.5">
            <span className="text-color-caption text-sm">Choose a font type</span>
            <select
              value={settings.fontFamily}
              onChange={(e) => updateSetting('fontFamily', e.target.value)}
              className="w-full bg-color-surface border border-color-default rounded px-3 py-2 text-color-default"
            >
              {fontFamilies.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Border Radius Section */}
        <div className="bg-color-surface border border-color-default rounded overflow-hidden">
          <div className="bg-color-surface border-b border-color-default px-4 py-2 flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center text-color-caption">
              <span>⬜</span>
            </div>
            <span className="text-color-default font-medium">Radius</span>
          </div>

          <div className="p-4 space-y-3">
            <div className="space-y-1.5">
              <span className="text-color-caption text-sm">Choose size manually</span>
              <div className="relative">
                <input
                  type="number"
                  value={settings.borderRadius}
                  onChange={(e) => updateSetting('borderRadius', parseInt(e.target.value) || 0)}
                  className="w-full bg-color-surface border border-color-default rounded px-3 py-2 text-color-default"
                  min="0"
                  max="50"
                />
                <div className="absolute left-1.5 top-1.5 bg-color-default-default border border-color-default rounded w-7 h-7 flex items-center justify-center text-sm text-color-caption">
                  {settings.borderRadius}
                </div>
              </div>
            </div>

            <div className="text-center text-color-caption text-sm py-2">Or</div>

            <div className="flex gap-1.5">
              {borderRadiusOptions.slice(0, 3).map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => updateSetting('borderRadius', option.value)}
                  className={`flex flex-col items-center p-3 border ${
                    settings.borderRadius === option.value ? 'border-color-primary bg-color-primary-invert-default' : 'border-color-default bg-color-surface'
                  }`}
                  style={{ borderRadius: option.value }}
                >
                  <div
                    className="w-7 h-7 bg-color-default-default border-l-2 border-t-2 border-color-default mb-1"
                    style={{ borderRadius: `${option.value}px 0 0 0` }}
                  />
                  <span className="text-xs text-color-caption">{option.name}</span>
                </button>
              ))}
            </div>

            <button className="w-full text-center text-color-default text-sm py-2">
              See more size ⌄
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-color-default h-full min-h-[500px]" />

      {/* Right Panel - Preview */}
      <div className="flex-1 space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button className="bg-color-surface border border-color-default text-color-default px-4 py-2 rounded flex items-center gap-2">
            <span>♡</span>
            Add Favorite
          </button>
          <button
            onClick={copyToClipboard}
            className="bg-color-surface border-2 border-dashed border-color-default text-color-default px-4 py-2 rounded"
          >
            Copy Code
          </button>
        </div>

        {/* Color Palette Preview */}
        <div className="bg-color-surface border border-color-default rounded-lg p-6">
          <div className="flex justify-between items-center">
            {Object.entries(primaryPalette).map(([shade, color]) => (
              <div key={shade} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded mb-2 relative overflow-hidden"
                  style={{ backgroundColor: color }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                    <div className={`text-sm font-medium ${shade >= '500' ? 'text-white' : 'text-gray-900'}`}>
                      {shade}
                    </div>
                    <div className={`text-xs ${shade >= '500' ? 'text-white' : 'text-gray-900'}`}>
                      {color.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generated CSS */}
        <div className="bg-color-surface border border-color-default rounded-lg p-6">
          <h3 className="text-color-default font-medium mb-4">Generated CSS Variables</h3>
          <pre className="bg-color-default-default p-4 rounded text-sm text-color-default overflow-x-auto">
            {generateCSSVariables()}
          </pre>
        </div>
      </div>
    </div>
  );
}