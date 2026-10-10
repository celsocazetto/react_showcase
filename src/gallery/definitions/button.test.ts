import { describe, expect, it } from "vitest"
import { defaultValues } from "../types"
import { button } from "./button"

describe("button prompt", () => {
  it("mixes natural language with technical prop names", () => {
    const prompt = button.prompt({ ...defaultValues(button), variant: "outline", size: "lg" })
    expect(prompt).toContain("Button")
    expect(prompt).toContain('variant="outline"')
    expect(prompt).toContain('size="lg"')
  })
  it("mentions icon and disabled only when active", () => {
    const base = defaultValues(button)
    expect(button.prompt(base)).not.toContain("disabled")
    expect(button.prompt(base)).not.toContain("ícone")
    const prompt = button.prompt({ ...base, icon: true, disabled: true })
    expect(prompt).toContain("ícone")
    expect(prompt).toContain("disabled")
  })
})
