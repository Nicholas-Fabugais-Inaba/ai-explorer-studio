import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Zap } from "lucide-react";

export const InteractivePlayground = () => {
  const [inputValue, setInputValue] = useState(50);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runModel = () => {
    setIsRunning(true);
    setPrediction(null);
    
    // Simulate ML model processing
    setTimeout(() => {
      // Simple linear "model": y = 2x + 10
      const result = (inputValue * 2) + 10 + (Math.random() * 5 - 2.5);
      setPrediction(Math.round(result * 10) / 10);
      setIsRunning(false);
    }, 800);
  };

  const reset = () => {
    setInputValue(50);
    setPrediction(null);
  };

  return (
    <section id="playground" className="py-24 bg-background">
      <div className="container px-6">
        <div className="text-center mb-16">
          <Badge variant="accent" className="mb-4">Try It Yourself</Badge>
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Interactive Playground
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience how a simple ML model works. Adjust the input, run the model, and see the prediction in real-time.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card variant="elevated">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Simple Prediction Model</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    A linear regression model that learns: output ≈ 2 × input + 10
                  </p>
                </div>
                <Badge variant="primary">Linear Regression</Badge>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Input */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-foreground">
                    Input Value (x)
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={inputValue}
                      onChange={(e) => setInputValue(Number(e.target.value))}
                      className="w-full h-2 rounded-full bg-secondary appearance-none cursor-pointer accent-primary"
                    />
                    <div 
                      className="absolute -top-8 px-2 py-1 rounded bg-primary text-primary-foreground text-sm font-medium transform -translate-x-1/2"
                      style={{ left: `${inputValue}%` }}
                    >
                      {inputValue}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Slide to adjust the input value
                  </p>
                </div>

                {/* Process */}
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-24 h-24 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
                    isRunning 
                      ? 'border-primary bg-primary/10 shadow-glow animate-pulse' 
                      : 'border-border bg-secondary/50'
                  }`}>
                    <Zap className={`w-10 h-10 transition-colors ${isRunning ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    ML Model
                    <br />
                    <span className="font-mono text-xs">y = 2x + 10</span>
                  </p>
                </div>

                {/* Output */}
                <div className="space-y-4 text-center">
                  <label className="text-sm font-medium text-foreground">
                    Prediction (y)
                  </label>
                  <div className={`h-24 rounded-xl border-2 flex items-center justify-center transition-all ${
                    prediction !== null 
                      ? 'border-success bg-success/10' 
                      : 'border-border bg-secondary/50'
                  }`}>
                    {prediction !== null ? (
                      <span className="text-4xl font-bold text-success">{prediction}</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Model output with small random noise
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mt-10">
                <Button variant="hero" onClick={runModel} disabled={isRunning}>
                  <Play className="w-4 h-4 mr-2" />
                  {isRunning ? "Processing..." : "Run Model"}
                </Button>
                <Button variant="outline" onClick={reset}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              {/* Explanation */}
              <div className="mt-10 p-4 rounded-xl bg-secondary/30 border border-border/50">
                <h4 className="font-medium text-foreground mb-2">What's happening?</h4>
                <ol className="text-sm text-muted-foreground space-y-1">
                  <li>1. You provide an input value (like data in the real world)</li>
                  <li>2. The model applies its learned formula (y = 2x + 10)</li>
                  <li>3. Small random noise simulates real-world imperfections</li>
                  <li>4. The prediction is returned</li>
                </ol>
                <p className="text-sm text-muted-foreground mt-3">
                  Real ML models learn this formula automatically from data, rather than being told what it is!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
