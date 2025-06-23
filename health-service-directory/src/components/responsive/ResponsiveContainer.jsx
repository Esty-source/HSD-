import React, { useEffect } from 'react';
import { useViewport } from './ViewportProvider';

/**
 * A responsive container that adapts its padding and width based on screen size
 */
export function ResponsiveContainer({ 
  children, 
  className = '', 
  fullWidth = false,
  padding = true,
  maxWidth = '7xl'
}) {
  const { isMobile, isTablet, deviceType } = useViewport();
  
  // Determine padding based on screen size
  const getPadding = () => {
    if (!padding) return 'px-0';
    switch (deviceType) {
      case 'mobile-small':
        return 'px-2';
      case 'mobile':
        return 'px-3';
      case 'mobile-large':
        return 'px-4';
      case 'tablet':
        return 'px-6';
      default:
        return 'px-8';
    }
  };
  
  // Determine max width based on maxWidth prop
  const getMaxWidth = () => {
    if (fullWidth) return 'w-screen max-w-[100vw] overflow-x-hidden';
    switch (maxWidth) {
      case 'sm':
        return 'max-w-sm';
      case 'md':
        return 'max-w-md';
      case 'lg':
        return 'max-w-lg';
      case 'xl':
        return 'max-w-xl';
      case '2xl':
        return 'max-w-2xl';
      case '3xl':
        return 'max-w-3xl';
      case '4xl':
        return 'max-w-4xl';
      case '5xl':
        return 'max-w-5xl';
      case '6xl':
        return 'max-w-6xl';
      case '7xl':
        return 'max-w-7xl';
      default:
        return 'max-w-7xl';
    }
  };
  
  return (
    <div className={`w-full mx-0 ${getPadding()} ${getMaxWidth()} ${className}`}>
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
  gap = 4,
  autoFit = false,
  minColumnWidth = 250
}) {
  const { isMobile, isTablet, deviceType } = useViewport();
  
  // Determine grid columns based on screen size
  const getColumns = () => {
    if (autoFit) {
      return `repeat(auto-fit, minmax(${minColumnWidth}px, 1fr))`;
    }
    
    const columns = isMobile 
      ? mobileColumns 
      : isTablet 
        ? tabletColumns 
        : desktopColumns;
    
    return `repeat(${columns}, minmax(0, 1fr))`;
  };
  
  // Convert gap number to Tailwind class (gap-4 -> "gap-4")
  const gapClass = `gap-${gap}`;
  
  return (
    <div 
      className={`grid ${gapClass} ${className}`}
      style={{ 
        gridTemplateColumns: getColumns(),
        gap: `${gap * 0.25}rem`
      }}
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
  desktopContent,
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false
}) {
  const { isMobile, isTablet, isDesktop } = useViewport();
  
  // Handle hiding content based on screen size
  if (hideOnMobile && isMobile) return null;
  if (hideOnTablet && isTablet) return null;
  if (hideOnDesktop && isDesktop) return null;
  
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

/**
 * A component that provides responsive spacing
 */
export function ResponsiveSpacing({
  children,
  className = '',
  mobile = 4,
  tablet = 6,
  desktop = 8
}) {
  const { isMobile, isTablet } = useViewport();
  
  const spacing = isMobile ? mobile : isTablet ? tablet : desktop;
  
  return (
    <div className={`p-${spacing} ${className}`}>
      {children}
    </div>
  );
}
