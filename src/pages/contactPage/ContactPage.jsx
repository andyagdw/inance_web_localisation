// Components
import GetInTouch from "../../components/getInTouch/GetInTouch"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import MetaData from "../../components/metaData/MetaData";
import Contact from "../../components/contact/Contact"
// react-i18next
import { useTranslation } from "react-i18next"
// React
import { useLocation, useParams } from "react-router"
import { useEffect } from "react"
// Hooks
import useLanguageChange from "../../hooks/useLanguageChange"
// React Google Analytics 4
import ReactGA from "react-ga4"

export default function ContactPage() {
  const { t, i18n } = useTranslation("contact")
  let { langCode } = useParams()
  const { pathname } = useLocation()
  let currentPage = `/${i18n.language}/contact`
  const measurementId = import.meta.env.VITE_GOOGLE_MEASUREMENT_ID;

  useLanguageChange(langCode, pathname, `/${langCode}/contact`)

  useEffect(() => {
    if (pathname === currentPage && measurementId) {
      // Pass GA4 measurement ID, allows library to send data to my GA account
      ReactGA.initialize(measurementId)
      // Sends a 'pageview' event (page load or user navigation)
      ReactGA.send({
        hitType: "pageview",
        page: currentPage,
        title: `Contact Page - ${i18n.language}`,
      })
    }
  }, [currentPage, pathname, i18n.language])

  return (
    <>
      {pathname === currentPage ? (
        <>
          <MetaData
            pagePath={currentPage}
            extension="contact"
            ogTitle={t("ogTitle")}
            ogDescription={t("ogDescription")}
            langCode={i18n.language}
            imgUrl={"/contact.jpg"}
          />
          <div className="hero_area">
            <Header />
          </div>
          <main>
            <Contact t={t} i18n={i18n} />
          </main>
          <GetInTouch />
          <Footer />
        </>
      ) : (
        // Do not show main tag when pathname doesn't match current page
        <Contact t={t} i18n={i18n} />
      )}
    </>
  )
}
