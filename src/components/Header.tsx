import { Brain, BookOpen } from "lucide-react";
import { ResourcesDrawer } from "./ResourcesDrawer";
import { learningModules } from "@/data/learningData";

interface HeaderProps {
  activeModule?: string;
  onNavigate?: (section: string) => void;
  onSelectModule?: (moduleId: string) => void;
}

export const Header = ({ activeModule, onNavigate, onSelectModule }: HeaderProps) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    if (activeModule && onNavigate) {
      // If viewing a module, go back to main page first
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(section);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    if (onNavigate) {
      onNavigate('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentModule = activeModule 
    ? learningModules.find(m => m.id === activeModule) 
    : null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <button 
          onClick={handleLogoClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-foreground">AI Academy</span>
            <span className="text-xs text-muted-foreground">
              {currentModule ? currentModule.title : "Learn AI the easy way"}
            </span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#modules" 
            onClick={(e) => handleNavClick(e, 'modules')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Modules
          </a>
          <a 
            href="#playground" 
            onClick={(e) => handleNavClick(e, 'playground')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Playground
          </a>
          <a 
            href="#infrastructure" 
            onClick={(e) => handleNavClick(e, 'infrastructure')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Infrastructure
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {activeModule && onSelectModule && (
            <div className="hidden sm:flex items-center gap-2">
              {learningModules.map((module, index) => (
                <button
                  key={module.id}
                  onClick={() => onSelectModule(module.id)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all ${
                    module.id === activeModule 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                  }`}
                  title={module.title}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
          <ResourcesDrawer>
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors" title="Learning Resources">
              <BookOpen className="w-5 h-5 text-muted-foreground" />
            </button>
          </ResourcesDrawer>
        </div>
      </div>
    </header>
  );
};
