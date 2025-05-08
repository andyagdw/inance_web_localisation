// react-i18next
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend"

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .use(Backend)
  .init({
    // lng: "en", // Language to use,
    fallbackLng: "en",

    // interpolation: {
    //   escapeValue: false,
    // },
  });

export default i18n;
