"use client";

import { DollarSign, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const resumo = [
  {
    label: "Total em aberto",
    valor: "R$ 1.450,00",
    icon: DollarSign,
    cor: "text-foreground",
  },
  { label: "Pendentes", valor: "3", icon: Clock, cor: "text-amber-600" },
  {
    label: "Pagas este mes",
    valor: "2",
    icon: CheckCircle2,
    cor: "text-emerald-600",
  },
  {
    label: "Atrasadas",
    valor: "1",
    icon: AlertCircle,
    cor: "text-destructive",
  },
];

const cobrancas = [
  {
    id: "COB-001",
    descricao: "Mensalidade - Janeiro/2026",
    vencimento: "10/01/2026",
    valor: "R$ 450,00",
    status: "Paga",
  },
  {
    id: "COB-002",
    descricao: "Mensalidade - Fevereiro/2026",
    vencimento: "10/02/2026",
    valor: "R$ 450,00",
    status: "Pendente",
  },
  {
    id: "COB-003",
    descricao: "Servico adicional - Setup",
    vencimento: "15/01/2026",
    valor: "R$ 800,00",
    status: "Paga",
  },
  {
    id: "COB-004",
    descricao: "Mensalidade - Dezembro/2025",
    vencimento: "10/12/2025",
    valor: "R$ 450,00",
    status: "Atrasada",
  },
  {
    id: "COB-005",
    descricao: "Mensalidade - Marco/2026",
    vencimento: "10/03/2026",
    valor: "R$ 550,00",
    status: "Pendente",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Paga":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
          Paga
        </Badge>
      );
    case "Pendente":
      return (
        <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
          Pendente
        </Badge>
      );
    case "Atrasada":
      return (
        <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100">
          Atrasada
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export function SectionCobrancas() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {resumo.map((item) => (
          <Card key={item.label} className="border">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <item.icon className={`h-5 w-5 ${item.cor}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">
                  {item.label}
                </span>
                <span className={`text-lg font-semibold ${item.cor}`}>
                  {item.valor}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Historico de Cobrancas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Codigo</TableHead>
                <TableHead>Descricao</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cobrancas.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono text-xs">{c.id}</TableCell>
                  <TableCell>{c.descricao}</TableCell>
                  <TableCell>{c.vencimento}</TableCell>
                  <TableCell className="font-medium">{c.valor}</TableCell>
                  <TableCell>{getStatusBadge(c.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
