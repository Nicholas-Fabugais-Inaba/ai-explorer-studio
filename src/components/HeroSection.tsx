import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, Sparkles } from "lucide-react";
import { IntroModal } from "./IntroModal";

interface HeroSectionProps {
  onStartLearning: () => void;
}

export const HeroSection = ({ onStartLearning }: HeroSectionProps) => {
  const [introOpen, setIntroOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-success/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="container relative z-10 px-6 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">No coding experience required</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              <span className="text-foreground">Learn </span>
              <span className="text-gradient">AI</span>
              <span className="text-foreground"> the</span>
              <br />
              <span className="text-foreground">Intuitive Way</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Master machine learning, understand LLMs, and build secure AI systems. 
              From complete beginner to confident builder — no jargon, just clarity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" size="xl" onClick={onStartLearning}>
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="glass" size="lg" onClick={() => setIntroOpen(true)}>
                <Info className="w-5 h-5" />
                How It Works
              </Button>
            </div>

            <div className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>6 Interactive Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Hands-on Examples</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>Real Code Snippets</span>
              </div>
            </div>
          </div>

          {/* Floating visual elements */}
          <div className="absolute bottom-10 left-10 hidden lg:block">
            <NeuralNetworkVisual />
          </div>
        </div>
      </section>

      <IntroModal open={introOpen} onOpenChange={setIntroOpen} />
    </>
  );
};

const NeuralNetworkVisual = () => {
  return (
    <div className="w-48 h-48 relative opacity-40 animate-float">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Input layer */}
        <circle cx="30" cy="50" r="8" className="fill-primary" />
        <circle cx="30" cy="100" r="8" className="fill-primary" />
        <circle cx="30" cy="150" r="8" className="fill-primary" />
        
        {/* Hidden layer */}
        <circle cx="100" cy="40" r="8" className="fill-accent" />
        <circle cx="100" cy="80" r="8" className="fill-accent" />
        <circle cx="100" cy="120" r="8" className="fill-accent" />
        <circle cx="100" cy="160" r="8" className="fill-accent" />
        
        {/* Output layer */}
        <circle cx="170" cy="75" r="8" className="fill-success" />
        <circle cx="170" cy="125" r="8" className="fill-success" />
        
        {/* Connections */}
        <g className="stroke-muted-foreground/30" strokeWidth="1">
          <line x1="38" y1="50" x2="92" y2="40" />
          <line x1="38" y1="50" x2="92" y2="80" />
          <line x1="38" y1="50" x2="92" y2="120" />
          <line x1="38" y1="100" x2="92" y2="80" />
          <line x1="38" y1="100" x2="92" y2="120" />
          <line x1="38" y1="150" x2="92" y2="120" />
          <line x1="38" y1="150" x2="92" y2="160" />
          <line x1="108" y1="40" x2="162" y2="75" />
          <line x1="108" y1="80" x2="162" y2="75" />
          <line x1="108" y1="120" x2="162" y2="125" />
          <line x1="108" y1="160" x2="162" y2="125" />
        </g>
      </svg>
    </div>
  );
};
