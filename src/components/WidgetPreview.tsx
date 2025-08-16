import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface WidgetPreviewProps {
  className?: string;
}

interface WidgetGroup {
  x1: string;
  x2: string;
  x3: string;
}

const widgetGroups: WidgetGroup[] = [
  {
    x1: '/src/assets/hero/widget-1x1.png',
    x2: '/src/assets/hero/widget-1x2.png',
    x3: '/src/assets/hero/widget-1x3.png'
  },
  {
    x1: '/src/assets/hero/widget-2x1.png',
    x2: '/src/assets/hero/widget-2x2.png',
    x3: '/src/assets/hero/widget-2x3.png'
  },
  {
    x1: '/src/assets/hero/widget-3x1.png',
    x2: '/src/assets/hero/widget-3x2.png',
    x3: '/src/assets/hero/widget-3x3.png'
  },
  {
    x1: '/src/assets/hero/widget-4x1.png',
    x2: '/src/assets/hero/widget-4x2.png',
    x3: '/src/assets/hero/widget-4x3.png'
  },
  {
    x1: '/src/assets/hero/widget-5x1.png',
    x2: '/src/assets/hero/widget-5x2.png',
    x3: '/src/assets/hero/widget-5x3.png'
  }
];

const WidgetPreview: React.FC<WidgetPreviewProps> = ({ className = '' }) => {
  const [cardIndices, setCardIndices] = useState({
    x1: 0,
    x2: 0,
    x3: 0
  });

  useEffect(() => {
    let stepCounter = 0;
    
    const timer = setInterval(() => {
      stepCounter++;
      const cardType = (stepCounter % 3) === 1 ? 'x1' : 
                      (stepCounter % 3) === 2 ? 'x2' : 'x3';
      
      setCardIndices(prev => ({
        ...prev,
        [cardType]: (prev[cardType] + 1) % widgetGroups.length
      }));
    }, 2000); // Her 2 saniyede bir değişir

    return () => clearInterval(timer);
  }, []);

  // Her kart kendi index'ine göre görsel alır
  
  const easeVariants: Variants = {
    initial: { 
      opacity: 0,
      scale: 0.96
    },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const containerVariants: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <motion.div 
      className={`w-full flex flex-col gap-4 ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
        >
      {/* Üst satır - 2 widget */}
      <div className="flex flex-row gap-4 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`x1-${cardIndices.x1}`}
            className="flex-1 relative overflow-hidden"
            variants={easeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <img 
              src={widgetGroups[cardIndices.x1].x1} 
              alt="Widget Preview 1" 
              className="w-full h-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-blue-50', 'to-blue-100');
              }}
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`x2-${cardIndices.x2}`}
            className="flex-1 relative overflow-hidden"
            variants={easeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <img 
              src={widgetGroups[cardIndices.x2].x2} 
              alt="Widget Preview 2" 
              className="w-full h-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-green-50', 'to-green-100');
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Alt satır - 1 geniş widget */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`x3-${cardIndices.x3}`}
          className="w-full relative overflow-hidden"
          variants={easeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <img 
            src={widgetGroups[cardIndices.x3].x3} 
            alt="Widget Preview 3" 
            className="w-full h-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-purple-50', 'to-purple-100');
            }}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default WidgetPreview;
