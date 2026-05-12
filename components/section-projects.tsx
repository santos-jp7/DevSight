"use server";

import { db } from "@/lib/db";
import { projects as projectsSchema } from "@/drizzle/schema";
import { inArray, desc } from "drizzle-orm";

import { FolderOpen, Globe, Bot, Zap, Search, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SectionProjectsProps {
  clientId: number[];
}

const typeIcon: Record<string, React.ReactNode> = {
  API: <Zap className="h-4 w-4 text-blue-500" />,
  Bot: <Bot className="h-4 w-4 text-violet-500" />,
  WebSite: <Globe className="h-4 w-4 text-emerald-500" />,
  Automação: <Layers className="h-4 w-4 text-amber-500" />,
  Crawler: <Search className="h-4 w-4 text-orange-500" />,
  Outros: <FolderOpen className="h-4 w-4 text-gray-500" />,
};

export async function SectionProjects({ clientId }: SectionProjectsProps) {
  const projects = await db.query.projects.findMany({
    where: inArray(projectsSchema.clientId, clientId),
    orderBy: desc(projectsSchema.createdAt),
    with: {
      serviceOrders: true,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 && (
          <p className="col-span-full text-center text-sm text-muted-foreground py-8">
            Nenhum projeto encontrado.
          </p>
        )}
        {projects.map((p) => {
          const openOrders = p.serviceOrders.filter(
            (os) => os.status !== "Finalizado" && os.status !== "Cancelado",
          ).length;

          return (
            <Card key={p.id} className="border hover:border-foreground/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {typeIcon[p.type ?? "Outros"] ?? typeIcon["Outros"]}
                    <span className="font-medium truncate">{p.name}</span>
                  </div>
                  {p.type && (
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {p.type}
                    </Badge>
                  )}
                </div>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-xs text-muted-foreground hover:underline truncate"
                  >
                    {p.url}
                  </a>
                )}
                <div className="mt-3 text-xs text-muted-foreground">
                  {openOrders > 0 ? (
                    <span className="text-amber-600 font-medium">
                      {openOrders} O.S em aberto
                    </span>
                  ) : (
                    <span>{p.serviceOrders.length} O.S no total</span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
