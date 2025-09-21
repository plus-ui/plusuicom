"use client";

import { useState, useEffect } from "react";
import { colors, type ColorName } from "@/constants/colors";
import { Icon } from "@iconify/react";

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
  appearance: "light" | "dark";
  fontFamily: string;
  borderRadius: number;
}

const predefinedColors = {
  primary: [
    {
      name: "Indigo",
      value: colors.indigo[500],
      colorName: "indigo" as ColorName,
    },
    { name: "Blue", value: colors.blue[500], colorName: "blue" as ColorName },
    {
      name: "Purple",
      value: colors.purple[500],
      colorName: "purple" as ColorName,
    },
    { name: "Pink", value: colors.pink[500], colorName: "pink" as ColorName },
    { name: "Red", value: colors.red[500], colorName: "red" as ColorName },
    {
      name: "Orange",
      value: colors.orange[500],
      colorName: "orange" as ColorName,
    },
    {
      name: "Amber",
      value: colors.amber[500],
      colorName: "amber" as ColorName,
    },
    {
      name: "Yellow",
      value: colors.yellow[500],
      colorName: "yellow" as ColorName,
    },
    { name: "Lime", value: colors.lime[500], colorName: "lime" as ColorName },
    {
      name: "Green",
      value: colors.green[500],
      colorName: "green" as ColorName,
    },
    {
      name: "Emerald",
      value: colors.emerald[500],
      colorName: "emerald" as ColorName,
    },
    { name: "Teal", value: colors.teal[500], colorName: "teal" as ColorName },
    { name: "Cyan", value: colors.cyan[500], colorName: "cyan" as ColorName },
    { name: "Sky", value: colors.sky[500], colorName: "sky" as ColorName },
    {
      name: "Violet",
      value: colors.violet[500],
      colorName: "violet" as ColorName,
    },
    {
      name: "Fuchsia",
      value: colors.fuchsia[500],
      colorName: "fuchsia" as ColorName,
    },
    { name: "Rose", value: colors.rose[500], colorName: "rose" as ColorName },
  ],
  neutral: [
    {
      name: "Slate",
      value: colors.slate[500],
      colorName: "slate" as ColorName,
    },
    { name: "Gray", value: colors.gray[500], colorName: "gray" as ColorName },
    { name: "Zinc", value: colors.zinc[500], colorName: "zinc" as ColorName },
    {
      name: "Neutral",
      value: colors.neutral[500],
      colorName: "neutral" as ColorName,
    },
    {
      name: "Stone",
      value: colors.stone[500],
      colorName: "stone" as ColorName,
    },
  ],
};

const fontFamilies = [
  "Inter Variable, Inter",
  "System UI",
  "Roboto",
  "Open Sans",
  "Poppins",
  "Montserrat",
];

