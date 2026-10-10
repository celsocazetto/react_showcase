import { useState } from "react"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import type { ComponentDefinition } from "../types"

function PaginationDemo({ total, prevNext, ellipsis }: { total: number; prevNext: boolean; ellipsis: boolean }) {
  const [page, setPage] = useState(1)
  const current = Math.min(page, total)
  const go = (n: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    setPage(Math.max(1, Math.min(total, n)))
  }
  const pages = ellipsis && total > 5 ? [1, 2, 3, null, total] : Array.from({ length: total }, (_, i) => i + 1)
  return (
    <Pagination>
      <PaginationContent>
        {prevNext && (
          <PaginationItem>
            <PaginationPrevious href="#" onClick={go(current - 1)} />
          </PaginationItem>
        )}
        {pages.map((n, i) =>
          n === null ? (
            <PaginationItem key={`e${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={n}>
              <PaginationLink href="#" isActive={n === current} onClick={go(n)}>
                {n}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        {prevNext && (
          <PaginationItem>
            <PaginationNext href="#" onClick={go(current + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export const pagination: ComponentDefinition = {
  slug: "pagination",
  name: "Pagination",
  category: "Navegação",
  explanation: "Controle para navegar entre páginas de uma lista longa (resultados, tabelas). Use quando não dá para mostrar tudo de uma vez.",
  props: [
    { name: "pages", kind: "select", hint: "Quantidade total de páginas.", options: ["3", "5", "10"], default: "5" },
    { name: "previousNext", kind: "boolean", hint: "Mostra PaginationPrevious e PaginationNext.", default: true },
    { name: "ellipsis", kind: "boolean", hint: "Usa PaginationEllipsis para esconder páginas do meio (com mais de 5).", default: false },
  ],
  render: (v) => <PaginationDemo key={String(v.pages)} total={Number(v.pages)} prevNext={v.previousNext as boolean} ellipsis={v.ellipsis as boolean} />,
  prompt: (v) =>
    `Use um componente Pagination com ${v.pages} páginas em PaginationLink${v.previousNext ? ", com PaginationPrevious e PaginationNext" : ""}${v.ellipsis ? " e PaginationEllipsis nas páginas do meio" : ""}.`,
}
