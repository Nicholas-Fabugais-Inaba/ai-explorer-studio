import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, MessageCircle, Code2, Shield, Sparkles, GraduationCap, Rocket } from "lucide-react";

interface IntroModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const IntroModal = ({ open, onOpenChange }: IntroModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-background border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="primary">Welcome</Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>2 min read</span>
            </div>
          </div>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            Welcome to AI Academy
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Your interactive journey into artificial intelligence and machine learning starts here.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero introduction */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Learn AI at Your Own Pace</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  AI Academy transforms complex AI concepts into digestible lessons with hands-on coding exercises. 
                  Whether you're a curious beginner or an experienced developer, our interactive platform 
                  adapts to your learning style.
                </p>
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-2 gap-4">
            <FeatureCard
              icon={<BookOpen className="w-5 h-5" />}
              title="6 Learning Modules"
              description="From AI Fundamentals to Real-World Integration. Each module takes 8-15 minutes with interactive code examples you can edit and run."
            />
            <FeatureCard
              icon={<Code2 className="w-5 h-5" />}
              title="Interactive Playground"
              description="Our mini-IDE lets you edit code, run experiments, and see real results. Make mistakes, learn from errors, and build confidence."
            />
            <FeatureCard
              icon={<MessageCircle className="w-5 h-5" />}
              title="AI Tutor Assistant"
              description="Stuck on a concept? Click the chat bubble (bottom-right) to ask questions. Your AI tutor knows all the platform content and can help explain anything."
            />
            <FeatureCard
              icon={<Shield className="w-5 h-5" />}
              title="Real-World Skills"
              description="Learn to build robust AI systems with security best practices, stress testing, and production deployment strategies."
            />
          </div>

          {/* Getting started steps */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Rocket className="w-4 h-4 text-primary" />
              Get Started in 3 Simple Steps
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <StepCard
                number="01"
                title="Pick a Module"
                description="Start with 'AI Fundamentals' for basics, or jump to any topic that catches your interest"
              />
              <StepCard
                number="02"
                title="Learn by Doing"
                description="Read the concept, then click 'Try Code' to experiment in the interactive playground"
              />
              <StepCard
                number="03"
                title="Ask & Explore"
                description="Use the AI Assistant for help. Check Learning Resources for curated external content"
              />
            </div>
          </div>

          {/* Quick tips */}
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              💡 Pro Tips for Success
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Click "Try Code" on any example to open the editable playground—experiment freely!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>The AI Assistant understands all platform content—ask about specific modules by name</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Use the Learning Resources drawer (top nav) for curated documentation and courses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Modules build on each other, but feel free to explore in any order that works for you</span>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 flex gap-3">
    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 text-primary">
      {icon}
    </div>
    <div>
      <h4 className="font-medium text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
    </div>
  </div>
);

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

const StepCard = ({ number, title, description }: StepCardProps) => (
  <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
    <span className="text-3xl font-bold text-primary/20">{number}</span>
    <h4 className="font-medium text-foreground mt-2">{title}</h4>
    <p className="text-sm text-muted-foreground mt-1">{description}</p>
  </div>
);
