import type { Section } from "@/sections"

export function SectionPlaceholder({ section }: { section: Section }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">{section.title}</h1>
      <p className="mt-2 text-muted-foreground">{section.description}</p>
      <p className="mt-6 rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        Em breve.
      </p>
    </div>
  )
}
