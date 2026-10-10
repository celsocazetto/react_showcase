import { Badge } from "@/components/ui/badge"
import type { ComponentDefinition } from "../types"

export const badge: ComponentDefinition = {
  slug: "badge",
  name: "Badge",
  category: "Exibição de dados",
  explanation: "Etiqueta pequena que destaca um status, categoria ou contagem, como \"Novo\" ou \"Pago\". Não é clicável por padrão.",
  props: [
    { name: "variant", kind: "select", hint: "O estilo visual: default, secondary, destructive ou outline.", options: ["default", "secondary", "destructive", "outline"], default: "default" },
  ],
  render: (v) => <Badge variant={v.variant as "default"}>Novo</Badge>,
  prompt: (v) => `Use um componente Badge com variant="${v.variant}" para destacar um status curto.`,
}
