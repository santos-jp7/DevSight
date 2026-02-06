"use client";

import { useState } from "react";
import {
  Plus,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

function getStatusBadge(status: string) {
  switch (status) {
    case "Aberto":
      return (
        <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
          Aberto
        </Badge>
      );
    case "Aguardando resposta":
      return (
        <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
          Aguardando
        </Badge>
      );
    case "Resolvido":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
          Resolvido
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getPrioridadeBadge(prioridade: string) {
  switch (prioridade) {
    case "Critica":
      return <Badge variant="destructive">Critica</Badge>;
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

export function SectionTickets() {
  const [open, setOpen] = useState(false);
  const [tickets, setTickets] = useState(ticketsData);
  const [assunto, setAssunto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = () => {
    if (!assunto || !categoria || !mensagem) return;

    const novoTicket = {
      id: `TK-${String(tickets.length + 1).padStart(3, "0")}`,
      assunto,
      categoria,
      abertura: new Date().toLocaleDateString("pt-BR"),
      status: "Aberto",
      prioridade: "Normal",
    };

    setTickets([novoTicket, ...tickets]);
    setAssunto("");
    setCategoria("");
    setMensagem("");
    setOpen(false);
  };

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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Novo Ticket
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Abrir Novo Ticket</DialogTitle>
                <DialogDescription>
                  Preencha as informacoes abaixo para abrir um novo chamado de
                  suporte.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="assunto">Assunto</Label>
                  <Input
                    id="assunto"
                    placeholder="Descreva brevemente o problema"
                    value={assunto}
                    onChange={(e) => setAssunto(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select value={categoria} onValueChange={setCategoria}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tecnico">Tecnico</SelectItem>
                      <SelectItem value="Financeiro">Financeiro</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="mensagem">Mensagem</Label>
                  <Textarea
                    id="mensagem"
                    placeholder="Descreva o problema em detalhes..."
                    rows={4}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!assunto || !categoria || !mensagem}
                >
                  Enviar Ticket
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
              {tickets.map((t) => (
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
