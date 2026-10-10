import { describe, expect, it } from "vitest"
import { components } from "../registry"
import { categories, defaultValues } from "../types"

describe("gallery definitions", () => {
  it("registers unique slugs in valid categories", () => {
    const slugs = components.map((c) => c.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const c of components) expect(categories).toContain(c.category)
  })

  it("places the Ações and Formulários components in the right categories", () => {
    const by = (cat: string) => components.filter((c) => c.category === cat).map((c) => c.slug)
    expect(by("Ações").sort()).toEqual(["button", "dropdown-menu", "toggle"])
    expect(by("Formulários").sort()).toEqual(["checkbox", "date-picker", "input", "radio-group", "select", "slider", "switch", "textarea"])
  })

  it.each(components.map((c) => [c.slug, c] as const))("%s: defaults are valid and prompt names the component", (_, c) => {
    for (const p of c.props) {
      if (p.kind === "select") expect(p.options).toContain(p.default)
    }
    const prompt = c.prompt(defaultValues(c))
    expect(prompt.includes(c.name) || prompt.includes(c.name.replace(" ", ""))).toBe(true)
  })

  it.each(components.flatMap((c) => c.props.flatMap((p) => (p.kind === "select" ? [[c.slug, c.name, c, p] as const] : []))))(
    "%s: prompt reflects every option of its select props",
    (_slug, _name, c, p) => {
      if (p.kind !== "select") return
      const prompts = p.options.map((o) => c.prompt({ ...defaultValues(c), [p.name]: o }))
      expect(new Set(prompts).size).toBe(p.options.length)
    },
  )
})

describe("Exibição de dados", () => {
  it("registers the 6 data display components", () => {
    const slugs = components.filter((c) => c.category === "Exibição de dados").map((c) => c.slug)
    expect(slugs.sort()).toEqual(["avatar", "badge", "card", "progress", "skeleton", "table"])
  })
})

describe("Feedback", () => {
  it("registers the 6 feedback components with 2 to 4 Controles each", () => {
    const items = components.filter((c) => c.category === "Feedback")
    expect(items.map((c) => c.slug).sort()).toEqual(["alert", "dialog", "popover", "sheet", "toast", "tooltip"])
    for (const c of items) expect(c.props.length).toBeGreaterThanOrEqual(2), expect(c.props.length).toBeLessThanOrEqual(4)
  })
})
