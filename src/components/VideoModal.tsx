import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, MessageCircle, Code2, Shield } from "lucide-react";

interface VideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const VideoModal = ({ open, onOpenChange }: VideoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-background border-border">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="primary">Introduction</Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>2 min read</span>
            </div>
          </div>
          <DialogTitle className="text-2xl">Welcome to AI Academy</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Introduction content */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              AI Academy is your interactive learning platform designed to make artificial intelligence 
              and machine learning accessible to everyone—whether you're a complete beginner or 
              looking to deepen your technical knowledge.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-2 gap-4">
            <FeatureCard
              icon={<BookOpen className="w-5 h-5" />}
              title="6 Learning Modules"
              description="From AI Fundamentals to Real-World Integration, each module takes 8-15 minutes to complete with hands-on code examples."
            />
            <FeatureCard
              icon={<Code2 className="w-5 h-5" />}
              title="Interactive Playground"
              description="Edit and run code directly in the browser. Experiment with Python and TypeScript examples in our mini-IDE."
            />
            <FeatureCard
              icon={<MessageCircle className="w-5 h-5" />}
              title="AI Assistant"
              description="Click the chat bubble to ask questions, get explanations, or request code examples. Your personal AI tutor is always available."
            />
            <FeatureCard
              icon={<Shield className="w-5 h-5" />}
              title="Security & Infrastructure"
              description="Learn to build robust AI systems with stress testing, input validation, and production-ready deployment strategies."
            />
          </div>

          {/* Getting started steps */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">How to Get Started</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <StepCard
                number="01"
                title="Choose a Module"
                description="Start with 'AI Fundamentals' or jump to any topic that interests you"
              />
              <StepCard
                number="02"
                title="Learn & Practice"
                description="Read concepts, then open the code playground to experiment"
              />
              <StepCard
                number="03"
                title="Ask Questions"
                description="Use the AI Assistant (bottom-right) whenever you need help"
              />
            </div>
          </div>

          {/* Quick tips */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <h4 className="font-semibold text-foreground mb-2">💡 Pro Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Click "Try Code" on any code example to open it in the editable playground</li>
              <li>• The AI Assistant knows all the platform content—ask it about specific modules or concepts</li>
              <li>• Use the Learning Resources drawer (top nav) for curated external documentation</li>
              <li>• Each module builds on previous ones, but you can study them in any order</li>
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
    <span className="text-3xl font-bold text-muted/30">{number}</span>
    <h4 className="font-medium text-foreground mt-2">{title}</h4>
    <p className="text-sm text-muted-foreground mt-1">{description}</p>
  </div>
);
