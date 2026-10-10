import { describe, expect, it } from "vitest"
import { contrastRatio, DARK_BACKGROUND, LIGHT_BACKGROUND, readableForeground } from "./contrast"
import { colorPresets } from "./presets"

describe("contrastRatio", () => {
  it("matches the WCAG reference values", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 0)
    expect(contrastRatio("#777777", "#777777")).toBeCloseTo(1, 5)
  })
})

describe("color presets meet WCAG AA in both modes", () => {
  for (const preset of colorPresets) {
    for (const mode of ["light", "dark"] as const) {
      const color = preset[mode]
      const background = mode === "light" ? LIGHT_BACKGROUND : DARK_BACKGROUND
      it(`${preset.name} (${mode}): readable text on the color and visible against the page`, () => {
        expect(contrastRatio(color, readableForeground(color))).toBeGreaterThanOrEqual(4.5)
        expect(contrastRatio(color, background)).toBeGreaterThanOrEqual(3)
      })
    }
  }
})
