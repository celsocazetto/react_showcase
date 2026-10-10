import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { ComponentDefinition } from "../types"

const plans = [
  { value: "gratis", label: "Grátis" },
  { value: "pro", label: "Pro" },
  { value: "empresa", label: "Empresa" },
]

export const radioGroup: ComponentDefinition = {
  slug: "radio-group",
  name: "Radio Group",
  category: "Formulários",
  explanation: "Grupo de opções em que só uma pode ser escolhida, todas visíveis ao mesmo tempo. Use para poucas opções (até 4 ou 5); com mais, prefira Select.",
  props: [
    { name: "orientation", kind: "select", hint: "Direção do grupo: vertical empilha, horizontal coloca lado a lado.", options: ["vertical", "horizontal"], default: "vertical" },
    { name: "disabled", kind: "boolean", hint: "Desativa o grupo todo: nenhuma opção pode ser escolhida.", default: false },
  ],
  render: (v) => (
    <RadioGroup
      defaultValue="pro"
      orientation={v.orientation as "vertical"}
      disabled={v.disabled as boolean}
      className={v.orientation === "horizontal" ? "flex gap-6" : undefined}
    >
      {plans.map((p) => (
        <div key={p.value} className="flex items-center gap-2">
          <RadioGroupItem value={p.value} id={`rg-${p.value}`} />
          <Label htmlFor={`rg-${p.value}`}>{p.label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
  prompt: (v) =>
    `Use um componente RadioGroup com orientation="${v.orientation}" e itens RadioGroupItem, onde só uma opção pode ser escolhida` +
    (v.disabled ? ", desabilitado (disabled)" : "") +
    ".",
}
