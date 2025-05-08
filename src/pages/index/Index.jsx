// React
import { Suspense, useEffect, useState, lazy } from "react"
import { useLocation, useParams } from "react-router"
// react-i18next
import { useTranslation } from "react-i18next"
// Components
import Client from "../../components/client/Client"
import Feature from "../../components/feature/Feature"
import Professional from "../../components/professional/Professional"
import GetInTouch from "../../components/getInTouch/GetInTouch"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import MetaData from "../../components/metaData/MetaData"
// Lazy load Contact component (Fixes google map bug)
const ContactPage = lazy(() => import("../contactPage/ContactPage"))
// Hooks
import useLanguageChange from "../../hooks/useLanguageChange"
import useOnScreen from "../../hooks/useOnScreen"
// Pages
import AboutPage from "../aboutPage/AboutPage"
import ServicesPage from "../servicesPage/ServicesPage"
// React Google Analytics 4
import ReactGA from "react-ga4"

export default function Index() {
  const { pathname } = useLocation()
  // Add default value when user doesn't provide language code (see custom hook)
  let { langCode = "home" } = useParams()
  // Start loading Contact component when at least xx% of it is visible on the screen
  const [contactRef, isContactVisible] = useOnScreen({ threshold: 0.25 })
  // Tracks whether the Contact component has already been loaded
  // Remain in DOM after it has loaded
  const [hasContactLoaded, setHasContactLoaded] = useState(false)
  const { t, i18n } = useTranslation("hero")
  let languageCode = i18n.language
  let currentPage = `/${languageCode}`
  const measurementId = import.meta.env.VITE_GOOGLE_MEASUREMENT_ID;

  // Load the Contact component only once when it first becomes visible
  useEffect(() => {
    if (isContactVisible && !hasContactLoaded) {
      setHasContactLoaded(true)
    }
  }, [isContactVisible, hasContactLoaded])

  useEffect(() => {
    if (!measurementId) return
    // Pass GA4 measurement ID, allows library to send data to my GA account
    ReactGA.initialize(import.meta.env.VITE_GOOGLE_MEASUREMENT_ID)
    // Sends a 'pageview' event (page load or user navigation)
    ReactGA.send({
      hitType: "pageview",
      page: currentPage,
      title: `Home Page - ${languageCode}`,
    })
  }, [currentPage, languageCode])

  useLanguageChange(langCode, pathname, pathname)

  return (
    <>
      {pathname === currentPage && (
        <>
          <MetaData
            pagePath={currentPage}
            ogTitle={t("ogTitle")}
            ogDescription={t("ogDescription")}
            langCode={languageCode}
            imgUrl={"/home.jpg"}
          />
          <div className="hero_area">
            <Header />
          </div>
        </>
      )}
      <main>
        <Feature />
        <AboutPage />
        <Professional />
        <ServicesPage />
        <Client />
        <div ref={contactRef}>
          {hasContactLoaded && (
            <Suspense fallback={<div>Loading...</div>}>
              <ContactPage />
            </Suspense>
          )}
        </div>
      </main>
      <GetInTouch />
      <Footer />
    </>
  )
}
