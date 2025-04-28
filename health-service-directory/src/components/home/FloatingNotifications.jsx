import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeartIcon,
  SparklesIcon,
  UserIcon,
  ChatBubbleLeftIcon,
  BellIcon,
  CheckCircleIcon,
  ClockIcon,
  FireIcon,
  BeakerIcon,
  SunIcon,
  ShieldCheckIcon,
  MapIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

// Sample data for different notification types - Tailored to Cameroon
const healthTips = [
  { 
    id: 'tip1', 
    content: 'Stay hydrated in the Cameroon heat by drinking at least 2 liters of water daily.',
    icon: <HeartIcon className="h-5 w-5" />,
    type: 'tip'
  },
  { 
    id: 'tip2', 
    content: 'Protect against malaria by using insecticide-treated bed nets every night.',
    icon: <ShieldCheckIcon className="h-5 w-5" />,
    type: 'tip'
  },
  { 
    id: 'tip3', 
    content: 'Include local vegetables like bitter leaf (ndolé) in your diet for essential vitamins.',
    icon: <MapIcon className="h-5 w-5" />,
    type: 'tip'
  },
  { 
    id: 'tip4', 
    content: 'Regular check-ups can help detect conditions like hypertension early.',
    icon: <ClockIcon className="h-5 w-5" />,
    type: 'tip'
  },
  { 
    id: 'tip5', 
    content: 'Wash hands regularly to prevent typhoid and other waterborne diseases.',
    icon: <SparklesIcon className="h-5 w-5" />,
    type: 'tip'
  },
];

const mealPlans = [
  { 
    id: 'meal1', 
    content: 'Breakfast: Pap corn (bouillie de maïs) with fresh fruits and peanuts',
    icon: <FireIcon className="h-5 w-5" />,
    type: 'meal'
  },
  { 
    id: 'meal2', 
    content: 'Lunch: Ndolé with plantains and grilled fish - rich in proteins and vitamins',
    icon: <SunIcon className="h-5 w-5" />,
    type: 'meal'
  },
  { 
    id: 'meal3', 
    content: 'Dinner: Light eru soup with water fufu - balanced and nutritious',
    icon: <BeakerIcon className="h-5 w-5" />,
    type: 'meal'
  },
  { 
    id: 'meal4', 
    content: 'Snack: Fresh papaya and avocado - excellent source of vitamins',
    icon: <BeakerIcon className="h-5 w-5" />,
    type: 'meal'
  },
];

const doctorUpdates = [
  { 
    id: 'doc1', 
    content: 'Dr. Nkeng from Bamenda Regional Hospital now offers telemedicine consultations.',
    icon: <UserIcon className="h-5 w-5" />,
    type: 'doctor'
  },
  { 
    id: 'doc2', 
    content: 'New pediatric specialist, Dr. Fomba, now available at Yaoundé Central Hospital.',
    icon: <BellIcon className="h-5 w-5" />,
    type: 'doctor'
  },
  { 
    id: 'doc3', 
    content: 'Dr. Mbarga\'s diabetes clinic in Douala is accepting new patients this month.',
    icon: <CheckCircleIcon className="h-5 w-5" />,
    type: 'doctor'
  },
  { 
    id: 'doc4', 
    content: 'New vaccination clinic opened at Central Hospital Yaoundé',
    icon: <ShieldCheckIcon className="h-5 w-5" />,
    type: 'doctor'
  },
];

const reviews = [
  { 
    id: 'rev1', 
    content: '"The telemedicine service helped me connect with specialists from Douala while in Bamenda!" - Ngono M.',
    icon: <ChatBubbleLeftIcon className="h-5 w-5" />,
    type: 'review'
  },
  { 
    id: 'rev2', 
    content: '"Dr. Kouam Grace at Biyem-Assi Hospital provided excellent care for my family." - Tamba P.',
    icon: <ChatBubbleLeftIcon className="h-5 w-5" />,
    type: 'review'
  },
  { 
    id: 'rev3', 
    content: '"The health records system helped doctors access my history during an emergency." - Fokam J.',
    icon: <StarIcon className="h-5 w-5" />,
    type: 'review'
  },
  { 
    id: 'rev4', 
    content: '"The health records system helped doctors access my history during an emergency." - Fokam J.',
    icon: <CheckCircleIcon className="h-5 w-5" />,
    type: 'review'
  },
];

// Combine all notification types
const allNotifications = [
  ...healthTips.map(tip => ({ ...tip, type: 'tip' })),
  ...mealPlans.map(meal => ({ ...meal, type: 'meal' })),
  ...doctorUpdates.map(update => ({ ...update, type: 'doctor' })),
  ...reviews.map(review => ({ ...review, type: 'review' })),
];

// Generate positions from the sides of the page
const generateSidePosition = () => {
  // Only use left and right sides of the page
  const sides = [
    // Left side positions (0% from left, various heights)
    { x: 0, y: Math.floor(Math.random() * 60) + 20 },
    // Right side positions (100% from left, various heights)
    { x: 100, y: Math.floor(Math.random() * 60) + 20 },
  ];
  
  // Randomly select one of the sides
  const position = sides[Math.floor(Math.random() * sides.length)];
  
  return {
    x: `${position.x}%`,
    y: `${position.y}%`,
    initialX: position.x === 0 ? '-100%' : '100%',
    initialY: '0px',
    side: position.x === 0 ? 'left' : 'right'
  };
};

