import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ModuleGrid } from "@/components/ModuleGrid";
import { ConceptViewer } from "@/components/ConceptViewer";
import { InteractivePlayground } from "@/components/InteractivePlayground";
import { InfrastructureOverview } from "@/components/InfrastructureOverview";
import { AIChatbot } from "@/components/AIChatbot";

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
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  AI Academy — Learn AI concepts the intuitive way
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span>Built for everyone, from any background</span>
                </div>
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
