import { Dashboard } from "@/components/dashboard";
import { DashboardHeader } from "@/components/dashboard-header";
import { getSession } from "../actions/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (!session) {
    return redirect("/");
  }

  const email = session.email;

  return (
    <>
      <DashboardHeader email={email} />
      <Dashboard email={email} />
    </>
  );
}
