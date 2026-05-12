"use server";

import { db } from "@/lib/db";
import { serviceOrders as serviceOrdersSchema } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import moment from "moment";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import getStatusBadge from "./utils/getStatusBadge";

interface OsDetailProps {
  id: number;
}

export async function OsDetail({ id }: OsDetailProps) {
  const os = await db.query.serviceOrders.findFirst({
    where: eq(serviceOrdersSchema.id, id),
    with: {
      project: true,
      osEntries: true,
      protocols: {
        with: {
          protocolRegisters: true,
          protocolProducts: {
            with: { product: true },
          },
          receipts: true,
        },
      },
    },
  });

  if (!os) return <p className="text-center text-muted-foreground py-8">Ordem de serviço não encontrada.</p>;

  const publicEntries = (os.osEntries ?? [])
    .filter((e) => e.public === 1)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const protocol = os.protocols?.[0];

  const registersTotal = (protocol?.protocolRegisters ?? []).reduce(
    (acc, r) => acc + Number(r.value),
    0,
  );
  const productsTotal = (protocol?.protocolProducts ?? []).reduce(
    (acc, p) => acc + Number(p.value),
    0,
  );
  const protocolTotal = registersTotal + productsTotal;

  const receiptsTotal = (protocol?.receipts ?? []).reduce(
    (acc, r) => acc + Number(r.value),
    0,
  );
  const remaining = protocolTotal - receiptsTotal;

  const fmt = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  const entryStatusColor: Record<string, string> = {
    "Em andamento": "bg-blue-100 text-blue-700",
    Finalizado: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">{os.subject}</h2>
              {os.description && (
                <p className="text-sm text-muted-foreground">{os.description}</p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {getStatusBadge(os.status)}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
            {os.project && (
              <span>
                <strong>Projeto:</strong> {os.project.name}
              </span>
            )}
            <span>
              <strong>Aberta em:</strong> {moment(os.createdAt).format("DD/MM/YYYY")}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Apontamentos (public only) */}
      {publicEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Apontamentos</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {publicEntries.map((entry) => (
              <div key={entry.id} className="flex flex-col gap-1 border-b pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">
                    {moment(entry.date).format("DD/MM/YYYY")}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      entryStatusColor[entry.status] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {entry.status}
                  </span>
                </div>
                <p className="text-sm">{entry.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Protocol */}
      {protocol && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Protocolo #{protocol.id}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {protocol.protocolRegisters.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Serviços e Despesas</h4>
                <div className="flex flex-col gap-1">
                  {protocol.protocolRegisters.map((r) => (
                    <div key={r.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{r.type}</Badge>
                        <span>{r.description}</span>
                      </div>
                      <span className="font-medium">{fmt(Number(r.value))}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {protocol.protocolProducts.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Produtos</h4>
                <div className="flex flex-col gap-1">
                  {protocol.protocolProducts.map((p) => (
                    <div key={p.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {p.chargeType && (
                          <Badge variant="outline" className="text-xs">{p.chargeType}</Badge>
                        )}
                        <span>{p.product?.description ?? `Produto #${p.productId}`}</span>
                      </div>
                      <span className="font-medium">{fmt(Number(p.value))}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Parcelamento */}
            {protocol.totalInstallments && protocol.totalInstallments > 1 && (
              <div className="rounded-md bg-muted px-3 py-2 text-sm">
                <strong>Parcela:</strong> {protocol.currentInstallment ?? 1} de {protocol.totalInstallments}
                {" — "}
                <span className="text-muted-foreground">
                  {fmt(protocolTotal / protocol.totalInstallments)} por parcela
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Resumo Financeiro */}
      {protocol && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Resumo Financeiro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total do protocolo</span>
                <span className="font-medium">{fmt(protocolTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total pago</span>
                <span className="font-medium text-emerald-600">{fmt(receiptsTotal)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">Saldo restante</span>
                <span className={`font-semibold ${remaining > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                  {fmt(remaining)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
