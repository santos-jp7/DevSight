"use server";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionBillings } from "./section-billings";
import { SectionOss } from "./section-oss";
import { SectionSubscriptions } from "./section-subscriptions";
import { SectionTickets } from "./section-tickets";
import { DollarSign, Wrench, CreditCard, MessageSquare } from "lucide-react";

interface DashboardProps {
  clientId: number[];
}

export async function Dashboard({ clientId }: DashboardProps) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <Tabs defaultValue="cobrancas" className="flex flex-col gap-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="cobrancas" className="gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Cobrancas</span>
            </TabsTrigger>
            <TabsTrigger value="ordens" className="gap-2">
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Ordens de Servico</span>
            </TabsTrigger>
            <TabsTrigger value="assinaturas" className="gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Assinaturas</span>
            </TabsTrigger>
            <TabsTrigger value="tickets" className="gap-2" disabled={true}>
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">
                Tickets <small>Em breve</small>
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cobrancas">
            <SectionBillings clientId={clientId} />
          </TabsContent>
          <TabsContent value="ordens">
            <SectionOss clientId={clientId} />
          </TabsContent>
          <TabsContent value="assinaturas">
            <SectionSubscriptions clientId={clientId} />
          </TabsContent>
          <TabsContent value="tickets">
            <SectionTickets clientId={clientId} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
