"use server";

import { User } from "lucide-react";
import { LogoutButton } from "./logout-button";

interface DashboardHeaderProps {
  email: string;
}

export async function DashboardHeader({ email }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              Portal do Cliente
            </span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
