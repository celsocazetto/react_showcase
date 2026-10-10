import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { ComponentDefinition } from "../types"

export const sheet: ComponentDefinition = {
  slug: "sheet",
  name: "Sheet",
  category: "Feedback",
  explanation: "Painel que desliza a partir de uma borda da tela. Use para menus, filtros e formulários que não precisam ocupar a tela inteira.",
  props: [
    { name: "side", kind: "select", hint: "De qual borda da tela o painel desliza.", options: ["top", "right", "bottom", "left"], default: "right" },
    { name: "description", kind: "boolean", hint: "Mostra o SheetDescription abaixo do título.", default: true },
    { name: "footer", kind: "boolean", hint: "Mostra o SheetFooter com botão de ação.", default: true },
    { name: "showCloseButton", kind: "boolean", hint: "Mostra o X de fechar no canto do painel.", default: true },
  ],
  render: (v) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">Abrir</Button>
      </SheetTrigger>
      <SheetContent side={v.side as "top" | "right" | "bottom" | "left"} showCloseButton={v.showCloseButton as boolean}>
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          {v.description && <SheetDescription>Refine a lista de resultados.</SheetDescription>}
        </SheetHeader>
        {v.footer && (
          <SheetFooter>
            <SheetClose asChild>
              <Button>Aplicar</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  ),
  prompt: (v) =>
    `Use um componente Sheet aberto por um SheetTrigger, com SheetContent side="${v.side}" e showCloseButton={${v.showCloseButton}}, um SheetHeader com SheetTitle` +
    (v.description ? " e SheetDescription" : "") +
    (v.footer ? ", e um SheetFooter com botão de ação" : "") +
    ".",
}
