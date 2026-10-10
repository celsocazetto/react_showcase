import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { ComponentDefinition } from "../types"

const items = [
  { value: "a", q: "O que é um Accordion?", a: "Uma lista de seções que abrem e fecham." },
  { value: "b", q: "Quando usar?", a: "Em FAQs e conteúdos longos que podem ficar escondidos." },
  { value: "c", q: "É acessível?", a: "Sim, funciona com teclado e leitores de tela." },
]

export const accordion: ComponentDefinition = {
  slug: "accordion",
  name: "Accordion",
  category: "Navegação",
  explanation: "Lista de seções que expandem e recolhem. Use em perguntas frequentes e conteúdos longos para economizar espaço.",
  props: [
    { name: "type", kind: "select", hint: "single abre um item por vez; multiple permite vários abertos.", options: ["single", "multiple"], default: "single" },
    { name: "collapsible", kind: "boolean", hint: "Permite fechar o item aberto (só vale com type=single).", default: true },
  ],
  render: (v) =>
    v.type === "multiple" ? (
      <Accordion key="multiple" type="multiple" className="w-full max-w-md">
        {items.map((i) => (
          <AccordionItem key={i.value} value={i.value}>
            <AccordionTrigger>{i.q}</AccordionTrigger>
            <AccordionContent>{i.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    ) : (
      <Accordion key={`single-${v.collapsible}`} type="single" collapsible={v.collapsible as boolean} defaultValue="a" className="w-full max-w-md">
        {items.map((i) => (
          <AccordionItem key={i.value} value={i.value}>
            <AccordionTrigger>{i.q}</AccordionTrigger>
            <AccordionContent>{i.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    ),
  prompt: (v) =>
    v.type === "multiple"
      ? `Use um componente Accordion com type="multiple", permitindo vários AccordionItem abertos ao mesmo tempo, cada um com AccordionTrigger e AccordionContent.`
      : `Use um componente Accordion com type="single"${v.collapsible ? " e collapsible" : " sem collapsible (um item sempre fica aberto)"}, com AccordionItem, AccordionTrigger e AccordionContent.`,
}
