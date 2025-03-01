import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';

interface StoreSelectorProps {
  onStoreChange?: (storeId: string) => void;
}

const StoreSelector: React.FC<StoreSelectorProps> = ({ onStoreChange }) => {
  const { user, getAccessibleStores } = useAuth();
  const { currentStore, setCurrentStore } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const stores = getAccessibleStores();
  const isSingleStore = stores.length <= 1;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStoreChange = (store: { id: string; name: string }) => {
    setCurrentStore(store);
    setIsOpen(false);
    if (onStoreChange) {
      onStoreChange(store.id);
    }
  };

  // If no stores or user is not authenticated, don't render anything
  if (!user || stores.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !isSingleStore && setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        disabled={isSingleStore}
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {currentStore?.name || 'Şirket Seçin'}
        </span>
        {!isSingleStore && (
          <svg
            className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {isOpen && !isSingleStore && (
        <div className="fixed md:absolute md:right-0 mt-2 w-56 rounded-md shadow-xl bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-blue-600 z-[1000]" style={{ top: "40px", left: "0", right: "auto", marginLeft: "10px" }}>
          <div className="py-1" role="menu" aria-orientation="vertical">
            {stores.map((store) => (
              <button
                key={store.id}
                onClick={() => handleStoreChange(store)}
                className={`block w-full text-left px-4 py-3 text-base ${
                  currentStore?.id === store.id
                    ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 font-medium'
                    : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                role="menuitem"
              >
                {store.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreSelector;