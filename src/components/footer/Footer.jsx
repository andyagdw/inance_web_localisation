// React
import { useLocation, useNavigate, useParams } from "react-router"
// Styles
import styles from "./Footer.module.css"
// i18
import { useTranslation } from "react-i18next"
// Languages
import { languages } from "../../languages/languageCodes"
// Constants
import { LOCALSTORAGEKEY } from "../../constants/Constants"
// React Google Analytics 4
import ReactGA from "react-ga4"

export default function Footer() {
  const { t, i18n } = useTranslation("footer")
  const navigate = useNavigate()
  const { pathname } = useLocation()
  let { langCode } = useParams()
  const measurementId = import.meta.env.VITE_GOOGLE_MEASUREMENT_ID;

  const handleChange = (languageCode, writingMode) => {
    console.log("Change language. No state update (select dropdown)");
    // Save to local storage
    const updatedOptions = {
      language: languageCode,
      textDirection: writingMode,
    };
    localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(updatedOptions));
    if (measurementId) {
      // Track the language change event in Google Analytics
      ReactGA.event("select_content", {
        content_type: "language",
        content_id: languageCode
      })
    }
    // Navigate to same page with different language code
    navigate(pathname.replace(langCode, languageCode));
    i18n.changeLanguage(languageCode);
  }

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p className={styles.text}>
              &copy; <span className={styles.displayDateYear}>{new Date().getFullYear()}</span>{" "}
              {t("copyrightText")}{" "}
              <a href="https://html.design/">{t("freeHtmlTemplatesText")}</a>
            </p>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-md-12 text-end">
            <label
              htmlFor="language-select"
              className={styles.languageSelectText}
            >
              {t("changeLanguageText")}
            </label>
            <select
              name="language"
              id="language-select"
              className={styles.select}
              value={i18n.language}
              onChange={e => {
                // Find language chosen by user
                const selectedOption = languages.find(
                  lang => lang.languageCode === e.target.value
                )

                handleChange(
                  selectedOption.languageCode,
                  selectedOption.writingMode
                )
              }}
            >
              {/* Show all languages supported by website */}
              {languages.map(val => {
                const languageToUpperCase = val.language.charAt(0).toLocaleUpperCase() + val.language.slice(1)
                return (
                  <option key={val.language} value={val.languageCode}>
                    {languageToUpperCase}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}
