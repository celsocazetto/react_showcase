import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { ComponentDefinition } from "../types"

export const switchDef: ComponentDefinition = {
  slug: "switch",
  name: "Switch",
  category: "Formulários",
  explanation: "Interruptor liga/desliga que costuma ter efeito imediato, como ativar notificações. Para opções que só valem ao enviar um formulário, Checkbox é mais comum.",
  props: [
    { name: "size", kind: "select", hint: "O tamanho do interruptor.", options: ["sm", "default"], default: "default" },
    { name: "checked", kind: "boolean", hint: "Estado inicial: ligado (true) ou desligado (false).", default: true },
    { name: "disabled", kind: "boolean", hint: "Desativa o interruptor: não responde a cliques e fica esmaecido.", default: false },
  ],
  render: (v) => (
    <div className="flex items-center gap-2">
      <Switch key={String(v.checked)} id="sw-demo" size={v.size as "default"} defaultChecked={v.checked as boolean} disabled={v.disabled as boolean} />
      <Label htmlFor="sw-demo">Notificações</Label>
    </div>
  ),
  prompt: (v) =>
    `Use um componente Switch com size="${v.size}", inicialmente ${v.checked ? "ligado" : "desligado"} (checked=${v.checked})` +
    (v.disabled ? ", desabilitado (disabled)" : "") +
    ".",
}
