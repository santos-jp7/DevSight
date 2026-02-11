import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface OtpEmailProps {
  validationCode: string;
}

export const OtpEmail = ({ validationCode }: OtpEmailProps) => (
  <Html>
    <Head />
    <Preview>Seu código de acesso chegou!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Text style={logoText}>Codlinx</Text>
        </Section>
        <Heading style={h1}>Verifique sua identidade</Heading>
        <Text style={text}>
          Utilize o código abaixo para concluir seu acesso. Este código é válido
          por apenas 10 minutos.
        </Text>
        <Section style={codeContainer}>
          <Text style={code}>{validationCode}</Text>
        </Section>
        <Text style={footerText}>
          Se você não solicitou este código, ignore este e-mail ou entre em
          contato com o suporte.
        </Text>
        <Hr style={hr} />
        <Text style={footerLink}>
          © 2026 Codlinx. Todos os direitos reservados.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default OtpEmail;

// Estilos Inline (Garante compatibilidade máxima com Outlook/Gmail)
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  padding: "5px",
};

const container = {
  margin: "0 auto",
  padding: "40px 20px 64px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  marginTop: "40px",
  maxWidth: "480px",
};

const logoSection = { marginBottom: "32px" };
const logoText = { fontSize: "18px", fontWeight: "700", color: "#1a1a1a" };

const h1 = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "40px",
  margin: "0 0 20px",
};

const text = {
  color: "#444",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0 0 24px",
};

const codeContainer = {
  background: "#f4f4f7",
  borderRadius: "4px",
  margin: "16px 0 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};

const code = {
  color: "#000",
  fontSize: "32px",
  fontWeight: "700",
  letterSpacing: "6px",
  lineHeight: "40px",
  textAlign: "center" as const,
};

const hr = { borderColor: "#e6ebf1", margin: "20px 0" };

const footerText = { color: "#8898aa", fontSize: "12px", lineHeight: "16px" };
const footerLink = {
  color: "#b0b0b0",
  fontSize: "11px",
  textAlign: "center" as const,
};
