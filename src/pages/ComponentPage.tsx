import { useState } from "react"
import { Navigate, useParams } from "react-router"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { findComponent } from "@/gallery/registry"
import { defaultValues, type ComponentDefinition, type PropDefinition, type PropValue } from "@/gallery/types"

function PropControl({ def, value, onChange }: { def: PropDefinition; value: PropValue; onChange: (v: PropValue) => void }) {
  return (
    <section className="flex flex-col gap-2">
      <div>
        <h3 className="text-sm font-semibold">
          {def.name}: <span className="font-mono font-normal">{String(value)}</span>
        </h3>
        <p className="text-xs text-muted-foreground">{def.hint}</p>
      </div>
      {def.kind === "select" ? (
        <div role="group" aria-label={def.name} className="flex flex-wrap gap-2">
          {def.options.map((o) => (
            <Button key={o} size="sm" variant={o === value ? "default" : "outline"} aria-pressed={o === value} onClick={() => onChange(o)}>
              {o}
            </Button>
          ))}
        </div>
      ) : (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={value as boolean} onChange={(e) => onChange(e.target.checked)} className="size-4 accent-primary" />
          {def.name}
        </label>
      )}
    </section>
  )
}

export function ComponentPage() {
  const { slug = "" } = useParams()
  const def = findComponent(slug)
  if (!def) return <Navigate to="/galeria" replace />
  return <ComponentView key={def.slug} def={def} />
}

function ComponentView({ def }: { def: ComponentDefinition }) {
  const [values, setValues] = useState(() => defaultValues(def))
  const [copied, setCopied] = useState(false)
  const prompt = def.prompt(values)

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt)
    } catch {
      return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground">{def.category}</p>
      <h1 className="font-mono text-2xl font-semibold tracking-tight">{def.name}</h1>
      <p className="mt-2 max-w-prose text-muted-foreground">{def.explanation}</p>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="flex flex-col gap-6">
          <div aria-label="Preview" className="flex min-h-40 items-center justify-center rounded-lg border p-8">
            {def.render(values)}
          </div>
          <section className="rounded-lg border p-4">
            <h2 className="text-sm font-semibold">Como pedir isso em um prompt</h2>
            <p className="mt-2 text-sm">{prompt}</p>
            <Button className="mt-4" variant="outline" size="sm" onClick={copy}>
              {copied ? <Check /> : <Copy />}
              {copied ? "Copiado!" : "Copiar descrição para prompt"}
            </Button>
          </section>
        </div>
        <aside aria-label="Controles" className="flex flex-col gap-5 rounded-lg border p-4 lg:sticky lg:top-6 lg:self-start">
          {def.props.map((p) => (
            <PropControl key={p.name} def={p} value={values[p.name]} onChange={(v) => setValues((s) => ({ ...s, [p.name]: v }))} />
          ))}
        </aside>
      </div>
    </div>
  )
}
