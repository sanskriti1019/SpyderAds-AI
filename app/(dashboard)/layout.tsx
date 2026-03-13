import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { IntroAnimation } from "@/components/ui/intro-animation";
import { BrandProvider } from "@/lib/brand-context";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { PageTransition } from "@/components/ui/page-transition";
import { ScrollRevealProvider } from "@/components/ui/scroll-reveal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BrandProvider>
      <div className="flex h-screen flex-col bg-transparent">
        <IntroAnimation />
        {/* Floating particles layer */}
        <FloatingParticles />
        <Header />
        <div className="flex flex-1 overflow-hidden relative">
          <Sidebar className="z-10 bg-background/50 backdrop-blur-xl border-r border-white/5" />
          <main className="flex-1 overflow-y-auto bg-transparent px-6 py-8 relative z-0">
            <ScrollRevealProvider>
              <PageTransition>
                <div className="mx-auto flex max-w-7xl flex-col gap-6 pb-10">
                  {children}
                </div>
              </PageTransition>
            </ScrollRevealProvider>
          </main>
        </div>
      </div>
    </BrandProvider>
  );
}
