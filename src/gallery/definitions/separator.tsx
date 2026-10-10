import { Separator } from "@/components/ui/separator"
import type { ComponentDefinition } from "../types"

export const separator: ComponentDefinition = {
  slug: "separator",
  name: "Separator",
  category: "Layout",
  explanation: "Linha fina que divide conteúdos relacionados. Use para separar seções em listas, menus e cartões sem criar caixas extras.",
  props: [
    { name: "orientation", kind: "select", hint: "Direção da linha: horizontal (entre linhas) ou vertical (entre colunas).", options: ["horizontal", "vertical"], default: "horizontal" },
    { name: "decorative", kind: "boolean", hint: "Se verdadeiro, leitores de tela ignoram a linha (é só visual).", default: true },
  ],
  render: (v) =>
    v.orientation === "vertical" ? (
      <div className="flex h-6 items-center gap-3 text-sm">
        <span>Blog</span>
        <Separator orientation="vertical" decorative={v.decorative as boolean} />
        <span>Docs</span>
        <Separator orientation="vertical" decorative={v.decorative as boolean} />
        <span>Fonte</span>
      </div>
    ) : (
      <div className="w-64 text-sm">
        <p className="font-medium">React Showcase</p>
        <p className="text-muted-foreground">Aprenda componentes de UI.</p>
        <Separator orientation="horizontal" decorative={v.decorative as boolean} className="my-3" />
        <p>Conteúdo da próxima seção.</p>
      </div>
    ),
  prompt: (v) =>
    `Use um componente Separator com orientation="${v.orientation}"${v.decorative ? " e decorative (ignorado por leitores de tela)" : " sem decorative (anunciado por leitores de tela)"}.`,
}
