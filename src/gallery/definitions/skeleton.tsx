import { Skeleton } from "@/components/ui/skeleton"
import type { ComponentDefinition } from "../types"

export const skeleton: ComponentDefinition = {
  slug: "skeleton",
  name: "Skeleton",
  category: "Exibição de dados",
  explanation: "Esqueleto cinza pulsante que ocupa o lugar do conteúdo enquanto ele carrega. Dá a sensação de página rápida, melhor que um espaço vazio.",
  props: [
    { name: "shape", kind: "select", hint: "O formato do esqueleto: line (texto), avatar (círculo) ou card (bloco).", options: ["line", "avatar", "card"], default: "line" },
    { name: "animate", kind: "boolean", hint: "Liga a animação animate-pulse. Desligado, fica estático.", default: true },
  ],
  render: (v) => {
    const pulse = v.animate ? undefined : "animate-none"
    if (v.shape === "avatar") return <Skeleton className={`size-12 rounded-full ${pulse ?? ""}`} />
    if (v.shape === "card") return <Skeleton className={`h-28 w-64 ${pulse ?? ""}`} />
    return (
      <div className="space-y-2">
        <Skeleton className={`h-4 w-64 ${pulse ?? ""}`} />
        <Skeleton className={`h-4 w-40 ${pulse ?? ""}`} />
      </div>
    )
  },
  prompt: (v) =>
    `Use um componente Skeleton em formato de ${v.shape === "line" ? "linhas de texto (h-4)" : v.shape === "avatar" ? "círculo (rounded-full)" : "bloco de card (h-28)"}` +
    (v.animate ? ", com animação animate-pulse" : ", sem animação (animate-none)") +
    " enquanto o conteúdo carrega.",
}
