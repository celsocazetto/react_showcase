import { DARK_BACKGROUND, LIGHT_BACKGROUND, readableForeground } from "./contrast"
import { colorPresets } from "./presets"

export type ModePreference = "system" | "light" | "dark"
export type Density = "compact" | "comfortable" | "spacious"

/** A color choice: a named preset, a custom hex, or (accent only) the neutral default. */
export type ColorChoice = { kind: "preset"; id: string } | { kind: "custom"; hex: string } | { kind: "neutral" }

export type Theme = {
  primary: ColorChoice
  accent: ColorChoice
  radius: number // rem
  mode: ModePreference
  font: string
  shadow: number // 0..3
  density: Density
}

export const fonts = [
  { id: "Inter", stack: '"Inter", ui-sans-serif, system-ui, sans-serif' },
  { id: "Poppins", stack: '"Poppins", ui-sans-serif, system-ui, sans-serif' },
  { id: "Playfair Display", stack: '"Playfair Display", ui-serif, Georgia, serif' },
  { id: "JetBrains Mono", stack: '"JetBrains Mono", ui-monospace, monospace' },
]

export const densitySpacing: Record<Density, number> = { compact: 0.2, comfortable: 0.25, spacious: 0.3 }

export const defaultTheme: Theme = {
  primary: { kind: "preset", id: "azul" },
  accent: { kind: "neutral" },
  radius: 0.625,
  mode: "system",
  font: "Inter",
  shadow: 1,
  density: "comfortable",
}

export const STORAGE_KEY = "react-showcase-theme"

export function loadTheme(storage: Pick<Storage, "getItem"> = localStorage): Theme {
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (raw) return { ...defaultTheme, ...JSON.parse(raw) }
  } catch {
    // corrupted or unavailable storage: fall back to defaults
  }
  return defaultTheme
}

export function saveTheme(theme: Theme, storage: Pick<Storage, "setItem"> = localStorage) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(theme))
  } catch {
    // storage full or blocked: the theme just won't persist
  }
}

export function resolveMode(mode: ModePreference, systemDark: boolean): "light" | "dark" {
  return mode === "system" ? (systemDark ? "dark" : "light") : mode
}

/** The concrete hex for a color choice in a given mode, or null for neutral. */
export function resolveColor(choice: ColorChoice, mode: "light" | "dark"): string | null {
  if (choice.kind === "custom") return choice.hex
  if (choice.kind === "neutral") return null
  const preset = colorPresets.find((p) => p.id === choice.id) ?? colorPresets[0]
  return preset[mode]
}

const shadowLevels = [
  ["none", "none", "none"],
  ["0 1px 2px 0 rgb(0 0 0 / 0.05)", "0 4px 6px -1px rgb(0 0 0 / 0.1)", "0 10px 15px -3px rgb(0 0 0 / 0.1)"],
  ["0 1px 3px 0 rgb(0 0 0 / 0.15)", "0 6px 10px -2px rgb(0 0 0 / 0.2)", "0 14px 22px -4px rgb(0 0 0 / 0.2)"],
  ["0 2px 4px 0 rgb(0 0 0 / 0.25)", "0 8px 14px -2px rgb(0 0 0 / 0.3)", "0 18px 30px -4px rgb(0 0 0 / 0.3)"],
]

/** Design tokens as CSS variables. A null value means "remove the override". */
export function themeVariables(theme: Theme, resolvedMode: "light" | "dark"): Record<string, string | null> {
  const primary = resolveColor(theme.primary, resolvedMode)
  const accent = resolveColor(theme.accent, resolvedMode)
  const [sm, md, lg] = shadowLevels[theme.shadow] ?? shadowLevels[1]
  const font = fonts.find((f) => f.id === theme.font) ?? fonts[0]
  return {
    "--primary": primary,
    "--primary-foreground": primary && readableForeground(primary),
    "--ring": primary,
    "--accent": accent && `color-mix(in oklab, ${accent} 20%, var(--background))`,
    "--accent-foreground": accent && "var(--foreground)",
    "--radius": `${theme.radius}rem`,
    "--app-font": font.stack,
    "--shadow-sm": sm,
    "--shadow-md": md,
    "--shadow-lg": lg,
    "--spacing": `${densitySpacing[theme.density]}rem`,
  }
}

export function applyTheme(theme: Theme, systemDark: boolean, root: HTMLElement = document.documentElement) {
  const mode = resolveMode(theme.mode, systemDark)
  root.classList.toggle("dark", mode === "dark")
  root.style.colorScheme = mode
  for (const [name, value] of Object.entries(themeVariables(theme, mode))) {
    if (value === null || value === undefined) root.style.removeProperty(name)
    else root.style.setProperty(name, value)
  }
}

export function backgroundFor(mode: "light" | "dark") {
  return mode === "light" ? LIGHT_BACKGROUND : DARK_BACKGROUND
}
