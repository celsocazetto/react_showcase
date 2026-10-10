import { Activity, CreditCard, DollarSign, Users } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const stats = [
  { title: "Receita total", value: "R$ 45.231,89", note: "+20,1% em relação ao mês passado", icon: DollarSign },
  { title: "Assinantes", value: "+2.350", note: "+180 novos esta semana", icon: Users },
  { title: "Vendas", value: "+12.234", note: "+19% em relação ao mês passado", icon: CreditCard },
  { title: "Ativos agora", value: "573", note: "+201 na última hora", icon: Activity },
]

const orders = [
  { name: "Olivia Martins", email: "olivia@exemplo.com", status: "Pago", amount: "R$ 1.999,00" },
  { name: "Jackson Lima", email: "jackson@exemplo.com", status: "Pendente", amount: "R$ 390,00" },
  { name: "Isabela Costa", email: "isabela@exemplo.com", status: "Pago", amount: "R$ 299,00" },
  { name: "Guilherme Souza", email: "guilherme@exemplo.com", status: "Cancelado", amount: "R$ 99,00" },
  { name: "Sofia Alves", email: "sofia@exemplo.com", status: "Pago", amount: "R$ 39,00" },
]

const statusVariant = { Pago: "default", Pendente: "secondary", Cancelado: "destructive" } as const

const goals = [
  { label: "Meta de vendas", value: 72 },
  { label: "Novos clientes", value: 45 },
  { label: "Satisfação", value: 91 },
]

const initials = (name: string) => name.split(" ").map((p) => p[0]).join("")

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Painel</h2>
        <p className="text-sm text-muted-foreground">Visão geral do seu negócio neste mês.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, note, icon: Icon }) => (
          <Card key={title} className="gap-2">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className="size-4 text-muted-foreground" aria-hidden />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <p className="text-xs text-muted-foreground">{note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pedidos recentes</CardTitle>
            <CardDescription>Os últimos 5 pedidos da loja.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.email}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="text-xs">{initials(o.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{o.name}</div>
                          <div className="text-xs text-muted-foreground">{o.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[o.status as keyof typeof statusVariant]}>{o.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{o.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metas do mês</CardTitle>
            <CardDescription>Progresso em relação ao planejado.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.map((g, i) => (
              <div key={g.label} className="space-y-4">
                {i > 0 && <Separator />}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{g.label}</span>
                    <span className="text-muted-foreground">{g.value}%</span>
                  </div>
                  <Progress value={g.value} aria-label={g.label} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
