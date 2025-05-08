// React
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router"
import { HeadProvider } from "react-head"
import { HelmetProvider } from "react-helmet-async"
// Pages
import Notfound from "./pages/notfound/Notfound"
import Index from "./pages/index"
import AboutPage from "./pages/aboutPage/AboutPage"
import ServicesPage from "./pages/servicesPage/ServicesPage"
import ContactPage from "./pages/contactPage/ContactPage"
// Make JQuery available to entire project
import * as $ from "jquery"
// i18n
import i18n from "./i18n"
// Utils
import EnsureNoTrailingSlash from "./utils/routeUtils"
// Providers
import LanguageProvider from "./languageProvider/LanguageProvider"


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Language code is optional */}
      {/* See 'Index.jsx' and custom hook for more details */}
      <Route
        path="/:langCode?"
        element={
          <EnsureNoTrailingSlash>
            <Index />
          </EnsureNoTrailingSlash>
        }
      />
      <Route
        path="/:langCode/about"
        element={
          <EnsureNoTrailingSlash>
            <AboutPage />
          </EnsureNoTrailingSlash>
        }
      />
      <Route
        path="/:langCode/services"
        element={
          <EnsureNoTrailingSlash>
            <ServicesPage />
          </EnsureNoTrailingSlash>
        }
      />
      <Route
        path="/:langCode/contact"
        element={
          <EnsureNoTrailingSlash>
            <ContactPage />
          </EnsureNoTrailingSlash>
        }
      />
      <Route path="*" element={<Notfound />} />
    </>
  )
);

export default function App() {
  return (
    <HelmetProvider>
      <HeadProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
        </LanguageProvider>
      </HeadProvider>
    </HelmetProvider>
  );
}
