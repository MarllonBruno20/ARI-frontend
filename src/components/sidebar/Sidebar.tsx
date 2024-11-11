import {
  LogOut,
  Pill,
  ClipboardList,
  History,
  User,
  House,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/providers/user-provider/hook";
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "@/api/user/hooks";

export default function Sidebar({ className }: { className?: string }) {
  const { user } = useUser();
  const location = useLocation();
  const { logout, loading, error } = useLogout();

  const userName = user?.nome;
  const userEmail = user?.email;

  // Verifique se a rota está ativa comparando com a rota atual
  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={cn(
        "flex h-screen w-64 flex-col bg-gray-50/95 border-r",
        className
      )}
    >
      <div className="p-6">
        <div className="flex flex-col space-y-1">
          <h2 className="text-lg font-semibold">{userName}</h2>
          <p className="text-sm text-muted-foreground">{userEmail}</p>
        </div>
      </div>
      <Separator />
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2 py-4">
          <Link to="/home">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                isActive("/home") && "bg-blue-100 text-blue-600"
              )}
            >
              <House className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link to="/remedios">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                isActive("/remedios") && "bg-blue-100 text-blue-600"
              )}
            >
              <Pill className="h-4 w-4" />
              Remédios
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <ClipboardList className="h-4 w-4" />
            Prescrição
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <History className="h-4 w-4" />
            Histórico
          </Button>
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-3 space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <User className="h-4 w-4" />
          Perfil
        </Button>
        <Button
          onClick={() => logout()}
          disabled={loading}
          variant="ghost"
          className="w-full justify-start gap-2 text-red-500 hover:text-red-500 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          {loading ? "Saindo..." : "Sair"}
          {error && <p className="text-red-500">{error}</p>}
        </Button>
      </div>
    </div>
  );
}
