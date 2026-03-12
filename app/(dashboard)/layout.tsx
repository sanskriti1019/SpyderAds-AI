import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col bg-transparent">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar className="z-10 bg-background/50 backdrop-blur-xl border-r border-white/5" />
        <main className="flex-1 overflow-y-auto bg-transparent px-6 py-8 relative z-0">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 pb-10 animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
