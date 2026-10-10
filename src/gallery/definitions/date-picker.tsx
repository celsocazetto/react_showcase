import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { ComponentDefinition } from "../types"

function DatePickerPreview({ disabled, weekends }: { disabled: boolean; weekends: boolean }) {
  const [date, setDate] = useState<Date | undefined>()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" disabled={disabled} className="w-56 justify-start font-normal">
          <CalendarIcon />
          {date ? date.toLocaleDateString("pt-BR") : "Escolha uma data"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} disabled={weekends ? { dayOfWeek: [0, 6] } : undefined} />
      </PopoverContent>
    </Popover>
  )
}

export const datePicker: ComponentDefinition = {
  slug: "date-picker",
  name: "Date Picker",
  category: "Formulários",
  explanation: "Campo que abre um calendário para escolher uma data. É a combinação de um Popover com o componente Calendar. Use no lugar de digitar a data à mão.",
  props: [
    { name: "weekends", kind: "boolean", hint: "Bloqueia sábados e domingos no calendário (prop disabled do Calendar).", default: false },
    { name: "disabled", kind: "boolean", hint: "Desativa o botão: o calendário não abre e fica esmaecido.", default: false },
  ],
  render: (v) => <DatePickerPreview key={String(v.weekends)} disabled={v.disabled as boolean} weekends={v.weekends as boolean} />,
  prompt: (v) =>
    `Use um Date Picker (um Popover com um Calendar mode="single" aberto por um Button) para escolher uma única data` +
    (v.weekends ? ", bloqueando sábados e domingos" : "") +
    (v.disabled ? ", desabilitado (disabled)" : "") +
    ".",
}
