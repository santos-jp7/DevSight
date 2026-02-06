"use client";

import { useState } from "react";
import { Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginEmailForm } from "@/components/login-email-form";
import { LoginOtpForm } from "@/components/login-otp-form";
import { useRouter } from "next/navigation";

type Step = "email" | "otp" | "success";

export function LoginCard() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep("otp");
  };

  const handleVerify = () => {
    setStep("success");

    setTimeout(() => {
      router.replace("/dashboard");
    }, 2000);
  };

  const handleBack = () => {
    setStep("email");
  };

  return (
    <Card className="w-full max-w-md border-border/60 shadow-lg">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
          <Shield className="h-7 w-7 text-primary-foreground" />
        </div>

        {step === "email" && (
          <>
            <CardTitle className="text-2xl font-semibold tracking-tight text-balance">
              Bem-vindo ao portal do Cliente
            </CardTitle>
            <CardDescription className="text-muted-foreground text-balance">
              Insira seu e-mail para receber um codigo de acesso
            </CardDescription>
          </>
        )}

        {step === "otp" && (
          <>
            <CardTitle className="text-2xl font-semibold tracking-tight text-balance">
              Verifique seu e-mail
            </CardTitle>
            <CardDescription className="text-muted-foreground text-balance">
              Digite o codigo enviado para sua caixa de entrada
            </CardDescription>
          </>
        )}

        {step === "success" && (
          <>
            <CardTitle className="text-2xl font-semibold tracking-tight text-balance">
              Acesso confirmado
            </CardTitle>
            <CardDescription className="text-muted-foreground text-balance">
              Voce sera redirecionado em instantes...
            </CardDescription>
          </>
        )}
      </CardHeader>

      <CardContent className="pt-4">
        {step === "email" && <LoginEmailForm onSubmit={handleEmailSubmit} />}

        {step === "otp" && (
          <LoginOtpForm
            email={email}
            onBack={handleBack}
            onVerify={handleVerify}
          />
        )}

        {step === "success" && (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <svg
                className="h-8 w-8 text-primary animate-[scale-in_0.3s_ease-out]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <p className="text-sm text-muted-foreground">
              Autenticado como{" "}
              <span className="font-medium text-foreground">{email}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
