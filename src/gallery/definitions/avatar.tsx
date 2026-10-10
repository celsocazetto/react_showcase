import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ComponentDefinition } from "../types"

export const avatar: ComponentDefinition = {
  slug: "avatar",
  name: "Avatar",
  category: "Exibição de dados",
  explanation: "Imagem redonda que representa uma pessoa ou conta. Se a imagem falhar ao carregar, mostra o AvatarFallback, como as iniciais.",
  props: [
    { name: "size", kind: "select", hint: "O tamanho, via classe Tailwind (size-8, size-10, size-14).", options: ["size-8", "size-10", "size-14"], default: "size-10" },
    { name: "image", kind: "boolean", hint: "Usa um AvatarImage. Desligado, aparece só o AvatarFallback.", default: false },
  ],
  render: (v) => (
    <Avatar className={v.size as string}>
      {v.image && <AvatarImage src="https://github.com/shadcn.png" alt="Avatar de exemplo" />}
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  prompt: (v) =>
    `Use um componente Avatar com className="${v.size}"` +
    (v.image ? ", um AvatarImage com a foto e um AvatarFallback com as iniciais" : " e um AvatarFallback com as iniciais") +
    ".",
}
