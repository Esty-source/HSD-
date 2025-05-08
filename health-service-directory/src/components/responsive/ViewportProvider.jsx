import React, { createContext, useContext, useState, useEffect } from 'react';

// Define breakpoints that match Tailwind's default breakpoints
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

const ViewportContext = createContext({
  width: typeof window !== 'undefined' ? window.innerWidth : 0,
  height: typeof window !== 'undefined' ? window.innerHeight : 0,
  isMobile: false,
  isTablet: false,
  isDesktop: false
});

export function ViewportProvider({ children }) {
  // Initialize with window dimensions or fallback values for SSR
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  useEffect(() => {
    // Update viewport dimensions on mount
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Check for mobile user agent as a fallback
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(userAgent);
      
      // Determine device type based on width and user agent
      const isMobile = width < breakpoints.md || isMobileDevice;
      const isTablet = !isMobile && width >= breakpoints.md && width < breakpoints.lg;
      const isDesktop = !isMobile && !isTablet && width >= breakpoints.lg;
      
      // Log viewport info for debugging
      console.log('Viewport Info:', { width, height, isMobile, isTablet, isDesktop, userAgent });
      
      setViewport({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop
      });
    };

    // Set initial values
    updateViewport();

    // Add event listener for resize
    window.addEventListener('resize', updateViewport);
    
    // Clean up
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return (
    <ViewportContext.Provider value={viewport}>
      {children}
    </ViewportContext.Provider>
  );
}

// Custom hook to use the viewport context
export function useViewport() {
  return useContext(ViewportContext);
}
