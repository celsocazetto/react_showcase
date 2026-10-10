import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ComponentDefinition } from "../types"

export const tabs: ComponentDefinition = {
  slug: "tabs",
  name: "Tabs",
  category: "Navegação",
  explanation: "Abas que alternam entre painéis de conteúdo na mesma tela. Use quando há seções irmãs e só uma precisa ser vista por vez.",
  props: [
    { name: "orientation", kind: "select", hint: "Direção em que as abas são organizadas.", options: ["horizontal", "vertical"], default: "horizontal" },
    { name: "defaultValue", kind: "select", hint: "Qual aba começa selecionada.", options: ["conta", "senha"], default: "conta" },
    { name: "disabled", kind: "boolean", hint: "Desativa a segunda aba (TabsTrigger disabled).", default: false },
  ],
  render: (v) => (
    <Tabs key={`${v.defaultValue}-${v.orientation}`} defaultValue={v.defaultValue as string} orientation={v.orientation as "horizontal" | "vertical"} className={v.orientation === "vertical" ? "flex-row" : undefined}>
      <TabsList className={v.orientation === "vertical" ? "h-auto flex-col" : undefined}>
        <TabsTrigger value="conta">Conta</TabsTrigger>
        <TabsTrigger value="senha" disabled={v.disabled as boolean}>
          Senha
        </TabsTrigger>
      </TabsList>
      <TabsContent value="conta" className="text-sm">Edite os dados da sua conta.</TabsContent>
      <TabsContent value="senha" className="text-sm">Troque a sua senha.</TabsContent>
    </Tabs>
  ),
  prompt: (v) =>
    `Use um componente Tabs com defaultValue="${v.defaultValue}" e orientation="${v.orientation}", com TabsList, dois TabsTrigger e dois TabsContent${v.disabled ? ", sendo o segundo TabsTrigger disabled" : ""}.`,
}
