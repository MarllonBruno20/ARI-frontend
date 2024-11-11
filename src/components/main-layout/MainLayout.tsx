import Sidebar from "../sidebar/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Menu lateral sempre visível */}
      <main className="flex-1 p-6 overflow-auto bg-gray-100">
        {children} {/* Conteúdo da página */}
      </main>
    </div>
  );
}
