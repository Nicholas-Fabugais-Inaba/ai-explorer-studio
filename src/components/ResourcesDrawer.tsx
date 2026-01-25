import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, FileText, Video, Github, Globe } from "lucide-react";

interface ResourcesDrawerProps {
  children: React.ReactNode;
}

export const ResourcesDrawer = ({ children }: ResourcesDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] bg-background border-border overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Learning Resources
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Documentation */}
          <ResourceSection
            title="Documentation"
            icon={<FileText className="w-4 h-4" />}
            resources={[
              {
                title: "Python Machine Learning",
                description: "Scikit-learn official documentation",
                url: "https://scikit-learn.org/stable/",
                badge: "Essential",
              },
              {
                title: "TensorFlow Tutorials",
                description: "Official TensorFlow learning resources",
                url: "https://www.tensorflow.org/tutorials",
                badge: "Deep Learning",
              },
              {
                title: "PyTorch Documentation",
                description: "Comprehensive PyTorch guides",
                url: "https://pytorch.org/docs/stable/index.html",
                badge: "Deep Learning",
              },
              {
                title: "Hugging Face",
                description: "Transformers and LLM resources",
                url: "https://huggingface.co/docs",
                badge: "LLMs",
              },
            ]}
          />

          {/* Video Courses */}
          <ResourceSection
            title="Video Courses"
            icon={<Video className="w-4 h-4" />}
            resources={[
              {
                title: "Andrew Ng's ML Course",
                description: "The classic introduction to machine learning",
                url: "https://www.coursera.org/learn/machine-learning",
                badge: "Free",
              },
              {
                title: "Fast.ai",
                description: "Practical deep learning for coders",
                url: "https://www.fast.ai/",
                badge: "Free",
              },
              {
                title: "3Blue1Brown Neural Networks",
                description: "Visual explanations of neural networks",
                url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
                badge: "Beginner",
              },
            ]}
          />

          {/* GitHub Repositories */}
          <ResourceSection
            title="GitHub Repositories"
            icon={<Github className="w-4 h-4" />}
            resources={[
              {
                title: "Awesome Machine Learning",
                description: "Curated list of ML frameworks and libraries",
                url: "https://github.com/josephmisiti/awesome-machine-learning",
                badge: "Collection",
              },
              {
                title: "LangChain",
                description: "Building applications with LLMs",
                url: "https://github.com/langchain-ai/langchain",
                badge: "LLMs",
              },
              {
                title: "MLOps Zoomcamp",
                description: "Free MLOps course materials",
                url: "https://github.com/DataTalksClub/mlops-zoomcamp",
                badge: "Infrastructure",
              },
            ]}
          />

          {/* Interactive Platforms */}
          <ResourceSection
            title="Interactive Platforms"
            icon={<Globe className="w-4 h-4" />}
            resources={[
              {
                title: "Google Colab",
                description: "Free Jupyter notebooks with GPU",
                url: "https://colab.research.google.com/",
                badge: "Free GPU",
              },
              {
                title: "Kaggle",
                description: "Datasets, competitions, and notebooks",
                url: "https://www.kaggle.com/",
                badge: "Practice",
              },
              {
                title: "Weights & Biases",
                description: "ML experiment tracking and visualization",
                url: "https://wandb.ai/",
                badge: "MLOps",
              },
            ]}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface Resource {
  title: string;
  description: string;
  url: string;
  badge: string;
}

interface ResourceSectionProps {
  title: string;
  icon: React.ReactNode;
  resources: Resource[];
}

const ResourceSection = ({ title, icon, resources }: ResourceSectionProps) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
      {icon}
      {title}
    </div>
    <div className="space-y-2">
      {resources.map((resource) => (
        <a
          key={resource.title}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/50 hover:border-primary/30 transition-all group"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {resource.title}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {resource.badge}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5 truncate">
                {resource.description}
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 mt-1" />
          </div>
        </a>
      ))}
    </div>
  </div>
);
