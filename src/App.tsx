import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { AppLayout } from "@/components/AppLayout"
import { SectionPlaceholder } from "@/pages/SectionPlaceholder"
import { sections } from "@/sections"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to={sections[0].path} replace />} />
          {sections.map((section) => (
            <Route key={section.path} path={section.path} element={<SectionPlaceholder section={section} />} />
          ))}
          <Route path="*" element={<Navigate to={sections[0].path} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
