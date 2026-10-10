import { button } from "./definitions/button"
import { categories, type ComponentDefinition } from "./types"

/** Adding a Componente to the Galeria = adding its definition here. */
export const components: ComponentDefinition[] = [button]

export function findComponent(slug: string) {
  return components.find((c) => c.slug === slug)
}

export const galleryCategories = categories
  .map((category) => ({ category, items: components.filter((c) => c.category === category) }))
  .filter((g) => g.items.length > 0)
