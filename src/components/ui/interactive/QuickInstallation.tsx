import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface Framework {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface PackageManager {
  id: string;
  name: string;
  commands: {
    install: string;
    package: string;
  };
}

const frameworks: Framework[] = [
  { id: 'react', name: 'React', icon: 'logos:react', color: '#61DAFB' },
  { id: 'javascript', name: 'Vanilla JS', icon: 'logos:javascript', color: '#F7DF1E' },
  { id: 'vue', name: 'Vue.js', icon: 'logos:vue', color: '#4FC08D' },
  { id: 'angular', name: 'Angular', icon: 'logos:angular-icon', color: '#DD0031' },
  { id: 'svelte', name: 'Svelte', icon: 'logos:svelte-icon', color: '#FF3E00' },
];

const packageManagers: PackageManager[] = [
  { id: 'npm', name: 'NPM', commands: { install: 'npm install', package: '' } },
  { id: 'yarn', name: 'Yarn', commands: { install: 'yarn add', package: '' } },
  { id: 'pnpm', name: 'PNPM', commands: { install: 'pnpm add', package: '' } },
  { id: 'bun', name: 'Bun', commands: { install: 'bun add', package: '' } },
  { id: 'cdn', name: 'CDN', commands: { install: '<script src="', package: '' } },
];

export default function QuickInstallation() {
  const [selectedFramework, setSelectedFramework] = useState<string>('react');
  const [selectedPackageManager, setSelectedPackageManager] = useState<string>('npm');
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  // Vanilla JS seçildiğinde otomatik CDN seç
  useEffect(() => {
    if (selectedFramework === 'javascript') {
      setSelectedPackageManager('cdn');
    } else if (selectedPackageManager === 'cdn' && selectedFramework !== 'javascript') {
      setSelectedPackageManager('npm');
    }
  }, [selectedFramework, selectedPackageManager]);

  const getFrameworkPackage = () => {
    const packages = {
      react: '@plusui/core @plusui/react',
      javascript: '@plusui/core',
      vue: '@plusui/core', 
      angular: '@plusui/core',
      svelte: '@plusui/core'
    };
    return packages[selectedFramework as keyof typeof packages] || '@plusui/core';
  };

  const handleCopy = async (text: string, step: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStep(step);
      setTimeout(() => setCopiedStep(null), 2000);
    } catch (err) {
      console.error('Copying failed:', err);
    }
  };

  const getInstallCommand = () => {
    const pm = packageManagers.find(p => p.id === selectedPackageManager);
    if (!pm) return '';
    
    if (selectedPackageManager === 'cdn' || selectedFramework === 'javascript') {
      return `  <script type="module" src="https://cdn.jsdelivr.net/npm/@plusui/core/cdn/components/index.js"></script>`;
    }
    
    return `${pm.commands.install} ${getFrameworkPackage()}`;
  };

  const getCssImport = () => {
    if (selectedPackageManager === 'cdn' || selectedFramework === 'javascript') {
      return `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@plusui/core/cdn/style.css">`;
    }
    return `@import '@plusui/core/style.css';`;
  };

  const getStepTwoTitle = () => {
    if (selectedPackageManager === 'cdn' || selectedFramework === 'javascript') {
      return 'Add Plus UI CSS to your HTML:';
    }
    return 'Add Plus UI to app.css:';
  };

  const getStepTwoTab = () => {
    if (selectedPackageManager === 'cdn' || selectedFramework === 'javascript') {
      return 'index.html';
    }
    return 'app.css';
  };

  const getFrameworkSpecificInstruction = () => {
    const instructions = {
      javascript: 'Install Plus UI via CDN:',
      react: 'Install Plus UI as a Node package:',
      vue: 'Install Plus UI as a Node package:',
      angular: 'Install Plus UI as a Node package:',
      svelte: 'Install Plus UI as a Node package:'
    };
    return instructions[selectedFramework as keyof typeof instructions] || 'Install Plus UI as a Node package:';
  };

  return (
    <motion.div 
      className="flex flex-col gap-9 items-center justify-center w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Framework Selection */}
      <div className="flex flex-col items-center justify-start">
        <div className="flex gap-6 items-center justify-start">
          {frameworks.map((framework) => (
            <motion.button
              key={framework.id}
              onClick={() => setSelectedFramework(framework.id)}
              className={`relative w-12 h-12 rounded-lg transition-all duration-200 cursor-pointer ${
                selectedFramework === framework.id 
                  ? 'bg-color-primary-default/20' 
                  : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon 
                icon={framework.icon} 
                className="w-8 h-8 mx-auto"
                style={{ color: framework.color }}
              />
            </motion.button>
          ))}
          
          <motion.a
            href="https://new-docs.plusui.com/installation/overview/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-color-default transition-colors"
            whileHover={{ x: 1 }}
          >
            <span className="text-base font-medium">See all</span>
            <Icon icon="mdi:chevron-right" className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      {/* Installation Code */}
      <div className="flex flex-col gap-6 items-center justify-center w-full">
        <div className="bg-color-default-default flex flex-col gap-12 p-9 rounded-lg w-full max-w-[924px]">
          
          {/* Step 1: Install Package */}
          <div className="flex flex-col gap-4 w-full">
            <div className="text-color-default text-lg font-normal">
              <ol className="list-decimal list-inside">
                <li>{getFrameworkSpecificInstruction()}</li>
              </ol>
            </div>
            
            <div className="flex flex-col w-full">
              {/* Package Manager Tabs */}
              <div className="flex items-center">
                {packageManagers
                  .filter(pm => selectedFramework === 'javascript' ? pm.id === 'cdn' : pm.id !== 'cdn')
                  .map((pm) => (
                  <motion.button
                    key={pm.id}
                    onClick={() => setSelectedPackageManager(pm.id)}
                    className={`px-3 py-3 text-base font-normal transition-colors cursor-pointer ${
                      selectedPackageManager === pm.id
                        ? 'bg-color-default-hovered text-color-default rounded-tl rounded-tr'
                        : 'text-color-default hover:text-color-default'
                    }`}
                  >
                    {pm.name}
                  </motion.button>
                ))}
              </div>
              
              {/* Command Display */}
              <div className="bg-color-default-hovered flex items-center justify-between px-4 py-4 rounded-bl rounded-br w-full">
                <div className="flex-1">
                  <code className="text-color-default font-mono text-base">
                    {selectedPackageManager === 'cdn' || selectedFramework === 'javascript' ? (
                      <>
                        <span className="text-color-default">&lt;script src=&quot;</span>
                        <span className="text-color-primary">https://cdn.jsdelivr.net/npm/@plusui/core/cdn/components/index.js</span>
                        <span className="text-color-default">&quot;&gt;&lt;/script&gt;</span>
                      </>
                    ) : (
                      <>
                        <span className="text-color-default">{packageManagers.find(p => p.id === selectedPackageManager)?.commands.install} </span>
                        <span className="text-color-primary">{getFrameworkPackage()}</span>
                      </>
                    )}
                  </code>
                </div>
                <motion.button
                  onClick={() => handleCopy(getInstallCommand(), 1)}
                  className="text-color-default hover:text-color-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon 
                    icon={copiedStep === 1 ? "mdi:check" : "mdi:content-copy"} 
                    className="w-5 h-5" 
                  />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Step 2: Add CSS */}
          <div className="flex flex-col gap-4 w-full">
            <div className="text-color-default text-lg font-normal">
              <ol className="list-decimal list-inside" start={2}>
                <li>{getStepTwoTitle()}</li>
              </ol>
            </div>
            
            <div className="flex flex-col w-full">
              {/* CSS Tab */}
              <div className="flex items-center">
                <div className="bg-color-default-hovered px-3 py-3 text-base font-normal text-color-default rounded-tl rounded-tr">
                  {getStepTwoTab()}
                </div>
              </div>
              
              {/* CSS Command Display */}
              <div className="bg-color-default-hovered flex items-center justify-between px-4 py-4 rounded-bl rounded-br w-full">
                <div className="flex-1">
                  <code className="text-color-default font-mono text-base">
                    {selectedPackageManager === 'cdn' || selectedFramework === 'javascript' ? (
                      <>
                        <span className="text-color-default">&lt;link rel=&quot;stylesheet&quot; href=&quot;</span>
                        <span className="text-color-primary">https://cdn.jsdelivr.net/npm/@plusui/core/cdn/style.css</span>
                        <span className="text-color-default">&quot;&gt;</span>
                      </>
                    ) : (
                      <>
                        <span className="text-color-default">@import </span>
                        <span className="text-color-primary">'@plusui/core/style.css';</span>
                      </>
                    )}
                  </code>
                </div>
                <motion.button
                  onClick={() => handleCopy(getCssImport(), 2)}
                  className="text-color-default hover:text-color-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon 
                    icon={copiedStep === 2 ? "mdi:check" : "mdi:content-copy"} 
                    className="w-5 h-5" 
                  />
                </motion.button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
