"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

export default function ModalTicket() {
  const [open, setOpen] = useState(false);
  const [assunto, setAssunto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = () => {
    if (!assunto || !categoria || !mensagem) return;

    const novoTicket = {
      id: null,
      assunto,
      categoria,
      abertura: new Date().toLocaleDateString("pt-BR"),
      status: "Aberto",
      prioridade: "Normal",
    };

    setAssunto("");
    setCategoria("");
    setMensagem("");
    setOpen(false);
  };

  return (
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
  );
}
