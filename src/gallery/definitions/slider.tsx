import { Slider } from "@/components/ui/slider"
import type { ComponentDefinition } from "../types"

export const slider: ComponentDefinition = {
  slug: "slider",
  name: "Slider",
  category: "Formulários",
  explanation: "Barra deslizante para escolher um valor numérico dentro de um intervalo, como volume ou brilho. Use quando a precisão exata importa menos que a sensação de ajuste.",
  props: [
    { name: "step", kind: "select", hint: "De quanto em quanto o valor muda ao arrastar.", options: ["1", "10", "25"], default: "1" },
    { name: "range", kind: "boolean", hint: "Usa dois controles (defaultValue com 2 números) para escolher um intervalo, e não um único valor.", default: false },
    { name: "disabled", kind: "boolean", hint: "Desativa o Slider: não pode ser arrastado e fica esmaecido.", default: false },
  ],
  render: (v) => (
    <Slider
      key={`${v.range}-${v.step}`}
      className="max-w-xs"
      defaultValue={v.range ? [25, 75] : [50]}
      max={100}
      step={Number(v.step)}
      disabled={v.disabled as boolean}
    />
  ),
  prompt: (v) =>
    `Use um componente Slider de 0 a 100 (min=0, max=100) com step={${v.step}}` +
    (v.range ? ", com dois controles para escolher um intervalo" : ", com um único controle") +
    (v.disabled ? ", desabilitado (disabled)" : "") +
    ".",
}
