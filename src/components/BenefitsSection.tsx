import { useEffect, useRef } from "react";
import { TrendingUp, Bell, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const BenefitCard = ({ icon, title, description, delay }: BenefitCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "glass-card p-6 transition-all duration-500 opacity-0 translate-y-10",
        "hover:shadow-xl hover:scale-[1.03] transform transition-all duration-300"
      )}
    >
      <div className="w-14 h-14 mb-4 rounded-full bg-gradient-to-tr from-artmatch-purple to-pink-500 flex items-center justify-center text-white">
        {icon}
      </div>
      <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent -z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold heading-gradient mb-4">
            Benefícios Exclusivos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra como a Artmatch pode transformar sua carreira artística com recursos personalizados para suas necessidades.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BenefitCard
            icon={<TrendingUp size={24} />}
            title="Match Inteligente"
            description="Nosso algoritmo conecta seu perfil com as oportunidades mais relevantes para seu estilo e experiência artística."
            delay={100}
          />
          <BenefitCard
            icon={<Bell size={24} />}
            title="Notificações em Tempo Real"
            description="Receba alertas instantâneos sobre novos editais e oportunidades que correspondem ao seu perfil artístico."
            delay={300}
          />
          <BenefitCard
            icon={<FolderOpen size={24} />}
            title="Portfólio Integrado"
            description="Crie e compartilhe seu portfólio digital profissional para aumentar suas chances de aprovação em editais."
            delay={500}
          />
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
