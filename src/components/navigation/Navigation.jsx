// React
import { Link, NavLink, useLocation } from "react-router"
import { useContext } from "react"
// react-i18next
import { useTranslation } from "react-i18next"
// Context
import { LanguageContext } from "../../languageProvider/LanguageProvider"

export default function Navigation({ styles, t }) {
  const { i18n } = useTranslation()
  const { handleLinkClick } = useContext(LanguageContext)
  const { pathname } = useLocation()
  let languageCode = i18n.language

  return (
    <nav
      className={["navbar", "navbar-expand-lg", styles.nav].join(" ")}
      aria-label="Primary"
    >
      <Link
        to={`/${languageCode}`}
        className="navbar-brand"
        onClick={e => handleLinkClick(e, pathname, `/${languageCode}`)}>
        <span className={styles.inanceText}>Inance</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className={styles.navTogglerSpan}> </span>
      </button>
      <div
        className={["collapse", "navbar-collapse"].join(" ")}
        id="navbarSupportedContent"
      >
        <menu className={["navbar-nav", styles.navbarNav].join(" ")}>
          <li className="nav-item">
            <NavLink
              to={`/${languageCode}`}
              className={[styles.menuLinks, "nav-link"].join(" ")}
              onClick={e => handleLinkClick(e, pathname, `/${languageCode}`)}
              // Match only when the URL is exactly the same as link
              end
            >
              {t("homeLinkText")}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/${languageCode}/about`}
              className={[styles.menuLinks, "nav-link"].join(" ")}
              end
            >
              {t("aboutLinkText")}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/${languageCode}/services`}
              className={[styles.menuLinks, "nav-link"].join(" ")}
              end
            >
              {t("servicesLinkText")}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/${languageCode}/contact`}
              className={[styles.menuLinks, "nav-link"].join(" ")}
              end
            >
              {t("contactLinkText")}
            </NavLink>
          </li>
        </menu>
      </div>
    </nav>
  )
}
