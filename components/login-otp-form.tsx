"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

import { handleSendCode, handleVerifyCode } from "@/app/actions/auth";

interface LoginOtpFormProps {
  email: string;
  onBack: () => void;
  onVerify: (code: string) => void;
}

export function LoginOtpForm({ email, onBack, onVerify }: LoginOtpFormProps) {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState("");

  const handleComplete = async (value: string) => {
    setCode(value);
    setError("");
    setIsVerifying(true);

    const r = await handleVerifyCode(email, value);

    if (r?.error) {
      setIsVerifying(false);
      setError(r.error);
    } else {
      setIsVerifying(false);
      onVerify(value);
    }
  };

  const handleResend = async () => {
    setError("");
    setIsVerifying(true);

    const r = await handleSendCode(email);

    if (r?.error) {
      setError(r.error);

      setIsVerifying(false);
    } else {
      setTimeout(() => {
        setIsVerifying(false);
        setIsResending(false);
        setResent(true);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </button>

      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Enviamos um codigo de 6 digitos para
        </p>
        <p className="text-sm font-medium text-foreground">{email}</p>
      </div>

      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium text-foreground">
          Codigo de verificacao
        </Label>
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(value) => {
              setCode(value);
              if (error) setError("");
            }}
            onComplete={handleComplete}
            disabled={isVerifying}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
              <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
              <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
              <InputOTPSlot index={4} className="h-12 w-12 text-lg" />
              <InputOTPSlot index={5} className="h-12 w-12 text-lg" />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {error && (
          <p className="text-sm text-destructive text-center" role="alert">
            {error}
          </p>
        )}
        {isVerifying && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Verificando...
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-1 pt-2">
        <span className="text-sm text-muted-foreground">
          Nao recebeu o codigo?
        </span>
        <Button
          variant="link"
          size="sm"
          className="text-sm p-0 h-auto font-medium"
          onClick={handleResend}
          disabled={isResending}
        >
          {isResending ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Reenviando...
            </>
          ) : resent ? (
            <>
              <CheckCircle2 className="h-3 w-3" />
              Enviado!
            </>
          ) : (
            "Reenviar"
          )}
        </Button>
      </div>
    </div>
  );
}
