
import React, { createContext, useContext, useState, useEffect } from 'react';
import { APARTMENTS, SITE_IMAGES, CONTACT_INFO, SITE_DATA_VERSION } from '../constants';
import { Apartment } from '../types';

interface SiteData {
  version?: number;
  siteImages: typeof SITE_IMAGES;
  apartments: Apartment[];
  contactInfo: typeof CONTACT_INFO;
}

interface SiteContextType {
  data: SiteData;
  updateImage: (key: keyof typeof SITE_IMAGES, url: string) => void;
  updateAboutImages: (urls: string[]) => void;
  updateGuideImages: (urls: string[]) => void;
  updateApartmentImages: (id: string, urls: string[]) => void;
  resetData: () => void;
  exportConfig: () => string;
}

const normalizeApartments = (apartments: Apartment[]): Apartment[] =>
  apartments.map((apartment) => {
    if (apartment.id !== '1') return apartment;

    return {
      ...apartment,
      name: 'ScaleaStay',
      description: 'Светлые и уютные апартаменты с современным ремонтом для отдыха у моря. Ближайший пляж — 600 м, около 5–8 минут пешком.',
      distanceToSea: '600m',
    };
  });

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(() => {
    const saved = localStorage.getItem('scalea_site_data');
    const initialData: SiteData = {
      version: SITE_DATA_VERSION,
      siteImages: SITE_IMAGES,
      apartments: normalizeApartments(APARTMENTS),
      contactInfo: CONTACT_INFO
    };

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as SiteData;
        
        // Merge siteImages with defaults to ensure new keys are present
        parsed.siteImages = { ...SITE_IMAGES, ...parsed.siteImages };
        
        // Ensure aboutImages are present and not empty
        if (!parsed.siteImages.aboutImages || parsed.siteImages.aboutImages.length === 0) {
          parsed.siteImages.aboutImages = SITE_IMAGES.aboutImages;
        }
        
        // Ensure guideImages are present and not empty
        if (!parsed.siteImages.guideImages || parsed.siteImages.guideImages.length === 0) {
          parsed.siteImages.guideImages = SITE_IMAGES.guideImages;
        }
        
        // If version is missing or older, we might want to sync some critical changes
        // But we must be careful not to overwrite user's manual changes.
        // For now, if version is older, we'll just update the version number and 
        // let the user know they can reset if they want the new defaults.
        // OR, we can specifically sync the images if that's what we just updated.
        if (!parsed.version || parsed.version < SITE_DATA_VERSION) {
          // Force sync critical data if version changes
          parsed.siteImages.aboutImages = SITE_IMAGES.aboutImages;
          parsed.siteImages.guideImages = SITE_IMAGES.guideImages;
          parsed.siteImages.heroBackground = SITE_IMAGES.heroBackground;
          parsed.contactInfo = CONTACT_INFO;
          
          // Sync apartments if they were using old defaults
          if (parsed.apartments && parsed.apartments.length === APARTMENTS.length) {
            parsed.apartments = parsed.apartments.map((apt, i) => ({
              ...APARTMENTS[i],
              // Preserve user-edited images if they are not the defaults
              images: apt.images.length === APARTMENTS[i].images.length ? APARTMENTS[i].images : apt.images
            }));
          } else {
            parsed.apartments = APARTMENTS;
          }
          
          parsed.version = SITE_DATA_VERSION;
        }

        parsed.apartments = normalizeApartments(parsed.apartments || APARTMENTS);
        return parsed;
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    return initialData;
  });

  useEffect(() => {
    localStorage.setItem('scalea_site_data', JSON.stringify(data));
  }, [data]);

  const updateImage = (key: keyof typeof SITE_IMAGES, url: string) => {
    setData(prev => ({
      ...prev,
      siteImages: { ...prev.siteImages, [key]: url }
    }));
  };

  const updateAboutImages = (urls: string[]) => {
    setData(prev => ({
      ...prev,
      siteImages: { ...prev.siteImages, aboutImages: urls }
    }));
  };

  const updateGuideImages = (urls: string[]) => {
    setData(prev => ({
      ...prev,
      siteImages: { ...prev.siteImages, guideImages: urls }
    }));
  };

  const updateApartmentImages = (id: string, urls: string[]) => {
    setData(prev => ({
      ...prev,
      apartments: prev.apartments.map(apt => apt.id === id ? { ...apt, images: urls } : apt)
    }));
  };

  const resetData = () => {
    localStorage.removeItem('scalea_site_data');
    setData({
      version: SITE_DATA_VERSION,
      siteImages: SITE_IMAGES,
      apartments: normalizeApartments(APARTMENTS),
      contactInfo: CONTACT_INFO
    });
  };

  const exportConfig = () => {
    return JSON.stringify(data, null, 2);
  };

  return (
    <SiteContext.Provider value={{ data, updateImage, updateAboutImages, updateGuideImages, updateApartmentImages, resetData, exportConfig }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSiteData must be used within SiteProvider');
  return context;
};
