"use client";

import { useState } from 'react';

interface ComparisonFeature {
  name: string;
  hasTooltip?: boolean;
  values: {
    community: string | boolean;
    pro: string | boolean;
    premium: string | boolean;
    enterprise: string | boolean;
  };
}

interface ComparisonCategory {
  id: string;
  title: string;
  features: ComparisonFeature[];
}

interface Props {
  categories: ComparisonCategory[];
}

export default function ComparisonAccordion({ categories }: Props) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['design-system']));

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className="flex items-center justify-center">
          <i className="fa-solid fa-check text-base sm:text-lg lg:text-xl text-color-primary"></i>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <i className="fa-solid fa-minus text-sm sm:text-base lg:text-lg text-color-caption"></i>
        </div>
      );
    }

    if (value === 'Custom') {
      return (
        <div className="flex items-center justify-center">
          <span className="text-xs sm:text-sm lg:text-base font-semibold text-color-default">{value}</span>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center">
        <span className="text-xs sm:text-sm lg:text-base font-normal text-color-default">{value}</span>
      </div>
    );
  };

  return (
    <div className="bg-color-surface flex flex-col gap-2 w-full">
      {/* Header */}
      <div className="hidden lg:flex items-start w-full">
        {/* Plan names section */}
        <div className="flex items-center px-0 py-8 w-[360px]">
          <div className="flex flex-col items-center justify-center w-[235px]">
            <div className="flex items-center justify-center w-full">
              <h2 className="text-4xl font-bold text-color-default">Compare plans</h2>
            </div>
          </div>
        </div>

        {/* Plans grid */}
        <div className="flex-1 flex">
          {/* Community */}
          <div className="flex-1 flex flex-col gap-6 px-5 py-8">
            <div className="flex flex-col">
              <div className="flex flex-col gap-2.5">
                <h3 className="text-xl font-semibold text-color-default">Community</h3>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5 w-full">
                  <span className="text-3xl font-semibold text-color-disabled">$0/mo</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <button className="cursor-pointer flex items-center justify-center gap-2.5 min-h-9 px-2 sm:px-3 py-2 rounded bg-color-surface border border-color-default text-sm lg:text-base font-medium text-color-default">
                Start for free
              </button>
            </div>
          </div>

          {/* Pro */}
          <div className="flex-1 flex flex-col gap-6 px-5 py-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-gem text-xl text-color-info"></i>
                <h3 className="text-xl font-semibold text-color-default">Pro</h3>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5 w-full">
                  <span className="text-3xl font-semibold text-color-disabled">$15/mo</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <button className="cursor-pointer flex items-center justify-center gap-2.5 min-h-9 px-2 sm:px-3 py-2 rounded bg-color-primary-default text-sm lg:text-base font-medium text-color-base">
                Get Started
              </button>
            </div>
          </div>

          {/* Premium */}
          <div className="flex-1 flex flex-col gap-6 px-5 py-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-gem text-xl text-color-danger"></i>
                <h3 className="text-xl font-semibold text-color-default">Premium</h3>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5 w-full">
                  <span className="text-3xl font-semibold text-color-disabled">$24/mo</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <button className="cursor-pointer flex items-center justify-center gap-2.5 min-h-9 px-2 sm:px-3 py-2 rounded bg-color-primary-default text-sm lg:text-base font-medium text-color-base">
                Get Started
              </button>
            </div>
          </div>

          {/* Enterprise */}
          <div className="flex-1 flex flex-col gap-6 px-5 py-8">
            <div className="flex flex-col">
              <div className="flex flex-col gap-2.5">
                <h3 className="text-xl font-semibold text-color-default">Enterprise</h3>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5 w-full">
                  <span className="text-3xl font-semibold text-color-disabled">Custom</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <button className="cursor-pointer flex items-center justify-center gap-2.5 min-h-9 px-2 sm:px-3 py-2 rounded bg-color-surface border border-color-default text-sm lg:text-base font-medium text-color-default">
                Get contact
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden text-center py-6 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-color-default">Compare plans</h2>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-2">
        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category.id);

          return (
            <div key={category.id} className="flex flex-col">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="bg-color-default-default flex items-center gap-2 px-3 sm:px-4 py-3 rounded w-full cursor-pointer"
              >
                <div className="flex items-center justify-center w-6 h-6">
                  <i className={`fa-solid fa-angle-up text-sm sm:text-base text-color-caption transition-transform duration-200 ${isExpanded ? 'rotate-0' : 'rotate-180'}`}></i>
                </div>
                <div className="flex flex-col gap-3 items-start justify-center">
                  <div className="flex items-center gap-3 w-full">
                    <h3 className="text-lg sm:text-xl font-semibold text-color-default">{category.title}</h3>
                  </div>
                </div>
              </button>

              {/* Category Features */}
              {isExpanded && (
                <div className="flex flex-col">
                  {category.features.map((feature, index) => (
                    <div key={index}>
                      {/* Desktop Layout */}
                      <div className="hidden lg:flex items-center gap-2 px-4 py-2.5 w-full">
                        {/* Feature name */}
                        <div className="flex flex-col gap-3 items-start justify-center w-[344px]">
                          <div className="flex items-center gap-3 w-full">
                            <span className="text-lg font-normal text-color-loading">{feature.name}</span>
                            {feature.hasTooltip && (
                              <i className="fa-regular fa-circle-question text-lg text-color-caption"></i>
                            )}
                          </div>
                        </div>

                        {/* Community value */}
                        <div className="flex-1 flex items-center justify-center min-h-0 min-w-0">
                          {renderFeatureValue(feature.values.community)}
                        </div>

                        {/* Pro value */}
                        <div className="flex-1 flex items-center justify-center min-h-0 min-w-0">
                          {renderFeatureValue(feature.values.pro)}
                        </div>

                        {/* Premium value */}
                        <div className="flex-1 flex items-center justify-center min-h-0 min-w-0">
                          {renderFeatureValue(feature.values.premium)}
                        </div>

                        {/* Enterprise value */}
                        <div className="flex-1 flex items-center justify-center min-h-0 min-w-0">
                          {renderFeatureValue(feature.values.enterprise)}
                        </div>
                      </div>

                      {/* Mobile Layout */}
                      <div className="lg:hidden px-3 py-3">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm sm:text-base font-medium text-color-default">{feature.name}</span>
                          {feature.hasTooltip && (
                            <i className="fa-regular fa-circle-question text-sm text-color-caption"></i>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-color-caption">Community</span>
                            {renderFeatureValue(feature.values.community)}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-color-caption">Pro</span>
                            {renderFeatureValue(feature.values.pro)}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-color-caption">Premium</span>
                            {renderFeatureValue(feature.values.premium)}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-color-caption">Enterprise</span>
                            {renderFeatureValue(feature.values.enterprise)}
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      {index < category.features.length - 1 && (
                        <div className="flex items-center justify-center w-full">
                          <div className="flex-1 h-px bg-color-divider"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}