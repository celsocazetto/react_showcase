import { AlertCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { ComponentDefinition } from "../types"

function AlertDemo({ variant, description, icon }: { variant: "default" | "destructive"; description: boolean; icon: boolean }) {
  const [open, setOpen] = useState(false)
  const Icon = variant === "destructive" ? AlertCircle : Info
  return (
    <div className="flex w-full max-w-md flex-col items-start gap-3">
      <Button size="sm" onClick={() => setOpen((o) => !o)}>
        {open ? "Fechar" : "Abrir"}
      </Button>
      {open && (
        <Alert variant={variant} className={icon ? "flex gap-3" : undefined}>
          {icon && <Icon className="mt-0.5 size-4 shrink-0" />}
          <div>
            <AlertTitle>{variant === "destructive" ? "Algo deu errado" : "Aviso importante"}</AlertTitle>
            {description && <AlertDescription>Revise os dados informados e tente novamente.</AlertDescription>}
          </div>
        </Alert>
      )}
    </div>
  )
}

export const alert: ComponentDefinition = {
  slug: "alert",
  name: "Alert",
  category: "Feedback",
  explanation: "Faixa fixa na página que destaca uma mensagem importante, como um aviso ou um erro. Diferente do Toast, ela não some sozinha.",
  props: [
    { name: "variant", kind: "select", hint: "O tom da mensagem: neutro ou de erro.", options: ["default", "destructive"], default: "default" },
    { name: "description", kind: "boolean", hint: "Mostra o AlertDescription abaixo do título.", default: true },
    { name: "icon", kind: "boolean", hint: "Mostra um ícone ao lado do texto.", default: false },
  ],
  render: (v) => <AlertDemo variant={v.variant as "default" | "destructive"} description={v.description as boolean} icon={v.icon as boolean} />,
  prompt: (v) =>
    `Use um componente Alert com variant="${v.variant}" e um AlertTitle` +
    (v.description ? " seguido de um AlertDescription" : "") +
    (v.icon ? ", com um ícone ao lado do texto" : "") +
    ".",
}
