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
  // Animasyon state'i kaldırıldı - artık sürekli akan sistem

  return (
    <div className={`w-full relative overflow-hidden ${className}`}>
      {/* Hidden reference layout - determines sizes */}
      <div className="opacity-0 pointer-events-none">
        <div className="flex flex-row gap-4 w-full mb-4">
          <div className="flex-1">
            <img src={widgetGroups[0].x1} alt="" className="w-full h-auto object-contain" />
          </div>
          <div className="flex-1">
            <img src={widgetGroups[0].x2} alt="" className="w-full h-auto object-contain" />
          </div>
        </div>
        <div className="w-full">
          <img src={widgetGroups[0].x3} alt="" className="w-full h-auto object-contain" />
        </div>
      </div>

      <motion.div
        className="absolute inset-0 flex flex-col"
        animate={{
          y: [0, -100 * widgetGroups.length + '%']
        }}
        transition={{
          duration: widgetGroups.length * 12, 
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...widgetGroups, ...widgetGroups].map((group, groupIndex) => (
          <div key={groupIndex} className="flex flex-col gap-4 mb-4 flex-shrink-0">
            <div className="flex flex-row gap-4 w-full">
              <div className="flex-1">
                <img 
                  src={group.x1} 
                  alt={`Widget ${groupIndex + 1}x1`} 
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex-1">
                <img 
                  src={group.x2} 
                  alt={`Widget ${groupIndex + 1}x2`} 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
            <div className="w-full">
              <img 
                src={group.x3} 
                alt={`Widget ${groupIndex + 1}x3`} 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default WidgetPreview;
