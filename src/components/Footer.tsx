import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { contactAvatar } from "@/lib/extendedMockData";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }
    
    // Simulate subscription
    toast.success("Obrigado por se inscrever em nossa newsletter!");
    setEmail("");
  };

  return (
    <footer id="contact" className="bg-background text-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="text-xl font-display font-bold text-artmatch-purple mb-4">
              Artmatch
            </h3>
            <p className="text-foreground mb-4">
              Conectando artistas a oportunidades excepcionais para impulsionar carreiras criativas.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/tantofazdjow?igsh=N2JucXVlY3R2b290" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-artmatch-purple/10 flex items-center justify-center text-artmatch-purple hover:bg-artmatch-purple hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/adriano-rodrigues-ads?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-artmatch-purple/10 flex items-center justify-center text-artmatch-purple hover:bg-artmatch-purple hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground hover:text-artmatch-purple transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-artmatch-purple transition-colors">
                  Para Artistas
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-artmatch-purple transition-colors">
                  Para Instituições
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-artmatch-purple transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-artmatch-purple transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Informações</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground hover:text-artmatch-purple transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-artmatch-purple transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-artmatch-purple transition-colors">
                  Suporte
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground hover:text-artmatch-purple transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Entre em Contato</h3>
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src={contactAvatar} alt="Adriano Rodrigues" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Adriano Rodrigues</p>
                <p className="text-sm text-muted-foreground">Suporte ao Cliente</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex">
              <div className="flex-grow">
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  className="h-10 rounded-l-full rounded-r-none border-r-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="h-10 rounded-r-full rounded-l-none bg-artmatch-purple hover:bg-artmatch-purple/90">
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Artmatch. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-foreground text-sm hover:text-artmatch-purple transition-colors">
                Termos
              </a>
              <a href="#" className="text-foreground text-sm hover:text-artmatch-purple transition-colors">
                Privacidade
              </a>
              <a href="#" className="text-foreground text-sm hover:text-artmatch-purple transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
