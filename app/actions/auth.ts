"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import { OtpEmail } from "@/components/email-otp";

import { redis } from "@/lib/redis";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { contacts as contactsSchema } from "@/drizzle/schema";

const emailSchema = z.email();
const codeSchema = z.string().max(6);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function handleSendCode(emailSubmitted: string) {
  const emailValidation = emailSchema.safeParse(emailSubmitted);

  if (!emailValidation.success) {
    return { error: "E-mail inválido" };
  }

  const email = emailValidation.data;

  const contact = await db.query.contacts.findFirst({
    where: eq(contactsSchema.email, email),
  });

  if (!contact) {
    return { error: "Entre em contato com o suporte." };
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await redis.set("otp:" + email, code, "EX", 600);

  const { data, error } = await resend.emails.send({
    from: "Codlinx <otp@codlinx.com.br>",
    to: email,
    subject: "Seu código de acesso chegou!",
    react: OtpEmail({ validationCode: code }),
  });

  if (error) {
    console.error("Erro no envio de e-mail:", error);

    throw new Error("Falha ao enviar email.");
  }

  try {
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
  const codeSend = parseInt((await redis.get("otp:" + email)) || "0");

  if (code !== codeSend) {
    return { error: "Código inválido" };
  }

  await redis.del("otp:" + email);

  const contacts = await db.query.contacts.findMany({
    where: eq(contactsSchema.email, email),
  });

  if (!contacts.length) {
    return { error: "Entre em contato com o suporte." };
  }

  const clientsId = contacts.map((v) => v.clientId);

  const sessionToken = jwt.sign(
    { email: email, clientId: clientsId },
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
      clientId: number[];
    };
  } catch {
    return null;
  }
}

export async function logout() {
  (await cookies()).delete("session");

  return true;
}
