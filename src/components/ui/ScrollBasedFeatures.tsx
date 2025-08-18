import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  logos: Array<{
    src: string;
    alt: string;
    className?: string;
  }>;
  visualType: 'color' | 'image' | 'video';
  visualContent: string;
}

interface ScrollBasedFeaturesProps {
  features: FeatureItem[];
  className?: string;
}

const ScrollBasedFeatures: React.FC<ScrollBasedFeaturesProps> = ({
  features,
  className = ''
}) => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  
  // Her feature için intersection observer
  const featureRefs = features.map(() => {
    return useInView({
      threshold: 0.3,
      rootMargin: '-30% 0px -30% 0px'
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
  }, [featureRefs.map(ref => ref.inView)]);

  const getVisualContent = (feature: FeatureItem) => {
    switch (feature.visualType) {
      case 'color':
        return (
          <div 
            className={`h-full w-full rounded-lg ${feature.visualContent}`}
          />
        );
      case 'image':
        return (
          <img 
            src={feature.visualContent} 
            alt={feature.title}
            className="h-full w-full object-cover rounded-lg"
          />
        );
      case 'video':
        return (
          <video 
            src={feature.visualContent} 
            autoPlay 
            loop 
            muted 
            className="h-full w-full object-cover rounded-lg"
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
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Side - Features List */}
          <div className="flex-1">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                ref={featureRefs[index].ref}
                className="flex flex-row gap-5 min-h-[400px] lg:min-h-[500px] items-start mb-8 lg:mb-16 last:mb-0"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Icon */}
                <motion.div 
                  className={`flex h-9 w-9 items-center justify-center text-3xl transition-colors duration-300 flex-shrink-0 ${
                    activeFeatureIndex === index ? 'text-color-primary' : 'text-color-placeholder'
                  }`}
                  animate={{
                    scale: activeFeatureIndex === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <i className={feature.icon}></i>
                </motion.div>

                {/* Content */}
                <div className="flex-1 ">
                  <motion.h3 
                    className={`mb-3 text-2xl lg:text-3xl font-semibold transition-colors duration-300 ${
                      activeFeatureIndex === index ? 'text-color-primary' : 'text-color-placeholder'
                    }`}
                    animate={{
                      opacity: activeFeatureIndex === index ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-color-default mb-6 text-base lg:text-lg leading-relaxed"
                    animate={{
                      opacity: activeFeatureIndex === index ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.description}
                  </motion.p>
                  
                  {/* Logos */}
                  <motion.div 
                    className="flex flex-row items-center gap-2 grayscale filter"
                    animate={{
                      opacity: activeFeatureIndex === index ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.logos.map((logo, logoIndex) => (
                      <img
                        key={logoIndex}
                        src={logo.src}
                        alt={logo.alt}
                        className={logo.className || "h-7 w-7"}
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
              className="sticky top-24 lg:top-32 h-[250px] sm:h-[350px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg"
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
                      zIndex: activeFeatureIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {getVisualContent(feature)}
                    
                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </motion.div>
                ))}
              </div>
              
              {/* Progress Indicator */}
              {/* <div className="absolute bottom-3 left-3 right-3 lg:bottom-4 lg:left-4 lg:right-4">
                <div className="flex space-x-1.5 lg:space-x-2">
                  {features.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-0.5 lg:h-1 rounded-full transition-all duration-500 ${
                        activeFeatureIndex === index 
                          ? 'bg-white flex-1 shadow-sm' 
                          : 'bg-white/40 w-6 lg:w-8'
                      }`}
                      animate={{
                        width: activeFeatureIndex === index ? 'auto' : '1.5rem',
                        opacity: activeFeatureIndex === index ? 1 : 0.6
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div> */}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollBasedFeatures;
