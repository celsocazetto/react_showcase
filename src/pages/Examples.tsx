import type { Section } from "@/sections"
import { Dashboard } from "@/examples/Dashboard"

export function Examples({ section }: { section: Section }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">{section.title}</h1>
      <p className="mt-2 mb-6 text-muted-foreground">{section.description} Mude o Tema para ver a tela reagir.</p>
      <Dashboard />
    </div>
  )
}