const FloatingNotification = ({ notification, onClose, position }) => {
  // Get animation properties based on which side the notification comes from
  const getAnimationProps = () => {
    return position.side === 'left' ? { x: -120 } : { x: 120 };
  };

  // Get position styles
  const getPositionStyles = () => {
    const styles = {
      top: position.y,
    };
    
    if (position.side === 'left') {
      styles.left = '0';
      styles.transform = 'translateY(-50%)';
    } else {
      styles.right = '0';
      styles.transform = 'translateY(-50%)';
    }
    
    return styles;
  };

  // Determine icon background color based on notification type
  const getIconBgClass = () => {
    switch(notification.type) {
      case 'tip':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'meal':
        return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'doctor':
        return 'bg-gradient-to-r from-purple-500 to-purple-600';
      case 'review':
        return 'bg-gradient-to-r from-teal-500 to-teal-600';
      default:
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, ...getAnimationProps() }}
      animate={{ 
        opacity: 0.98, 
        scale: 1,
        x: 0,
        y: [0, -5, 0], // Add a small bounce effect
        transition: { 
          type: 'spring', 
          stiffness: 300, 
          damping: 20,
          y: {
            repeat: 2,
            duration: 0.5,
            ease: "easeInOut"
          }
        }
      }}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.8, 
        ...getAnimationProps(),
        transition: { duration: 0.4 }
      }}
      className="fixed z-40 flex items-center max-w-[220px] cursor-pointer pointer-events-auto"
      onClick={onClose}
      style={getPositionStyles()}
    >
      <div className="overflow-hidden rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 flex">
        <div className={`${getIconBgClass()} text-white p-3 flex items-center justify-center`}>
          <div className="h-6 w-6">
            {notification.icon}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 pl-4 pr-4 rounded-r-lg">
          <p className="text-xs font-medium text-gray-800 dark:text-white leading-tight">
            {notification.content}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const FloatingNotifications = () => {
  const [activeNotifications, setActiveNotifications] = useState([]);
  const [usedNotificationIds, setUsedNotificationIds] = useState([]);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [scrollThreshold, setScrollThreshold] = useState(300); // Minimum scroll before new notification
  const [isAddingNotification, setIsAddingNotification] = useState(false);

  // Function to get a random notification that hasn't been shown recently
  const getRandomNotification = () => {
    const availableNotifications = allNotifications.filter(
      notification => !usedNotificationIds.includes(notification.id)
    );
    
    // If all notifications have been used, reset the used list
    if (availableNotifications.length === 0) {
      setUsedNotificationIds([]);
      return allNotifications[Math.floor(Math.random() * allNotifications.length)];
    }
    
    return availableNotifications[Math.floor(Math.random() * availableNotifications.length)];
  };

  // Function to add a new notification
  const addNotification = () => {
    // Only add a notification if we have less than 2 active ones and not currently adding
    if (activeNotifications.length < 2 && !isAddingNotification) {
      setIsAddingNotification(true);
      
      const notification = getRandomNotification();
      const position = generateSidePosition();
      
      const newNotification = {
        ...notification,
        uniqueId: `${notification.id}-${Date.now()}`,
        position
      };
      
      // Add the notification to state
      setActiveNotifications(prev => [...prev, newNotification]);
      setUsedNotificationIds(prev => [...prev, notification.id]);
      
      // Remove the notification after 5 seconds
      setTimeout(() => {
        setActiveNotifications(prev => 
          prev.filter(item => item.uniqueId !== newNotification.uniqueId)
        );
      }, 5000); // Show for 5 seconds
      
      // Allow adding another notification after a delay
      setTimeout(() => {
        setIsAddingNotification(false);
      }, 3000); // Wait 3 seconds before allowing another notification
    }
  };

  // Add notifications when scrolling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      
      // Only trigger notification if user has scrolled enough since last notification
      if (Math.abs(currentScrollPosition - lastScrollPosition) > scrollThreshold) {
        // 20% chance to show notification when scroll threshold is met
        if (Math.random() < 0.2) {
          addNotification();
          setLastScrollPosition(currentScrollPosition);
          
          // Randomize the next scroll threshold
          setScrollThreshold(Math.floor(Math.random() * 300) + 200); // Between 200-500px
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollPosition, scrollThreshold, activeNotifications.length, isAddingNotification]);

  // Add initial notifications
  useEffect(() => {
    // Add first notification after a short delay
    const firstTimeout = setTimeout(() => {
      addNotification();
    }, 5000);
    
    return () => {
      clearTimeout(firstTimeout);
    };
  }, []);

  // Handle notification removal
  const handleClose = (uniqueId) => {
    setActiveNotifications(prev => 
      prev.filter(notification => notification.uniqueId !== uniqueId)
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {activeNotifications.map((notification) => (
          <FloatingNotification
            key={notification.uniqueId}
            notification={notification}
            position={notification.position}
            onClose={() => handleClose(notification.uniqueId)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingNotifications;
