import React from 'react';

interface TechCornerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}

export const TechCorner: React.FC<TechCornerProps> = ({ 
  position, 
  className = "", 
  size = 8 
}) => {
  const getStyle = () => {
    switch (position) {
      case 'top-left':
        return `border-t border-l left-0 top-0`;
      case 'top-right':
        return `border-t border-r right-0 top-0`;
      case 'bottom-left':
        return `border-b border-l left-0 bottom-0`;
      case 'bottom-right':
        return `border-b border-r right-0 bottom-0`;
    }
  };

  return (
    <div 
      className={`absolute ${getStyle()} ${className.includes('border-') ? '' : 'border-brand-black'} ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};
