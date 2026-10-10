import { useState } from "react"
import { Check, Copy, Monitor, Smartphone, Tablet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buildLayout, defaultLayout, frames, type ControlId, type LayoutConfig } from "@/lab/layout"

type Choice = { value: string; label?: string }
type ControlSpec = { id: ControlId & keyof LayoutConfig; choices: Choice[]; only?: LayoutConfig["mode"] }

const nums = (xs: string[]): Choice[] => xs.map((value) => ({ value }))
const responsiveNums = [{ value: "igual", label: "igual" }, ...nums(["1", "2", "3", "4"])]

const specs: ControlSpec[] = [
  { id: "mode", choices: [{ value: "flex" }, { value: "grid" }] },
  { id: "direction", only: "flex", choices: nums(["row", "column"]) },
  { id: "columns", only: "grid", choices: nums(["1", "2", "3", "4"]) },
  { id: "gap", choices: nums(["0", "2", "4", "8"]) },
  { id: "padding", choices: nums(["0", "2", "4", "8"]) },
  { id: "margin", choices: nums(["0", "2", "4", "8"]) },
  { id: "justify", choices: nums(["start", "center", "end", "between"]) },
  { id: "align", choices: nums(["start", "center", "end", "stretch"]) },
  { id: "maxWidth", choices: nums(["none", "sm", "md", "lg", "xl"]) },
]

const frameIcons = { celular: Smartphone, tablet: Tablet, desktop: Monitor }
const cardHeights = ["h-16", "h-24", "h-20", "h-28", "h-16", "h-24"]

function Choices({ label, value, choices, onChange }: { label: string; value: string; choices: Choice[]; onChange: (v: string) => void }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {choices.map((c) => (
        <Button key={c.value} size="xs" variant={c.value === value ? "default" : "outline"} aria-pressed={c.value === value} onClick={() => onChange(c.value)}>
          {c.label ?? c.value}
        </Button>
      ))}
    </div>
  )
}

function ClassList({ classes }: { classes: string[] }) {
  if (classes.length === 0) return <span className="text-xs text-muted-foreground">(nenhuma classe)</span>
  return (
    <span className="flex flex-wrap gap-1">
      {classes.map((c) => (
        <code key={c} className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
          {c}
        </code>
      ))}
    </span>
  )
}

export function LayoutLab() {
  const [config, setConfig] = useState<LayoutConfig>(defaultLayout)
  const [frameId, setFrameId] = useState<(typeof frames)[number]["id"]>("desktop")
  const [copied, setCopied] = useState(false)
  const result = buildLayout(config)
  const frame = frames.find((f) => f.id === frameId)!
  const set = (key: keyof LayoutConfig, value: string | boolean) => setConfig((c) => ({ ...c, [key]: value }) as LayoutConfig)
  const byId = Object.fromEntries(result.controls.map((c) => [c.id, c]))

  async function copy() {
    try {
      await navigator.clipboard.writeText(result.prompt)
    } catch {
      return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function renderControl(spec: ControlSpec) {
    const r = byId[spec.id]
    return (
      <section key={spec.id} className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">{r.label}</h3>
        <Choices label={r.label} value={String(config[spec.id])} choices={spec.choices} onChange={(v) => set(spec.id, v)} />
        <ClassList classes={r.classes} />
        <p className="text-xs text-muted-foreground">{r.explanation}</p>
        {spec.id === "direction" && (
          <ResponsiveRow label="Em telas médias (md:)" value={config.directionMd} choices={nums(["igual", "row", "column"])} onChange={(v) => set("directionMd", v)} />
        )}
        {spec.id === "columns" && (
          <>
            <ResponsiveRow label="Em telas médias (md:)" value={config.columnsMd} choices={responsiveNums} onChange={(v) => set("columnsMd", v)} />
            <ResponsiveRow label="Em telas grandes (lg:)" value={config.columnsLg} choices={responsiveNums} onChange={(v) => set("columnsLg", v)} />
          </>
        )}
      </section>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Laboratório de Layout</h1>
      <p className="mt-2 max-w-prose text-muted-foreground">Experimente flexbox, grid e responsividade em tempo real. Cada Controle mostra a classe Tailwind correspondente.</p>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_24rem]">
        <div className="flex min-w-0 flex-col gap-6">
          <div role="group" aria-label="Moldura de tela" className="flex flex-wrap gap-2">
            {frames.map((f) => {
              const Icon = frameIcons[f.id]
              return (
                <Button key={f.id} size="sm" variant={f.id === frameId ? "default" : "outline"} aria-pressed={f.id === frameId} onClick={() => setFrameId(f.id)}>
                  <Icon />
                  {f.label} ({f.width}px)
                </Button>
              )
            })}
          </div>
          <div aria-label="Preview" className="overflow-x-auto rounded-lg border bg-muted/40 p-4">
            <div className="@container mx-auto overflow-hidden rounded-md border bg-background" style={{ width: frame.width, maxWidth: "none" }}>
              <div data-testid="lab-container" className={`${result.containerClass} border border-dashed border-primary/50`}>
                {cardHeights.map((h, i) => (
                  <div key={i} className={`${h} ${config.mode === "grid" ? "" : "w-24 shrink-0"} rounded-md bg-primary/15 p-2 text-xs font-medium`}>
                    Card {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <section className="rounded-lg border p-4">
            <h2 className="text-sm font-semibold">Como pedir isso em um prompt</h2>
            <p className="mt-2 text-sm">{result.prompt}</p>
            <Button className="mt-4" variant="outline" size="sm" onClick={copy}>
              {copied ? <Check /> : <Copy />}
              {copied ? "Copiado!" : "Copiar descrição para prompt"}
            </Button>
          </section>
        </div>
        <aside aria-label="Controles" className="flex flex-col gap-5 rounded-lg border p-4 lg:sticky lg:top-6 lg:self-start">
          {specs.filter((s) => !s.only || s.only === config.mode).map(renderControl)}
          <section className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">{byId.centered.label}</h3>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={config.centered} onChange={(e) => set("centered", e.target.checked)} className="size-4 accent-primary" />
              Centralizar o container
            </label>
            <ClassList classes={byId.centered.classes} />
            <p className="text-xs text-muted-foreground">{byId.centered.explanation}</p>
          </section>
        </aside>
      </div>
    </div>
  )
}

function ResponsiveRow({ label, value, choices, onChange }: { label: string; value: string; choices: Choice[]; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium">{label}</span>
      <Choices label={label} value={value} choices={choices} onChange={onChange} />
    </div>
  )
}
