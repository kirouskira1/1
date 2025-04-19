import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface StepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

const Step = ({ number, title, description, isLast = false }: StepProps) => {
  const stepRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (stepRef.current) {
      observer.observe(stepRef.current);
    }
    
    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, []);

  return (
    <div ref={stepRef} className="flex opacity-0 translate-y-10 transition-all duration-500" style={{ transitionDelay: `${number * 150}ms` }}>
      <div className="mr-6 relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-artmatch-purple to-artmatch-blue flex items-center justify-center text-white font-bold text-lg">
          {number}
        </div>
        {!isLast && (
          <div className="absolute top-12 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-artmatch-purple/50 to-artmatch-blue/30"></div>
        )}
      </div>
      <div className="pb-12">
        <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-white via-artmatch-purple/5 to-white dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold heading-gradient mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-gray-600 dark:text-foreground max-w-2xl mx-auto">
            Em apenas três passos simples, você estará conectado às melhores oportunidades artísticas do país.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Step
            number={1}
            title="Crie seu perfil artístico"
            description="Cadastre-se gratuitamente na plataforma e crie seu perfil detalhado com suas habilidades, experiências e preferências artísticas."
          />
          <Step
            number={2}
            title="Receba recomendações personalizadas"
            description="Nosso algoritmo inteligente analisará seu perfil e enviará oportunidades de editais que combinam perfeitamente com seu talento."
          />
          <Step
            number={3}
            title="Candidate-se com um clique"
            description="Envie sua candidatura diretamente pela plataforma, acompanhe o status e receba feedback sobre seus projetos."
            isLast
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
