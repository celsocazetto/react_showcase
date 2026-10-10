import { ChevronDown, LogOut, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ComponentDefinition } from "../types"

export const dropdownMenu: ComponentDefinition = {
  slug: "dropdown-menu",
  name: "Dropdown Menu",
  category: "Ações",
  explanation:
    "Um menu que abre ao clicar em um botão e lista várias ações. Use quando há muitas ações relacionadas e você não quer ocupar a tela com um botão para cada uma.",
  props: [
    {
      name: "side",
      kind: "select",
      hint: "De que lado do botão o menu aparece.",
      options: ["top", "right", "bottom", "left"],
      default: "bottom",
    },
    {
      name: "align",
      kind: "select",
      hint: "Alinhamento do menu em relação ao botão: start (início), center ou end (fim).",
      options: ["start", "center", "end"],
      default: "start",
    },
    { name: "shortcuts", kind: "boolean", hint: "Mostra atalhos de teclado à direita de cada item (DropdownMenuShortcut).", default: false },
    { name: "destructiveItem", kind: "boolean", hint: 'Marca o último item como perigoso (variant="destructive"), em vermelho.', default: true },
  ],
  render: (v) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Minha conta <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={v.side as "bottom"} align={v.align as "start"} className="w-48">
        <DropdownMenuLabel>Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User /> Perfil {v.shortcuts && <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings /> Configurações {v.shortcuts && <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>}
        </DropdownMenuItem>
        <DropdownMenuItem variant={v.destructiveItem ? "destructive" : "default"}>
          <LogOut /> Sair {v.shortcuts && <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  prompt: (v) => {
    const extras = [v.shortcuts && "atalhos de teclado ao lado dos itens", v.destructiveItem && "o último item em estilo destrutivo (destructive)"].filter(Boolean)
    return (
      `Use um componente DropdownMenu aberto por um botão, com side="${v.side}" e align="${v.align}"` +
      (extras.length ? `, com ${extras.join(" e ")}` : "") +
      "."
    )
  },
}
