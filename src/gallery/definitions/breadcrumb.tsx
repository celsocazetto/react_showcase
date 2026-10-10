import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Slash } from "lucide-react"
import type { ComponentDefinition } from "../types"

export const breadcrumb: ComponentDefinition = {
  slug: "breadcrumb",
  name: "Breadcrumb",
  category: "Navegação",
  explanation: "Trilha de navegação que mostra onde a pessoa está dentro do site e permite voltar a níveis anteriores. Use em páginas com hierarquia.",
  props: [
    { name: "separator", kind: "select", hint: "Ícone entre os itens da trilha.", options: ["chevron", "slash"], default: "chevron" },
    { name: "ellipsis", kind: "boolean", hint: "Colapsa níveis intermediários com BreadcrumbEllipsis.", default: false },
  ],
  render: (v) => {
    const sep = <BreadcrumbSeparator>{v.separator === "slash" ? <Slash /> : undefined}</BreadcrumbSeparator>
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Início</BreadcrumbLink>
          </BreadcrumbItem>
          {sep}
          {v.ellipsis ? (
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Componentes</BreadcrumbLink>
            </BreadcrumbItem>
          )}
          {sep}
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  },
  prompt: (v) =>
    `Use um componente Breadcrumb com BreadcrumbList, BreadcrumbItem e BreadcrumbLink, BreadcrumbSeparator com ícone ${v.separator === "slash" ? "de barra (Slash)" : "de seta (ChevronRight)"}${v.ellipsis ? ", um BreadcrumbEllipsis no lugar dos níveis do meio" : ""} e BreadcrumbPage na página atual.`,
}
