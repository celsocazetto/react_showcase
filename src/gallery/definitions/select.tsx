import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ComponentDefinition } from "../types"

export const select: ComponentDefinition = {
  slug: "select",
  name: "Select",
  category: "Formulários",
  explanation: "Lista suspensa para escolher uma opção entre várias. Use quando há mais de 4 ou 5 opções; com menos, Radio Group é mais direto.",
  props: [
    { name: "size", kind: "select", hint: "A altura do campo (aplicada ao SelectTrigger).", options: ["sm", "default"], default: "default" },
    { name: "placeholder", kind: "boolean", hint: "Mostra um texto de orientação enquanto nada foi escolhido.", default: true },
    { name: "disabled", kind: "boolean", hint: "Desativa o Select: não abre e fica esmaecido.", default: false },
  ],
  render: (v) => (
    <Select key={String(v.placeholder)} disabled={v.disabled as boolean} defaultValue={v.placeholder ? undefined : "react"}>
      <SelectTrigger className="w-56" size={v.size as "default"} aria-label="Framework">
        <SelectValue placeholder="Escolha um framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="vue">Vue</SelectItem>
        <SelectItem value="svelte">Svelte</SelectItem>
      </SelectContent>
    </Select>
  ),
  prompt: (v) =>
    `Use um componente Select com SelectTrigger de size="${v.size}"` +
    (v.placeholder ? ", com um placeholder orientando a escolha" : "") +
    (v.disabled ? ", desabilitado (disabled)" : "") +
    ".",
}
