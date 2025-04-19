import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SocialFeed from "@/components/feed/SocialFeed";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import LoginModal from "@/components/auth/LoginModal";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <AuthProvider>
      <main className="min-h-screen bg-background text-foreground overflow-hidden">
        <Header />
        <HeroSection />
        <SocialFeed />
        <BenefitsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <Footer />
        <ScrollToTopButton />
        <LoginModal />
        <Toaster />
      </main>
    </AuthProvider>
  );
};

export default Index;
