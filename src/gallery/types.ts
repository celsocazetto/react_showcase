import type { ReactNode } from "react"

export const categories = ["Ações", "Formulários", "Exibição de dados", "Feedback", "Navegação", "Layout"] as const
export type Category = (typeof categories)[number]

export type PropValue = string | boolean
export type PropValues = Record<string, PropValue>

export type PropDefinition =
  | { name: string; kind: "select"; hint: string; options: string[]; default: string }
  | { name: string; kind: "boolean"; hint: string; default: boolean }

export type ComponentDefinition = {
  slug: string
  /** Technical name, kept in English. */
  name: string
  category: Category
  /** When to use it, in Portuguese. */
  explanation: string
  props: PropDefinition[]
  render: (values: PropValues) => ReactNode
  /** Pure function: current configuration -> copyable Prompt-descrição. */
  prompt: (values: PropValues) => string
}

export function defaultValues(def: ComponentDefinition): PropValues {
  return Object.fromEntries(def.props.map((p) => [p.name, p.default]))
}
