"use server";

import { db } from "@/lib/db";
import { billings as billingsSchema } from "@/drizzle/schema";
import { eq, inArray } from "drizzle-orm";
import moment from "moment";

import { DollarSign, Clock, CheckCircle2, AlertCircle } from "lucide-react";
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

export async function SectionCobrancas() {
  const billings = await db.query.billings.findMany({
    where: inArray(billingsSchema.status, ["Pendente"]),
    with: {
      billingProtocols: {
        with: {
          protocol: {
            with: {
              serviceOrder: true,
              subscription: true,
            },
          },
        },
      },
    },
  });

  const today = new Date();
  const firstDayMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const totalOpen = billings
    .filter((b) => b.status === "pendente")
    .reduce((acc, curr) => acc + Number(curr.totalValue), 0);

  const totalPending = billings.filter((b) => b.status === "pendente").length;

  const payMonth = billings.filter(
    (b) =>
      b.status === "pago" &&
      b.paymentDate &&
      new Date(b.paymentDate) >= firstDayMonth,
  ).length;

  const late = billings.filter(
    (b) => b.status === "pendente" && b.dueDate && new Date(b.dueDate) < today,
  ).length;

  const summary = [
    {
      label: "Total em aberto",
      value: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(totalOpen),
      icon: DollarSign,
      color: "text-foreground",
    },
    {
      label: "Pendentes",
      value: totalPending.toString(),
      icon: Clock,
      color: "text-amber-600",
    },
    {
      label: "Pagas este mês",
      value: payMonth.toString(),
      icon: CheckCircle2,
      color: "text-emerald-600",
    },
    {
      label: "Atrasadas",
      value: late.toString(),
      icon: AlertCircle,
      color: "text-destructive",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summary.map((item) => (
          <Card key={item.label} className="border">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">
                  {item.label}
                </span>
                <span className={`text-lg font-semibold ${item.color}`}>
                  {item.value}
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
                <TableHead>Pago em</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billings.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono text-xs">{c.id}</TableCell>
                  <TableCell>
                    {c.billingProtocols
                      .map(
                        (v) =>
                          v?.protocol?.serviceOrder?.subject ||
                          v?.protocol?.subscription?.name ||
                          null,
                      )
                      .filter((v) => v)
                      .join(", ")}
                  </TableCell>
                  <TableCell>
                    {moment(c.dueDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    {c.paymentDate
                      ? moment(c.paymentDate).format("DD/MM/YYYY")
                      : "-"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(c.totalValue))}
                  </TableCell>
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
