import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentDefinition } from "../types"

export const card: ComponentDefinition = {
  slug: "card",
  name: "Card",
  category: "Exibição de dados",
  explanation: "Caixa que agrupa informações relacionadas em um bloco visual, com título, conteúdo e ações. Use para resumos, itens de lista e painéis.",
  props: [
    { name: "header", kind: "boolean", hint: "Mostra o CardHeader com CardTitle e CardDescription.", default: true },
    { name: "footer", kind: "boolean", hint: "Mostra o CardFooter, geralmente com botões de ação.", default: true },
    { name: "className", kind: "select", hint: "Classe Tailwind de largura aplicada ao Card.", options: ["w-64", "w-80", "w-full"], default: "w-80" },
  ],
  render: (v) => (
    <Card className={v.className as string}>
      {v.header && (
        <CardHeader>
          <CardTitle>Plano Pro</CardTitle>
          <CardDescription>Para equipes pequenas.</CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <p className="text-sm">R$ 49 por mês, com projetos ilimitados.</p>
      </CardContent>
      {v.footer && (
        <CardFooter>
          <Button size="sm">Assinar</Button>
        </CardFooter>
      )}
    </Card>
  ),
  prompt: (v) =>
    `Use um componente Card com className="${v.className}"` +
    (v.header ? ", um CardHeader com CardTitle e CardDescription" : "") +
    ", um CardContent" +
    (v.footer ? " e um CardFooter com um botão de ação" : "") +
    ".",
}
