import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Code2, Lightbulb, Play, CheckCircle2 } from "lucide-react";
import { moduleConceptsMap, learningModules } from "@/data/learningData";
import { CodePlayground } from "./CodePlayground";

interface ConceptViewerProps {
  moduleId: string;
  onBack: () => void;
  onNextModule?: (moduleId: string) => void;
}

export const ConceptViewer = ({ moduleId, onBack, onNextModule }: ConceptViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playgroundOpen, setPlaygroundOpen] = useState(false);
  const [playgroundCode, setPlaygroundCode] = useState("");
  const [playgroundLanguage, setPlaygroundLanguage] = useState("python");

  const concepts = moduleConceptsMap[moduleId] || [];
  const current = concepts[currentIndex];
  const module = learningModules.find(m => m.id === moduleId);
  const moduleIndex = learningModules.findIndex(m => m.id === moduleId);
  const nextModule = moduleIndex < learningModules.length - 1 ? learningModules[moduleIndex + 1] : null;

  const goNext = () => {
    if (currentIndex < concepts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTryCode = (code: string, language: string) => {
    setPlaygroundCode(code);
    setPlaygroundLanguage(language);
    setPlaygroundOpen(true);
  };

  const handleNextModule = () => {
    if (nextModule && onNextModule) {
      setCurrentIndex(0);
      onNextModule(nextModule.id);
    }
  };

  const isLastConcept = currentIndex === concepts.length - 1;

  if (!current || !module) {
    return (
      <section className="py-24 bg-gradient-hero min-h-screen">
        <div className="container px-6 text-center">
          <p className="text-muted-foreground">Module content not found.</p>
          <Button variant="ghost" onClick={onBack} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Modules
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="concepts" className="py-24 bg-gradient-hero min-h-screen">
      <div className="container px-6">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Modules
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {concepts.length}
            </span>
            <div className="flex gap-1">
              {concepts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-primary w-6' : 'bg-muted hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card variant="elevated" className="overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-secondary/20">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="module">{module.title}</Badge>
                <Badge variant={
                  module.difficulty === 'Beginner' ? 'success' :
                  module.difficulty === 'Intermediate' ? 'accent' : 'primary'
                }>
                  {module.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-3xl">{current.title}</CardTitle>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
              {/* Main content */}
              <div className="prose prose-invert max-w-none">
                <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {current.content.split('\n').map((line, i) => {
                    if (line.startsWith('•')) {
                      const parts = line.substring(2).split('**');
                      return (
                        <div key={i} className="flex gap-2 my-2">
                          <span className="text-primary">•</span>
                          <span>
                            {parts.map((part, j) => 
                              j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part
                            )}
                          </span>
                        </div>
                      );
                    }
                    if (line.match(/^\d+\./)) {
                      const parts = line.split('**');
                      return (
                        <div key={i} className="flex gap-2 my-2 ml-4">
                          <span className="text-primary font-mono">{line.split('.')[0]}.</span>
                          <span>
                            {parts.map((part, j) => 
                              j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part.replace(/^\d+\./, '')
                            )}
                          </span>
                        </div>
                      );
                    }
                    return <p key={i} className="my-4">{line}</p>;
                  })}
                </div>
              </div>

              {/* Code example */}
              {current.codeExample && (
                <div className="rounded-xl overflow-hidden border border-border/50">
                  <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Example Code</span>
                      <Badge variant="secondary" className="text-xs">{current.language}</Badge>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleTryCode(current.codeExample!, current.language || 'python')}
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Try it
                    </Button>
                  </div>
                  <pre className="p-4 bg-background/50 overflow-x-auto">
                    <code className="text-sm font-mono text-muted-foreground">
                      {current.codeExample}
                    </code>
                  </pre>
                </div>
              )}

              {/* Visual */}
              {current.visual === 'network' && <NeuralNetworkDiagram />}
              {current.visual === 'pipeline' && <MLPipelineDiagram />}
              {current.visual === 'transformer' && <TransformerDiagram />}
              {current.visual === 'infrastructure' && <InfrastructureDiagram />}
              {current.visual === 'security' && <SecurityDiagram />}
              {current.visual === 'integration' && <IntegrationDiagram />}

              {/* Tips */}
              <div className="flex gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20">
                <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-accent mb-1">Key Insight</p>
                  <p className="text-sm text-muted-foreground">
                    {getInsightForConcept(current.id, module.id)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={goPrev}
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            {isLastConcept ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Module Complete!</span>
                </div>
                {nextModule ? (
                  <Button variant="hero" onClick={handleNextModule}>
                    Next: {nextModule.title}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button variant="hero" onClick={onBack}>
                    Return to Modules
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            ) : (
              <Button variant="hero" onClick={goNext}>
                Next Concept
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <CodePlayground 
        open={playgroundOpen} 
        onOpenChange={setPlaygroundOpen}
        code={playgroundCode}
        language={playgroundLanguage}
      />
    </section>
  );
};

function getInsightForConcept(conceptId: string, moduleId: string): string {
  const insights: Record<string, string> = {
    // Fundamentals
    "what-is-ai": "Understanding this concept is fundamental to everything else in AI. Take your time here!",
    "types-of-ai": "Different AI types suit different problems. Choosing the right type is half the battle!",
    "how-ml-works": "This cycle applies to almost every ML project you'll ever work on.",
    "neural-networks": "Don't worry about the math yet - understanding the structure is what matters first.",
    // ML Models
    "data-collection": "The quality of your data determines the ceiling of your model's performance.",
    "data-preprocessing": "Data scientists spend 80% of their time here. It's not glamorous, but it's crucial.",
    "model-training": "Start with simple models. Complex models often aren't necessary!",
    "model-evaluation": "Never skip this step. A model that works on training data might fail in production.",
    // LLMs
    "tokenization": "Token count directly affects API costs and context windows. Master this!",
    "transformers": "This architecture powers ChatGPT, Claude, and most modern AI assistants.",
    "prompting": "Good prompting is an art. Small changes can dramatically improve results.",
    "api-integration": "Always use environment variables for API keys. Never commit them to code!",
    // Infrastructure
    "compute-requirements": "Start small and scale up. You can always add more compute later.",
    "gpu-vs-cpu": "For inference, you often don't need GPUs. Only training typically requires them.",
    "cloud-services": "Cloud is usually more cost-effective than buying your own hardware.",
    "scaling-strategies": "Horizontal scaling is almost always preferred over vertical scaling.",
    // Security
    "security-threats": "Security is not optional. Build it in from the start!",
    "stress-testing": "If you haven't tested it, assume it will fail under load.",
    "input-validation": "Never trust user input. Validate everything, always.",
    "monitoring": "You can't fix what you can't see. Instrument everything.",
    // Integration
    "api-design": "A good API makes your AI accessible to everyone, not just ML experts.",
    "wrappers-sdks": "Good SDKs can make your API 10x more usable.",
    "best-practices": "These patterns will save you from 2 AM production incidents.",
    "case-studies": "Learn from successful implementations before building your own.",
  };
  return insights[conceptId] || "This concept is a building block for more advanced topics ahead!";
}

const NeuralNetworkDiagram = () => (
  <div className="p-6 rounded-xl bg-secondary/30 border border-border/50">
    <p className="text-sm text-muted-foreground mb-4">Interactive Neural Network Visualization</p>
    <svg viewBox="0 0 600 200" className="w-full h-48">
      <text x="50" y="20" className="fill-muted-foreground text-xs">Input Layer</text>
      <text x="275" y="20" className="fill-muted-foreground text-xs">Hidden Layer</text>
      <text x="500" y="20" className="fill-muted-foreground text-xs">Output</text>
      <g className="stroke-border" strokeWidth="1.5">
        {[50, 100, 150].map((y1) =>
          [40, 80, 120, 160].map((y2) => (
            <line key={`i${y1}-h${y2}`} x1="80" y1={y1} x2="270" y2={y2} className="opacity-30" />
          ))
        )}
        {[40, 80, 120, 160].map((y1) =>
          [80, 120].map((y2) => (
            <line key={`h${y1}-o${y2}`} x1="330" y1={y1} x2="520" y2={y2} className="opacity-30" />
          ))
        )}
      </g>
      {[50, 100, 150].map((y, i) => (
        <g key={`input-${i}`}>
          <circle cx="50" cy={y} r="20" className="fill-primary/20 stroke-primary" strokeWidth="2" />
          <text x="50" y={y + 5} textAnchor="middle" className="fill-primary text-xs font-medium">x{i + 1}</text>
        </g>
      ))}
      {[40, 80, 120, 160].map((y, i) => (
        <g key={`hidden-${i}`}>
          <circle cx="300" cy={y} r="20" className="fill-accent/20 stroke-accent" strokeWidth="2" />
          <text x="300" y={y + 5} textAnchor="middle" className="fill-accent text-xs font-medium">h{i + 1}</text>
        </g>
      ))}
      {[80, 120].map((y, i) => (
        <g key={`output-${i}`}>
          <circle cx="550" cy={y} r="20" className="fill-success/20 stroke-success" strokeWidth="2" />
          <text x="550" y={y + 5} textAnchor="middle" className="fill-success text-xs font-medium">y{i + 1}</text>
        </g>
      ))}
    </svg>
    <p className="text-xs text-center text-muted-foreground mt-4">
      Data flows from left to right. Each connection has a "weight" that the model learns during training.
    </p>
  </div>
);

const MLPipelineDiagram = () => (
  <div className="p-6 rounded-xl bg-secondary/30 border border-border/50">
    <p className="text-sm text-muted-foreground mb-4">ML Training Pipeline</p>
    <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
      {["Data", "Preprocess", "Split", "Train", "Evaluate", "Deploy"].map((step, i) => (
        <div key={step} className="flex items-center">
          <div className={`px-4 py-2 rounded-lg border-2 text-sm font-medium whitespace-nowrap ${
            i === 3 ? 'border-primary bg-primary/20 text-primary' : 'border-border bg-secondary/50 text-muted-foreground'
          }`}>
            {step}
          </div>
          {i < 5 && <ArrowRight className="w-4 h-4 text-muted-foreground mx-1 shrink-0" />}
        </div>
      ))}
    </div>
    <p className="text-xs text-center text-muted-foreground mt-4">
      Each step builds on the previous one. Training is where the model actually learns patterns.
    </p>
  </div>
);

const TransformerDiagram = () => (
  <div className="p-6 rounded-xl bg-secondary/30 border border-border/50">
    <p className="text-sm text-muted-foreground mb-4">Transformer Architecture (Simplified)</p>
    <div className="flex flex-col items-center gap-3">
      <div className="px-6 py-3 rounded-lg border-2 border-primary bg-primary/20 text-primary font-medium">
        Input Embedding + Positional Encoding
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
      <div className="px-6 py-3 rounded-lg border-2 border-accent bg-accent/20 text-accent font-medium">
        Multi-Head Self-Attention
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
      <div className="px-6 py-3 rounded-lg border-2 border-border bg-secondary/50 text-muted-foreground font-medium">
        Feed-Forward Network
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
      <div className="px-6 py-3 rounded-lg border-2 border-success bg-success/20 text-success font-medium">
        Output Probabilities
      </div>
    </div>
    <p className="text-xs text-center text-muted-foreground mt-4">
      The self-attention mechanism is what allows transformers to understand context across long sequences.
    </p>
  </div>
);

const InfrastructureDiagram = () => (
  <div className="p-6 rounded-xl bg-secondary/30 border border-border/50">
    <p className="text-sm text-muted-foreground mb-4">AI Infrastructure Stack</p>
    <div className="space-y-2">
      {[
        { label: "Application Layer", desc: "APIs, Web Apps, SDKs", color: "primary" },
        { label: "Serving Layer", desc: "Model Server, Load Balancer, Cache", color: "accent" },
        { label: "Compute Layer", desc: "GPUs, TPUs, CPU Clusters", color: "success" },
        { label: "Storage Layer", desc: "Model Registry, Vector DB, Data Lake", color: "muted-foreground" },
      ].map((layer) => (
        <div 
          key={layer.label} 
          className={`p-3 rounded-lg border-l-4 bg-secondary/50 ${
            layer.color === 'primary' ? 'border-l-primary' :
            layer.color === 'accent' ? 'border-l-accent' :
            layer.color === 'success' ? 'border-l-success' : 'border-l-muted-foreground'
          }`}
        >
          <div className="font-medium text-foreground">{layer.label}</div>
          <div className="text-xs text-muted-foreground">{layer.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

const SecurityDiagram = () => (
  <div className="p-6 rounded-xl bg-secondary/30 border border-border/50">
    <p className="text-sm text-muted-foreground mb-4">AI Security Layers</p>
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
      {[
        { threat: "Prompt Injection", defense: "Input sanitization, system prompt protection", severity: "high" },
        { threat: "Data Poisoning", defense: "Data validation, anomaly detection", severity: "high" },
        { threat: "Model Extraction", defense: "Rate limiting, output perturbation", severity: "medium" },
        { threat: "Privacy Leaks", defense: "Differential privacy, output filtering", severity: "medium" },
      ].map((item, i) => (
        <div key={item.threat} className="relative pl-8 pb-4">
          <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 bg-background ${
            item.severity === 'high' ? 'border-destructive' : 'border-accent'
          }`} />
          <div className="p-3 rounded-lg bg-secondary/50 border border-border/50">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{item.threat}</span>
              <Badge variant={item.severity === 'high' ? 'destructive' : 'accent'} className="text-xs">
                {item.severity}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{item.defense}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const IntegrationDiagram = () => (
  <div className="p-6 rounded-xl bg-secondary/30 border border-border/50">
    <p className="text-sm text-muted-foreground mb-4">Integration Architecture</p>
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-xl bg-primary/20 border-2 border-primary flex items-center justify-center mb-2">
          <span className="text-primary text-2xl">📱</span>
        </div>
        <span className="text-xs text-muted-foreground">Client Apps</span>
      </div>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-xl bg-accent/20 border-2 border-accent flex items-center justify-center mb-2">
          <span className="text-accent text-2xl">🔗</span>
        </div>
        <span className="text-xs text-muted-foreground">API Gateway</span>
      </div>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-xl bg-success/20 border-2 border-success flex items-center justify-center mb-2">
          <span className="text-success text-2xl">🤖</span>
        </div>
        <span className="text-xs text-muted-foreground">AI Service</span>
      </div>
    </div>
    <div className="flex justify-center mt-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>SDK</span>
        <ArrowRight className="w-3 h-3" />
        <span>REST API</span>
        <ArrowRight className="w-3 h-3" />
        <span>Model</span>
      </div>
    </div>
  </div>
);
