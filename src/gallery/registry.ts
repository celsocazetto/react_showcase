import { avatar } from "./definitions/avatar"
import { badge } from "./definitions/badge"
import { card } from "./definitions/card"
import { progress } from "./definitions/progress"
import { skeleton } from "./definitions/skeleton"
import { table } from "./definitions/table"
import { button } from "./definitions/button"
import { checkbox } from "./definitions/checkbox"
import { datePicker } from "./definitions/date-picker"
import { dropdownMenu } from "./definitions/dropdown-menu"
import { input } from "./definitions/input"
import { radioGroup } from "./definitions/radio-group"
import { select } from "./definitions/select"
import { slider } from "./definitions/slider"
import { switchDef } from "./definitions/switch"
import { textarea } from "./definitions/textarea"
import { toggle } from "./definitions/toggle"
import { categories, type ComponentDefinition } from "./types"

/** Adding a Componente to the Galeria = adding its definition here. */
export const components: ComponentDefinition[] = [
  button,
  toggle,
  dropdownMenu,
  input,
  textarea,
  select,
  checkbox,
  radioGroup,
  switchDef,
  slider,
  datePicker,
  card,
  table,
  badge,
  avatar,
  progress,
  skeleton,
]

export function findComponent(slug: string) {
  return components.find((c) => c.slug === slug)
}

export const galleryCategories = categories
  .map((category) => ({ category, items: components.filter((c) => c.category === category) }))
  .filter((g) => g.items.length > 0)
