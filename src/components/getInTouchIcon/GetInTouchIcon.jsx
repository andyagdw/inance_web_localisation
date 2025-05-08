// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// React
import { Link } from "react-router"

export default function GetInTouchIcon(
  { icon,
    styles,
    languageCode,
    pathname,
    onHandleLinkClick }) {
  return (
    <div>
      <Link
        to={`/${languageCode}`}
        onClick={e => onHandleLinkClick(e, pathname, `/${languageCode}`)}
        className={styles.iconLink}
      >
        <FontAwesomeIcon icon={icon} className={styles.icon} />
      </Link>
    </div>
  );
}
