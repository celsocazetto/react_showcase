import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import type { ComponentDefinition } from "../types"

const durations: Record<string, number> = { "2000": 2000, "5000": 5000, "10000": 10000 }

function ToastDemo({ variant, duration, description, closeButton }: { variant: "default" | "destructive"; duration: string; description: boolean; closeButton: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <ToastProvider>
      <Button size="sm" onClick={() => setOpen(true)}>
        Abrir
      </Button>
      <Toast key={`${variant}-${duration}`} variant={variant} open={open} onOpenChange={setOpen} duration={durations[duration]}>
        <div className="grid gap-1">
          <ToastTitle>{variant === "destructive" ? "Falha ao salvar" : "Alterações salvas"}</ToastTitle>
          {description && <ToastDescription>{variant === "destructive" ? "Tente novamente em instantes." : "Tudo certo com o seu perfil."}</ToastDescription>}
        </div>
        {closeButton && <ToastClose />}
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}

export const toast: ComponentDefinition = {
  slug: "toast",
  name: "Toast",
  category: "Feedback",
  explanation: "Mensagem rápida que aparece no canto da tela e some sozinha depois de alguns segundos. Use para confirmar uma ação, como \"Alterações salvas\".",
  props: [
    { name: "variant", kind: "select", hint: "O tom da mensagem: neutro ou de erro.", options: ["default", "destructive"], default: "default" },
    { name: "duration", kind: "select", hint: "Quantos milissegundos o Toast fica na tela antes de sumir.", options: ["2000", "5000", "10000"], default: "5000" },
    { name: "description", kind: "boolean", hint: "Mostra o ToastDescription abaixo do título.", default: true },
    { name: "closeButton", kind: "boolean", hint: "Mostra o botão de fechar (ToastClose).", default: true },
  ],
  render: (v) => (
    <ToastDemo variant={v.variant as "default" | "destructive"} duration={v.duration as string} description={v.description as boolean} closeButton={v.closeButton as boolean} />
  ),
  prompt: (v) =>
    `Use um componente Toast com variant="${v.variant}" e duration={${v.duration}}, com um ToastTitle` +
    (v.description ? " e um ToastDescription" : "") +
    (v.closeButton ? ", e um botão ToastClose para fechar" : ", sem botão de fechar") +
    ".",
}
