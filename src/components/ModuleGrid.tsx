import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChevronRight, CheckCircle2 } from "lucide-react";
import { learningModules, type LearningModule } from "@/data/learningData";

interface ModuleGridProps {
  onSelectModule: (moduleId: string) => void;
}

export const ModuleGrid = ({ onSelectModule }: ModuleGridProps) => {
  return (
    <section id="modules" className="py-24 bg-background">
      <div className="container px-6">
        <div className="text-center mb-16">
          <Badge variant="module" className="mb-4">Learning Path</Badge>
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Your AI Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow our structured curriculum from foundational concepts to advanced implementation. 
            Each module builds on the previous one.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningModules.map((module, index) => (
            <ModuleCard 
              key={module.id} 
              module={module} 
              index={index}
              onClick={() => onSelectModule(module.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ModuleCardProps {
  module: LearningModule;
  index: number;
  onClick: () => void;
}

const ModuleCard = ({ module, index, onClick }: ModuleCardProps) => {
  const Icon = module.icon;
  const isCompleted = (module.progress ?? 0) === 100;
  const hasProgress = (module.progress ?? 0) > 0;

  return (
    <Card 
      variant="module" 
      className="relative overflow-hidden"
      onClick={onClick}
    >
      {/* Module number */}
      <div className="absolute top-4 right-4 text-6xl font-bold text-muted/30">
        {String(index + 1).padStart(2, '0')}
      </div>

      <CardHeader className="relative">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 
          ${module.color === 'primary' ? 'bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground' : ''}
          ${module.color === 'accent' ? 'bg-accent/20 text-accent group-hover:bg-accent group-hover:text-accent-foreground' : ''}
          ${module.color === 'success' ? 'bg-success/20 text-success group-hover:bg-success group-hover:text-success-foreground' : ''}
        `}>
          <Icon className="w-6 h-6" />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Badge variant={
            module.difficulty === 'Beginner' ? 'success' :
            module.difficulty === 'Intermediate' ? 'accent' : 'primary'
          }>
            {module.difficulty}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {module.duration}
          </div>
        </div>

        <CardTitle className="text-xl">{module.title}</CardTitle>
        <CardDescription className="line-clamp-2">{module.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {module.topics.slice(0, 3).map((topic) => (
              <span key={topic} className="text-xs px-2 py-1 rounded-md bg-secondary/50 text-muted-foreground">
                {topic}
              </span>
            ))}
            {module.topics.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-md bg-secondary/50 text-muted-foreground">
                +{module.topics.length - 3} more
              </span>
            )}
          </div>

          {hasProgress && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground font-medium">{module.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-primary transition-all duration-500"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>
          )}

          <Button 
            variant={isCompleted ? "secondary" : "ghost"} 
            className="w-full justify-between mt-2"
          >
            {isCompleted ? (
              <>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Completed
                </span>
                <span className="text-xs text-muted-foreground">Review</span>
              </>
            ) : hasProgress ? (
              <>
                Continue Learning
                <ChevronRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Start Module
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
