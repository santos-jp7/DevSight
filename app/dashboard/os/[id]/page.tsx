import { getSession } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { serviceOrders as serviceOrdersSchema } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { DashboardHeader } from "@/components/dashboard-header";
import { OsDetail } from "@/components/os-detail";
import { ArrowLeft } from "lucide-react";

interface OsPageProps {
  params: Promise<{ id: string }>;
}

export default async function OsPage({ params }: OsPageProps) {
  const session = await getSession();
  if (!session) return redirect("/");

  const { id } = await params;
  const osId = parseInt(id);

  if (isNaN(osId)) return redirect("/dashboard");

  const os = await db.query.serviceOrders.findFirst({
    where: eq(serviceOrdersSchema.id, osId),
  });

  if (!os || !os.clientId || !session.clientId.includes(os.clientId)) {
    return redirect("/dashboard");
  }

  return (
    <>
      <DashboardHeader email={session.email} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <div className="mb-4">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao painel
          </a>
        </div>
        <OsDetail id={osId} />
      </main>
    </>
  );
}
