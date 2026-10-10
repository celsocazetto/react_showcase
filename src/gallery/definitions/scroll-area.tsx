import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { ComponentDefinition } from "../types"

const tags = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)

export const scrollArea: ComponentDefinition = {
  slug: "scroll-area",
  name: "Scroll Area",
  category: "Layout",
  explanation: "Área com rolagem e barra estilizada, para conteúdo maior que o espaço disponível. Use em listas longas dentro de cartões ou painéis.",
  props: [
    { name: "height", kind: "select", hint: "Altura da área, via classe Tailwind (h-*). O que passar disso rola.", options: ["h-32", "h-48", "h-72"], default: "h-48" },
    { name: "direction", kind: "select", hint: "Sentido da rolagem: vertical (para baixo) ou horizontal (para o lado).", options: ["vertical", "horizontal"], default: "vertical" },
  ],
  render: (v) =>
    v.direction === "horizontal" ? (
      <ScrollArea className="w-64 rounded-md border whitespace-nowrap">
        <div className="flex gap-3 p-4 text-sm">
          {tags.map((t) => (
            <span key={t} className="shrink-0 rounded-md bg-muted px-3 py-1">{t}</span>
          ))}
        </div>
      </ScrollArea>
    ) : (
      <ScrollArea className={`${v.height} w-48 rounded-md border`}>
        <div className="p-4 text-sm">
          {tags.map((t) => (
            <div key={t}>
              <div>{t}</div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    ),
  prompt: (v) =>
    v.direction === "horizontal"
      ? `Use um componente ScrollArea com rolagem horizontal (ScrollBar orientation="horizontal") e itens lado a lado que não quebram de linha.`
      : `Use um componente ScrollArea com className="${v.height}" e rolagem vertical para uma lista longa.`,
}
