import { LoginCard } from "@/components/login-card";

export default async function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginCard />
        <p className="mt-8 text-center text-xs text-muted-foreground leading-relaxed">
          Ao continuar, voce concorda com nossos{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Termos de Servico
          </a>{" "}
          e{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Politica de Privacidade
          </a>
          .
        </p>
      </div>
    </main>
  );
}
