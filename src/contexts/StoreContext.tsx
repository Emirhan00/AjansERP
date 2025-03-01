import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Store {
  id: string;
  name: string;
}

interface StoreContextType {
  currentStore: Store | null;
  setCurrentStore: (store: Store) => void;
  storeData: {
    projectStatus: { name: string; value: number; color: string }[];
    recentActivities: { id: string; action: string; project: string; user: string; time: string }[];
    upcomingDeadlines: { id: string; task: string; project: string; deadline: string }[];
  };
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

interface StoreProviderProps {
  children: ReactNode;
}

// Mock data for different stores
const storeSpecificData = {
  'store7': { // A Firması
    projectStatus: [
      { name: 'Zamanında', value: 8, color: '#10B981' },
      { name: 'Riskli', value: 1, color: '#F59E0B' },
      { name: 'Gecikmeli', value: 0, color: '#EF4444' },
      { name: 'Tamamlandı', value: 4, color: '#6366F1' },
    ],
    recentActivities: [
      { id: 'act1', action: 'Banner tasarımı tamamlandı', project: 'Banner Tasarımı', user: 'Emirhan Pirgon', time: '2 saat önce' },
      { id: 'act2', action: 'Ürün açıklamaları güncellendi', project: 'Trendyol Panel Yönetimi', user: 'Mustafa Yılmaz', time: '4 saat önce' },
      { id: 'act3', action: 'Yeni kampanya oluşturuldu', project: 'Trendyol Panel Yönetimi', user: 'Mustafa Yılmaz', time: '1 gün önce' },
    ],
    upcomingDeadlines: [
      { id: 'dead1', task: 'Ürün Görselleri Düzenleme', project: 'Trendyol Panel Yönetimi', deadline: '3 gün kaldı' },
      { id: 'dead2', task: 'Kampanya Oluşturma', project: 'Trendyol Panel Yönetimi', deadline: '5 gün kaldı' },
    ],
  },
  'store8': { // B Firması
    projectStatus: [
      { name: 'Zamanında', value: 6, color: '#10B981' },
      { name: 'Riskli', value: 2, color: '#F59E0B' },
      { name: 'Gecikmeli', value: 1, color: '#EF4444' },
      { name: 'Tamamlandı', value: 6, color: '#6366F1' },
    ],
    recentActivities: [
      { id: 'act4', action: 'Meta reklam ayarları tamamlandı', project: 'Meta Reklam Yönetimi', user: 'Mehmet Kaya', time: '1 saat önce' },
      { id: 'act5', action: 'Hedef kitle analizi güncellendi', project: 'Meta Reklam Yönetimi', user: 'Mehmet Kaya', time: '3 saat önce' },
      { id: 'act6', action: 'İçerik planı oluşturuldu', project: 'Sosyal Medya Yönetimi', user: 'Mehmet Kaya', time: '1 gün önce' },
      { id: 'act7', action: 'Görsel tasarımlar başlatıldı', project: 'Sosyal Medya Yönetimi', user: 'Emirhan Pirgon', time: '2 gün önce' },
    ],
    upcomingDeadlines: [
      { id: 'dead3', task: 'Görsel Tasarımlar', project: 'Sosyal Medya Yönetimi', deadline: '4 gün kaldı' },
      { id: 'dead4', task: 'Hedef Kitle Analizi', project: 'Meta Reklam Yönetimi', deadline: '7 gün kaldı' },
      { id: 'dead5', task: 'İçerik Planı Oluşturma', project: 'Sosyal Medya Yönetimi', deadline: '10 gün kaldı' },
    ],
  },
  'default': {
    projectStatus: [
      { name: 'Zamanında', value: 14, color: '#10B981' },
      { name: 'Riskli', value: 3, color: '#F59E0B' },
      { name: 'Gecikmeli', value: 2, color: '#EF4444' },
      { name: 'Tamamlandı', value: 10, color: '#6366F1' },
    ],
    recentActivities: [
      { id: 'act8', action: 'Logo tasarımı güncellendi', project: 'Marka Kimliği Yenileme', user: 'Ahmet Yılmaz', time: '30 dakika önce' },
      { id: 'act9', action: 'İçerik yazımı tamamlandı', project: 'Web Sitesi Yenileme', user: 'Zeynep Şahin', time: '2 saat önce' },
      { id: 'act10', action: 'Sosyal medya görselleri hazırlandı', project: 'Sosyal Medya Kampanyası', user: 'Mehmet Kaya', time: '3 saat önce' },
      { id: 'act11', action: 'Ürün fotoğraf çekimi planlandı', project: 'E-ticaret Entegrasyonu', user: 'Ayşe Demir', time: '1 gün önce' },
      { id: 'act12', action: 'Anahtar kelime araştırması tamamlandı', project: 'SEO Optimizasyonu', user: 'Zeynep Şahin', time: '2 gün önce' },
    ],
    upcomingDeadlines: [
      { id: 'dead6', task: 'Logo Tasarımı', project: 'Marka Kimliği Yenileme', deadline: '2 gün kaldı' },
      { id: 'dead7', task: 'Ürün Fotoğraf Çekimi', project: 'E-ticaret Entegrasyonu', deadline: '5 gün kaldı' },
      { id: 'dead8', task: 'Sosyal Medya Görselleri', project: 'Sosyal Medya Kampanyası', deadline: '8 gün kaldı' },
    ],
  }
};

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const { user, getAccessibleStores } = useAuth();
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const [storeData, setStoreData] = useState(storeSpecificData['default']);

  // Set initial store based on user role or from localStorage
  useEffect(() => {
    if (user) {
      // First try to get the store from localStorage
      const storedStore = localStorage.getItem('currentStore');
      
      if (storedStore) {
        try {
          const parsedStore = JSON.parse(storedStore);
          setCurrentStore(parsedStore);
          return; // Exit early if we found a stored store
        } catch (error) {
          console.error('Failed to parse stored store:', error);
          localStorage.removeItem('currentStore');
        }
      }
      
      // If no stored store or parsing failed, set from accessible stores
      const stores = getAccessibleStores();
      if (stores.length > 0) {
        // For clients, set their store
        // For team members and managers, set the first store in the list
        setCurrentStore(stores[0]);
      }
    }
  }, [user, getAccessibleStores]);

  // Custom setCurrentStore function that also updates localStorage
  const handleSetCurrentStore = (store: Store) => {
    setCurrentStore(store);
    // Save to localStorage
    localStorage.setItem('currentStore', JSON.stringify(store));
  };

  // Update store data when current store changes
  useEffect(() => {
    if (currentStore) {
      // Get data specific to the selected store, or use default if not found
      const data = storeSpecificData[currentStore.id as keyof typeof storeSpecificData] || storeSpecificData['default'];
      setStoreData(data);
      console.log(`Store changed to: ${currentStore.name}`);
    }
  }, [currentStore]);

  const value = {
    currentStore,
    setCurrentStore: handleSetCurrentStore,
    storeData,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}; 