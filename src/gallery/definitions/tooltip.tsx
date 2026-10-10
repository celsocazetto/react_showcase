import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { ComponentDefinition } from "../types"

type Side = "top" | "right" | "bottom" | "left"

function TooltipDemo({ side, align, text }: { side: Side; align: "start" | "center" | "end"; text: string }) {
  const [open, setOpen] = useState(false)
  return (
    <TooltipProvider>
      <div className="flex items-center gap-3 py-10">
        <Button size="sm" variant="secondary" onClick={() => setOpen((o) => !o)}>
          {open ? "Fechar" : "Abrir"}
        </Button>
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <Button size="sm" variant="outline">
              Passe o mouse
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side} align={align}>
            {text === "short" ? "Salvar" : "Salva as alterações no seu perfil"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

export const tooltip: ComponentDefinition = {
  slug: "tooltip",
  name: "Tooltip",
  category: "Feedback",
  explanation: "Dica curta que aparece ao passar o mouse (ou focar) sobre um elemento. Use para explicar botões de ícone ou termos que precisam de uma pista.",
  props: [
    { name: "side", kind: "select", hint: "De que lado do elemento a dica aparece.", options: ["top", "right", "bottom", "left"], default: "top" },
    { name: "align", kind: "select", hint: "Alinhamento da dica em relação ao elemento.", options: ["start", "center", "end"], default: "center" },
    { name: "text", kind: "select", hint: "Tamanho do texto da dica.", options: ["short", "long"], default: "short" },
  ],
  render: (v) => <TooltipDemo side={v.side as Side} align={v.align as "start" | "center" | "end"} text={v.text as string} />,
  prompt: (v) =>
    `Use um componente Tooltip com side="${v.side}" e align="${v.align}" em volta de um TooltipTrigger, com um TooltipContent de texto ${v.text === "short" ? "curto" : "longo"}.`,
}
