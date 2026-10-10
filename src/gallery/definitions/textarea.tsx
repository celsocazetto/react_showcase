import { Textarea } from "@/components/ui/textarea"
import type { ComponentDefinition } from "../types"

export const textarea: ComponentDefinition = {
  slug: "textarea",
  name: "Textarea",
  category: "Formulários",
  explanation: "Campo de várias linhas para textos longos: comentários, descrições, mensagens. Para texto curto, use Input.",
  props: [
    { name: "rows", kind: "select", hint: "Quantas linhas de altura o campo tem inicialmente.", options: ["2", "4", "6"], default: "4" },
    { name: "placeholder", kind: "boolean", hint: "Mostra um texto de exemplo cinza dentro do campo, que some ao digitar.", default: true },
    { name: "disabled", kind: "boolean", hint: "Desativa o campo: não aceita digitação e fica esmaecido.", default: false },
    { name: "invalid", kind: "boolean", hint: "Marca o campo com erro (aria-invalid): a borda fica vermelha.", default: false },
  ],
  render: (v) => (
    <Textarea
      className="max-w-sm"
      rows={Number(v.rows)}
      placeholder={v.placeholder ? "Escreva sua mensagem..." : undefined}
      disabled={v.disabled as boolean}
      aria-invalid={v.invalid as boolean}
      aria-label="Mensagem"
    />
  ),
  prompt: (v) => {
    const extras = [v.placeholder && "um placeholder", v.disabled && "desabilitado (disabled)", v.invalid && "em estado de erro (aria-invalid)"].filter(Boolean)
    return `Use um componente Textarea com rows={${v.rows}}` + (extras.length ? `, com ${extras.join(", ")}` : "") + "."
  },
}
