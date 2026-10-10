import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { applyTheme, loadTheme, resolveMode, saveTheme, type Theme } from "./theme"

type ThemeContextValue = { theme: Theme; resolvedMode: "light" | "dark"; update: (patch: Partial<Theme>) => void }

const ThemeContext = createContext<ThemeContextValue | null>(null)
const darkQuery = "(prefers-color-scheme: dark)"

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(loadTheme)
  const [systemDark, setSystemDark] = useState(() => window.matchMedia(darkQuery).matches)

  useEffect(() => {
    const query = window.matchMedia(darkQuery)
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    applyTheme(theme, systemDark)
    saveTheme(theme)
  }, [theme, systemDark])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedMode: resolveMode(theme.mode, systemDark),
      update: (patch) => setTheme((t) => ({ ...t, ...patch })),
    }),
    [theme, systemDark],
  )
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider")
  return ctx
}
