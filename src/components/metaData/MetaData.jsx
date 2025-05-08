// Languages
import { languages } from "../../languages/languageCodes"
// React
import { Link, Meta } from "react-head"
import { Helmet } from "react-helmet-async"

const urlOrigin = window.location.origin

export default function MetaData({
  pagePath,
  extension = "",
  ogTitle,
  ogDescription,
  langCode,
  imgUrl
}) {
  // There is no extension for the home page but other pages do (e.g., en/about, en/services)
  return (
    <>
      {/* Open Graph Protocol */}
      {/* Use 'react-helmet-async' as 'react-head' overwrites meta tags  */}
      <Helmet>
        {/* Only show alternate locales */}
        {languages
          .filter(lang => lang.languageCode !== langCode)
          .map(filteredLang => {
            return (
              <meta
                property="og:locale:alternate"
                content={`${filteredLang.locale.language}_${filteredLang.locale.territory}`}
                key={filteredLang.language}
              />
            )
          })}
      </Helmet>
      <Meta property="og:title" content={ogTitle} />
      <Meta property="og:type" content="website" />
      {/* Must be absolute image path */}
      <Meta property="og:image" content={`${urlOrigin}/images${imgUrl}`} />
      <Meta property="og:url" content={`${urlOrigin}${pagePath}`} />
      <Meta name="description" content={ogDescription} />
      <Meta property="og:description" content={ogDescription} />
      <Meta property="og:determiner" content="the" />
      <Meta property="og:site_name" content="Inance" />
      {/* Only show locale these tags are marked up in */}
      {languages
        .filter(lang => lang.languageCode === langCode)
        .map(filteredLang => {
          return (
            <Meta
              property="og:locale"
              content={`${filteredLang.locale.language}_${filteredLang.locale.territory}`}
              key={filteredLang.language}
            />
          )
        })}
      {/* Canonical tag */}
      <Link rel="canonical" href={`${urlOrigin}${pagePath}`} />
      {/* Alternate canonical tags */}
      {languages.map(lang => {
        return (
          <Link
            key={lang.language}
            rel="alternate"
            hrefLang={lang.languageCode}
            href={
              extension
                ? `${urlOrigin}/${lang.languageCode}/${extension}`
                : `${urlOrigin}/${lang.languageCode}`
            }
          ></Link>
        )
      })}
    </>
  )
}
