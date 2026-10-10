import { Progress } from "@/components/ui/progress"
import type { ComponentDefinition } from "../types"

export const progress: ComponentDefinition = {
  slug: "progress",
  name: "Progress",
  category: "Exibição de dados",
  explanation: "Barra que mostra quanto de uma tarefa já foi concluído, como upload ou etapas de cadastro. Use quando o avanço é conhecido.",
  props: [
    { name: "value", kind: "select", hint: "O avanço de 0 a 100 (porcentagem preenchida).", options: ["0", "25", "60", "100"], default: "60" },
  ],
  render: (v) => <Progress className="w-64" value={Number(v.value)} aria-label="Progresso" />,
  prompt: (v) => `Use um componente Progress com value={${v.value}} para mostrar ${v.value}% de avanço.`,
}
