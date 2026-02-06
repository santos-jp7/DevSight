"use client";

import { CheckCircle2, XCircle, CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const assinaturas = [
  {
    id: "ASS-001",
    plano: "Plano Profissional",
    valor: "R$ 450,00/mes",
    status: "Ativa",
    inicio: "01/01/2026",
    proximaCobranca: "10/03/2026",
    recursos: [
      "Suporte prioritario",
      "5 usuarios",
      "Backup diario",
      "API integrada",
    ],
  },
  {
    id: "ASS-002",
    plano: "Modulo Extra - Relatorios",
    valor: "R$ 100,00/mes",
    status: "Ativa",
    inicio: "15/01/2026",
    proximaCobranca: "15/03/2026",
    recursos: [
      "Relatorios avancados",
      "Exportacao em PDF",
      "Dashboards personalizados",
    ],
  },
  {
    id: "ASS-003",
    plano: "Plano Basico (anterior)",
    valor: "R$ 200,00/mes",
    status: "Cancelada",
    inicio: "01/06/2025",
    proximaCobranca: "-",
    recursos: ["Suporte por e-mail", "2 usuarios", "Backup semanal"],
  },
];

export function SectionAssinaturas() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assinaturas.map((a) => (
          <Card
            key={a.id}
            className={`border ${a.status === "Cancelada" ? "opacity-60" : ""}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{a.plano}</CardTitle>
                {a.status === "Ativa" ? (
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
                    Ativa
                  </Badge>
                ) : (
                  <Badge variant="secondary">Cancelada</Badge>
                )}
              </div>
              <CardDescription className="flex items-center gap-1">
                <CreditCard className="h-3 w-3" />
                {a.valor}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Inicio: {a.inicio}</span>
                <span>Proxima: {a.proximaCobranca}</span>
              </div>
              <Separator />
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Recursos inclusos
                </span>
                <ul className="flex flex-col gap-1.5">
                  {a.recursos.map((r) => (
                    <li key={r} className="flex items-center gap-2 text-sm">
                      {a.status === "Ativa" ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      )}
                      {r}
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
