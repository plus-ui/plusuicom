import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import widget1x1 from "@assets/images/ui-examples/widget-1x1.png";
import widget1x2 from "@assets/images/ui-examples/widget-1x2.png";
import widget1x3 from "@assets/images/ui-examples/widget-1x3.png";
import widget2x1 from "@assets/images/ui-examples/widget-2x1.png";
import widget2x2 from "@assets/images/ui-examples/widget-2x2.png";
import widget2x3 from "@assets/images/ui-examples/widget-2x3.png";

import widget3x1 from "@assets/images/ui-examples/widget-3x1.png";
import widget3x2 from "@assets/images/ui-examples/widget-3x2.png";
import widget3x3 from "@assets/images/ui-examples/widget-3x3.png";
import widget4x1 from "@assets/images/ui-examples/widget-4x1.png";
import widget4x2 from "@assets/images/ui-examples/widget-4x2.png";
import widget4x3 from "@assets/images/ui-examples/widget-4x3.png";
import widget5x1 from "@assets/images/ui-examples/widget-5x1.png";
import widget5x2 from "@assets/images/ui-examples/widget-5x2.png";
import widget5x3 from "@assets/images/ui-examples/widget-5x3.png";

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
    x1: widget1x1.src,
    x2: widget1x2.src,
    x3: widget1x3.src,
  },
  {
    x1: widget2x1.src,
    x2: widget2x2.src,
    x3: widget2x3.src,
  },
  {
    x1: widget3x1.src,
    x2: widget3x2.src,
    x3: widget3x3.src,
  },
  {
    x1: widget4x1.src,
    x2: widget4x2.src,
    x3: widget4x3.src,
  },
  {
    x1: widget5x1.src,
    x2: widget5x2.src,
    x3: widget5x3.src,
  },
];

const WidgetPreview: React.FC<WidgetPreviewProps> = ({ className = "" }) => {
  // Animasyon state'i kaldırıldı - artık sürekli akan sistem

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Hidden reference layout - determines sizes */}
      <div className="pointer-events-none opacity-0">
        <div className="mb-4 flex w-full flex-row gap-4">
          <div className="flex-1">
            <img
              src={widgetGroups[0].x1}
              alt=""
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="flex-1">
            <img
              src={widgetGroups[0].x2}
              alt=""
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
        <div className="w-full">
          <img
            src={widgetGroups[0].x3}
            alt=""
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      <motion.div
        className="absolute inset-0 flex flex-col"
        animate={{
          y: [0, -100 * widgetGroups.length + "%"],
        }}
        transition={{
          duration: widgetGroups.length * 12,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...widgetGroups, ...widgetGroups].map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="mb-4 flex flex-shrink-0 flex-col gap-4"
          >
            <div className="flex w-full flex-row gap-4">
              <div className="flex-1">
                <img
                  src={group.x1}
                  alt={`Widget ${groupIndex + 1}x1`}
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="flex-1">
                <img
                  src={group.x2}
                  alt={`Widget ${groupIndex + 1}x2`}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
            <div className="w-full">
              <img
                src={group.x3}
                alt={`Widget ${groupIndex + 1}x3`}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default WidgetPreview;
