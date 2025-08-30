import { useState } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

interface SingleAccordionProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function SingleAccordion({ 
  title, 
  content, 
  isOpen, 
  onToggle, 
  className = '' 
}: SingleAccordionProps) {
  return (
    <div className={`bg-color-surface rounded border border-color-default ${className}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer rounded focus:outline-none "
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-medium text-color-default ">
          {title}
        </h3>
        <div className="flex items-center justify-center w-7  leading-0">
          {/* <svg
            className={`w-4 h-4 text-color-default transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg> */}
          <div className={`w-4 h-4 text-color-default transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        </div>
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2">
          <div className="text-color-default">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ 
  items, 
  allowMultiple = false, 
  className = '' 
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      if (!allowMultiple) {
        newOpenItems.clear();
      }
      newOpenItems.add(itemId);
    }
    
    setOpenItems(newOpenItems);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => (
        <SingleAccordion
          key={item.id}
          title={item.title}
          content={item.content}
          isOpen={openItems.has(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
}
