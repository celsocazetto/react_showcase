import { ThemeControls } from "@/components/ThemeEditor"
import { Button } from "@/components/ui/button"
import type { Section } from "@/sections"

const concepts = [
  {
    name: "Design tokens",
    text: "Valores de design com nome (cores, raios, espaçamentos) guardados como variáveis CSS. Mudar um token muda todos os componentes que o usam, de uma vez.",
  },
  {
    name: "Cor primária (primary)",
    text: "A cor principal da interface: botões de ação, links e anéis de foco. É a cor que diz \"clique aqui\".",
  },
  {
    name: "Cor de destaque (accent)",
    text: "Cor mais suave usada em hover e itens selecionados, para indicar interação sem competir com a primária.",
  },
  {
    name: "Border radius",
    text: "O arredondamento dos cantos. Zero é quadrado e sério; valores altos deixam tudo amigável e macio.",
  },
  {
    name: "Elevation (box-shadow)",
    text: "Sombras que sugerem profundidade. Quanto maior a elevação, mais um elemento parece flutuar sobre a tela.",
  },
  {
    name: "Densidade (spacing scale)",
    text: "Quanto espaço existe entre e dentro dos elementos. Compacto mostra mais informação; espaçoso respira mais.",
  },
  {
    name: "Tipografia (font family)",
    text: "A família de fonte do texto. Define a personalidade: neutra, técnica, com serifa, etc.",
  },
  {
    name: "Modo claro/escuro (color scheme)",
    text: "Alterna entre fundo claro e escuro. \"Sistema\" segue a preferência do seu sistema operacional.",
  },
]

export function ThemeConcepts({ section }: { section: Section }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">{section.title}</h1>
      <p className="mt-2 text-muted-foreground">{section.description}</p>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <dl className="flex flex-col gap-5">
          {concepts.map((c) => (
            <div key={c.name}>
              <dt className="font-semibold">{c.name}</dt>
              <dd className="text-sm text-muted-foreground">{c.text}</dd>
            </div>
          ))}
          <div className="flex flex-wrap gap-2 rounded-lg border p-4 shadow-sm">
            <Button>Primário</Button>
            <Button variant="outline">Contorno</Button>
            <Button variant="secondary">Secundário</Button>
          </div>
        </dl>
        <aside aria-label="Controles de Tema" className="rounded-lg border p-4 lg:sticky lg:top-6 lg:self-start">
          <ThemeControls />
        </aside>
      </div>
    </div>
  )
}
