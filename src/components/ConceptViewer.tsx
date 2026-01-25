import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Code2, Lightbulb, Play } from "lucide-react";
import { fundamentalsConcepts } from "@/data/learningData";

interface ConceptViewerProps {
  moduleId: string;
  onBack: () => void;
}

export const ConceptViewer = ({ moduleId, onBack }: ConceptViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const concepts = fundamentalsConcepts;
  const current = concepts[currentIndex];

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
                <Badge variant="module">AI Fundamentals</Badge>
                <Badge variant="success">Beginner</Badge>
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
                    <Button variant="ghost" size="sm">
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

              {/* Tips */}
              <div className="flex gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20">
                <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-accent mb-1">Key Insight</p>
                  <p className="text-sm text-muted-foreground">
                    Understanding this concept is fundamental to everything else in AI. Take your time here!
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
            <Button
              variant="hero"
              onClick={goNext}
              disabled={currentIndex === concepts.length - 1}
            >
              Next Concept
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const NeuralNetworkDiagram = () => {
  return (
    <div className="p-6 rounded-xl bg-secondary/30 border border-border/50">
      <p className="text-sm text-muted-foreground mb-4">Interactive Neural Network Visualization</p>
      <svg viewBox="0 0 600 200" className="w-full h-48">
        {/* Labels */}
        <text x="50" y="20" className="fill-muted-foreground text-xs">Input Layer</text>
        <text x="275" y="20" className="fill-muted-foreground text-xs">Hidden Layer</text>
        <text x="500" y="20" className="fill-muted-foreground text-xs">Output</text>

        {/* Connections first (behind nodes) */}
        <g className="stroke-border" strokeWidth="1.5">
          {/* Input to hidden */}
          {[50, 100, 150].map((y1) =>
            [40, 80, 120, 160].map((y2) => (
              <line key={`i${y1}-h${y2}`} x1="80" y1={y1} x2="270" y2={y2} className="opacity-30" />
            ))
          )}
          {/* Hidden to output */}
          {[40, 80, 120, 160].map((y1) =>
            [80, 120].map((y2) => (
              <line key={`h${y1}-o${y2}`} x1="330" y1={y1} x2="520" y2={y2} className="opacity-30" />
            ))
          )}
        </g>

        {/* Input layer nodes */}
        {[50, 100, 150].map((y, i) => (
          <g key={`input-${i}`}>
            <circle cx="50" cy={y} r="20" className="fill-primary/20 stroke-primary" strokeWidth="2" />
            <text x="50" y={y + 5} textAnchor="middle" className="fill-primary text-xs font-medium">x{i + 1}</text>
          </g>
        ))}

        {/* Hidden layer nodes */}
        {[40, 80, 120, 160].map((y, i) => (
          <g key={`hidden-${i}`}>
            <circle cx="300" cy={y} r="20" className="fill-accent/20 stroke-accent" strokeWidth="2" />
            <text x="300" y={y + 5} textAnchor="middle" className="fill-accent text-xs font-medium">h{i + 1}</text>
          </g>
        ))}

        {/* Output layer nodes */}
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
};
