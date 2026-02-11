"use server";

import { db } from "@/lib/db";
import { serviceOrders as serviceOrdersSchema } from "@/drizzle/schema";
import { eq, inArray } from "drizzle-orm";
import moment from "moment";

import {
  Wrench,
  Clock,
  CheckCircle2,
  AlertTriangle,
  UserRoundCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import getStatusBadge from "./utils/getStatusBadge";
import getPrioridadeBadge from "./utils/getPrioridadeBadge";

interface SectionOssProps {
  clientId: number[];
}

export async function SectionOss({ clientId }: SectionOssProps) {
  const serviceOrders = await db.query.serviceOrders.findMany({
    where: inArray(serviceOrdersSchema.clientId, clientId),
  });

  const pendings = serviceOrders.filter(
    (os) =>
      os.status == "Em correções" ||
      os.status == "Pendente" ||
      os.status == "Na fila",
  ).length;

  const awaiting = serviceOrders.filter(
    (os) =>
      os.status == "Em avaliação" ||
      os.status == "Pendente" ||
      os.status == "Na fila" ||
      os.status == "Orçamento enviado",
  ).length;

  const completed = serviceOrders.filter(
    (os) => os.status == "Finalizado",
  ).length;

  const analysis = serviceOrders.filter(
    (os) => os.status == "Em avaliação" || os.status == "Orçamento enviado",
  ).length;

  const summary = [
    {
      label: "Em análise",
      valor: analysis,
      icon: UserRoundCheck,
      cor: "text-gray-600",
    },
    {
      label: "Em andamento",
      valor: pendings,
      icon: Wrench,
      cor: "text-blue-600",
    },
    {
      label: "Aguardando",
      valor: awaiting,
      icon: Clock,
      cor: "text-amber-600",
    },
    {
      label: "Concluidas",
      valor: completed,
      icon: CheckCircle2,
      cor: "text-emerald-600",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summary.map((item) => (
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
                {/* <TableHead>Prioridade</TableHead> */}
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceOrders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs">{o.id}</TableCell>
                  <TableCell>{o.subject}</TableCell>
                  <TableCell>
                    {moment(o.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                  {/* <TableCell>{getPrioridadeBadge(o.prioridade)}</TableCell> */}
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
