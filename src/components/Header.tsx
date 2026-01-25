import { Brain, BookOpen, Sparkles } from "lucide-react";

interface HeaderProps {
  activeModule?: string;
}

export const Header = ({ activeModule }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-foreground">AI Academy</span>
            <span className="text-xs text-muted-foreground">Learn AI the easy way</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#modules" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Modules
          </a>
          <a href="#concepts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Concepts
          </a>
          <a href="#playground" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Playground
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs text-muted-foreground">Interactive Learning</span>
          </div>
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <BookOpen className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};
