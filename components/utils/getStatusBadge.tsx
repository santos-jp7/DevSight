import { Badge } from "@/components/ui/badge";

export default function getStatusBadge(status: string | null) {
  switch (status) {
    case "pago":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
          Paga
        </Badge>
      );
    case "pendente":
      return (
        <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
          Pendente
        </Badge>
      );
    case "cancelado":
    case "Cancelado":
      return (
        <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100">
          Cancelado
        </Badge>
      );
    case "Finalizado":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
          Finalizado
        </Badge>
      );
    case "Em avaliação":
      return (
        <Badge className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100">
          Em avaliação
        </Badge>
      );
    case "Na fila":
      return (
        <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
          Na fila
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
