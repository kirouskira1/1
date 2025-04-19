import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, Home, Award, HelpCircle, MessageCircle, AtSign, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "glass-effect py-3 dark:bg-background/80 dark:backdrop-blur-lg"
          : "bg-transparent py-5 dark:bg-background/80 dark:backdrop-blur-lg"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a
            href="/inicio"
            onClick={(e) => {
              e.preventDefault();
              navigate('/inicio');
              window.scrollTo(0, 0);
              window.location.href = '/inicio'; // Força o reload na rota correta
            }}
            className="text-2xl font-display font-bold text-artmatch-purple hover:text-artmatch-purple/90 transition-colors cursor-pointer"
          >
            Artmatch
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-8">
            <a href="#hero" className="text-gray-800 dark:text-gray-200 hover:text-artmatch-purple transition-colors">
              Início
            </a>
            <a href="#benefits" className="text-gray-800 dark:text-gray-200 hover:text-artmatch-purple transition-colors">
              Benefícios
            </a>
            <a href="#how-it-works" className="text-gray-800 dark:text-gray-200 hover:text-artmatch-purple transition-colors">
              Como Funciona
            </a>
            <a href="#testimonials" className="text-gray-800 dark:text-gray-200 hover:text-artmatch-purple transition-colors">
              Depoimentos
            </a>
            <a href="#contact" className="text-gray-800 dark:text-gray-200 hover:text-artmatch-purple transition-colors">
              Contato
            </a>
          </nav>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title={darkMode ? "Ativar tema claro" : "Ativar tema escuro"}
          >
            {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700 dark:text-gray-300" />}
          </button>
          <div className="block md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Menu"
              className="p-2"
            >
              <Menu size={28} className="text-gray-700" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div
          className={cn(
            "absolute top-full left-2 right-2 md:hidden overflow-hidden border border-border shadow-lg bg-background/90 backdrop-blur-sm rounded-xl mt-2",
            isMobileMenuOpen ? "opacity-100 py-4" : "opacity-0 h-0 py-0"
          )}
        >
          <div className={isMobileMenuOpen ? "animate-fade-in" : "animate-fade-out"}
          >
            <nav className="flex flex-col space-y-4 px-6">
              <a 
                href="#hero" 
                style={{ animationDelay: '0.05s' }}
                className={cn(
                  "text-gray-700 dark:text-gray-200 hover:text-artmatch-purple transition-colors py-3 px-4 rounded-lg transform-gpu font-medium font-display tracking-wide text-base flex items-center gap-3",
                  isMobileMenuOpen ? "animate-slide-in" : "hidden"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home size={18} className="text-artmatch-purple" />
                Início
              </a>
              <a 
                href="#benefits" 
                style={{ animationDelay: '0.1s' }}
                className={cn(
                  "text-gray-700 dark:text-gray-200 hover:text-artmatch-purple transition-colors py-3 px-4 rounded-lg font-medium font-display tracking-wide text-base flex items-center gap-3",
                  isMobileMenuOpen ? "animate-slide-in" : "hidden"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Award size={18} className="text-artmatch-purple" />
                Benefícios
              </a>
              <a 
                href="#how-it-works" 
                style={{ animationDelay: '0.15s' }}
                className={cn(
                  "text-gray-700 dark:text-gray-200 hover:text-artmatch-purple transition-colors py-3 px-4 rounded-lg font-medium font-display tracking-wide text-base flex items-center gap-3",
                  isMobileMenuOpen ? "animate-slide-in" : "hidden"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HelpCircle size={18} className="text-artmatch-purple" />
                Como Funciona
              </a>
              <a 
                href="#testimonials" 
                style={{ animationDelay: '0.2s' }}
                className={cn(
                  "text-gray-700 dark:text-gray-200 hover:text-artmatch-purple transition-colors py-3 px-4 rounded-lg font-medium font-display tracking-wide text-base flex items-center gap-3",
                  isMobileMenuOpen ? "animate-slide-in" : "hidden"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageCircle size={18} className="text-artmatch-purple" />
                Depoimentos
              </a>
              <a 
                href="#contact" 
                style={{ animationDelay: '0.25s' }}
                className={cn(
                  "text-gray-700 dark:text-gray-200 hover:text-artmatch-purple transition-colors py-3 px-4 rounded-lg font-medium font-display tracking-wide text-base flex items-center gap-3",
                  isMobileMenuOpen ? "animate-slide-in" : "hidden"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <AtSign size={18} className="text-artmatch-purple" />
                Contato
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
