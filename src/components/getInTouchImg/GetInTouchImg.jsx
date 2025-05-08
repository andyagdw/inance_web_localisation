// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// React
import { Link } from "react-router"

export default function GetInTouchImg(
  { icon,
    styles,
    children,
    dataContent,
    languageCode,
    pathname,
    onHandleLinkClick
  }) {
  return (
    <div
      className={["col-md-4", styles.imgWrapper].join(" ")}
      data-content={dataContent}
    >
      <div className={styles.item}>
        <Link
          to={`/${languageCode}`}
          onClick={e => onHandleLinkClick(e, pathname, `/${languageCode}`)}
        >
          <div className={styles.imgBox}>
            <FontAwesomeIcon icon={icon} className={styles.imgIcon} />
          </div>
        </Link>
        <p className={styles.imgIconText}>{children}</p>
      </div>
    </div>
  );
}
