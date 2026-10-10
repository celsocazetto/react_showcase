import { describe, expect, it } from "vitest"
import { defaultTheme, loadTheme, resolveMode, saveTheme, themeVariables } from "./theme"

function memoryStorage(initial?: string) {
  let value = initial ?? null
  return { getItem: () => value, setItem: (_: string, v: string) => void (value = v) }
}

describe("theme persistence", () => {
  it("returns the default theme when nothing is saved", () => {
    expect(loadTheme(memoryStorage())).toEqual(defaultTheme)
  })
  it("round-trips a saved theme", () => {
    const storage = memoryStorage()
    const theme = { ...defaultTheme, radius: 1.25, mode: "dark" as const }
    saveTheme(theme, storage)
    expect(loadTheme(storage)).toEqual(theme)
  })
  it("falls back to defaults on corrupted data", () => {
    expect(loadTheme(memoryStorage("{nope"))).toEqual(defaultTheme)
  })
})

describe("mode", () => {
  it("follows the system when no manual override is set", () => {
    expect(resolveMode("system", true)).toBe("dark")
    expect(resolveMode("system", false)).toBe("light")
    expect(resolveMode("light", true)).toBe("light")
  })
})

describe("themeVariables", () => {
  it("maps controls to tokens", () => {
    const vars = themeVariables({ ...defaultTheme, radius: 1, density: "compact" }, "light")
    expect(vars["--radius"]).toBe("1rem")
    expect(vars["--spacing"]).toBe("0.2rem")
    expect(vars["--primary"]).toBe("#2563eb")
    expect(vars["--accent"]).toBeNull()
  })
  it("uses the dark variant of presets in dark mode", () => {
    expect(themeVariables(defaultTheme, "dark")["--primary"]).toBe("#60a5fa")
  })
})
