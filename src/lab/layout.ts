export type LayoutConfig = {
  mode: "flex" | "grid"
  direction: "row" | "column"
  directionMd: "igual" | "row" | "column"
  columns: string
  columnsMd: string
  columnsLg: string
  gap: string
  padding: string
  margin: string
  justify: "start" | "center" | "end" | "between"
  align: "start" | "center" | "end" | "stretch"
  maxWidth: "none" | "sm" | "md" | "lg" | "xl"
  centered: boolean
}

export const defaultLayout: LayoutConfig = {
  mode: "flex",
  direction: "row",
  directionMd: "igual",
  columns: "2",
  columnsMd: "igual",
  columnsLg: "igual",
  gap: "4",
  padding: "4",
  margin: "0",
  justify: "start",
  align: "stretch",
  maxWidth: "none",
  centered: false,
}

export type ControlId = keyof LayoutConfig

/** One Controle's current result: the Tailwind classes shown to the learner, and the ones actually applied to the preview. */
export type ControlResult = {
  id: ControlId
  label: string
  /** Classes as the learner would write them in a real app (breakpoint prefixes md:/lg:). */
  classes: string[]
  /** Same classes rewritten as container-query variants, so the Moldura de tela (not the browser window) drives them. */
  applied: string[]
  explanation: string
  /** False when the Controle has no effect in the current mode. */
  active: boolean
}

export type LayoutResult = {
  controls: ControlResult[]
  /** Classes to put on the preview container. */
  containerClass: string
  prompt: string
}

/** Moldura de tela widths; the Tailwind breakpoint equivalents are md = 768px and lg = 1024px. */
export const frames = [
  { id: "celular", label: "Celular", width: 375 },
  { id: "tablet", label: "Tablet", width: 768 },
  { id: "desktop", label: "Desktop", width: 1280 },
] as const

// md (48rem) and lg (64rem) expressed as container-query variants.
const containerVariant: Record<string, string> = { "md:": "@3xl:", "lg:": "@5xl:" }

export function toApplied(cls: string): string {
  for (const [bp, cq] of Object.entries(containerVariant)) if (cls.startsWith(bp)) return cq + cls.slice(bp.length)
  return cls
}

const justifyWords = { start: "no início", center: "no centro", end: "no fim", between: "com espaço entre os itens" }
const alignWords = { start: "no topo", center: "centralizados", end: "na base", stretch: "esticados" }

export function buildLayout(c: LayoutConfig): LayoutResult {
  const isGrid = c.mode === "grid"
  const controls: ControlResult[] = []
  const add = (id: ControlId, label: string, classes: string[], explanation: string, active = true) =>
    controls.push({ id, label, classes, applied: classes.map(toApplied), explanation, active })
  const dir = (d: string) => (d === "row" ? "flex-row" : "flex-col")

  add(
    "mode",
    "Modo",
    [isGrid ? "grid" : "flex"],
    isGrid
      ? "grid organiza os itens em linhas e colunas ao mesmo tempo, como uma tabela."
      : "flex alinha os itens em uma única linha (ou coluna), distribuindo o espaço entre eles.",
  )

  add(
    "direction",
    "Direção",
    isGrid ? [] : [dir(c.direction), ...(c.directionMd === "igual" ? [] : [`md:${dir(c.directionMd)}`])],
    "flex-row coloca os itens lado a lado; flex-col empilha um embaixo do outro. Com md: a direção muda quando a tela chega ao tamanho de tablet.",
    !isGrid,
  )

  add(
    "columns",
    "Colunas",
    isGrid
      ? [
          `grid-cols-${c.columns}`,
          ...(c.columnsMd === "igual" ? [] : [`md:grid-cols-${c.columnsMd}`]),
          ...(c.columnsLg === "igual" ? [] : [`lg:grid-cols-${c.columnsLg}`]),
        ]
      : [],
    "grid-cols-N divide a largura em N colunas iguais. Com md: ou lg: o número muda em telas maiores — comum para ter 1 coluna no celular e 3 no desktop.",
    isGrid,
  )

  add("gap", "Espaço entre itens (gap)", [`gap-${c.gap}`], "gap é o espaço entre os itens. Cada unidade vale 0,25rem (4px): gap-4 = 16px.")
  add("padding", "Espaço interno (padding)", [`p-${c.padding}`], "padding é o espaço entre a borda do container e o conteúdo dentro dele.")
  add("margin", "Espaço externo (margin)", [`m-${c.margin}`], "margin é o espaço fora do container, afastando-o de quem está ao redor.")

  add(
    "justify",
    "Alinhamento principal (justify-content)",
    [`justify-${c.justify}`],
    isGrid
      ? "justify-content distribui as colunas na horizontal. Com colunas que já ocupam toda a largura (grid-cols-N) não sobra espaço, então quase não se nota."
      : "justify-content distribui os itens ao longo do eixo principal (a linha, em flex-row).",
  )
  add(
    "align",
    "Alinhamento cruzado (align-items)",
    [`items-${c.align}`],
    "align-items posiciona os itens no eixo perpendicular: na vertical em uma linha. stretch estica todos até a mesma altura.",
  )

  add(
    "maxWidth",
    "Largura máxima",
    c.maxWidth === "none" ? [] : [`max-w-${c.maxWidth}`],
    "max-w limita o quanto o container pode crescer, mesmo em telas largas. Sem ele, o container ocupa toda a largura disponível.",
  )
  add("centered", "Centralizar", c.centered ? ["mx-auto"] : [], "mx-auto divide a margem lateral igualmente, centralizando o container (útil junto com a largura máxima).")

  return {
    controls,
    containerClass: controls.flatMap((x) => (x.active ? x.applied : [])).join(" "),
    prompt: buildPrompt(c),
  }
}

function buildPrompt(c: LayoutConfig): string {
  const parts: string[] = []
  if (c.mode === "grid") {
    let s = `Use um grid com ${c.columns} ${c.columns === "1" ? "coluna" : "colunas"} (grid-cols-${c.columns})`
    if (c.columnsMd !== "igual") s += `, ${c.columnsMd} em telas médias (md:grid-cols-${c.columnsMd})`
    if (c.columnsLg !== "igual") s += `, ${c.columnsLg} em telas grandes (lg:grid-cols-${c.columnsLg})`
    parts.push(s)
  } else {
    let s = `Use flexbox em ${c.direction === "row" ? "linha (flex-row)" : "coluna (flex-col)"}`
    if (c.directionMd !== "igual") s += `, mudando para ${c.directionMd === "row" ? "linha" : "coluna"} em telas médias (md:${c.directionMd === "row" ? "flex-row" : "flex-col"})`
    parts.push(s)
  }
  parts.push(`espaço entre itens gap-${c.gap}`)
  parts.push(`padding p-${c.padding}`)
  if (c.margin !== "0") parts.push(`margin m-${c.margin}`)
  parts.push(`itens ${justifyWords[c.justify]} (justify-${c.justify}) e ${alignWords[c.align]} (items-${c.align})`)
  if (c.maxWidth !== "none") parts.push(`largura máxima max-w-${c.maxWidth}`)
  if (c.centered) parts.push("container centralizado (mx-auto)")
  return parts.join(", ") + "."
}
