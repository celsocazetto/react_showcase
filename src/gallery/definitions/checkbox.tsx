import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { ComponentDefinition } from "../types"

export const checkbox: ComponentDefinition = {
  slug: "checkbox",
  name: "Checkbox",
  category: "Formulários",
  explanation: 'Caixa de marcação para ligar ou desligar uma opção, ou escolher vários itens de uma lista. Use para "aceito os termos" ou filtros múltiplos.',
  props: [
    {
      name: "checked",
      kind: "select",
      hint: "O estado: true (marcada), false (desmarcada) ou indeterminate (parcial, ex.: só alguns filhos marcados).",
      options: ["false", "true", "indeterminate"],
      default: "true",
    },
    { name: "label", kind: "boolean", hint: "Mostra um texto clicável (Label) ao lado da caixa.", default: true },
    { name: "disabled", kind: "boolean", hint: "Desativa a caixa: não responde a cliques e fica esmaecida.", default: false },
  ],
  render: (v) => {
    const checked = v.checked === "indeterminate" ? "indeterminate" : v.checked === "true"
    return (
      <div className="flex items-center gap-2">
        <Checkbox key={String(v.checked)} id="cb-demo" defaultChecked={checked} disabled={v.disabled as boolean} aria-label={v.label ? undefined : "Aceito os termos"} />
        {v.label && <Label htmlFor="cb-demo">Aceito os termos de uso</Label>}
      </div>
    )
  },
  prompt: (v) =>
    `Use um componente Checkbox com checked=${v.checked === "indeterminate" ? '"indeterminate"' : `{${v.checked}}`}` +
    (v.label ? ", acompanhado de um Label clicável" : "") +
    (v.disabled ? ", desabilitado (disabled)" : "") +
    ".",
}
