import { Dashboard } from "@/components/dashboard";
import { DashboardHeader } from "@/components/dashboard-header";
import { getSession } from "../actions/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Codlinx - Painel do Cliente",
  description: "Painel do Cliente",
};

export default async function Home() {
  const session = await getSession();
  if (!session) {
    return redirect("/");
  }
  return (
    <>
      <DashboardHeader email={session.email} />
      <Dashboard clientId={session.clientId} />
    </>
  );
}
