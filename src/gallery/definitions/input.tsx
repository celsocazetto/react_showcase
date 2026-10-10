import { Input } from "@/components/ui/input"
import type { ComponentDefinition } from "../types"

export const input: ComponentDefinition = {
  slug: "input",
  name: "Input",
  category: "Formulários",
  explanation: "Campo de uma linha para digitar texto curto: nome, e-mail, senha, busca. Para textos longos, use Textarea.",
  props: [
    {
      name: "type",
      kind: "select",
      hint: "O tipo de dado: muda o teclado no celular e a validação do navegador.",
      options: ["text", "email", "password", "number", "search"],
      default: "text",
    },
    { name: "placeholder", kind: "boolean", hint: "Mostra um texto de exemplo cinza dentro do campo, que some ao digitar.", default: true },
    { name: "disabled", kind: "boolean", hint: "Desativa o campo: não aceita digitação e fica esmaecido.", default: false },
    { name: "invalid", kind: "boolean", hint: "Marca o campo com erro (aria-invalid): a borda fica vermelha.", default: false },
  ],
  render: (v) => (
    <Input
      key={v.type as string}
      className="max-w-xs"
      type={v.type as string}
      placeholder={v.placeholder ? "Digite aqui..." : undefined}
      disabled={v.disabled as boolean}
      aria-invalid={v.invalid as boolean}
      aria-label="Campo de exemplo"
    />
  ),
  prompt: (v) => {
    const extras = [v.placeholder && "um placeholder", v.disabled && "desabilitado (disabled)", v.invalid && "em estado de erro (aria-invalid)"].filter(Boolean)
    return `Use um componente Input com type="${v.type}"` + (extras.length ? `, com ${extras.join(", ")}` : "") + "."
  },
}
