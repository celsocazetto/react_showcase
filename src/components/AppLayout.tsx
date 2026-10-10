import { useState } from "react"
import { NavLink, Outlet } from "react-router"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ThemeEditor } from "@/components/ThemeEditor"
import { cn } from "@/lib/utils"
import { galleryCategories } from "@/gallery/registry"
import { sections } from "@/sections"

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
  )

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Seções" className="flex flex-col gap-1">
      {sections.map(({ path, title, icon: Icon }) => (
        <div key={path} className="flex flex-col gap-1">
          <NavLink to={path} end={path === "/galeria"} onClick={onNavigate} className={linkClass}>
            <Icon className="size-4" />
            {title}
          </NavLink>
          {path === "/galeria" &&
            galleryCategories.map(({ category, items }) => (
              <div key={category} className="ml-4 border-l pl-3">
                <p className="mt-2 px-3 text-xs font-semibold uppercase text-muted-foreground">{category}</p>
                {items.map((c) => (
                  <NavLink key={c.slug} to={`/galeria/${c.slug}`} onClick={onNavigate} className={linkClass}>
                    {c.name}
                  </NavLink>
                ))}
              </div>
            ))}
        </div>
      ))}
    </nav>
  )
}

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen md:flex">
      <ThemeEditor />
      <aside className="hidden w-64 shrink-0 border-r bg-sidebar p-4 md:block">
        <p className="mb-4 px-3 text-lg font-semibold">React Showcase</p>
        <SidebarNav />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-2 border-b p-3 md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <SheetHeader className="p-0">
                <SheetTitle>React Showcase</SheetTitle>
                <SheetDescription className="sr-only">Navegação entre as seções do app</SheetDescription>
              </SheetHeader>
              <SidebarNav onNavigate={() => setMenuOpen(false)} />
            </SheetContent>
          </Sheet>
          <span className="font-semibold">React Showcase</span>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
