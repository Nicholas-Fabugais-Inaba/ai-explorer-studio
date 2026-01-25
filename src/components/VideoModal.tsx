import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Play, Clock } from "lucide-react";

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
              <span>5 min</span>
            </div>
          </div>
          <DialogTitle className="text-2xl">Welcome to AI Academy</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video placeholder with play button */}
          <div className="relative aspect-video rounded-xl bg-gradient-to-br from-primary/20 via-accent/10 to-success/20 border border-border/50 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.2)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.2)_1px,transparent_1px)] bg-[size:30px_30px]" />
            
            <div className="relative z-10 text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors group">
                <Play className="w-8 h-8 text-primary group-hover:scale-110 transition-transform ml-1" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium text-foreground">Video Coming Soon</p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Our introduction video will walk you through the platform and show you how to get started with AI learning.
                </p>
              </div>
            </div>
          </div>

          {/* Quick overview */}
          <div className="grid md:grid-cols-3 gap-4">
            <OverviewCard
              number="01"
              title="Learn Concepts"
              description="Start with fundamentals and progress through interactive modules"
            />
            <OverviewCard
              number="02"
              title="Try It Yourself"
              description="Experiment with real code examples in our playground"
            />
            <OverviewCard
              number="03"
              title="Build Secure Systems"
              description="Understand infrastructure and security from day one"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface OverviewCardProps {
  number: string;
  title: string;
  description: string;
}

const OverviewCard = ({ number, title, description }: OverviewCardProps) => (
  <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
    <span className="text-3xl font-bold text-muted/30">{number}</span>
    <h4 className="font-medium text-foreground mt-2">{title}</h4>
    <p className="text-sm text-muted-foreground mt-1">{description}</p>
  </div>
);
