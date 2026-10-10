import { Bold } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import type { ComponentDefinition } from "../types"

export const toggle: ComponentDefinition = {
  slug: "toggle",
  name: "Toggle",
  category: "Ações",
  explanation:
    "Um botão que liga e desliga, como o negrito em um editor de texto. Use quando a ação mantém um estado (ativo ou inativo) em vez de apenas disparar algo uma vez.",
  props: [
    {
      name: "variant",
      kind: "select",
      hint: "O estilo visual: default é discreto, outline ganha uma borda.",
      options: ["default", "outline"],
      default: "default",
    },
    { name: "size", kind: "select", hint: "O tamanho do botão.", options: ["sm", "default", "lg"], default: "default" },
    { name: "disabled", kind: "boolean", hint: "Desativa o Toggle: não responde a cliques e fica esmaecido.", default: false },
  ],
  render: (v) => (
    <Toggle variant={v.variant as "default"} size={v.size as "default"} disabled={v.disabled as boolean} aria-label="Negrito">
      <Bold />
    </Toggle>
  ),
  prompt: (v) =>
    `Use um componente Toggle com variant="${v.variant}" e size="${v.size}"` +
    (v.disabled ? ", desabilitado (disabled)" : "") +
    ", que alterna entre ativo e inativo ao ser clicado.",
}
