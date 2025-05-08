// React
import { useEffect } from "react"
import { useLocation } from "react-router"

export default function EnsureNoTrailingSlash({ children }) {
  const { pathname } = useLocation()
  useEffect(() => {
    // Don't run if pathname is "/"
    if (pathname.endsWith("/") && pathname.length > 1) {
      const newPathNoSlashes = pathname.replaceAll(/\/+/g, " ").trim()
      console.log("New path no slashes", newPathNoSlashes)
      const redirectPath = newPathNoSlashes.replaceAll(" ", "/")
      console.log("Redirecting to new path:", `/${redirectPath}`)
      window.location.replace(`/${redirectPath}`);
    }
  }, [pathname])

  return children
}
