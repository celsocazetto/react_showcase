import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { AppLayout } from "@/components/AppLayout"
import { SectionPlaceholder } from "@/pages/SectionPlaceholder"
import { ThemeConcepts } from "@/pages/ThemeConcepts"
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
                section.path === "/tema" ? <ThemeConcepts section={section} /> : <SectionPlaceholder section={section} />
              } />
          ))}
          <Route path="*" element={<Navigate to={sections[0].path} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}
