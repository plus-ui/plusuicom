import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Counter } from "@components/sections/showcase/components";

import foundationImg from "@assets/images/showcase/foundation.png";
import componentsImg from "@assets/images/showcase/components.png";
import blocksImg from "@assets/images/showcase/blocks.png";

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
    id: "foundations",
    label: "Foundations",
    icon: "fa-solid fa-coins",
    count: 200,
    countSuffix: "+",
    description:
      "Centralized style variables for seamless design-to-code sync.",
    image: foundationImg.src,
  },
  {
    id: "components",
    label: "Components",
    icon: "fa-solid fa-atom",
    count: 50,
    countSuffix: "+",
    description: "A scalable library of ready-to-use, customizable components.",
    image: componentsImg.src,
  },
  {
    id: "blocks",
    label: "Blocks",
    icon: "fa-solid fa-cubes",
    count: 1000,
    countSuffix: "+",
    description:
      "Pre-assembled interface sections - ready to drop in and scale.",
    image: blocksImg.src,
  },
  {
    id: "templates",
    label: "Templates",
    icon: "fa-solid fa-file-alt",
    count: 10,
    countSuffix: "+",
    description: "Ready-to-ship design and development products.",
    image: componentsImg.src,
  },
];

export default function ShowcaseTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const activeTabData = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <div className="relative w-full">
      {/* Stats Cards - Navigation */}
      <div className="relative">
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-4">
          {tabs.map((tab) => (
            <motion.div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg p-6 text-center`}
              transition={{
                delay: tabs.findIndex((t) => t.id === tab.id) * 0.1,
              }}
            >
              <h3 className="text-color-default text-xl">{tab.label}</h3>
              <Counter
                count={tab.count}
                suffix={tab.countSuffix}
                className="text-color-default text-5xl font-semibold"
              />

              <p className="text-color-placeholder text-sm">
                {tab.description}
              </p>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="bg-color-default-pressed absolute -bottom-1.5 h-1.5 w-full rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Active Tab Indicator */}
        {/* <motion.div
          className="absolute h-1.5 bg-color-default-pressed rounded-full"
          style={{
            width: `calc(100% / 4 - 1.5rem)`,
            bottom: '-6px'
          }}
          animate={{
            x: `calc(${tabs.findIndex(t => t.id === activeTab) * 100}% + ${tabs.findIndex(t => t.id === activeTab) * 1.5}rem)`
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        /> */}
      </div>

      {/* Content Area */}
      <div className="bg-color-surface/50 relative flex md:min-h-[600px] flex-1 items-start justify-center overflow-hidden rounded-t">
        <div className="absolute inset-0 z-0">
          <div
            className="aurora-blob-1 absolute inset-0 opacity-30"
            style={{
              background:
                "conic-gradient(from 0deg at 40% 60%, #4c1d95, #7c3aed, #a855f7, #ec4899, #4c1d95)",
              filter: "blur(60px)",
              mixBlendMode: "screen",
            }}
          ></div>

          <div
            className="aurora-blob-2 absolute inset-0 opacity-20"
            style={{
              background:
                "conic-gradient(from 120deg at 60% 40%, #ec4899, #be185d, #1e40af, #3b82f6, #ec4899)",
              filter: "blur(60px)",
              mixBlendMode: "screen",
            }}
          ></div>

          <div
            className="aurora-blob-3 absolute inset-0 opacity-15"
            style={{
              background:
                "conic-gradient(from 240deg at 30% 70%, #1e40af, #3b82f6, #6366f1, #a855f7, #1e40af)",
              filter: "blur(60px)",
              mixBlendMode: "screen",
            }}
          ></div>
        </div>
        <div className="relative z-10 flex h-full w-full flex-1 items-start justify-center px-4 pt-4 pb-4 lg:px-20 lg:pt-20 lg:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              className="relative z-10 flex h-full items-center justify-center lg:p-8"
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
    </div>
  );
}
