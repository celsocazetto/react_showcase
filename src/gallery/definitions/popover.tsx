import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import type { ComponentDefinition } from "../types"

export const popover: ComponentDefinition = {
  slug: "popover",
  name: "Popover",
  category: "Feedback",
  explanation: "Pequeno painel flutuante que abre ao clicar em um elemento, sem bloquear a página. Use para detalhes extras e ajustes rápidos.",
  props: [
    { name: "side", kind: "select", hint: "De que lado do botão o painel aparece.", options: ["top", "right", "bottom", "left"], default: "bottom" },
    { name: "align", kind: "select", hint: "Alinhamento do painel em relação ao botão.", options: ["start", "center", "end"], default: "center" },
    { name: "description", kind: "boolean", hint: "Mostra o PopoverDescription abaixo do título.", default: true },
  ],
  render: (v) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm">Abrir</Button>
      </PopoverTrigger>
      <PopoverContent side={v.side as "top" | "right" | "bottom" | "left"} align={v.align as "start" | "center" | "end"}>
        <PopoverHeader>
          <PopoverTitle>Dimensões</PopoverTitle>
          {v.description && <PopoverDescription>Defina o tamanho da camada.</PopoverDescription>}
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
  prompt: (v) =>
    `Use um componente Popover aberto por um PopoverTrigger, com PopoverContent side="${v.side}" e align="${v.align}", contendo um PopoverTitle` +
    (v.description ? " e um PopoverDescription" : "") +
    ".",
}