const borderRadiusOptions = [
  { name: "None", value: 0 },
  { name: "4px", value: 4 },
  { name: "6px", value: 6 },
  { name: "8px", value: 8 },
  { name: "12px", value: 12 },
  { name: "16px", value: 16 },
];

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
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
    primaryColor: "#6366f1", // Tailwind Indigo-500
    neutralColor: "#6b7280", // Tailwind Gray-500
    appearance: "light",
    fontFamily: "Inter Variable, Inter",
    borderRadius: 4,
  });

  const [primaryPalette, setPrimaryPalette] = useState<ColorPalette>(
    generateColorPalette("#6366f1"),
  );
  const [neutralPalette, setNeutralPalette] = useState<ColorPalette>(
    generateColorPalette("#6b7280"),
  );
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
    setAccordionStates((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    setPrimaryPalette(generateColorPalette(settings.primaryColor));
  }, [settings.primaryColor]);

  useEffect(() => {
    setNeutralPalette(generateColorPalette(settings.neutralColor));
  }, [settings.neutralColor]);

  const updateSetting = (key: keyof ThemeSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
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
      const notification = document.createElement("div");
      notification.textContent = "CSS variables copied to clipboard!";
      notification.className =
        "fixed top-4 right-4 bg-color-success-default text-color-base px-4 py-2 rounded shadow-lg z-50";
      document.body.appendChild(notification);
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const openCopyModal = () => {
    setShowCopyModal(true);
  };

  // Create custom CSS properties for the preview area only
  const previewStyles = {
    "--color-primary-50": primaryPalette[50],
    "--color-primary-100": primaryPalette[100],
    "--color-primary-200": primaryPalette[200],
    "--color-primary-300": primaryPalette[300],
    "--color-primary-400": primaryPalette[400],
    "--color-primary-500": primaryPalette[500],
    "--color-primary-600": primaryPalette[600],
    "--color-primary-700": primaryPalette[700],
    "--color-primary-800": primaryPalette[800],
    "--color-primary-900": primaryPalette[900],
    "--color-primary-950": primaryPalette[950],

    "--color-neutral-50": neutralPalette[50],
    "--color-neutral-100": neutralPalette[100],
    "--color-neutral-200": neutralPalette[200],
    "--color-neutral-300": neutralPalette[300],
    "--color-neutral-400": neutralPalette[400],
    "--color-neutral-500": neutralPalette[500],
    "--color-neutral-600": neutralPalette[600],
    "--color-neutral-700": neutralPalette[700],
    "--color-neutral-800": neutralPalette[800],
    "--color-neutral-900": neutralPalette[900],
    "--color-neutral-950": neutralPalette[950],

    // Add fixed colors for semantic states
    "--color-red-700": colors.red[700],

    "--font-sans": `'${settings.fontFamily}', ui-sans-serif, system-ui, sans-serif`,
    "--rounded": `${settings.borderRadius}px`,
  } as React.CSSProperties;

  return (
    <div className="flex min-h-screen items-stretch justify-center lg:gap-9 gap-2">
      {/* Left Panel - Controls */}
      <div className="flex lg:w-64 w-56 flex-col gap-4 pt-24 pb-24">
        {/* Primary Color Section */}
        <div className="border-color-disabled bg-color-surface overflow-hidden rounded border">
          <button
            onClick={() => toggleAccordion("primaryColor")}
            className="hover:bg-color-default-hovered flex w-full cursor-pointer items-center gap-1 px-4 py-2 transition-colors"
          >
            <div className="text-color-placeholder flex h-7 w-7 items-center justify-center">
              <i className="fa-solid fa-palette"></i>
            </div>
            <span className="text-color-default flex-1 text-left font-medium">
              Primary color
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              accordionStates.primaryColor
                ? "max-h-fit opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-color-disabled space-y-2 border-t p-4">
              <div className="bg-color-surface border-color-default hover:border-color-primary group relative flex cursor-pointer items-center gap-2 rounded border px-3 py-2.5">
                <div
                  className="border-color-default h-5 w-5 rounded-full border"
                  style={{ backgroundColor: settings.primaryColor }}
                />
                <span className="text-color-caption group-hover:text-color-primary flex-1 text-sm">
                  Pick your own color
                </span>
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) =>
                    updateSetting("primaryColor", e.target.value)
                  }
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>

              <div className="flex items-center justify-center py-2">
                <div className="bg-color-default-default h-px flex-1"></div>
                <span className="text-color-caption px-2 text-sm">Or</span>
                <div className="bg-color-default-default h-px flex-1"></div>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {predefinedColors.primary
                  .slice(0, showMorePrimaryColors ? undefined : 3)
                  .map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => updateSetting("primaryColor", color.value)}
                      className={`flex cursor-pointer flex-col items-center rounded border py-3 transition-all hover:scale-105 hover:shadow-sm ${
                        settings.primaryColor === color.value
                          ? "border-color-primary bg-color-primary-invert-default"
                          : "border-color-default bg-color-surface hover:border-color-primary"
                      }`}
                    >
                      <div
                        className="mb-1 h-7 w-7 rounded-full"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-color-caption text-xs font-medium">
                        {color.name}
                      </span>
                    </button>
                  ))}
              </div>

              <button
                onClick={() => setShowMorePrimaryColors(!showMorePrimaryColors)}
                className="text-color-default hover:text-color-primary flex w-full cursor-pointer items-center justify-center gap-1 py-2 text-center text-sm transition-colors"
              >
                {showMorePrimaryColors ? "See less colors" : "See more colors"}
                <span
                  className={`text-xs transition-transform ${showMorePrimaryColors ? "rotate-180" : ""}`}
                >
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Default Color Section */}
        <div className="border-color-disabled bg-color-surface overflow-hidden rounded border">
          <button
            onClick={() => toggleAccordion("neutralColor")}
            className="hover:bg-color-default-hovered flex w-full cursor-pointer items-center gap-1 px-4 py-2 transition-colors"
          >
            <div className="text-color-placeholder flex h-7 w-7 items-center justify-center">
              <i className="fa-solid fa-droplet"></i>
            </div>
            <span className="text-color-default flex-1 text-left font-medium">
              Default color
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              accordionStates.neutralColor
                ? "max-h-fit opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-color-disabled space-y-2 border-t p-4">
              <div className="bg-color-surface border-color-default hover:border-color-primary group relative flex cursor-pointer items-center gap-2 rounded border px-3 py-2.5">
                <div
                  className="border-color-default h-5 w-5 rounded-full border"
                  style={{ backgroundColor: settings.neutralColor }}
                />
                <span className="text-color-caption group-hover:text-color-primary flex-1 text-sm">
                  Pick your own color
                </span>
                <input
                  type="color"
                  value={settings.neutralColor}
                  onChange={(e) =>
                    updateSetting("neutralColor", e.target.value)
                  }
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>

              <div className="flex items-center justify-center py-2">
                <div className="bg-color-default-default h-px flex-1"></div>
                <span className="text-color-caption px-2 text-sm">Or</span>
                <div className="bg-color-default-default h-px flex-1"></div>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {predefinedColors.neutral
                  .slice(0, showMoreNeutralColors ? undefined : 3)
                  .map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => updateSetting("neutralColor", color.value)}
                      className={`flex cursor-pointer flex-col items-center rounded border py-3 transition-all hover:scale-105 hover:shadow-sm ${
                        settings.neutralColor === color.value
                          ? "border-color-primary bg-color-primary-invert-default"
                          : "border-color-default bg-color-surface hover:border-color-primary"
                      }`}
                    >
                      <div
                        className="mb-1 h-7 w-7 rounded-full"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-color-caption text-xs font-medium">
                        {color.name}
                      </span>
                    </button>
                  ))}
              </div>

              <button
                onClick={() => setShowMoreNeutralColors(!showMoreNeutralColors)}
                className="text-color-default hover:text-color-primary flex w-full cursor-pointer items-center justify-center gap-1 py-2 text-center text-sm transition-colors"
              >
                {showMoreNeutralColors ? "See less colors" : "See more colors"}
                <span
                  className={`text-xs transition-transform ${showMoreNeutralColors ? "rotate-180" : ""}`}
                >
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="border-color-disabled bg-color-surface overflow-hidden rounded border">
          <button
            onClick={() => toggleAccordion("appearance")}
            className="hover:bg-color-default-hovered flex w-full cursor-pointer items-center gap-1 px-4 py-2 transition-colors"
          >
            <div className="text-color-placeholder flex h-7 w-7 items-center justify-center">
              <i className="fa-solid fa-sun"></i>
            </div>
            <span className="text-color-default flex-1 text-left font-medium">
              Appearance
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              accordionStates.appearance
                ? "max-h-fit opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-color-disabled border-t p-4">
              <div className="flex gap-1.5">
                <button
                  onClick={() => updateSetting("appearance", "light")}
                  className={`flex flex-1 cursor-pointer flex-col items-center rounded border py-3 transition-all hover:scale-105 hover:shadow-sm ${
                    settings.appearance === "light"
                      ? "border-color-primary bg-color-primary-invert-default"
                      : "border-color-default bg-color-surface hover:border-color-primary"
                  }`}
                >
                  <div className="mb-1 flex h-7 w-8 items-center justify-center">
                    <i className="fa-solid fa-sun text-xl"></i>
                  </div>
                  <span className="text-color-default text-xs font-medium">
                    Light Mode
                  </span>
                </button>

                <button
                  onClick={() => updateSetting("appearance", "dark")}
                  className={`flex flex-1 cursor-pointer flex-col items-center rounded border py-3 transition-all hover:scale-105 hover:shadow-sm ${
                    settings.appearance === "dark"
                      ? "border-color-primary bg-color-primary-invert-default"
                      : "border-color-default bg-color-surface hover:border-color-primary"
                  }`}
                >
                  <div className="mb-1 flex h-7 w-8 items-center justify-center">
                    <i className="fa-solid fa-moon text-xl"></i>
                  </div>
                  <span className="text-color-caption text-xs">Dark Mode</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Font Family Section */}
        <div className="border-color-disabled bg-color-surface overflow-hidden rounded border">
          <button
            onClick={() => toggleAccordion("fontFamily")}
            className="hover:bg-color-default-hovered flex w-full cursor-pointer items-center gap-1 px-4 py-2 transition-colors"
          >
            <div className="text-color-placeholder flex h-7 w-7 items-center justify-center">
              <i className="fa-solid fa-font"></i>
            </div>
            <span className="text-color-default flex-1 text-left font-medium">
              Font family
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              accordionStates.fontFamily
                ? "max-h-fit opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-color-disabled space-y-1.5 border-t p-4">
              <span className="text-color-caption text-sm">
                Choose a font type
              </span>
              <div className="relative">
                <select
                  value={settings.fontFamily}
                  onChange={(e) => updateSetting("fontFamily", e.target.value)}
                  className="bg-color-surface border-color-default text-color-default w-full cursor-pointer appearance-none rounded border px-3 py-2.5 pr-8"
                >
                  {fontFamilies.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
                <span className="text-color-default pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform text-xs">
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Border Radius Section */}
        <div className="border-color-disabled bg-color-surface overflow-hidden rounded border">
          <button
            onClick={() => toggleAccordion("radius")}
            className="hover:bg-color-default-hovered flex w-full cursor-pointer items-center gap-1 px-4 py-2 transition-colors"
          >
            <div className="text-color-placeholder flex h-7 w-7 items-center justify-center">
              <i className="fa-solid fa-square"></i>
            </div>
            <span className="text-color-default flex-1 text-left font-medium">
              Radius
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              accordionStates.radius
                ? "max-h-fit opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-color-disabled space-y-3 border-t p-4">
              {/* <div className="space-y-1.5">
                <span className="text-color-caption text-sm">
                  Choose size manually
                </span>
                <div className="relative">
                  <input
                    type="number"
                    value={settings.borderRadius}
                    onChange={(e) =>
                      updateSetting(
                        "borderRadius",
                        parseInt(e.target.value) || 0,
                      )
                    }
                    className="bg-color-surface border-color-default text-color-default w-full cursor-pointer rounded border px-3 py-2.5"
                    min="0"
                    max="40"
                  />
                
                </div>
              </div>

              <div className="flex items-center justify-center py-2">
                <div className="bg-color-default-default h-px flex-1"></div>
                <span className="text-color-caption px-2 text-sm">Or</span>
                <div className="bg-color-default-default h-px flex-1"></div>
              </div> */}

              <div className="grid grid-cols-3 gap-1.5">
                {borderRadiusOptions
                  .slice(0, showMoreRadius ? undefined : 3)
                  .map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        updateSetting("borderRadius", option.value)
                      }
                      className={`flex cursor-pointer flex-col items-center border py-3 transition-all hover:scale-105 hover:shadow-sm ${
                        settings.borderRadius === option.value
                          ? "border-color-primary bg-color-primary-invert-default"
                          : "border-color-default bg-color-surface hover:border-color-primary"
                      }`}
                      style={{ borderRadius: option.value }}
                    >
                      <div
                        className="bg-color-default-default border-color-primary mb-1 h-7 w-7 border-t-2 border-l-2"
                        style={{ borderRadius: `${option.value}px 0 0 0` }}
                      />
                      <span className="text-color-caption text-xs">
                        {option.name}
                      </span>
                    </button>
                  ))}
              </div>

              <button
                onClick={() => setShowMoreRadius(!showMoreRadius)}
                className="text-color-default hover:text-color-primary flex w-full cursor-pointer items-center justify-center gap-1 py-2 text-center text-sm transition-colors"
              >
                {showMoreRadius ? "See less sizes" : "See more sizes"}
                <span
                  className={`text-xs transition-transform ${showMoreRadius ? "rotate-180" : ""}`}
                >
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div
        className="bg-color-surface border-color-disabled flex-1 border-l pt-10 lg:pr-5 pb-20 lg:pl-9 pr-2 pl-2"
        style={{
          ...previewStyles,
        }}
        data-theme={settings.appearance}
      >
        {/* Action Buttons */}
        <div className="mb-2.5 flex justify-end gap-2">
          <button className="bg-color-surface border-color-disabled text-color-default hover:bg-color-default-hovered flex cursor-pointer items-center gap-2 rounded border px-4 py-2">
            <i className="fa-regular fa-heart"></i>
            Add Favorite
          </button>
          <button
            onClick={openCopyModal}
            className="bg-color-surface border-color-disabled text-color-default hover:bg-color-default-hovered cursor-pointer rounded border-2 border-dashed px-4 py-2"
          >
            Copy Code
          </button>
        </div>

        {/* Color Palette Preview */}
        <div className="bg-color-surface border-color-disabled mb-5 rounded-lg border lg:p-6 p-2">
          <h3 className="text-color-default mb-4 font-medium">
            Primary Color Palette
          </h3>
          <div className="flex items-start justify-between gap-1 lg:gap-2">
            {Object.entries(primaryPalette).map(([shade, color]) => (
              <div
                key={shade}
                className="flex flex-col items-center flex-1"
              >
                <div
                  className="relative mb-2 flex h-16 w-full items-end justify-center overflow-hidden rounded md:p-2 sm:p-1 p-0.5" 
                  style={{ backgroundColor: color }}
                >
                  <div className="text-center">
                    <div
                      className={`lg:text-sm md:text-xs text-xxxs font-medium ${parseInt(shade) >= 500 ? "text-white" : "text-gray-900"}`}
                    >
                      {shade}
                    </div>
                    <div
                      className={` hidden md:block lg:text-xs text-xxxs ${parseInt(shade) >= 500 ? "text-white" : "text-gray-900"}`}
                    >
                      {color.toUpperCase().slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Theme Preview Grid */}
        <div className="">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          
            {/* Card 4: Profile Card */}
            <div
              className="bg-color-surface border-color-disabled overflow-hidden border"
              style={{ borderRadius: `${settings.borderRadius * 2}px` }}
            >
              <div className="relative">
                {/* Background Image */}
                <div
                  className="h-48 w-full bg-gradient-to-br from-green-400 to-blue-500"
                  style={{
                    borderRadius: `${settings.borderRadius}px ${settings.borderRadius}px 0 0`,
                  }}
                />

                {/* Profile Content */}
                <div className="p-6 text-center">
                  <h4 className="text-color-default mb-1 text-xl font-semibold">
                    Peter I. Morgan
                  </h4>
                  <p className="text-color-primary mb-6 text-sm">
                    @petermorgan
                  </p>

                  {/* Add Button */}
                  <button className="bg-color-primary-default text-color-primary-invert mx-auto flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-colors">
                    <i className="fa-solid fa-plus text-xl"></i>
                  </button>

                  {/* Stats */}
                  <div className="mt-6 flex justify-center gap-8">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-users text-color-disabled"></i>
                      <span className="text-color-disabled text-sm">223</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-heart text-color-disabled"></i>
                      <span className="text-color-disabled text-sm">1,254</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5: Graph Card */}
            <div
              className="bg-color-primary-default border-color-disabled flex flex-col overflow-hidden border"
              style={{ borderRadius: `${settings.borderRadius * 2}px` }}
            >
              <div className="text-color-base flex flex-1 flex-col py-6">
                <div className="mb-6 flex items-center justify-end gap-2 px-6">
                  <span className="text-xs">Weekly</span>
                  <i className="fa-solid fa-chevron-down text-xs"></i>
                </div>

                <div className="mb-2 flex flex-1 flex-col justify-center px-6 text-center">
                  <h3 className="text-3xl font-semibold">$145.32</h3>
                  <p className="text-color-base text-sm">
                    +12% compared to last week
                  </p>
                </div>

                {/* Chart Area */}
                <div className="mb-4 flex h-20 w-full items-end justify-center">
                  {/* <div
                    className="bg-color-primary-invert-default h-full w-full opacity-20"
                    style={{ borderRadius: `${settings.borderRadius}px` }}
                  ></div> */}
                  <svg
                    width="100%"
                    height="95"
                    viewBox="0 0 296 95"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M220.163 25.6598C220.474 27.1581 221.179 28.5054 222.159 29.5846C221.175 31.0012 220.272 32.7776 219.434 34.9147C216.985 41.1584 215.468 49.5734 214.01 58.2506C212.572 66.8035 211.191 75.628 208.969 82.2867C207.857 85.619 206.478 88.5947 204.645 90.7662C202.763 92.9938 200.334 94.443 197.281 94.443C191.388 94.4427 187.127 89.5101 183.851 83.5973C180.487 77.5276 177.657 69.5007 174.959 61.6871C172.227 53.7755 169.63 46.0847 166.698 40.3512C165.234 37.4883 163.752 35.2499 162.231 33.7487C160.729 32.2653 159.321 31.6256 157.932 31.6256C154.73 31.6257 152.244 33.4823 149.969 36.8668C147.666 40.2933 145.876 44.8481 143.961 49.5289C142.111 54.0519 140.112 58.7866 137.394 61.9576C136.002 63.5812 134.328 64.9125 132.271 65.567C130.186 66.2301 127.916 66.1324 125.471 65.2516C123.009 64.3647 121.305 62.6564 120.021 60.8287C118.767 59.0448 117.795 56.9603 116.941 55.2701C116.031 53.4672 115.256 52.1132 114.344 51.2428C113.556 50.4912 112.676 50.1026 111.29 50.2955C110.186 50.4493 109.463 50.9652 108.833 51.818C108.134 52.765 107.616 54.0382 107.001 55.6481C106.427 57.1504 105.761 58.9719 104.762 60.5182C103.719 62.1319 102.236 63.5764 99.9824 64.2487C96.939 65.1563 94.4669 64.3411 92.5 63.6617C90.4686 62.9601 88.9959 62.4265 87.1377 62.7457C85.3686 63.0498 84.0761 63.9807 82.9326 65.3961C81.7332 66.8809 80.8068 68.7518 79.7227 70.8649C78.6933 72.871 77.5058 75.1264 75.833 76.8512C74.0718 78.667 71.7683 79.9068 68.6377 79.9069C65.07 79.9068 62.3037 77.2284 60.1299 74.317C57.8853 71.3109 55.7522 67.324 53.6494 63.569C51.4957 59.7231 49.351 56.0733 46.9873 53.3824C44.6168 50.6839 42.3126 49.2771 39.8818 49.277C38.777 49.277 37.2764 49.7698 35.3789 50.9254C33.5143 52.0611 31.4472 53.7245 29.2559 55.7897C24.8756 59.9177 20.1892 65.4678 15.8633 71.0807C11.5464 76.6818 7.62997 82.2908 4.79102 86.5035C3.37263 88.6083 2.22469 90.3619 1.43262 91.5875C1.03679 92.2 0.729906 92.6809 0.522461 93.0074C0.418773 93.1707 0.339714 93.296 0.287109 93.3795L0.213867 93.4967C0.212401 93.499 0.210644 93.5005 0.209961 93.5016L0.208984 93.5026V93.5035C-0.376904 94.4395 -1.61063 94.7238 -2.54688 94.1383C-3.48324 93.5526 -3.76724 92.3179 -3.18164 91.3815L-3.18066 91.3795C-3.1797 91.378 -3.17755 91.3755 -3.17578 91.3727C-3.17208 91.3668 -3.16624 91.3576 -3.15918 91.3463C-3.14498 91.3237 -3.12406 91.2901 -3.09668 91.2467C-3.04163 91.1594 -2.96073 91.0302 -2.85449 90.8629C-2.64181 90.5281 -2.32867 90.0385 -1.92676 89.4166C-1.12271 88.1725 0.0397587 86.3964 1.47461 84.2672C4.34258 80.0115 8.30905 74.3283 12.6943 68.6383C17.0706 62.9601 21.9069 57.219 26.5127 52.8785C28.8143 50.7095 31.107 48.8437 33.2979 47.5094C35.4556 46.1953 37.7077 45.277 39.8818 45.277C44.0092 45.2771 47.318 47.6985 49.9922 50.7428C52.6733 53.795 55.0052 57.8034 57.1396 61.6149C59.3249 65.5171 61.2915 69.1876 63.335 71.9244C65.449 74.7557 67.1607 75.9068 68.6377 75.9069C70.5515 75.9068 71.8549 75.2074 72.9619 74.066C74.1572 72.8335 75.1007 71.1112 76.1641 69.0387C77.1726 67.073 78.3016 64.7625 79.8203 62.8824C81.3951 60.9331 83.4844 59.3147 86.46 58.8033C89.4943 58.282 91.9456 59.238 93.8057 59.8805C95.7302 60.5453 97.119 60.9289 98.8398 60.4156C99.9416 60.0869 100.723 59.3985 101.402 58.3473C102.125 57.2287 102.642 55.852 103.265 54.2213C103.846 52.6979 104.538 50.9017 105.615 49.443C106.761 47.8904 108.38 46.6631 110.738 46.3346C113.426 45.9604 115.504 46.8212 117.105 48.3492C118.582 49.7585 119.628 51.7145 120.513 53.4674C121.455 55.3333 122.254 57.0509 123.293 58.5289C124.301 59.9632 125.409 60.9781 126.827 61.4889C128.59 62.1238 129.948 62.1084 131.058 61.7555C132.194 61.3938 133.28 60.6097 134.356 59.3541C136.574 56.7667 138.347 52.686 140.258 48.0153C142.104 43.5023 144.063 38.4833 146.649 34.6354C149.264 30.7454 152.809 27.6257 157.932 27.6256C160.704 27.6256 163.065 28.9501 165.042 30.902C167.001 32.836 168.713 35.5049 170.26 38.5309C173.35 44.5754 176.049 52.5892 178.74 60.3815C181.465 68.2719 184.185 75.9495 187.349 81.6578C190.598 87.5224 193.842 90.4427 197.281 90.443C198.895 90.443 200.282 89.7332 201.589 88.1852C202.944 86.5808 204.127 84.1617 205.175 81.0211C207.273 74.7338 208.602 66.296 210.065 57.5875C211.508 49.0035 213.082 40.1571 215.71 33.4547C216.869 30.4989 218.314 27.7712 220.163 25.6598Z"
                      fill="var(--background-color-color-primary-invert-default)"
                    />
                    <path
                      d="M236 23.7919C245.643 23.7919 245.643 55.4895 258.857 54.9943C272.071 54.499 272.071 30.2305 278.5 21.3155C284.929 12.4005 296 24.2871 296 24.2871"
                      stroke="var(--background-color-color-default-default)"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M236 24C236 28.4183 232.418 32 228 32C223.582 32 220 28.4183 220 24C220 19.5817 223.582 16 228 16C232.418 16 236 19.5817 236 24ZM223.404 24C223.404 26.5383 225.462 28.596 228 28.596C230.538 28.596 232.596 26.5383 232.596 24C232.596 21.4617 230.538 19.404 228 19.404C225.462 19.404 223.404 21.4617 223.404 24Z"
                      fill="var(--background-color-color-primary-invert-default)"
                    />
                    <path
                      d="M252 24C252 37.2548 241.255 48 228 48C214.745 48 204 37.2548 204 24C204 10.7452 214.745 0 228 0C241.255 0 252 10.7452 252 24ZM220.251 24C220.251 28.2799 223.72 31.7494 228 31.7494C232.28 31.7494 235.749 28.2799 235.749 24C235.749 19.7201 232.28 16.2506 228 16.2506C223.72 16.2506 220.251 19.7201 220.251 24Z"
                      fill="url(#paint0_radial_10_3898)"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_10_3898"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(228 22) rotate(90) scale(21.5)"
                      >
                        <stop
                          stop-color="var(--background-color-color-primary-default)"
                          stop-opacity="0.51"
                        />
                        <stop
                          offset="1"
                          stop-color="var(--background-color-color-primary-default)"
                          stop-opacity="0"
                        />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>

                {/* Chart Labels */}
                <div className="flex justify-between px-6 text-xs">
                  <span>22</span>
                  <span>23</span>
                  <span>24</span>
                  <span>25</span>
                  <span>26</span>
                </div>
              </div>
            </div>

            {/* Card 6: Activity Heat Map */}
            <div
              className="bg-color-surface border-color-disabled overflow-hidden border"
              style={{ borderRadius: `${settings.borderRadius * 2}px` }}
            >
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-color-default text-sm font-medium">
                    Conversion rate
                  </h4>
                  <div className="flex items-center gap-1">
                    <span className="text-color-caption px-2 py-1 text-xs">
                      Weekly
                    </span>
                    <span
                      className="bg-color-surface border-color-default text-color-primary border px-2 py-1 text-xs"
                      style={{ borderRadius: `${settings.borderRadius * 3}px` }}
                    >
                      Monthly
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-color-default mb-1 text-4xl font-medium">
                    120%
                  </div>
                  <p className="text-color-caption text-sm">
                    In the past 30 days
                  </p>
                </div>

                {/* Heat Map Grid */}
                <div className="mb-4 space-y-1">
                  {[
                    [2, 2, 0, 0, 0, 0, 0, 0],
                    [2, 2, 2, 2, 2, 0, 0, 0],
                    [2, 2, 2, 0, 0, 0, 0, 0],
                    [2, 2, 2, 2, 2, 2, 2, 2],
                    [2, 2, 2, 2, 0, 0, 0, 0],
                  ].map((row, rowIdx) => (
                    <div key={rowIdx} className="flex gap-1">
                      {row.map((intensity, colIdx) => (
                        <div
                          key={colIdx}
                          className={`h-7 w-7 ${
                            intensity === 2
                              ? "bg-color-primary-default"
                              : "bg-color-default-default"
                          }`}
                          style={{
                            borderRadius: `${settings.borderRadius * 4}px`,
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="text-color-caption flex justify-between text-xs">
                  <span>UI</span>
                  <span>UX</span>
                  <span>DS</span>
                  <span>HR</span>
                  <span>QA</span>
                </div>
              </div>
            </div>

            {/* Card 7: CTR Analytics */}
            <div
              className="bg-color-primary-default border-color-disabled overflow-hidden border"
              style={{ borderRadius: `${settings.borderRadius * 2}px` }}
            >
              <div className="text-color-base p-6">
                <div className="mb-4">
                  <span
                    className="bg-color-surface text-color-default px-3 py-1 text-xs font-medium"
                    style={{ borderRadius: `${settings.borderRadius * 3}px` }}
                  >
                    CTR
                  </span>
                </div>

                <p className="mb-6 text-sm opacity-80">In the past 30 days</p>

                {/* Circular Progress */}
                <div className="mb-4 flex items-center justify-center">
                  <svg
                    width="265"
                    height="264"
                    viewBox="0 0 265 264"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_10_3260)">
                      <path
                        opacity="0.1"
                        d="M132 220C83.3989 220 44 180.601 44 132C44 83.3989 83.3989 44 132 44C180.601 44 220 83.3989 220 132C220 180.601 180.601 220 132 220ZM132 52.8C88.259 52.8 52.8 88.2591 52.8 132C52.8 175.741 88.259 211.2 132 211.2C175.741 211.2 211.2 175.741 211.2 132C211.2 88.2591 175.741 52.8 132 52.8Z"
                        fill="var(--background-color-color-primary-invert-default)"
                      />
                      <path
                        d="M132 48.4C132 45.9699 133.971 43.9885 136.398 44.11C148.85 44.7331 161.046 47.9963 172.168 53.7025C184.598 60.0791 195.331 69.3232 203.479 80.6704C211.628 92.0175 216.957 105.142 219.028 118.957C220.881 131.32 220.076 143.919 216.688 155.917C216.027 158.255 213.52 159.49 211.217 158.714V158.714C208.914 157.937 207.69 155.444 208.337 153.101C211.287 142.43 211.971 131.242 210.325 120.261C208.462 107.827 203.665 96.0157 196.331 85.8033C188.998 75.5909 179.338 67.2712 168.152 61.5322C158.272 56.4638 147.452 53.5369 136.398 52.9222C133.972 52.7873 132 50.8301 132 48.4V48.4Z"
                        fill="var(--background-color-color-primary-invert-default)"
                      />
                      <path
                        opacity="0.1"
                        d="M132.5 235C75.8908 235 30 188.885 30 132C30 75.1147 75.8908 29 132.5 29C189.109 29 235 75.1147 235 132C235 188.885 189.109 235 132.5 235ZM132.5 38.27C80.9856 38.27 39.225 80.2343 39.225 132C39.225 183.766 80.9856 225.73 132.5 225.73C184.014 225.73 225.775 183.766 225.775 132C225.775 80.2343 184.014 38.27 132.5 38.27Z"
                        fill="var(--background-color-color-primary-invert-default)"
                      />
                      <path
                        d="M132.5 33.635C132.5 31.0752 134.577 28.989 137.134 29.1053C155.781 29.9531 173.877 35.9048 189.446 46.3586C206.302 57.6764 219.44 73.7628 227.198 92.5836C234.956 111.404 236.985 132.114 233.03 152.094C229.377 170.549 220.77 187.616 208.181 201.465C206.457 203.362 203.509 203.355 201.701 201.539V201.539C199.906 199.735 199.916 196.827 201.62 194.937C212.94 182.384 220.683 166.957 223.983 150.286C227.582 132.104 225.735 113.258 218.675 96.1311C211.615 79.0042 199.66 64.3655 184.321 54.0663C170.269 44.6313 153.955 39.2262 137.133 38.3857C134.577 38.2579 132.5 36.1948 132.5 33.635V33.635Z"
                        fill="var(--background-color-color-primary-invert-default)"
                      />
                      <path
                        opacity="0.1"
                        d="M132.5 249C67.6065 249 15 196.617 15 132C15 67.3827 67.6065 15 132.5 15C197.393 15 250 67.3827 250 132C250 196.617 197.393 249 132.5 249ZM132.5 24.36C72.798 24.36 24.4 72.5521 24.4 132C24.4 191.448 72.798 239.64 132.5 239.64C192.202 239.64 240.6 191.448 240.6 132C240.6 72.5521 192.202 24.36 132.5 24.36Z"
                        fill="var(--background-color-color-primary-invert-default)"
                      />
                      <path
                        d="M133.5 19.68C133.5 17.0953 135.596 14.9903 138.179 15.0928C162.909 16.0737 186.742 24.8103 206.241 40.1156C226.967 56.3843 241.589 79.1271 247.752 104.68C253.914 130.232 251.258 157.107 240.211 180.973C229.818 203.429 212.565 221.991 190.977 234.046C188.724 235.305 185.906 234.383 184.73 232.086V232.086C183.548 229.777 184.473 226.957 186.733 225.684C206.429 214.588 222.169 197.592 231.675 177.055C241.838 155.098 244.281 130.374 238.612 106.865C232.942 83.3569 219.489 62.4335 200.421 47.4664C182.581 33.4627 160.796 25.4361 138.179 24.4608C135.596 24.3495 133.5 22.2647 133.5 19.68V19.68Z"
                        fill="var(--background-color-color-primary-invert-default)"
                      />
                      <path
                        opacity="0.1"
                        d="M132.5 264C59.3223 264 -1.07288e-06 204.902 -1.07288e-06 132C-1.07288e-06 59.0984 59.3223 0 132.5 0C205.678 0 265 59.0984 265 132C265 204.902 205.678 264 132.5 264ZM132.5 9.24C64.4447 9.24 9.275 64.2015 9.275 132C9.275 199.798 64.4447 254.76 132.5 254.76C200.555 254.76 255.725 199.798 255.725 132C255.725 64.2015 200.555 9.24 132.5 9.24Z"
                        fill="var(--background-color-color-primary-invert-default)"
                      />
                      <path
                        d="M132.5 4.62C132.5 2.06845 134.569 -0.00837983 137.119 0.0802299C156.644 0.758685 175.797 5.73134 193.197 14.6644C211.967 24.301 228.154 38.2673 240.408 55.3994C252.662 72.5315 260.628 92.3331 263.643 113.154C266.657 133.975 264.633 155.212 257.739 175.096C250.845 194.98 239.28 212.934 224.009 227.463C208.738 241.991 190.202 252.673 169.947 258.619C149.692 264.564 128.303 265.6 107.564 261.641C88.3493 257.973 70.2075 250.116 54.4306 238.654C52.358 237.148 52.01 234.224 53.5949 232.211V232.211C55.1715 230.209 58.0657 229.866 60.1312 231.359C74.7486 241.926 91.5355 249.173 109.31 252.567C128.597 256.248 148.488 255.285 167.326 249.755C186.163 244.226 203.401 234.292 217.604 220.78C231.806 207.269 242.561 190.571 248.972 172.079C255.384 153.588 257.266 133.837 254.463 114.473C251.659 95.1098 244.25 76.6943 232.854 60.7615C221.458 44.8286 206.404 31.84 188.948 22.8779C172.862 14.6194 155.165 10.0006 137.119 9.32627C134.569 9.23099 132.5 7.17155 132.5 4.62V4.62Z"
                        fill="var(--background-color-color-primary-invert-default)"
                      />
                      <path
                        d="M104.658 147.778C103.264 147.758 101.89 147.503 100.537 147.015C99.1934 146.527 97.9723 145.713 96.8733 144.573C95.7743 143.433 94.8941 141.902 94.2327 139.978C93.5814 138.055 93.2558 135.654 93.2558 132.774C93.2558 130.047 93.5255 127.625 94.0648 125.509C94.6143 123.392 95.4029 121.606 96.4306 120.151C97.4584 118.686 98.6998 117.571 100.155 116.808C101.61 116.045 103.243 115.663 105.055 115.663C106.917 115.663 108.57 116.03 110.015 116.762C111.46 117.495 112.63 118.508 113.526 119.8C114.432 121.092 115.007 122.563 115.251 124.211H110.595C110.28 122.909 109.654 121.845 108.718 121.021C107.782 120.197 106.561 119.785 105.055 119.785C102.765 119.785 100.979 120.782 99.6971 122.776C98.4251 124.771 97.784 127.544 97.7739 131.095H98.0028C98.5421 130.21 99.2035 129.457 99.9871 128.836C100.781 128.205 101.666 127.722 102.643 127.386C103.63 127.04 104.668 126.867 105.757 126.867C107.568 126.867 109.206 127.31 110.672 128.195C112.147 129.07 113.322 130.281 114.198 131.828C115.073 133.374 115.51 135.145 115.51 137.139C115.51 139.134 115.057 140.94 114.152 142.558C113.256 144.176 111.994 145.458 110.366 146.404C108.738 147.341 106.835 147.799 104.658 147.778ZM104.642 143.81C105.843 143.81 106.917 143.515 107.863 142.924C108.809 142.334 109.557 141.54 110.107 140.543C110.656 139.546 110.931 138.432 110.931 137.2C110.931 136 110.661 134.906 110.122 133.919C109.593 132.932 108.86 132.148 107.924 131.568C106.998 130.988 105.94 130.698 104.749 130.698C103.844 130.698 103.004 130.871 102.231 131.217C101.468 131.563 100.796 132.041 100.216 132.652C99.636 133.262 99.1781 133.965 98.8423 134.758C98.5167 135.542 98.3539 136.371 98.3539 137.246C98.3539 138.417 98.6235 139.5 99.1628 140.497C99.7123 141.495 100.46 142.299 101.407 142.909C102.363 143.509 103.442 143.81 104.642 143.81ZM120.414 141.245V137.429L133.922 116.091H136.929V121.708H135.021L125.359 137.002V137.246H143.874V141.245H120.414ZM135.235 147.351V140.085L135.265 138.345V116.091H139.737V147.351H135.235ZM165.51 141.49V139.841C165.51 138.661 165.754 137.582 166.243 136.605C166.741 135.618 167.464 134.83 168.41 134.239C169.367 133.639 170.522 133.339 171.875 133.339C173.259 133.339 174.419 133.634 175.355 134.224C176.291 134.814 176.999 135.603 177.477 136.59C177.965 137.577 178.21 138.661 178.21 139.841V141.49C178.21 142.67 177.965 143.754 177.477 144.741C176.988 145.718 176.271 146.506 175.325 147.107C174.389 147.697 173.239 147.992 171.875 147.992C170.501 147.992 169.341 147.697 168.395 147.107C167.449 146.506 166.731 145.718 166.243 144.741C165.754 143.754 165.51 142.67 165.51 141.49ZM169.067 139.841V141.49C169.067 142.365 169.275 143.158 169.692 143.871C170.11 144.583 170.837 144.939 171.875 144.939C172.903 144.939 173.62 144.583 174.027 143.871C174.434 143.158 174.638 142.365 174.638 141.49V139.841C174.638 138.966 174.439 138.172 174.043 137.46C173.656 136.748 172.933 136.392 171.875 136.392C170.858 136.392 170.135 136.748 169.708 137.46C169.28 138.172 169.067 138.966 169.067 139.841ZM149.789 123.601V121.952C149.789 120.772 150.033 119.688 150.521 118.701C151.02 117.714 151.742 116.925 152.689 116.335C153.645 115.745 154.8 115.45 156.154 115.45C157.537 115.45 158.697 115.745 159.634 116.335C160.57 116.925 161.277 117.714 161.755 118.701C162.234 119.688 162.473 120.772 162.473 121.952V123.601C162.473 124.781 162.228 125.865 161.74 126.852C161.262 127.829 160.549 128.617 159.603 129.218C158.667 129.808 157.517 130.103 156.154 130.103C154.77 130.103 153.604 129.808 152.658 129.218C151.722 128.617 151.01 127.829 150.521 126.852C150.033 125.865 149.789 124.781 149.789 123.601ZM153.36 121.952V123.601C153.36 124.476 153.564 125.269 153.971 125.982C154.388 126.694 155.116 127.05 156.154 127.05C157.171 127.05 157.883 126.694 158.29 125.982C158.708 125.269 158.916 124.476 158.916 123.601V121.952C158.916 121.077 158.718 120.283 158.321 119.571C157.924 118.859 157.202 118.503 156.154 118.503C155.136 118.503 154.413 118.859 153.986 119.571C153.569 120.283 153.36 121.077 153.36 121.952ZM151.239 147.351L172.73 116.091H176.378L154.887 147.351H151.239Z"
                        fill="var(--text-color-color-base)"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_10_3260">
                        <rect
                          width="265"
                          height="264"
                          rx="132"
                          fill="var(--text-color-color-base)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 8: Event Card */}
            <div
              className="bg-color-surface border-color-disabled overflow-hidden border"
              style={{ borderRadius: `${settings.borderRadius * 2}px` }}
            >
              {/* Event Image */}
              <div className="relative h-44 bg-gradient-to-br from-green-400 to-blue-500">
                {/* Date Badge */}
                <div
                  className="bg-color-primary-default text-color-base absolute top-4 right-4 p-2 text-center shadow-lg"
                  style={{ borderRadius: `${settings.borderRadius * 2}px` }}
                >
                  <div className="text-xs">JAN</div>
                  <div className="text-lg font-semibold">18</div>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <span
                  className="bg-color-primary-default text-color-base px-3 py-1 text-xs"
                  style={{ borderRadius: `${settings.borderRadius * 6}px` }}
                >
                  Dance
                </span>

                <div className="mt-4">
                  <p className="text-color-caption mb-1 text-xs">
                    City Performance Center
                  </p>
                  <h4 className="text-color-default text-lg leading-tight font-semibold">
                    Toronto Experimental Dance Festival
                  </h4>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-3">
                  <button
                    className="border-color-default flex h-10 w-10 items-center justify-center border p-2"
                    style={{ borderRadius: `${settings.borderRadius * 6}px` }}
                  >
                    <i className="fa-regular fa-bookmark text-color-caption"></i>
                  </button>
                  <button
                    className="border-color-default flex h-10 w-10 items-center justify-center border p-2"
                    style={{ borderRadius: `${settings.borderRadius * 6}px` }}
                  >
                    <i className="fa-solid fa-share text-color-caption"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 9: Order Statistics */}
            <div
              className="bg-color-primary-default border-color-disabled overflow-hidden border"
              style={{ borderRadius: `${settings.borderRadius * 2}px` }}
            >
              <div className="text-color-base p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <i className="fa-regular fa-bell"></i>
                    <h4 className="font-medium">Order Statistics</h4>
                  </div>
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>

                {/* Main Stats */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="mb-1 text-2xl font-medium">8,258</div>
                    <p className="text-color-base text-xs opacity-90">
                      Total Orders
                    </p>
                  </div>

                  {/* Mini Chart */}
                  <div className="relative h-12 w-12">
                    <svg
                      width="58"
                      height="58"
                      viewBox="0 0 58 58"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.3345 31.1591C17.5542 31.1591 16.8572 31.0246 16.2436 30.7557C15.6338 30.4867 15.1508 30.1136 14.7947 29.6364C14.4425 29.1553 14.2531 28.5985 14.2266 27.9659H16.0107C16.0334 28.3106 16.1489 28.6098 16.3572 28.8636C16.5694 29.1136 16.8459 29.3068 17.1868 29.4432C17.5277 29.5795 17.9065 29.6477 18.3232 29.6477C18.7815 29.6477 19.1868 29.5682 19.5391 29.4091C19.8951 29.25 20.1735 29.0284 20.3743 28.7443C20.575 28.4564 20.6754 28.125 20.6754 27.75C20.6754 27.3598 20.575 27.017 20.3743 26.7216C20.1773 26.4223 19.8875 26.1875 19.505 26.017C19.1262 25.8466 18.6679 25.7614 18.13 25.7614H17.147V24.3295H18.13C18.5618 24.3295 18.9406 24.2519 19.2663 24.0966C19.5959 23.9413 19.8535 23.7254 20.0391 23.4489C20.2247 23.1686 20.3175 22.8409 20.3175 22.4659C20.3175 22.1061 20.236 21.7936 20.0732 21.5284C19.9141 21.2595 19.6868 21.0492 19.3913 20.8977C19.0997 20.7462 18.755 20.6705 18.3572 20.6705C17.9785 20.6705 17.6243 20.7405 17.2947 20.8807C16.969 21.017 16.7038 21.214 16.4993 21.4716C16.2947 21.7254 16.1849 22.0303 16.1697 22.3864H14.4709C14.4898 21.7576 14.6754 21.2045 15.0277 20.7273C15.3838 20.25 15.8535 19.8769 16.4368 19.608C17.0201 19.339 17.6679 19.2045 18.38 19.2045C19.1262 19.2045 19.7701 19.3504 20.3118 19.642C20.8572 19.9299 21.2777 20.3144 21.5732 20.7955C21.8724 21.2765 22.0201 21.803 22.0163 22.375C22.0201 23.0265 21.8383 23.5795 21.4709 24.0341C21.1072 24.4886 20.6224 24.7936 20.0163 24.9489V25.0398C20.7891 25.1572 21.3875 25.464 21.8118 25.9602C22.2398 26.4564 22.4519 27.072 22.4482 27.8068C22.4519 28.447 22.2739 29.0208 21.9141 29.5284C21.558 30.036 21.0713 30.4356 20.4538 30.7273C19.8364 31.0152 19.13 31.1591 18.3345 31.1591ZM28.5277 31.1591C27.7133 31.1591 26.9936 31.0189 26.3686 30.7386C25.7474 30.4583 25.2607 30.072 24.9084 29.5795C24.5561 29.0871 24.3819 28.5265 24.3857 27.8977C24.3819 27.4053 24.4822 26.9527 24.6868 26.5398C24.8951 26.1231 25.1773 25.7765 25.5334 25.5C25.8894 25.2197 26.2872 25.0417 26.7266 24.9659V24.8977C26.147 24.7576 25.683 24.447 25.3345 23.9659C24.986 23.4848 24.8137 22.9318 24.8175 22.3068C24.8137 21.7121 24.9709 21.1818 25.2891 20.7159C25.611 20.2462 26.0523 19.8769 26.6129 19.608C27.1735 19.339 27.8118 19.2045 28.5277 19.2045C29.236 19.2045 29.8686 19.3409 30.4254 19.6136C30.986 19.8826 31.4273 20.2519 31.7493 20.7216C32.0713 21.1875 32.2341 21.7159 32.2379 22.3068C32.2341 22.9318 32.0561 23.4848 31.7038 23.9659C31.3516 24.447 30.8932 24.7576 30.3288 24.8977V24.9659C30.7644 25.0417 31.1565 25.2197 31.505 25.5C31.8572 25.7765 32.1375 26.1231 32.3459 26.5398C32.558 26.9527 32.666 27.4053 32.6697 27.8977C32.666 28.5265 32.4879 29.0871 32.1357 29.5795C31.7834 30.072 31.2947 30.4583 30.6697 30.7386C30.0485 31.0189 29.3345 31.1591 28.5277 31.1591ZM28.5277 29.7216C29.0088 29.7216 29.4254 29.642 29.7777 29.483C30.13 29.3201 30.4027 29.0947 30.5959 28.8068C30.7891 28.5152 30.8875 28.1742 30.8913 27.7841C30.8875 27.3788 30.7815 27.0208 30.5732 26.7102C30.3686 26.3996 30.0902 26.1553 29.7379 25.9773C29.3857 25.7992 28.9822 25.7102 28.5277 25.7102C28.0694 25.7102 27.6622 25.7992 27.3061 25.9773C26.95 26.1553 26.6697 26.3996 26.4652 26.7102C26.2607 27.0208 26.1603 27.3788 26.1641 27.7841C26.1603 28.1742 26.2531 28.5152 26.4425 28.8068C26.6357 29.0947 26.9103 29.3201 27.2663 29.483C27.6224 29.642 28.0429 29.7216 28.5277 29.7216ZM28.5277 24.3068C28.9141 24.3068 29.2569 24.2292 29.5561 24.0739C29.8554 23.9186 30.0902 23.7027 30.2607 23.4261C30.4349 23.1496 30.5239 22.8258 30.5277 22.4545C30.5239 22.0909 30.4368 21.7727 30.2663 21.5C30.0997 21.2273 29.8667 21.017 29.5675 20.8693C29.2682 20.7178 28.9216 20.642 28.5277 20.642C28.1262 20.642 27.7739 20.7178 27.4709 20.8693C27.1716 21.017 26.9387 21.2273 26.772 21.5C26.6054 21.7727 26.5239 22.0909 26.5277 22.4545C26.5239 22.8258 26.6072 23.1496 26.7777 23.4261C26.9482 23.7027 27.183 23.9186 27.4822 24.0739C27.7853 24.2292 28.1338 24.3068 28.5277 24.3068ZM40.7791 28.8182V28.2045C40.7791 27.7652 40.87 27.3636 41.0518 27C41.2375 26.6326 41.5064 26.339 41.8587 26.1193C42.2147 25.8958 42.6446 25.7841 43.1484 25.7841C43.6636 25.7841 44.0954 25.8939 44.4439 26.1136C44.7924 26.3333 45.0556 26.6269 45.2337 26.9943C45.4155 27.3617 45.5064 27.7652 45.5064 28.2045V28.8182C45.5064 29.2576 45.4155 29.661 45.2337 30.0284C45.0518 30.392 44.7848 30.6856 44.4325 30.9091C44.084 31.1288 43.656 31.2386 43.1484 31.2386C42.6371 31.2386 42.2053 31.1288 41.853 30.9091C41.5007 30.6856 41.2337 30.392 41.0518 30.0284C40.87 29.661 40.7791 29.2576 40.7791 28.8182ZM42.103 28.2045V28.8182C42.103 29.1439 42.1806 29.4394 42.3359 29.7045C42.4912 29.9697 42.7621 30.1023 43.1484 30.1023C43.531 30.1023 43.7981 29.9697 43.9496 29.7045C44.1011 29.4394 44.1768 29.1439 44.1768 28.8182V28.2045C44.1768 27.8788 44.103 27.5833 43.9553 27.3182C43.8113 27.053 43.5424 26.9205 43.1484 26.9205C42.7696 26.9205 42.5007 27.053 42.3416 27.3182C42.1825 27.5833 42.103 27.8788 42.103 28.2045ZM34.9268 22.1591V21.5455C34.9268 21.1061 35.0178 20.7027 35.1996 20.3352C35.3852 19.9678 35.6541 19.6742 36.0064 19.4545C36.3625 19.2348 36.7924 19.125 37.2962 19.125C37.8113 19.125 38.2431 19.2348 38.5916 19.4545C38.9401 19.6742 39.2034 19.9678 39.3814 20.3352C39.5594 20.7027 39.6484 21.1061 39.6484 21.5455V22.1591C39.6484 22.5985 39.5575 23.0019 39.3757 23.3693C39.1977 23.733 38.9325 24.0265 38.5803 24.25C38.2318 24.4697 37.8037 24.5795 37.2962 24.5795C36.781 24.5795 36.3473 24.4697 35.995 24.25C35.6465 24.0265 35.3814 23.733 35.1996 23.3693C35.0178 23.0019 34.9268 22.5985 34.9268 22.1591ZM36.2564 21.5455V22.1591C36.2564 22.4848 36.3321 22.7803 36.4837 23.0455C36.639 23.3106 36.9098 23.4432 37.2962 23.4432C37.675 23.4432 37.9401 23.3106 38.0916 23.0455C38.2469 22.7803 38.3246 22.4848 38.3246 22.1591V21.5455C38.3246 21.2197 38.2507 20.9242 38.103 20.6591C37.9553 20.3939 37.6863 20.2614 37.2962 20.2614C36.9174 20.2614 36.6484 20.3939 36.4893 20.6591C36.334 20.9242 36.2564 21.2197 36.2564 21.5455ZM35.4666 31L43.4666 19.3636H44.8246L36.8246 31H35.4666Z"
                        fill="white"
                      />
                      <path
                        d="M21.6199 41L20.4267 36.6364H20.9636L21.8755 40.1903H21.9181L22.8471 36.6364H23.4437L24.3727 40.1903H24.4153L25.3272 36.6364H25.8642L24.671 41H24.1255L23.1625 37.5227H23.1284L22.1653 41H21.6199ZM27.5218 41.0682C27.2065 41.0682 26.9345 40.9986 26.7058 40.8594C26.4785 40.7188 26.3031 40.5227 26.1795 40.2713C26.0574 40.0185 25.9963 39.7244 25.9963 39.3892C25.9963 39.054 26.0574 38.7585 26.1795 38.5028C26.3031 38.2457 26.475 38.0455 26.6951 37.902C26.9167 37.7571 27.1752 37.6847 27.4707 37.6847C27.6412 37.6847 27.8095 37.7131 27.9757 37.7699C28.1419 37.8267 28.2931 37.919 28.4295 38.0469C28.5659 38.1733 28.6745 38.3409 28.7555 38.5497C28.8365 38.7585 28.877 39.0156 28.877 39.321V39.5341H26.3542V39.0994H28.3656C28.3656 38.9148 28.3287 38.75 28.2548 38.6051C28.1824 38.4602 28.0787 38.3459 27.9437 38.2621C27.8102 38.1783 27.6525 38.1364 27.4707 38.1364C27.2704 38.1364 27.0971 38.1861 26.9508 38.2855C26.8059 38.3835 26.6944 38.5114 26.6163 38.669C26.5382 38.8267 26.4991 38.9957 26.4991 39.1761V39.4659C26.4991 39.7131 26.5417 39.9226 26.627 40.0945C26.7136 40.2649 26.8336 40.3949 26.987 40.4844C27.1404 40.5724 27.3187 40.6165 27.5218 40.6165C27.6539 40.6165 27.7733 40.598 27.8798 40.5611C27.9877 40.5227 28.0808 40.4659 28.1589 40.3906C28.237 40.3139 28.2974 40.2187 28.34 40.1051L28.8258 40.2415C28.7747 40.4062 28.6887 40.5511 28.568 40.6761C28.4473 40.7997 28.2981 40.8963 28.1206 40.9659C27.943 41.0341 27.7434 41.0682 27.5218 41.0682ZM31.014 41.0682C30.6987 41.0682 30.4267 40.9986 30.198 40.8594C29.9707 40.7188 29.7953 40.5227 29.6717 40.2713C29.5495 40.0185 29.4885 39.7244 29.4885 39.3892C29.4885 39.054 29.5495 38.7585 29.6717 38.5028C29.7953 38.2457 29.9672 38.0455 30.1873 37.902C30.4089 37.7571 30.6674 37.6847 30.9629 37.6847C31.1333 37.6847 31.3017 37.7131 31.4679 37.7699C31.6341 37.8267 31.7853 37.919 31.9217 38.0469C32.0581 38.1733 32.1667 38.3409 32.2477 38.5497C32.3287 38.7585 32.3691 39.0156 32.3691 39.321V39.5341H29.8464V39.0994H31.8578C31.8578 38.9148 31.8208 38.75 31.747 38.6051C31.6745 38.4602 31.5708 38.3459 31.4359 38.2621C31.3024 38.1783 31.1447 38.1364 30.9629 38.1364C30.7626 38.1364 30.5893 38.1861 30.443 38.2855C30.2981 38.3835 30.1866 38.5114 30.1085 38.669C30.0304 38.8267 29.9913 38.9957 29.9913 39.1761V39.4659C29.9913 39.7131 30.0339 39.9226 30.1191 40.0945C30.2058 40.2649 30.3258 40.3949 30.4792 40.4844C30.6326 40.5724 30.8109 40.6165 31.014 40.6165C31.1461 40.6165 31.2654 40.598 31.372 40.5611C31.4799 40.5227 31.573 40.4659 31.6511 40.3906C31.7292 40.3139 31.7896 40.2187 31.8322 40.1051L32.318 40.2415C32.2669 40.4062 32.1809 40.5511 32.0602 40.6761C31.9395 40.7997 31.7903 40.8963 31.6127 40.9659C31.4352 41.0341 31.2356 41.0682 31.014 41.0682ZM33.6028 39.8068L33.5943 39.1847H33.6966L35.1284 37.7273H35.7505L34.225 39.2699H34.1824L33.6028 39.8068ZM33.1341 41V36.6364H33.6369V41H33.1341ZM35.2136 41L33.9352 39.3807L34.2931 39.0312L35.8528 41H35.2136ZM36.9006 36.6364V41H36.3977V36.6364H36.9006ZM38.1454 42.2273C38.0602 42.2273 37.9842 42.2202 37.9174 42.206C37.8507 42.1932 37.8045 42.1804 37.7789 42.1676L37.9068 41.7244C38.0289 41.7557 38.1369 41.767 38.2306 41.7585C38.3244 41.75 38.4075 41.7081 38.4799 41.6328C38.5538 41.5589 38.6213 41.4389 38.6824 41.2727L38.7761 41.017L37.5659 37.7273H38.1113L39.0147 40.3352H39.0488L39.9522 37.7273H40.4977L39.1085 41.4773C39.046 41.6463 38.9686 41.7862 38.8762 41.897C38.7839 42.0092 38.6767 42.0923 38.5545 42.1463C38.4338 42.2003 38.2974 42.2273 38.1454 42.2273Z"
                        fill="#9CA3AF"
                      />
                      <path
                        d="M55 27C54.513 20.692 51.7057 14.775 47.1038 10.3572C42.5019 5.93931 36.421 3.32363 30 3"
                        stroke="#93C5FD"
                        stroke-width="6"
                      />
                      <path
                        d="M28 3C22.5192 3.29858 17.2666 5.28688 12.9675 8.69032C8.66843 12.0937 5.53502 16.7444 4 22"
                        stroke="#7367FF"
                        stroke-width="6"
                      />
                      <path
                        d="M3.37458 24C2.54093 29.0623 3.10565 34.2737 5 39"
                        stroke="white"
                        stroke-width="6"
                      />
                      <path
                        d="M6 41.6466C8.82713 46.6795 13.2407 50.6368 18.5532 52.9017C23.8657 55.1667 29.7786 55.6123 35.3709 54.1689C40.9632 52.7256 45.9207 49.4745 49.4711 44.922C53.0215 40.3696 54.9654 34.7715 55 29"
                        stroke="#A5B4FC"
                        stroke-width="6"
                      />
                    </svg>
                  </div>
                </div>

                {/* Category List */}
                <div className="border-color-base border-opacity-30 space-y-4 border-t pt-4">
                  {[
                    { name: "Electronic", value: "82.5k", icon: "clock" },
                    { name: "Fashion", value: "23.8k", icon: "calendar" },
                    { name: "Decor", value: "849", icon: "bell" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <i className={`fa-regular fa-${item.icon}`}></i>
                        <div>
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-color-base text-xs opacity-90">
                            Date
                          </div>
                        </div>
                      </div>
                      <span
                        className="bg-color-primary-invert-default text-color-default px-3 py-1 text-sm"
                        style={{
                          borderRadius: `${settings.borderRadius * 3}px`,
                        }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-color-base border-opacity-30 mt-4 border-t pt-3">
                  <p className="text-color-base text-xs opacity-90">
                    $4.4 K expensive more than last month
                  </p>
                </div>
              </div>
            </div>

              {/* Card 1: Music Player */}
              <div
              className="bg-color-surface border-color-disabled overflow-hidden border"
              style={{ borderRadius: `${settings.borderRadius * 2}px` }}
            >
              <div className="space-y-4 px-8 py-4">
                {/* Album Cover */}
                <div
                  className="relative h-36 w-full overflow-hidden bg-gradient-to-br from-green-400 to-blue-500 pb-6"
                  style={{
                    borderRadius: `${settings.borderRadius}px`,
                  }}
                >
                  <div className="absolute inset-0"></div>
                </div>

                {/* Song Info */}
                <div className="text-center">
                  <h4 className="text-color-default mb-1 text-xl font-bold">
                    Calm Down
                  </h4>
                  <p className="text-color-caption text-sm">Song by Rema</p>
                </div>

                {/* Play Button */}
                <div className="flex justify-center">
                  <button className="bg-color-primary-default text-color-primary-invert-default flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                    {/* <div
                      className="ml-1 h-0 w-0 border-t-[6px] border-b-[6px] border-l-[8px] border-t-transparent border-b-transparent"
                      style={{
                        borderLeftColor: "var(--preview-color-primary-100)",
                      }}
                    ></div> */}
                    <i className="fa-solid fa-pause text-color-primary-invert text-3xl"></i>
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-color-primary">01:26</span>
                    <span className="text-color-caption">03:26</span>
                  </div>
                  <div className="bg-color-disabled-default h-1 w-full overflow-hidden rounded-full">
                    <div className="bg-color-primary-default relative h-full w-1/3 rounded-full">
                      <div className="bg-color-primary-default absolute top-1/2 right-0 h-3 w-3 translate-x-1/2 -translate-y-1/2 transform rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Product Card */}
            <div
              className="bg-color-primary-invert-default border-color-disabled overflow-hidden border"
              style={{ borderRadius: `${settings.borderRadius * 2}px` }}
            >
              <div className="space-y-4 p-6">
                {/* Product Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-color-default text-lg font-bold">
                      Nike ZOOM Vaporfly
                    </h4>
                    <p className="text-color-caption text-sm">NEXT Premium</p>
                  </div>
                  <button className="text-color-caption transition-colors">
                    <span className="text-xl">
                      <i className="fa-regular fa-heart"></i>
                    </span>
                  </button>
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-color-primary text-sm">
                      <i className="fa-solid fa-star"></i>
                    </span>
                  ))}
                </div>

                {/* Product Image */}
                <div
                  className="relative h-48 w-full overflow-hidden rounded-lg bg-gradient-to-br from-green-400 to-blue-500"
                  style={{ borderRadius: `${settings.borderRadius * 2}px` }}
                >
                  <div className="bg-opacity-10 absolute inset-0"></div>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="text-color-caption rounded px-2 py-1 opacity-50">
                      <span className="font-semibold">$</span>
                    </div>
                    <span className="text-color-default text-lg font-bold">
                      254.99
                    </span>
                  </div>
                  <button
                    className="bg-color-primary-default text-color-base px-4 py-2 transition-colors"
                    style={{ borderRadius: `${settings.borderRadius}px` }}
                  >
                    Add to Card
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Analytics Widget */}
            <div
              className="bg-color-surface border-color-disabled overflow-hidden border"
              style={{ borderRadius: `${settings.borderRadius * 2}px` }}
            >
              <div className="space-y-4 p-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h4 className="text-color-default font-medium">
                    Visiting summary
                  </h4>
                  <button className="text-color-caption transition-colors">
                    <span className="text-lg">
                      <i className="fa-solid fa-ellipsis"></i>
                    </span>
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-color-caption text-sm">Decrease</span>
                    <span className="text-color-danger text-sm">↓</span>
                    <span className="text-color-default font-bold">0%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-color-default text-2xl font-bold">
                      4.4$
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="bg-color-disabled-default h-px w-full"></div>

                {/* Browser Stats */}
                <div className="space-y-3">
                  {[
                    { name: "Chrome", progress: 100, logos: ["logos:chrome"] },
                    { name: "Safari", progress: 80, logos: ["logos:safari"] },
                    { name: "Firefox", progress: 60, logos: ["logos:firefox"] },
                    {
                      name: "Edge",
                      progress: 40,
                      logos: ["logos:microsoft-edge"],
                    },
                  ].map((browser, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center justify-center">
                          {browser.logos.map((logo) => (
                            <Icon icon={logo} className="h-6 w-6" />
                          ))}
                        </div>
                        <span className="text-color-default text-sm">
                          {browser.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-color-default-default h-2 w-12 overflow-hidden rounded-full">
                          <div
                            className="bg-color-primary-default h-full rounded-full"
                            style={{ width: `${browser.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-color-primary text-xs font-medium">
                          100%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="bg-color-disabled-default h-px w-full"></div>

                {/* Income Widget */}
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12">
                    <div className="border-color-default h-full w-full rounded-full border-4"></div>
                    <div className="border-color-primary absolute inset-0 rotate-45 rounded-full border-4 border-t-transparent border-l-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-color-default text-xs font-medium">
                        30%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-color-default text-sm font-medium">
                      Income this week
                    </p>
                    <p className="text-color-caption text-xs">
                      $39k less than last week
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Copy Modal */}
      {showCopyModal && (
        <div className="bg-opacity-50 bg-color-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-color-surface max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-lg">
            <div className="border-color-disabled flex items-center justify-between border-b px-4">
              <h3 className="text-color-default text-lg font-medium">
                Generated CSS Variables
              </h3>
              <button
                onClick={() => setShowCopyModal(false)}
                className="text-color-caption hover:text-color-default cursor-pointer p-2.5 text-xl"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4">
              <pre className="bg-color-default-default text-color-default overflow-x-auto rounded p-4 text-sm whitespace-pre-wrap">
                {generateCSSVariables()}
              </pre>
            </div>
            <div className="border-color-disabled flex justify-end gap-2 border-t p-4">
              <button
                onClick={() => setShowCopyModal(false)}
                className="text-color-caption hover:text-color-default cursor-pointer px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={copyToClipboard}
                className="bg-color-primary-default text-color-base hover:bg-color-primary-hovered cursor-pointer rounded px-4 py-2"
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
