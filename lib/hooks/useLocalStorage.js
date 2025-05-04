// lib/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

/**
 * Custom hook for using localStorage with React state
 * @param {string} key - The localStorage key to store the value under
 * @param {any} initialValue - The initial value to use if no value exists in localStorage
 * @returns {[any, (value: any) => void, () => void]} - [storedValue, setValue, removeValue]
 */
const useLocalStorage = (key, initialValue) => {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue; // Return initial value on SSR
    }
    
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error, return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  // Return a wrapped version of useState's setter function that 
  // persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function (like React's setState)
      const valueToStore = 
        value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // Dispatch a custom event so other components can listen for changes
        window.dispatchEvent(new Event('local-storage'));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };
  
  // Function to remove the item from localStorage
  const removeValue = () => {
    try {
      // Remove from localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        setStoredValue(initialValue);
        
        // Dispatch a custom event so other components can listen for changes
        window.dispatchEvent(new Event('local-storage'));
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };
  
  // Listen for changes to this localStorage value in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          // Update state with new value
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Error parsing localStorage change for key "${key}":`, error);
        }
      }
    };
    
    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);
    // Listen for our custom local-storage event
    window.addEventListener('local-storage', () => {
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.error(`Error handling local-storage event for key "${key}":`, error);
      }
    });
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [key, initialValue]);
  
  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;