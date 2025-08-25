import React, { useEffect } from 'react';

interface PlusUIWrapperProps {
  children: React.ReactNode;
}

const PlusUIWrapper: React.FC<PlusUIWrapperProps> = ({ children }) => {
  useEffect(() => {
    import('@plusui/library/cdn/components/index.js');
  }, []);

  return <>{children}</>;
};

export default PlusUIWrapper;
