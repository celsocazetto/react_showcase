import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { AppLayout } from "@/components/AppLayout"
import { SectionPlaceholder } from "@/pages/SectionPlaceholder"
import { ThemeConcepts } from "@/pages/ThemeConcepts"
import { ComponentPage } from "@/pages/ComponentPage"
import { Examples } from "@/pages/Examples"
import { LayoutLab } from "@/pages/LayoutLab"
import { components } from "@/gallery/registry"
import { sections } from "@/sections"
import { ThemeProvider } from "@/theme/ThemeProvider"

export default function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to={sections[0].path} replace />} />
          {sections.map((section) => (
            <Route key={section.path} path={section.path} element={
                section.path === "/laboratorio" ? (
                  <LayoutLab />
                ) : section.path === "/exemplos" ? (
                  <Examples section={section} />
                ) : section.path === "/tema" ? (
                  <ThemeConcepts section={section} />
                ) : section.path === "/galeria" ? (
                  <Navigate to={`/galeria/${components[0].slug}`} replace />
                ) : (
                  <SectionPlaceholder section={section} />
                )
              } />
          ))}
          <Route path="/galeria/:slug" element={<ComponentPage />} />
          <Route path="*" element={<Navigate to={sections[0].path} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}
