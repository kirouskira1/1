
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  stars: number;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "Consegui minha primeira bolsa de estudos internacional graças à Artmatch! A plataforma me conectou a uma oportunidade que eu nem sabia que existia.",
    author: "Mariana Silva",
    role: "Artista Visual",
    stars: 5
  },
  {
    quote: "Em apenas dois meses usando a Artmatch, recebi três propostas de editais relevantes para meu trabalho. A interface é intuitiva e as recomendações são precisas.",
    author: "Pedro Almeida",
    role: "Fotógrafo",
    stars: 5
  },
  {
    quote: "Como artista em início de carreira, a Artmatch foi fundamental para encontrar editais adequados ao meu perfil. Recomendo para todos os artistas!",
    author: "Luiza Mendes",
    role: "Ilustradora",
    stars: 4
  },
  {
    quote: "A Artmatch revolucionou minha forma de buscar oportunidades artísticas. Agora recebo alertas personalizados e não perco mais prazos importantes.",
    author: "Rafael Costa",
    role: "Escultor",
    stars: 5
  }
];

const Testimonial = ({ quote, author, role, stars }: TestimonialProps) => {
  return (
    <div className="glass-card p-8 h-full flex flex-col">
      <div className="mb-4 flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={cn(
              "mr-1",
              i < stars ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            )}
          />
        ))}
      </div>
      <p className="text-gray-700 italic mb-6 flex-grow">{quote}</p>
      <div>
        <p className="font-bold">{author}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const maxVisibleItems = 3;
  const autoplayInterval = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - maxVisibleItems ? 0 : prevIndex + 1
    );
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - maxVisibleItems : prevIndex - 1
    );
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const startAutoplay = () => {
    autoplayInterval.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayInterval.current) {
      clearInterval(autoplayInterval.current);
      autoplayInterval.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    
    return () => {
      stopAutoplay();
    };
  }, []);

  const visibleTestimonials = () => {
    // For mobile, only show one testimonial at a time
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return testimonials.slice(currentIndex, currentIndex + 1);
    }

    // For tablets, show two testimonials
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      const endIndex = Math.min(currentIndex + 2, testimonials.length);
      return testimonials.slice(currentIndex, endIndex);
    }

    // For desktop, show three testimonials
    const endIndex = Math.min(currentIndex + maxVisibleItems, testimonials.length);
    return testimonials.slice(currentIndex, endIndex);
  };

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold heading-gradient mb-4">
            O Que Nossos Artistas Dizem
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra como a Artmatch tem ajudado talentos de todo o Brasil a encontrar as melhores oportunidades.
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-between mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}
              className="rounded-full w-10 h-10"
              disabled={isAnimating}
            >
              <ChevronLeft size={20} />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}
              className="rounded-full w-10 h-10"
              disabled={isAnimating}
            >
              <ChevronRight size={20} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
            {visibleTestimonials().map((testimonial, index) => (
              <div 
                key={`${testimonial.author}-${index + currentIndex}`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Testimonial {...testimonial} />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            {Array(testimonials.length - maxVisibleItems + 1)
              .fill(0)
              .map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    currentIndex === index ? "bg-artmatch-purple w-6" : "bg-gray-300"
                  )}
                  onClick={() => setCurrentIndex(index)}
                  onMouseEnter={stopAutoplay}
                  onMouseLeave={startAutoplay}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
