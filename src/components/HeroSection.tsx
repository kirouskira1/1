import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { setShowAuthModal, setInitialAuthMode } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleRegisterClick = () => {
    setInitialAuthMode('register');
    setShowAuthModal(true);
  };

  const handleLoginClick = () => {
    setInitialAuthMode('login');
    setShowAuthModal(true);
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen pt-24 pb-10 flex items-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/3255761/pexels-photo-3255761.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/50 -z-10" />
      {/* Background Design Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-artmatch-purple/30 to-transparent rounded-bl-full -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-artmatch-blue/30 to-transparent rounded-tr-full -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-1 gap-12 items-center">
          <div className={cn(
            "space-y-6 transition-all duration-700 delay-100 text-center",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          )}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-artmatch-purple to-artmatch-blue leading-tight drop-shadow-xl">
              Conecte-se aos melhores editais artísticos do Brasil
            </h1>
            <p className="text-2xl md:text-3xl font-semibold heading-gradient drop-shadow-lg max-w-3xl mx-auto leading-relaxed text-center">
              Descubra oportunidades perfeitas para seu talento e leve sua carreira artística para o próximo nível.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Button 
                className="bg-artmatch-purple hover:bg-artmatch-purple/90 text-white font-medium shadow-lg hover:shadow-xl transition-all px-8 py-6"
                onClick={handleRegisterClick}
              >
                Cadastre-se Agora
              </Button>
              <Button 
                className="bg-artmatch-purple hover:bg-artmatch-purple/90 text-white font-medium shadow-lg hover:shadow-xl transition-all px-8 py-6"
                onClick={handleLoginClick}
              >
                Entrar no Site
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
