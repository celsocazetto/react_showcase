import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ComponentDefinition } from "../types"

export const button: ComponentDefinition = {
  slug: "button",
  name: "Button",
  category: "Ações",
  explanation:
    "Use um botão para disparar uma ação: enviar um formulário, abrir um diálogo, confirmar ou cancelar. Para navegar entre páginas, prefira um link.",
  props: [
    {
      name: "variant",
      kind: "select",
      hint: "O estilo visual: default é a ação principal, outline e secondary são ações de apoio, destructive avisa de risco.",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      default: "default",
    },
    {
      name: "size",
      kind: "select",
      hint: "O tamanho do botão.",
      options: ["xs", "sm", "default", "lg"],
      default: "default",
    },
    { name: "icon", kind: "boolean", hint: "Mostra um ícone ao lado do texto (o ícone vai como filho do Button).", default: false },
    { name: "disabled", kind: "boolean", hint: "Desativa o botão: não responde a cliques e fica esmaecido.", default: false },
  ],
  render: (v) => (
    <Button variant={v.variant as "default"} size={v.size as "default"} disabled={v.disabled as boolean}>
      {v.icon && <Mail />}
      Enviar
    </Button>
  ),
  prompt: (v) => {
    const extras = [v.icon && "com um ícone à esquerda do texto", v.disabled && "desabilitado (disabled)"].filter(Boolean)
    return (
      `Use um componente Button com variant="${v.variant}" e size="${v.size}"` +
      (extras.length ? `, ${extras.join(" e ")}` : "") +
      "."
    )
  },
}
