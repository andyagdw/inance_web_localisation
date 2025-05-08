// React
import { useContext, useEffect } from "react";
import { useNavigate, useNavigationType } from "react-router";
// Languages
import { languages } from "../languages/languageCodes";
// Constants
import { LOCALSTORAGEKEY } from "../constants/Constants";
// Context
import { LanguageContext } from "../languageProvider/LanguageProvider";
// react-i18next
import { useTranslation } from "react-i18next";

export default function useLanguageChange(langCode, pathname, currentPage) {
  const { languageOptions, setLanguageOptions } = useContext(LanguageContext);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  // Update lang and dir attribute in html tag if it doesn't match current
  // language and writing mode
  if (document.documentElement.getAttribute("lang") !== i18n.language) {
    document.documentElement.setAttribute("lang", i18n.language);
    if (document.documentElement.getAttribute("dir") !== i18n.dir()) {
      document.documentElement.setAttribute("dir", i18n.dir());
    }
  }

  useEffect(() => {
    // Only run hook if pathname matches current page
    // Some components (i.e., about, services, contact) are also pages
    if (pathname !== currentPage) return;

    // Check if language code in URL is supported
    const languageCodeExists = languages.find(
      val => val.languageCode === langCode
    );

    // langCode === "home" - when pathname is "/"
    if (languageCodeExists || langCode === "home") {
      if (navigationType === "POP") {
        console.log(
          "Page refresh or back/forward navigation detected. " +
            "Updating page (custom hook)"
        );
        if (langCode === "home") {
          console.log(
            "No language code provided. Navigate to " +
              "language home page (custom hook)"
          );
          // Value comes from local storage (see App.jsx)
          navigate(`/${languageOptions.language}`);
          i18n.changeLanguage(languageOptions.language);
        } else if (languageOptions.language !== langCode) {
          console.log(
            "Local storage key not equal to language code. Save " +
              "language code to local storage. Update state. Change " +
              "language (custom hook)"
          );
          const updatedOptions = {
            language: langCode,
            textDirection: languageCodeExists.writingMode,
          };
          localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(updatedOptions));
          setLanguageOptions({
            language: languageCodeExists.languageCode,
            textDirection: languageCodeExists.writingMode,
          });
          i18n.changeLanguage(langCode);
        } else {
          console.log(
            "Local storage key equal to language code. " +
              "Change language (custom hook)"
          );
          i18n.changeLanguage(languageCodeExists.languageCode);
        }
      } else {
        console.log("No update (custom hook)");
        window.scrollTo(0, 0);
      }
    } else {
      navigate(`/${languageOptions.language}`);
      i18n.changeLanguage(languageOptions.language);
      console.log(
        "Language code doesn't exist. Navigate to language home " +
          "page found in local storage. Change language (custom hook)"
      );
    }
  }, [
    i18n,
    langCode,
    pathname,
    currentPage,
    navigate,
    navigationType,
    setLanguageOptions,
    languageOptions,
  ]);
}
