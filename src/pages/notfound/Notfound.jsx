// React
import { Link, useLocation } from "react-router"
import { useContext } from "react"
// Styles
import styles from "./Notfound.module.css"
// Components
import Header from "../../components/header/Header"
import GetInTouch from "../../components/getInTouch/GetInTouch"
import Footer from "../../components/footer/Footer"
// Context
import { LanguageContext } from "../../languageProvider/LanguageProvider"
// react-i18next
import { useTranslation } from "react-i18next"
// Hooks
import useLanguageChange from "../../hooks/useLanguageChange"

export default function Notfound() {
  const { languageOptions } = useContext(LanguageContext)
  const { language } = languageOptions
  const { t } = useTranslation("notFound")
  // Show 404 page in user's language
  const { pathname } = useLocation()
  // Get language code
  const langCode = pathname.split("/")[1]

  useLanguageChange(langCode, pathname, pathname)

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <p>
          {t("pageNotFoundText")}{" "}
          <Link to={`/${language}`} replace>{t("backToHomeText")}</Link>
        </p>
      </main>
      <GetInTouch />
      <Footer />
    </>
  )
}
