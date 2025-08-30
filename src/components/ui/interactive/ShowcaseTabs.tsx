import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import foundationImg from '@assets/images/illustrations/foundation.png';
import componentsImg from '@assets/images/illustrations/components.png';
import blocksImg from '@assets/images/illustrations/blocks.png';
import templatesImg from '@assets/images/illustrations/templates.png';
import Counter from './Counter';

interface TabData {
  id: string;
  label: string;
  icon: string;
  count: number;
  countSuffix: string;
  description: string;
  image: string;
}

const tabs: TabData[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    icon: 'fa-solid fa-coins',
    count: 200,
    countSuffix: '+',
    description: 'Centralized style variables for seamless design-to-code sync.',
    image: foundationImg.src
  },
  {
    id: 'components',
    label: 'Components',
    icon: 'fa-solid fa-atom',
    count: 50,
    countSuffix: '+',
    description: 'A scalable library of ready-to-use, customizable components.',
    image: componentsImg.src
  },
  {
    id: 'blocks',
    label: 'Blocks',
    icon: 'fa-solid fa-cubes',
    count: 1000,
    countSuffix: '+',
    description: 'Pre-assembled interface sections - ready to drop in and scale.',
    image: blocksImg.src
  },
  {
    id: 'templates',
    label: 'Templates',
    icon: 'fa-solid fa-file-alt',
    count: 10,
    countSuffix: '+',
    description: 'Ready-to-ship design and development products.',
    image: templatesImg.src
  }
];

export default function ShowcaseTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0];

    return (
    <div className="w-full">
      {/* Stats Cards - Navigation */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {tabs.map((tab) => (
            <motion.div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                cursor-pointer p-6 rounded-lg transition-all duration-300 relative overflow-hidden
                ${activeTab === tab.id 
                  ? 'bg-gray-900/50' 
                  : 'bg-gray-900/30 hover:bg-gray-900/40'
                }
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: tabs.findIndex(t => t.id === tab.id) * 0.1 }}
            >
            {activeTab === tab.id && (
              <>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                  layoutId="cardBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-400 rounded-full"
                  layoutId="activeCardUnderline"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 25 }}
                />
              </>
            )}
            <div className="relative text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <motion.span 
                  className="text-2xl text-color-primary"
                  animate={{ 
                    scale: activeTab === tab.id ? 1.1 : 1,
                    rotate: activeTab === tab.id ? [0, -5, 5, 0] : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <i className={tab.icon}></i>
                </motion.span>
                <h3 className={`
                  text-xl font-medium transition-colors duration-300
                 
                `}>
                  {tab.label}
                </h3>
              </div>
              <div className={`
                text-3xl font-bold mb-2 transition-colors duration-300
               
              `}>
                <Counter 
                  count={tab.count} 
                  suffix={tab.countSuffix}
                  duration={2.5}
                />
              </div>
              <p className="text-sm text-color-caption leading-relaxed">
                {tab.description}
              </p>
            </div>
          </motion.div>
        ))}
        </div>

      </div>

      {/* Content Area */}
      <div className="relative bg-gray-900/50 overflow-hidden min-h-[600px] rounded border border-solid border-[#092E58]">
        {/* Animated Aurora Background */}
        <div className="absolute inset-0 z-0">
          {/* Blob Layer 1 - Purple to Pink to Blue */}
          <div 
            className="absolute inset-0 opacity-40 aurora-blob-1"
            style={{
              background: 'conic-gradient(from 0deg at 40% 60%, #4c1d95, #7c3aed, #a855f7, #ec4899, #3b82f6, #1e40af, #4c1d95)',
              filter: 'blur(80px)',
              mixBlendMode: 'screen'
            }}
          />
          
          {/* Blob Layer 2 - Pink to Navy to Purple */}
          <div 
            className="absolute inset-0 opacity-25 aurora-blob-2"
            style={{
              background: 'conic-gradient(from 120deg at 60% 40%, #ec4899, #be185d, #1e1b4b, #312e81, #6366f1, #8b5cf6, #ec4899)',
              filter: 'blur(80px)',
              mixBlendMode: 'screen'
            }}
          />
          
          {/* Blob Layer 3 - Deep Navy to Blue to Purple */}
          <div 
            className="absolute inset-0 opacity-20 aurora-blob-3"
            style={{
              background: 'conic-gradient(from 240deg at 30% 70%, #0f172a, #1e40af, #3b82f6, #6366f1, #a855f7, #c084fc, #0f172a)',
              filter: 'blur(80px)',
              mixBlendMode: 'screen'
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{
              duration: 0.4,
              ease: "easeOut"
            }}
            className="relative z-10 h-full flex items-center justify-center p-8 "
          >
           <img
                    src={activeTabData.image}
                    alt={`${activeTabData.label} showcase`}
                    className="relative w-full"
                  />
                       
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
