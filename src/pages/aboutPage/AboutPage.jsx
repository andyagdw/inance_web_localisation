// React
import { useLocation, useParams } from "react-router"
import { useEffect, useState } from "react"
// react-i18next
import { useTranslation } from "react-i18next"
// Hooks
import useLanguageChange from "../../hooks/useLanguageChange"
// Components
import Header from "../../components/header/Header"
import MetaData from "../../components/metaData/MetaData"
import GetInTouch from "../../components/getInTouch/GetInTouch"
import Footer from "../../components/footer/Footer"
import About from "../../components/about/About"
// React Google Analytics 4
import ReactGA from "react-ga4"

export default function AboutPage() {
  const { pathname } = useLocation()
  const [layoutClassName, setLayoutClassName] = useState("")
  const { t, i18n } = useTranslation("about")
  let { langCode } = useParams()
  let languageCode = i18n.language
  let currentPage = `/${languageCode}/about`
  const measurementId = import.meta.env.VITE_GOOGLE_MEASUREMENT_ID;

  useLanguageChange(langCode, pathname, `/${langCode}/about`)
  
  // Classname differs depending on the path
  useEffect(() => {
    if (pathname === `/${languageCode}`) {
      setLayoutClassName("layout_padding-bottom")
    } else if (pathname === `/${languageCode}/about`) {
      setLayoutClassName("layout_padding")
    }
  }, [pathname, languageCode])

  useEffect(() => {
    if (pathname === currentPage && measurementId) {
      // Pass GA4 measurement ID, allows library to send data to my GA account
      ReactGA.initialize(measurementId);
      // Sends a 'pageview' event (page load or user navigation)
      ReactGA.send({
        hitType: "pageview",
        page: currentPage,
        title: `About Page - ${languageCode}`,
      })
    }
  }, [currentPage, pathname, languageCode])

  return (
    <>
      {pathname === currentPage ? (
        <>
          <MetaData
            pagePath={currentPage}
            extension="about"
            ogTitle={t("ogTitle")}
            ogDescription={t("ogDescription")}
            langCode={languageCode}
            imgUrl={"/about.jpg"}
          />
          <div className="hero_area">
            <Header />
          </div>
          <main>
            <About
              layoutClassName={layoutClassName}
              currentPage={currentPage}
              heading={t("heading")}
              paragraph={t("paragraph")}
              linkText={t("linkText")}
              linkTextAlt={t("linkTextAlt")}
            />
          </main>
          <GetInTouch />
          <Footer />
        </>
      ) : (
        // Do not show main tag when pathname doesn't match current page
        <About
          layoutClassName={layoutClassName}
          currentPage={currentPage}
          heading={t("heading")}
          paragraph={t("paragraph")}
          linkText={t("linkText")}
          linkTextAlt={t("linkTextAlt")}
        />
      )}
    </>
  )
}
