import React from 'react';

interface BrandGridWatermarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  opacity?: string;
}

/**
 * JustCo Brand System: Modular 3×3 Grid Logo Mark Watermark
 * Features Dodger Blue (#21B5FF), Blue Charcoal (#000105), and Light/Medium Grey squares
 */
export const BrandGridWatermark: React.FC<BrandGridWatermarkProps> = ({
  className = 'absolute top-3 right-3 pointer-events-none select-none',
  size = 'md',
  opacity = 'opacity-35 hover:opacity-50 transition-opacity',
}) => {
  const squareSize = size === 'sm' ? 'w-1 h-1' : size === 'lg' ? 'w-2 h-2' : 'w-1.5 h-1.5';
  const gapSize = size === 'sm' ? 'gap-0.5' : size === 'lg' ? 'gap-1' : 'gap-0.5';

  const gridCells = [
    'bg-[#21B5FF]',   'bg-slate-400',   'bg-[#000105]',
    'bg-slate-300',   'bg-[#21B5FF]',   'bg-slate-500',
    'bg-[#000105]',   'bg-[#21B5FF]',   'bg-slate-300',
  ];

  return (
    <div className={`grid grid-cols-3 ${gapSize} ${opacity} ${className}`} aria-hidden="true">
      {gridCells.map((colorClass, idx) => (
        <div key={idx} className={`${squareSize} rounded-[1px] ${colorClass}`} />
      ))}
    </div>
  );
};
