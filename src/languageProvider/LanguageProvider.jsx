// React
import { createContext, useCallback, useState } from "react";
// Constants
import { ENGLISHLANGUAGEOPTIONS, LOCALSTORAGEKEY } from "../constants/Constants";

export const LanguageContext = createContext(null);

export default function LanguageProvider({ children }) {
  // Get language options from local storage
  // If it doesn't exist fallback to english options
  const getInitialLanguageOptions = () => {
    let localStorageLangOptionSet = JSON.parse(
      localStorage.getItem(LOCALSTORAGEKEY)
    );
    if (localStorageLangOptionSet) {
      return localStorageLangOptionSet;
    }
    localStorage.setItem(
      LOCALSTORAGEKEY,
      JSON.stringify(ENGLISHLANGUAGEOPTIONS)
    );
    return ENGLISHLANGUAGEOPTIONS;
  };
  const [languageOptions, setLanguageOptions] = useState(
    getInitialLanguageOptions
  );

  // Prevents scrollbar flicker
  const handleLinkClick = useCallback((e, pathname, homePage) => {
    if (pathname === homePage) {
      e.preventDefault();
    }
  }, []);

  const languageProviderContext = {
    languageOptions,
    setLanguageOptions,
    handleLinkClick,
  };

  return (
    <LanguageContext.Provider value={languageProviderContext}>
      {children}
    </LanguageContext.Provider>
  );
}
