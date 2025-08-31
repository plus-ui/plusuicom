import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Icon } from "@iconify/react";

interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  logos: Array<string>;
  visualType: "color" | "image" | "video";
  visualContent: string;
}

interface ScrollBasedFeaturesProps {
  features: FeatureItem[];
  className?: string;
}

const ScrollBasedFeatures: React.FC<ScrollBasedFeaturesProps> = ({
  features,
  className = "",
}) => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  // Her feature için intersection observer
  const featureRefs = features.map(() => {
    return useInView({
      threshold: 0.3,
      rootMargin: "-30% 0px -30% 0px",
    });
  });

  // Aktif feature'ı güncelle
  useEffect(() => {
    for (let i = featureRefs.length - 1; i >= 0; i--) {
      if (featureRefs[i].inView) {
        setActiveFeatureIndex(i);
        break;
      }
    }
  }, [featureRefs.map((ref) => ref.inView)]);

  const getVisualContent = (feature: FeatureItem) => {
    switch (feature.visualType) {
      case "color":
        return (
          <div
            className={`h-full w-full rounded-lg ${feature.visualContent}`}
          />
        );
      case "image":
        return (
          <img
            src={feature.visualContent}
            alt={feature.title}
            className="h-full w-full rounded-lg object-contain"
          />
        );
      case "video":
        return (
          <video
            src={feature.visualContent}
            autoPlay
            loop
            muted
            className="h-full w-full rounded-lg object-cover"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${className}`}>
      <div className="container mx-auto px-4">
        {/* Features Content */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Left Side - Features List */}
          <div className="flex-1">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                ref={featureRefs[index].ref}
                className="mb-8 flex min-h-[400px] flex-row items-start gap-5 last:mb-0 lg:mb-16 lg:min-h-[500px]"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Icon */}
                <motion.div
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center text-3xl transition-colors duration-300 ${
                    activeFeatureIndex === index
                      ? "text-color-primary"
                      : "text-color-placeholder"
                  }`}
                  animate={{
                    scale: activeFeatureIndex === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <i className={feature.icon}></i>
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <motion.h3
                    className={`mb-3 text-2xl font-semibold transition-colors duration-300 lg:text-3xl ${
                      activeFeatureIndex === index
                        ? "text-color-primary"
                        : "text-color-placeholder"
                    }`}
                    animate={{
                      opacity: activeFeatureIndex === index ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.title}
                  </motion.h3>

                  <motion.p
                    className="text-color-default mb-6 text-base leading-relaxed lg:text-lg"
                    animate={{
                      opacity: activeFeatureIndex === index ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.description}
                  </motion.p>

                  {/* Logos */}
                  <motion.div
                    className={`flex flex-row items-center gap-3 ${
                      activeFeatureIndex === index ? "" : "grayscale filter"
                    }`}
                    animate={{
                      opacity: activeFeatureIndex === index ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.logos.map((logo, logoIndex) => (
                      <Icon
                        key={`${feature.id}-logo-${logoIndex}`}
                        icon={`logos:${logo}`}
                        className="h-6 w-6"
                      />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Visual Content */}
          <div className="flex-1 lg:max-w-[36.25rem]">
            <motion.div
              className="sticky top-24 h-[250px] overflow-hidden sm:h-[350px] lg:top-32 lg:h-[500px]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative h-full w-full">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    className="absolute inset-0"
                    animate={{
                      opacity: activeFeatureIndex === index ? 1 : 0,
                      zIndex: activeFeatureIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {getVisualContent(feature)}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollBasedFeatures;
