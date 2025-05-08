import React from 'react';
import { useViewport } from './ViewportProvider';

/**
 * A responsive container that adapts its padding and width based on screen size
 */
export function ResponsiveContainer({ children, className = '', fullWidth = false }) {
  const { isMobile, isTablet } = useViewport();
  
  // Determine padding based on screen size
  const padding = isMobile ? 'px-4' : isTablet ? 'px-6' : 'px-8';
  
  // Determine max width based on fullWidth prop
  const maxWidth = fullWidth ? 'max-w-full' : 'max-w-7xl';
  
  return (
    <div className={`w-full mx-auto ${padding} ${maxWidth} ${className}`}>
      {children}
    </div>
  );
}

/**
 * A responsive grid that adjusts columns based on screen size
 */
export function ResponsiveGrid({ 
  children, 
  className = '', 
  mobileColumns = 1, 
  tabletColumns = 2, 
  desktopColumns = 3,
  gap = 4
}) {
  const { isMobile, isTablet } = useViewport();
  
  // Determine grid columns based on screen size
  const columns = isMobile 
    ? mobileColumns 
    : isTablet 
      ? tabletColumns 
      : desktopColumns;
  
  // Convert gap number to Tailwind class (gap-4 -> "gap-4")
  const gapClass = `gap-${gap}`;
  
  return (
    <div 
      className={`grid grid-cols-${columns} ${gapClass} ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
}

/**
 * A component that conditionally renders content based on screen size
 */
export function Responsive({ 
  children, 
  mobileContent, 
  tabletContent, 
  desktopContent 
}) {
  const { isMobile, isTablet, isDesktop } = useViewport();
  
  if (isMobile && mobileContent) {
    return mobileContent;
  }
  
  if (isTablet && tabletContent) {
    return tabletContent;
  }
  
  if (isDesktop && desktopContent) {
    return desktopContent;
  }
  
  // Default to children if no specific content is provided for the current viewport
  return children;
}
