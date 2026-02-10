"use server";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionCobrancas } from "./section-cobrancas";
import { SectionOrdens } from "./section-ordens";
import { SectionAssinaturas } from "./section-assinaturas";
import { SectionTickets } from "./section-tickets";
import { DollarSign, Wrench, CreditCard, MessageSquare } from "lucide-react";

export async function Dashboard() {
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
            <SectionCobrancas />
          </TabsContent>
          <TabsContent value="ordens">
            <SectionOrdens />
          </TabsContent>
          <TabsContent value="assinaturas">
            <SectionAssinaturas />
          </TabsContent>
          <TabsContent value="tickets">
            <SectionTickets />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
