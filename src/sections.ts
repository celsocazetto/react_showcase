import { BookOpen, LayoutTemplate, Palette, Puzzle, SpellCheck, type LucideIcon } from "lucide-react"

export type Section = {
  path: string
  title: string
  description: string
  icon: LucideIcon
}

export const sections: Section[] = [
  { path: "/galeria", title: "Galeria", description: "Componentes de UI com preview, controles e prompt pronto.", icon: Puzzle },
  { path: "/laboratorio", title: "Laboratório de Layout", description: "Experimente flexbox, grid e responsividade em tempo real.", icon: LayoutTemplate },
  { path: "/tema", title: "Tema", description: "Cores, bordas, fontes e outros conceitos de design.", icon: Palette },
  { path: "/exemplos", title: "Exemplos prontos", description: "Telas completas montadas com os componentes.", icon: BookOpen },
  { path: "/glossario", title: "Glossário", description: "Termos de design e UI explicados em português.", icon: SpellCheck },
]
