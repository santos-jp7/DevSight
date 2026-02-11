"use server";

import { CheckCircle2, XCircle, CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { db } from "@/lib/db";
import { subscriptions as subscriptionsSchema } from "@/drizzle/schema";
import { eq, inArray, desc } from "drizzle-orm";
import moment from "moment";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SectionSubscriptionsProps {
  clientId: number[];
}

export async function SectionSubscriptions({
  clientId,
}: SectionSubscriptionsProps) {
  const subscriptions = await db.query.subscriptions.findMany({
    where: inArray(subscriptionsSchema.clientId, clientId),
    orderBy: desc(subscriptionsSchema.createdAt),
    with: {
      protocols: {
        with: {
          protocolProducts: {
            with: {
              product: true,
            },
          },
        },
      },
      client: true,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((subscription) => (
          <Card
            key={subscription.id}
            className={`border ${subscription.status === "Cancelado" || subscription.status === "Não pago" ? "opacity-60" : ""}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {subscription.name ?? "Assinatura"}
                </CardTitle>
                {subscription.status === "Pago" ||
                subscription.status === "Pendente" ? (
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
                    Ativa
                  </Badge>
                ) : (
                  <Badge variant="secondary">Cancelada</Badge>
                )}
              </div>
              <CardDescription className="flex items-center gap-1">
                <CreditCard className="h-3 w-3" />

                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  subscription.protocols[0].protocolProducts.reduce(
                    (a, c) => a + c.value,
                    0,
                  ),
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  Inicio: {moment(subscription.createdAt).format("DD/MM/YYYY")}
                </span>
                <span>
                  Proxima:{" "}
                  {subscription.status != "Cancelado"
                    ? moment().date() <= (subscription.client?.dueDay || 20)
                      ? moment()
                          .set("date", subscription.client?.dueDay || 20)
                          .format("DD/MM/YYYY")
                      : moment()
                          .add(1, "month")
                          .set("date", subscription.client?.dueDay || 20)
                          .format("DD/MM/YYYY")
                    : "-"}
                </span>
              </div>
              <Separator />
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Recursos inclusos
                </span>
                <ul className="flex flex-col gap-1.5">
                  {subscription.protocols[0].protocolProducts.map((r) => (
                    <li key={r.id} className="flex items-center gap-2 text-sm">
                      {subscription.status === "Pago" ||
                      subscription.status === "Pendente" ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      )}
                      {r.product?.description}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
