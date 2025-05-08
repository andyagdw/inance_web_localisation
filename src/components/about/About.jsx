// React
import { Link } from "react-router"
// Images
import aboutImg from "../../assets/about-img.jpg"

export default function About({
  layoutClassName,
  currentPage,
  heading,
  paragraph,
  linkText,
  linkTextAlt,
}) {
  return (
    <section
      className={["about_section", layoutClassName].join(" ")}
      aria-labelledby="about"
    >
      <div className="container">
        <div className="row about-row">
          <div className="col-lg-5 col-md-6">
            <div className="about-section-detail-box">
              <h2 className="about-h2" id="about">
                {heading}
              </h2>
              <p className="about-para">{paragraph}</p>
              <Link to={currentPage} className="about-link">
                {linkText}
              </Link>
            </div>
          </div>
          <div className="col-lg-7 col-md-6">
            <div className="about-img-box">
              {/* Provide alt text - important for unit testing / allows it to be accessible */}
              {/* And will be read by Testing library */}
              <img src={aboutImg} alt={linkTextAlt} className="about-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
