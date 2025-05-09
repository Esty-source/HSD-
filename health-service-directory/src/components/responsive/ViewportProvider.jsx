import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for viewport information with safe default values
const ViewportContext = createContext({
  width: 1024, // Default to desktop size
  height: 768,
  isMobile: false,
  isTablet: false,
  isDesktop: true, // Default to desktop
  isTouchDevice: false,
  deviceType: 'desktop'
});

// Define breakpoints (can be customized based on your design needs)
const breakpoints = {
  xs: 480,   // Extra small devices (phones)
  sm: 640,   // Small devices (large phones)
  md: 768,   // Medium devices (tablets)
  lg: 1024,  // Large devices (desktops)
  xl: 1280,  // Extra large devices
  xxl: 1536  // Extra extra large devices
};

export const ViewportProvider = ({ children }) => {
  console.log('ViewportProvider: Component initializing');
  
  // Initialize with safe default values
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    deviceType: 'desktop'
  });

  // Function to detect touch device
  const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    
    try {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0 ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)
      );
    } catch (error) {
      console.error('Error detecting touch device:', error);
      return false;
    }
  };

  // Function to detect mobile device from user agent
  const isMobileUserAgent = () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
    
    try {
      const ua = navigator.userAgent.toLowerCase();
      return (
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|mobile safari|samsung|lg|nokia/i.test(ua) ||
        (/safari/.test(ua) && /apple computer/.test(ua) && !/chrome/.test(ua) && isTouchDevice())
      );
    } catch (error) {
      console.error('Error detecting mobile user agent:', error);
      return false;
    }
  };

  // Function to get device type
  const getDeviceType = (width, isMobileUA, isTouchDev) => {
    // First check user agent for mobile devices
    if (isMobileUA) {
      return width < breakpoints.sm ? 'mobile-small' : 
             width < breakpoints.md ? 'mobile-large' : 'tablet';
    }
    
    // Then check screen size
    if (width < breakpoints.md) {
      return isTouchDev ? 'mobile' : 'small-desktop';
    } else if (width < breakpoints.lg) {
      return isTouchDev ? 'tablet' : 'desktop';
    } else {
      return 'desktop';
    }
  };

  // Function to update viewport dimensions and device type
  const updateViewport = () => {
    try {
      if (typeof window === 'undefined') {
        console.log('ViewportProvider: Window is undefined');
        return;
      }
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      const touchDevice = isTouchDevice();
      const mobileUA = isMobileUserAgent();
      const deviceType = getDeviceType(width, mobileUA, touchDevice);
      
      // Determine device categories
      const isMobile = deviceType.includes('mobile') || width < breakpoints.md;
      const isTablet = deviceType === 'tablet' || (width >= breakpoints.md && width < breakpoints.lg);
      const isDesktop = deviceType === 'desktop' || width >= breakpoints.lg;
      
      // Debug information
      console.log(`ViewportProvider: width=${width}, height=${height}, deviceType=${deviceType}, isMobile=${isMobile}, isTablet=${isTablet}, isDesktop=${isDesktop}, touchDevice=${touchDevice}, mobileUA=${mobileUA}`);
      
      setViewport({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        isTouchDevice: touchDevice,
        deviceType
      });
    } catch (error) {
      console.error('ViewportProvider: Error updating viewport', error);
      // Keep using default values on error
    }
  };

  // Update viewport on mount and when window is resized
  useEffect(() => {
    console.log('ViewportProvider: Setting up effect');
    
    // Only run in browser environment
    if (typeof window === 'undefined') {
      console.log('ViewportProvider: Window is undefined, skipping effect');
      return;
    }
    
    try {
      // Initial update
      updateViewport();
      
      // Add event listener for resize
      window.addEventListener('resize', updateViewport);
      console.log('ViewportProvider: Added resize listener');
      
      // Add orientation change listener for mobile devices
      window.addEventListener('orientationchange', updateViewport);
      console.log('ViewportProvider: Added orientation change listener');
      
      // Cleanup event listeners on unmount
      return () => {
        window.removeEventListener('resize', updateViewport);
        window.removeEventListener('orientationchange', updateViewport);
        console.log('ViewportProvider: Removed event listeners');
      };
    } catch (error) {
      console.error('ViewportProvider: Error in effect setup', error);
      // Continue rendering children even if viewport detection fails
    }
  }, []);

  console.log('ViewportProvider: Rendering with viewport', viewport);
  
  // Always render children, even if there's an error
  return (
    <ViewportContext.Provider value={viewport}>
      {children}
    </ViewportContext.Provider>
  );
};

// Custom hook to use the viewport context
export const useViewport = () => {
  const context = useContext(ViewportContext);
  console.log('useViewport hook called, returning:', context);
  return context;
};
