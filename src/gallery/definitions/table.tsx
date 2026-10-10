import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ComponentDefinition } from "../types"

const rows = [
  ["Ana", "Admin", "Ativa"],
  ["Bruno", "Editor", "Pendente"],
  ["Carla", "Leitora", "Ativa"],
]

export const table: ComponentDefinition = {
  slug: "table",
  name: "Table",
  category: "Exibição de dados",
  explanation: "Tabela para comparar dados em linhas e colunas. Use quando há vários itens com os mesmos atributos, como usuários ou pedidos.",
  props: [
    { name: "caption", kind: "boolean", hint: "Mostra um TableCaption, legenda que descreve a tabela.", default: true },
    { name: "header", kind: "boolean", hint: "Mostra o TableHeader com os nomes das colunas.", default: true },
    { name: "striped", kind: "boolean", hint: "Alterna o fundo das linhas (className com even:bg-muted/50 nos TableRow).", default: false },
  ],
  render: (v) => (
    <Table className="max-w-md">
      {v.caption && <TableCaption>Equipe do projeto</TableCaption>}
      {v.header && (
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Papel</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r[0]} className={v.striped ? "even:bg-muted/50" : undefined}>
            {r.map((c) => (
              <TableCell key={c}>{c}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  prompt: (v) =>
    "Use um componente Table com TableBody e TableRow/TableCell" +
    (v.header ? ", um TableHeader com TableHead" : "") +
    (v.caption ? ", um TableCaption descrevendo a tabela" : "") +
    (v.striped ? ", linhas zebradas (even:bg-muted/50)" : "") +
    ".",
}
