import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ModuleGrid } from "@/components/ModuleGrid";
import { ConceptViewer } from "@/components/ConceptViewer";
import { InteractivePlayground } from "@/components/InteractivePlayground";
import { InfrastructureOverview } from "@/components/InfrastructureOverview";
import { AIChatbot } from "@/components/AIChatbot";
import { AnalyticsScript } from "@/components/AnalyticsScript";
import { Linkedin, Mail, Github, Instagram } from "lucide-react";

const Index = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const handleStartLearning = () => {
    const modulesSection = document.getElementById('modules');
    if (modulesSection) {
      modulesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectModule = (moduleId: string) => {
    setSelectedModule(moduleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
  };

  const handleNavigate = (section: string) => {
    if (section === 'home') {
      setSelectedModule(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnalyticsScript />
      <Header 
        activeModule={selectedModule ?? undefined} 
        onNavigate={handleNavigate}
        onSelectModule={handleSelectModule}
      />
      
      {selectedModule ? (
        <div className="pt-16">
          <ConceptViewer 
            moduleId={selectedModule} 
            onBack={handleBackToModules}
            onNextModule={handleSelectModule}
          />
        </div>
      ) : (
        <>
          <HeroSection onStartLearning={handleStartLearning} />
          <ModuleGrid onSelectModule={handleSelectModule} />
          <InteractivePlayground />
          <div id="infrastructure">
            <InfrastructureOverview />
          </div>
          
          {/* Footer */}
          <footer className="py-12 border-t border-border/50 bg-background">
            <div className="container px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                  <p className="text-sm font-medium text-foreground">
                    AI Academy — Learn AI concepts the intuitive way
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Built by Nicholas Fabugais-Inaba
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <a 
                    href="https://www.linkedin.com/in/nicholas-fabugais-inaba/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="mailto:nfabugaisinaba@gmail.com"
                    className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-colors"
                    title="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://github.com/Nicholas-Fabugais-Inaba" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.instagram.com/nicholas.fi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border/30 text-center">
                <p className="text-xs text-muted-foreground">
                  © {new Date().getFullYear()} AI Academy. Built for everyone, from any background.
                </p>
              </div>
            </div>
          </footer>
        </>
      )}
      
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default Index;
