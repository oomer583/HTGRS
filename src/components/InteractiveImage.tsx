import React, { useState } from 'react';

interface InteractiveImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function InteractiveImage({ src, alt, className = "" }: InteractiveImageProps) {
  const [displayMode, setDisplayMode] = useState<'default' | 'gray' | 'color'>('default');

  const handleClick = (e: React.MouseEvent) => {
    // Engelleme yapmıyoruz ki linkler çalışabilsin ama stil değişsin
    if (e.shiftKey) {
      setDisplayMode('color');
    } else {
      setDisplayMode('gray');
    }
  };

  const getFilterClass = () => {
    if (displayMode === 'gray') return 'grayscale brightness-100';
    if (displayMode === 'color') return 'grayscale-0 brightness-100';
    return 'grayscale-0 brightness-100 group-hover:brightness-90';
  };

  return (
    <img 
      src={src} 
      alt={alt}
      onClick={handleClick}
      className={`${className} transition-all duration-700 cursor-pointer ${getFilterClass()}`}
    />
  );
}
