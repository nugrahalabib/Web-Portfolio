import React from 'react';

interface BarcodeProps {
  value?: string;
  className?: string;
  height?: number;
  textColor?: string;
}

export const Barcode: React.FC<BarcodeProps> = ({ 
  value = "PORTFOLIO-2026", 
  className = "", 
  height = 40,
  textColor = "text-brand-black"
}) => {
  // Custom static sequence of widths for rendering the barcode lines
  const barPattern = [
    2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 2, 1, 4, 2, 1, 3, 2, 1, 1, 3, 2, 4, 1, 2, 1, 2, 3, 1, 1, 4, 2, 1, 3
  ];

  const totalWidth = barPattern.reduce((sum, w) => sum + w, 0);

  return (
    <div className={`flex flex-col select-none font-mono ${className}`}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${totalWidth} 40`}
        preserveAspectRatio="none"
        className={`fill-current ${textColor}`}
      >
        <g>
          {barPattern.map((width, idx) => {
            if (idx % 2 === 0) {
              const xOffset = barPattern.slice(0, idx).reduce((sum, w) => sum + w, 0);
              return (
                <rect
                  key={idx}
                  x={xOffset}
                  y="0"
                  width={width}
                  height="100%"
                />
              );
            }
            return null;
          })}
        </g>
      </svg>
      <span className="text-[9px] tracking-[0.3em] mt-1 text-brand-text-secondary uppercase text-center">
        *{value}*
      </span>
    </div>
  );
};
