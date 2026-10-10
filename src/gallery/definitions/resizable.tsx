import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import type { ComponentDefinition } from "../types"

const box = "flex h-full items-center justify-center p-4 text-sm font-medium"

export const resizable: ComponentDefinition = {
  slug: "resizable",
  name: "Resizable",
  category: "Layout",
  explanation: "Painéis cujo tamanho a pessoa ajusta arrastando a divisória. Use em layouts tipo editor, com barra lateral e área principal.",
  props: [
    { name: "orientation", kind: "select", hint: "Direção da divisão: horizontal (lado a lado) ou vertical (empilhado).", options: ["horizontal", "vertical"], default: "horizontal" },
    { name: "withHandle", kind: "boolean", hint: "Mostra uma alça visível na divisória (ResizableHandle withHandle).", default: true },
  ],
  render: (v) => (
    <ResizablePanelGroup key={String(v.orientation)} orientation={v.orientation as "horizontal" | "vertical"} className="h-48 w-full max-w-md rounded-lg border">
      <ResizablePanel defaultSize="40%" minSize="20%">
        <div className={box}>Painel A</div>
      </ResizablePanel>
      <ResizableHandle withHandle={v.withHandle as boolean} />
      <ResizablePanel defaultSize="60%" minSize="20%">
        <div className={box}>Painel B</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
  prompt: (v) =>
    `Use um componente ResizablePanelGroup com orientation="${v.orientation}", dois ResizablePanel e um ResizableHandle${v.withHandle ? " com withHandle (alça visível)" : " sem alça visível"} entre eles.`,
}
