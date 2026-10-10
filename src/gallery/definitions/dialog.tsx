import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { ComponentDefinition } from "../types"

export const dialog: ComponentDefinition = {
  slug: "dialog",
  name: "Dialog",
  category: "Feedback",
  explanation: "Janela modal que aparece no centro e bloqueia o resto da página até ser fechada. Use para confirmações e decisões que exigem atenção.",
  props: [
    { name: "description", kind: "boolean", hint: "Mostra o DialogDescription abaixo do título.", default: true },
    { name: "footer", kind: "boolean", hint: "Mostra o DialogFooter com botões de ação.", default: true },
    { name: "showCloseButton", kind: "boolean", hint: "Mostra o X de fechar no canto da janela.", default: true },
    { name: "size", kind: "select", hint: "Largura máxima do DialogContent, via classe Tailwind.", options: ["sm:max-w-sm", "sm:max-w-lg", "sm:max-w-2xl"], default: "sm:max-w-lg" },
  ],
  render: (v) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Abrir</Button>
      </DialogTrigger>
      <DialogContent className={v.size as string} showCloseButton={v.showCloseButton as boolean}>
        <DialogHeader>
          <DialogTitle>Excluir projeto?</DialogTitle>
          {v.description && <DialogDescription>Essa ação não pode ser desfeita.</DialogDescription>}
        </DialogHeader>
        {v.footer && (
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive">Excluir</Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  ),
  prompt: (v) =>
    `Use um componente Dialog aberto por um DialogTrigger, com DialogContent className="${v.size}" e showCloseButton={${v.showCloseButton}}, um DialogHeader com DialogTitle` +
    (v.description ? " e DialogDescription" : "") +
    (v.footer ? ", e um DialogFooter com botões de cancelar e confirmar" : "") +
    ".",
}
