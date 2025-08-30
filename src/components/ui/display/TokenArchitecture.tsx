import { useState, useEffect } from 'react';

interface ColorInfo {
  name: string;
  hex: string;
  alias: string;
  semantic: string;
  bgClass: string;
  textClass: string;
}

const colorThemes: Record<string, ColorInfo> = {
  primary: {
    name: 'indigo-600',
    hex: '#4f46e5',
    alias: 'indigo-600',
    semantic: 'background/primary/default',
    bgClass: 'bg-color-primary-default',
    textClass: 'text-color-primary'
  },
  success: {
    name: 'green-600',
    hex: '#16a34a',
    alias: 'green-600', 
    semantic: 'background/success/default',
    bgClass: 'bg-color-success-default',
    textClass: 'text-color-success'
  },
  info: {
    name: 'blue-600',
    hex: '#2563eb',
    alias: 'blue-600',
    semantic: 'background/info/default', 
    bgClass: 'bg-color-info-default',
    textClass: 'text-color-info'
  },
  danger: {
    name: 'red-600',
    hex: '#dc2626',
    alias: 'red-600',
    semantic: 'background/danger/default',
    bgClass: 'bg-color-danger-default',
    textClass: 'text-color-danger'
  }
};

export default function TokenArchitecture() {
  const [currentTheme, setCurrentTheme] = useState<keyof typeof colorThemes>('primary');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const themes = Object.keys(colorThemes) as Array<keyof typeof colorThemes>;
    let currentIndex = 0;

    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % themes.length;
        setCurrentTheme(themes[currentIndex]);
        setIsAnimating(false);
      }, 150); // Kısa animasyon süresi
    }, 3000); // 3 saniyede bir değişim

    return () => clearInterval(interval);
  }, []);

  const currentColor = colorThemes[currentTheme];

  return (
    <div className="bg-color-surface border-color-default flex w-full flex-col items-center justify-between rounded-lg border border-solid px-6 pt-9 pb-5">
      <div className="flex flex-col items-center text-center">
        <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-500 ease-in-out bg-indigo-700 text-2xl`}>
          <i className="fa-solid fa-coins text-white"></i>
        </div>
        <h3 className="text-color-default mb-2.5 text-3xl font-semibold">Token Architecture</h3>
        <p className="text-color-caption text-xl">Enhance your UI with our token system using Hex codes, Aliases, and Semantic tokens for scalable UI.</p>
      </div>
      
      <div className="flex w-full flex-col items-center py-6 mt-5">
        {/* Hex Code */}
        <div className={`bg-color-default-default flex w-fit flex-row items-center gap-2.5 rounded-lg px-6 py-2.5 transition-all duration-500 ease-in-out ${isAnimating ? 'scale-105' : 'scale-100'}`}>
          <div className={`h-5 w-5 rounded-full transition-all duration-500 ease-in-out ${currentColor.bgClass}`}></div>
          <span className="text-color-default font-mono text-sm">{currentColor.hex}</span>
        </div>
        
        <div className="w-px h-6 bg-color-divider"></div>
        
        {/* Color Alias */}
        <div className={`bg-color-default-default flex w-fit flex-row items-center gap-2.5 rounded-lg px-6 py-2.5 transition-all duration-500 ease-in-out ${isAnimating ? 'scale-105' : 'scale-100'}`}>
          <div className={`h-5 w-5 rounded-full transition-all duration-500 ease-in-out ${currentColor.bgClass}`}></div>
          <span className="text-color-default font-mono text-sm">{currentColor.alias}</span>
        </div>
        
        <div className="w-px h-6 bg-color-divider"></div>
        
        {/* Semantic Token */}
        <div className={`bg-color-default-default flex w-fit flex-row items-center gap-2.5 rounded-lg px-6 py-2.5 transition-all duration-500 ease-in-out ${isAnimating ? 'scale-105' : 'scale-100'}`}>
          <div className={`h-5 w-5 rounded-full transition-all duration-500 ease-in-out ${currentColor.bgClass}`}></div>
          <span className="text-color-default font-mono text-sm">{currentColor.semantic}</span>
        </div>
        
        <div className="w-px h-6 bg-color-divider"></div>
        
        {/* Component Examples */}
        <div className="bg-color-default-default flex w-full flex-row items-center justify-around rounded-lg px-7 py-2.5">
          <plus-button 
            kind="filled" 
            status={currentTheme} 
            size="sm"
            className="transition-all duration-500 ease-in-out"
          >
            Button
          </plus-button>
          <plus-checkbox 
            status={currentTheme} 
            size="sm" 
            checked
            className="transition-all duration-500 ease-in-out"
          />
          <plus-chip 
            kind="filled" 
            status={currentTheme} 
            size="md" 
            dismiss
            className="transition-all duration-500 ease-in-out"
          >
            Chip
          </plus-chip>
          <plus-toggle 
            status={currentTheme} 
            size="lg" 
            checked 
            className="w-fit transition-all duration-500 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
}
