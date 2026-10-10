import type { CSSProperties, ReactNode } from "react"
import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { contrastRatio } from "@/theme/contrast"
import { colorPresets } from "@/theme/presets"
import {
  backgroundFor,
  fonts,
  resolveColor,
  type ColorChoice,
  type Density,
  type ModePreference,
} from "@/theme/theme"
import { useTheme } from "@/theme/ThemeProvider"

function Control({ concept, hint, children }: { concept: string; hint: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <div>
        <h3 className="text-sm font-semibold">{concept}</h3>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      {children}
    </section>
  )
}

function Choice<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string; style?: CSSProperties }[]
  value: T
  onChange: (value: T) => void
  label: string
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <Button
          key={o.value}
          size="sm"
          variant={o.value === value ? "default" : "outline"}
          aria-pressed={o.value === value}
          style={o.style}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </Button>
      ))}
    </div>
  )
}

function ColorPicker({
  label,
  value,
  onChange,
  allowNeutral,
}: {
  label: string
  value: ColorChoice
  onChange: (choice: ColorChoice) => void
  allowNeutral?: boolean
}) {
  const { resolvedMode } = useTheme()
  const customHex = value.kind === "custom" ? value.hex : (resolveColor(value, resolvedMode) ?? "#2563eb")
  const ratio = value.kind === "custom" ? contrastRatio(value.hex, backgroundFor(resolvedMode)) : null

  return (
    <div className="flex flex-col gap-2">
      <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
        {allowNeutral && (
          <Button
            size="sm"
            variant={value.kind === "neutral" ? "default" : "outline"}
            aria-pressed={value.kind === "neutral"}
            onClick={() => onChange({ kind: "neutral" })}
          >
            Neutro
          </Button>
        )}
        {colorPresets.map((p) => {
          const selected = value.kind === "preset" && value.id === p.id
          return (
            <button
              key={p.id}
              type="button"
              aria-label={p.name}
              aria-pressed={selected}
              title={p.name}
              onClick={() => onChange({ kind: "preset", id: p.id })}
              className={cn(
                "size-8 rounded-full border-2 border-transparent",
                selected && "ring-2 ring-ring ring-offset-2 ring-offset-background",
              )}
              style={{ backgroundColor: p[resolvedMode] }}
            />
          )
        })}
      </div>
      <label className="flex items-center gap-2 text-xs text-muted-foreground">
        Personalizada
        <input
          type="color"
          value={customHex}
          onChange={(e) => onChange({ kind: "custom", hex: e.target.value })}
          className="h-8 w-12 cursor-pointer rounded-md border bg-transparent"
        />
      </label>
      {ratio !== null && ratio < 3 && (
        <p role="alert" className="text-xs text-destructive">
          Contraste baixo ({ratio.toFixed(1)}:1) contra o fundo — o mínimo recomendado (WCAG AA para elementos de
          interface) é 3:1.
        </p>
      )}
    </div>
  )
}

export function ThemeEditor() {
  const { theme, update } = useTheme()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed top-3 right-3 z-40 bg-background"
          aria-label="Abrir Editor de Tema"
        >
          <Palette />
          Tema
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Editor de Tema</SheetTitle>
          <SheetDescription>
            O Tema é um conjunto de design tokens (variáveis CSS) que muda o app inteiro em tempo real.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-4 pb-6">
          <Control concept="Cor primária (primary color token)" hint="Cor principal de botões, links e foco.">
            <ColorPicker label="Cor primária" value={theme.primary} onChange={(primary) => update({ primary })} />
          </Control>
          <Control concept="Cor de destaque (accent color token)" hint="Cor suave de hover e itens selecionados.">
            <ColorPicker
              label="Cor de destaque"
              value={theme.accent}
              onChange={(accent) => update({ accent })}
              allowNeutral
            />
          </Control>
          <Control concept="Raio das bordas (border radius)" hint="De quadrado a bem arredondado.">
            <input
              type="range"
              min={0}
              max={1.5}
              step={0.125}
              value={theme.radius}
              aria-label="Raio das bordas"
              onChange={(e) => update({ radius: Number(e.target.value) })}
              className="w-full accent-primary"
            />
            <p className="text-xs text-muted-foreground">--radius: {theme.radius}rem</p>
          </Control>
          <Control concept="Modo de cor (color scheme)" hint="Sistema segue o sistema operacional.">
            <Choice<ModePreference>
              label="Modo de cor"
              value={theme.mode}
              onChange={(mode) => update({ mode })}
              options={[
                { value: "system", label: "Sistema" },
                { value: "light", label: "Claro" },
                { value: "dark", label: "Escuro" },
              ]}
            />
          </Control>
          <Control concept="Tipografia (font family)" hint="A família de fonte de todo o texto.">
            <Choice<string>
              label="Fonte"
              value={theme.font}
              onChange={(font) => update({ font })}
              options={fonts.map((f) => ({ value: f.id, label: f.id, style: { fontFamily: f.stack } }))}
            />
          </Control>
          <Control concept="Elevação (elevation / box-shadow)" hint="Intensidade das sombras que dão ideia de profundidade.">
            <input
              type="range"
              min={0}
              max={3}
              step={1}
              value={theme.shadow}
              aria-label="Intensidade da sombra"
              onChange={(e) => update({ shadow: Number(e.target.value) })}
              className="w-full accent-primary"
            />
            <p className="text-xs text-muted-foreground">Nível {theme.shadow} de 3</p>
          </Control>
          <Control concept="Densidade (spacing scale)" hint="Escala do espaçamento: quanto de ar existe entre os elementos.">
            <Choice<Density>
              label="Densidade"
              value={theme.density}
              onChange={(density) => update({ density })}
              options={[
                { value: "compact", label: "Compacto" },
                { value: "comfortable", label: "Confortável" },
                { value: "spacious", label: "Espaçoso" },
              ]}
            />
          </Control>
        </div>
      </SheetContent>
    </Sheet>
  )
}
