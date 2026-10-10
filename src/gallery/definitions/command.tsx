import { Calendar, Settings, User } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import type { ComponentDefinition } from "../types"

export const command: ComponentDefinition = {
  slug: "command",
  name: "Command",
  category: "Navegação",
  explanation: "Paleta de comandos com busca: a pessoa digita e filtra ações ou páginas, navegando pelo teclado. Use em atalhos tipo Ctrl+K.",
  props: [
    { name: "groups", kind: "boolean", hint: "Organiza os itens em CommandGroup com título.", default: true },
    { name: "separator", kind: "boolean", hint: "Mostra CommandSeparator entre os grupos.", default: true },
    { name: "emptyMessage", kind: "boolean", hint: "Mostra CommandEmpty quando a busca não acha nada.", default: true },
  ],
  render: (v) => (
    <Command className="max-w-sm rounded-lg border shadow-md">
      <CommandInput placeholder="Digite um comando..." />
      <CommandList>
        {v.emptyMessage && <CommandEmpty>Nenhum resultado.</CommandEmpty>}
        {v.groups ? (
          <>
            <CommandGroup heading="Sugestões">
              <CommandItem><Calendar /> Calendário</CommandItem>
              <CommandItem><User /> Perfil</CommandItem>
            </CommandGroup>
            {v.separator && <CommandSeparator />}
            <CommandGroup heading="Ajustes">
              <CommandItem><Settings /> Configurações</CommandItem>
            </CommandGroup>
          </>
        ) : (
          <>
            <CommandItem><Calendar /> Calendário</CommandItem>
            <CommandItem><User /> Perfil</CommandItem>
            <CommandItem><Settings /> Configurações</CommandItem>
          </>
        )}
      </CommandList>
    </Command>
  ),
  prompt: (v) =>
    `Use um componente Command com CommandInput e CommandList${v.groups ? ", itens organizados em CommandGroup com heading" : ", com CommandItem soltos"}${v.groups && v.separator ? " separados por CommandSeparator" : ""}${v.emptyMessage ? " e um CommandEmpty para busca sem resultado" : ""}.`,
}
