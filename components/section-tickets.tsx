"use server";

import {
  Plus,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ModalTicket from "./modal-ticket";
import getPrioridadeBadge from "./utils/getPrioridadeBadge";
import getStatusBadge from "./utils/getStatusBadge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const resumo = [
  { label: "Abertos", valor: "2", icon: MessageSquare, cor: "text-blue-600" },
  { label: "Aguardando", valor: "1", icon: Clock, cor: "text-amber-600" },
  {
    label: "Resolvidos",
    valor: "4",
    icon: CheckCircle2,
    cor: "text-emerald-600",
  },
  { label: "Criticos", valor: "1", icon: AlertCircle, cor: "text-destructive" },
];

const ticketsData = [
  {
    id: "TK-001",
    assunto: "Sistema fora do ar",
    categoria: "Tecnico",
    abertura: "01/02/2026",
    status: "Aberto",
    prioridade: "Critica",
  },
  {
    id: "TK-002",
    assunto: "Duvida sobre cobranca",
    categoria: "Financeiro",
    abertura: "28/01/2026",
    status: "Aguardando resposta",
    prioridade: "Normal",
  },
  {
    id: "TK-003",
    assunto: "Solicitacao de relatorio",
    categoria: "Comercial",
    abertura: "25/01/2026",
    status: "Resolvido",
    prioridade: "Baixa",
  },
  {
    id: "TK-004",
    assunto: "Erro ao acessar modulo",
    categoria: "Tecnico",
    abertura: "20/01/2026",
    status: "Aberto",
    prioridade: "Alta",
  },
  {
    id: "TK-005",
    assunto: "Cancelamento de servico",
    categoria: "Comercial",
    abertura: "15/01/2026",
    status: "Resolvido",
    prioridade: "Normal",
  },
];

interface SectionTicketsProps {
  clientId: number[];
}

export async function SectionTickets({ clientId }: SectionTicketsProps) {
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Tickets de Suporte</CardTitle>
          <ModalTicket />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Codigo</TableHead>
                <TableHead>Assunto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Abertura</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: 1,
                  assunto: "teste",
                  categoria: "teste",
                  abertura: "hoje",
                  prioridade: "Alta",
                  status: "Aberto",
                },
              ].map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>
                  <TableCell>{t.assunto}</TableCell>
                  <TableCell>{t.categoria}</TableCell>
                  <TableCell>{t.abertura}</TableCell>
                  <TableCell>{getPrioridadeBadge(t.prioridade)}</TableCell>
                  <TableCell>{getStatusBadge(t.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
