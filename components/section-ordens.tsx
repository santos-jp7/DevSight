"use client";

import { Wrench, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
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
  { label: "Em andamento", valor: "2", icon: Wrench, cor: "text-blue-600" },
  { label: "Aguardando", valor: "1", icon: Clock, cor: "text-amber-600" },
  {
    label: "Concluidas",
    valor: "5",
    icon: CheckCircle2,
    cor: "text-emerald-600",
  },
  {
    label: "Urgentes",
    valor: "1",
    icon: AlertTriangle,
    cor: "text-destructive",
  },
];

const ordens = [
  {
    id: "OS-001",
    titulo: "Instalacao de rede",
    abertura: "02/01/2026",
    prioridade: "Alta",
    status: "Em andamento",
  },
  {
    id: "OS-002",
    titulo: "Manutencao preventiva",
    abertura: "15/01/2026",
    prioridade: "Normal",
    status: "Concluida",
  },
  {
    id: "OS-003",
    titulo: "Troca de equipamento",
    abertura: "20/01/2026",
    prioridade: "Urgente",
    status: "Em andamento",
  },
  {
    id: "OS-004",
    titulo: "Configuracao de servidor",
    abertura: "25/01/2026",
    prioridade: "Normal",
    status: "Aguardando",
  },
  {
    id: "OS-005",
    titulo: "Atualizacao de firmware",
    abertura: "01/02/2026",
    prioridade: "Baixa",
    status: "Concluida",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Em andamento":
      return (
        <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
          Em andamento
        </Badge>
      );
    case "Aguardando":
      return (
        <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
          Aguardando
        </Badge>
      );
    case "Concluida":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
          Concluida
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getPrioridadeBadge(prioridade: string) {
  switch (prioridade) {
    case "Urgente":
      return <Badge variant="destructive">Urgente</Badge>;
    case "Alta":
      return (
        <Badge className="bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100">
          Alta
        </Badge>
      );
    case "Normal":
      return <Badge variant="outline">Normal</Badge>;
    case "Baixa":
      return <Badge variant="secondary">Baixa</Badge>;
    default:
      return <Badge variant="outline">{prioridade}</Badge>;
  }
}

export function SectionOrdens() {
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
          <CardTitle className="text-base">Ordens de Servico</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Codigo</TableHead>
                <TableHead>Titulo</TableHead>
                <TableHead>Abertura</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordens.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs">{o.id}</TableCell>
                  <TableCell>{o.titulo}</TableCell>
                  <TableCell>{o.abertura}</TableCell>
                  <TableCell>{getPrioridadeBadge(o.prioridade)}</TableCell>
                  <TableCell>{getStatusBadge(o.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
