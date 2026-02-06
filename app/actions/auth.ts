"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const emailSchema = z.email();
const codeSchema = z.string().max(6);

const codeOK = 142142;

export async function handleSendCode(emailSubmitted: string) {
  const emailValidation = emailSchema.safeParse(emailSubmitted);

  if (!emailValidation.success) {
    return { error: "E-mail inválido" };
  }

  const email = emailValidation.data;

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  //redis

  try {
    console.log(code);
    return { message: "Email enviado." };
  } catch (error) {
    console.error(error);
    return { error: "Falha ao enviar e-mail. Tente novamente." };
  }
}

export async function handleVerifyCode(email: string, codeSubmitted: string) {
  const codeValidation = codeSchema.safeParse(codeSubmitted);

  if (!codeValidation) {
    return { error: "Código inválido" };
  }

  const code = parseInt(codeValidation.data || "0");

  if (code !== codeOK) {
    return { error: "Código inválido" };
  }

  const sessionToken = jwt.sign(
    { id: 1, email: email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );

  (await cookies()).set("session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: "/",
  });

  return { message: "Código validado" };
}

export async function getSession() {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      role: string;
    };
  } catch {
    return null;
  }
}
