import { Badge } from "@/components/ui/badge";

export default function getPrioridadeBadge(prioridade: string | null) {
  switch (prioridade) {
    case "Urgente":
      return <Badge variant="destructive">Urgente</Badge>;
    case "Alta":
      return (
        <Badge className="bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100">
          Alta
        </Badge>
      );
    case "Normal":
      return <Badge variant="outline">Normal</Badge>;
    case "Baixa":
      return <Badge variant="secondary">Baixa</Badge>;
    default:
      return <Badge variant="outline">{prioridade}</Badge>;
  }
}
