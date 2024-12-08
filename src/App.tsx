import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Pricing } from '@/components/sections/Pricing';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { MouseGlow } from '@/components/ui/mouse-glow';
import { ParticlesBackground } from '@/components/ui/particles-background';
import { Dashboard } from '@/pages/Dashboard';
import { useAuthStore } from '@/hooks/use-auth-store';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const { user } = useAuthStore();

  // If user is authenticated, show dashboard
  if (user) {
    return (
      <>
        <Dashboard />
        <Toaster />
      </>
    );
  }

  // Otherwise show landing page
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <ParticlesBackground />
      <MouseGlow />
      <Header />
      <main className="relative">
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <AuthDialog />
      <Toaster />
    </div>
  );
}

export default App;