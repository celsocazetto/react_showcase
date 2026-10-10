import { describe, expect, it } from "vitest"
import { buildLayout, defaultLayout, toApplied, type LayoutConfig } from "./layout"

const cfg = (o: Partial<LayoutConfig>): LayoutConfig => ({ ...defaultLayout, ...o })
const get = (c: LayoutConfig, id: string) => buildLayout(c).controls.find((x) => x.id === id)!

describe("buildLayout", () => {
  it("shows plain classes for the base configuration", () => {
    expect(get(cfg({ mode: "flex", direction: "column" }), "direction").classes).toEqual(["flex-col"])
    expect(get(cfg({ gap: "8" }), "gap").classes).toEqual(["gap-8"])
  })
  it("adds breakpoint-prefixed classes only when a responsive override is active", () => {
    const grid = cfg({ mode: "grid", columns: "1", columnsMd: "3" })
    expect(get(grid, "columns").classes).toEqual(["grid-cols-1", "md:grid-cols-3"])
    expect(get(cfg({ mode: "grid", columns: "2" }), "columns").classes).toEqual(["grid-cols-2"])
  })
  it("applies breakpoints as container-query variants", () => {
    expect(toApplied("md:grid-cols-3")).toBe("@3xl:grid-cols-3")
    expect(toApplied("lg:grid-cols-4")).toBe("@5xl:grid-cols-4")
    const { containerClass } = buildLayout(cfg({ mode: "grid", columnsMd: "3" }))
    expect(containerClass).toContain("@3xl:grid-cols-3")
    expect(containerClass).not.toContain(" md:")
  })
  it("ignores controls that do not apply to the mode", () => {
    expect(buildLayout(cfg({ mode: "grid" })).containerClass).not.toContain("flex-")
    expect(buildLayout(cfg({ mode: "flex", columns: "4" })).containerClass).not.toContain("grid-cols")
  })
  it("handles max width and centering", () => {
    const { containerClass } = buildLayout(cfg({ maxWidth: "md", centered: true }))
    expect(containerClass).toContain("max-w-md")
    expect(containerClass).toContain("mx-auto")
    expect(buildLayout(defaultLayout).containerClass).not.toContain("max-w")
  })
  it("builds a prompt with technical class names", () => {
    const p = buildLayout(cfg({ mode: "grid", columns: "1", columnsMd: "3", gap: "2", centered: true, maxWidth: "lg" })).prompt
    expect(p).toContain("grid-cols-1")
    expect(p).toContain("md:grid-cols-3")
    expect(p).toContain("gap-2")
    expect(p).toContain("max-w-lg")
    expect(p).toContain("mx-auto")
  })
})
