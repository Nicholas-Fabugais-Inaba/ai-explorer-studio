import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Copy, Check, Terminal, AlertCircle, RotateCcw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface CodePlaygroundProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  code: string;
  language: string;
}

export const CodePlayground = ({ open, onOpenChange, code, language }: CodePlaygroundProps) => {
  const [editedCode, setEditedCode] = useState(code);
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset code when modal opens with new code
  useEffect(() => {
    if (open) {
      setEditedCode(code);
      setOutput(null);
      setHasError(false);
    }
  }, [open, code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setEditedCode(code);
    setOutput(null);
    setHasError(false);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);
    setHasError(false);

    // Simulate code execution with realistic output
    setTimeout(() => {
      const result = getSimulatedOutput(editedCode, language);
      setOutput(result.output);
      setHasError(result.isError);
      setIsRunning(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-background border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              <DialogTitle>Code Playground</DialogTitle>
              <Badge variant="secondary">{language}</Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 overflow-auto">
          {/* Code editor area */}
          <div className="rounded-xl overflow-hidden border border-border/50">
            <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-border/50">
              <span className="text-sm font-medium text-foreground">Code Editor</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleReset} title="Reset to original">
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reset
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 mr-1 text-success" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
                <Button variant="hero" size="sm" onClick={handleRun} disabled={isRunning}>
                  <Play className="w-3 h-3 mr-1" />
                  {isRunning ? "Running..." : "Run Code"}
                </Button>
              </div>
            </div>
            <Textarea
              value={editedCode}
              onChange={(e) => setEditedCode(e.target.value)}
              className="min-h-[280px] font-mono text-sm bg-background/80 border-0 rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Write your code here..."
              spellCheck={false}
            />
          </div>

          {/* Output area */}
          <div className="rounded-xl overflow-hidden border border-border/50">
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border/50">
              <Terminal className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Output</span>
              {hasError && <Badge variant="destructive" className="text-xs">Error</Badge>}
            </div>
            <div className="p-4 bg-background/50 min-h-[120px] max-h-[200px] overflow-auto">
              {isRunning ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Executing code...</span>
                </div>
              ) : output ? (
                <pre className={`text-sm font-mono whitespace-pre-wrap ${hasError ? 'text-destructive' : 'text-success'}`}>
                  {output}
                </pre>
              ) : (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Click "Run Code" to see the output
                </p>
              )}
            </div>
          </div>

          {/* Info note */}
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
            <p className="text-xs text-muted-foreground">
              <strong className="text-accent">Note:</strong> This is a simulated environment. 
              Edit the code above and click "Run" to see results. For production code, 
              use Google Colab, Replit, or your local development environment.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface SimulatedResult {
  output: string;
  isError: boolean;
}

function getSimulatedOutput(code: string, language: string): SimulatedResult {
  const trimmedCode = code.trim();
  
  // Check if code is empty
  if (!trimmedCode) {
    return {
      output: `Error: No code to execute.\nPlease write some code and try again.`,
      isError: true
    };
  }

  // Check for common syntax errors
  const hasUnclosedParens = (code.match(/\(/g) || []).length !== (code.match(/\)/g) || []).length;
  const hasUnclosedBrackets = (code.match(/\[/g) || []).length !== (code.match(/\]/g) || []).length;
  const hasUnclosedBraces = (code.match(/\{/g) || []).length !== (code.match(/\}/g) || []).length;
  
  if (hasUnclosedParens) {
    return {
      output: `SyntaxError: unmatched parentheses\n  File "<stdin>", line 1\n    Check your opening and closing parentheses ()`,
      isError: true
    };
  }
  
  if (hasUnclosedBrackets) {
    return {
      output: `SyntaxError: unmatched brackets\n  File "<stdin>", line 1\n    Check your opening and closing brackets []`,
      isError: true
    };
  }
  
  if (hasUnclosedBraces) {
    return {
      output: `SyntaxError: unmatched braces\n  File "<stdin>", line 1\n    Check your opening and closing braces {}`,
      isError: true
    };
  }

  // Check for incomplete statements (missing colons in Python)
  if (language === "python") {
    const controlStatements = code.match(/\b(if|elif|else|for|while|def|class|try|except|finally|with)\b[^:]*$/gm);
    if (controlStatements) {
      return {
        output: `SyntaxError: expected ':'\n  Missing colon after control statement\n  ${controlStatements[0]}`,
        isError: true
      };
    }
  }

  // Check for undefined variables (simple heuristic)
  if (code.includes("undefined_var") || code.includes("unknownVariable")) {
    return {
      output: `NameError: name 'undefined_var' is not defined`,
      isError: true
    };
  }

  // Check for division by zero patterns
  if (code.includes("/ 0") || code.includes("/0")) {
    return {
      output: `ZeroDivisionError: division by zero`,
      isError: true
    };
  }

  // Check for common typos and errors
  if (code.includes("pritn") || code.includes("pirnt")) {
    return {
      output: `NameError: name 'pritn' is not defined. Did you mean: 'print'?`,
      isError: true
    };
  }

  if (code.includes("imprt") || code.includes("imoprt")) {
    return {
      output: `SyntaxError: invalid syntax\n  Did you mean 'import'?`,
      isError: true
    };
  }

  // Check for missing imports
  const usedLibraries = [];
  if (code.includes("pd.") && !code.includes("import pandas")) usedLibraries.push("pandas");
  if (code.includes("np.") && !code.includes("import numpy")) usedLibraries.push("numpy");
  if (code.includes("plt.") && !code.includes("import matplotlib")) usedLibraries.push("matplotlib");
  if (code.includes("sklearn") && !code.includes("from sklearn") && !code.includes("import sklearn")) usedLibraries.push("sklearn");
  
  if (usedLibraries.length > 0 && !code.includes("# imports assumed")) {
    // Only warn, don't error - many snippets assume imports
  }

  // Generate output based on actual code content
  const lines = code.split('\n').filter(line => line.trim() && !line.trim().startsWith('#') && !line.trim().startsWith('//'));
  let output = "";

  // Simulate print statements
  const printMatches = code.matchAll(/print\s*\(\s*(?:f)?["']([^"']*?)["']\s*\)/g);
  const prints: string[] = [];
  for (const match of printMatches) {
    prints.push(match[1].replace(/\{[^}]+\}/g, (m) => {
      // Simulate f-string variable replacement
      if (m.includes("accuracy")) return "0.875";
      if (m.includes("len")) return "100";
      if (m.includes("count")) return "7";
      if (m.includes("name")) return "Model";
      return "[value]";
    }));
  }

  // Simulate console.log for JS/TS
  const consoleMatches = code.matchAll(/console\.log\s*\(\s*["'`]([^"'`]*?)["'`]\s*\)/g);
  for (const match of consoleMatches) {
    prints.push(match[1]);
  }

  // Build contextual output based on what's in the code
  if (code.includes("LinearRegression") && code.includes("fit")) {
    output += `>>> LinearRegression model trained successfully\n`;
    output += `>>> Model coefficients: [2.0]\n`;
    output += `>>> Model intercept: 10.0\n`;
    if (code.includes("predict")) {
      output += `>>> Prediction output: [10.0]\n`;
    }
  }
  
  if (code.includes("pd.read_csv")) {
    const csvMatch = code.match(/pd\.read_csv\s*\(\s*["']([^"']+)["']\s*\)/);
    const filename = csvMatch ? csvMatch[1] : "data.csv";
    output += `>>> Loaded ${filename}\n`;
    output += `>>> DataFrame shape: (1000, 4)\n`;
    if (code.includes(".head()")) {
      output += `>>> Showing first 5 rows:\n   id  col_a  col_b  col_c\n0   1   0.23   1.45   True\n1   2   0.67   2.31   False\n`;
    }
  }

  if (code.includes("train_test_split")) {
    output += `>>> Data split complete\n`;
    output += `>>> Training samples: 800\n`;
    output += `>>> Testing samples: 200\n`;
  }

  if (code.includes("RandomForestClassifier") || code.includes("RandomForestRegressor")) {
    output += `>>> RandomForest model initialized\n`;
    if (code.includes(".fit(")) {
      output += `>>> Model training complete (100 trees)\n`;
    }
  }

  if (code.includes("accuracy_score") || code.includes("classification_report")) {
    output += `>>> Model Evaluation:\n`;
    output += `>>> Accuracy: 87.50%\n`;
    output += `>>> Precision: 0.88\n`;
    output += `>>> Recall: 0.86\n`;
  }

  if (code.includes("tiktoken") || code.includes("encode")) {
    output += `>>> Tokenization complete\n`;
    output += `>>> Token count: 7\n`;
    output += `>>> Tokens: [9906, 11, 1268, 527, 499, 3432, 30]\n`;
  }

  if (code.includes("openai") && (code.includes("ChatCompletion") || code.includes("chat.completions"))) {
    output += `>>> OpenAI API request sent\n`;
    output += `>>> Response received (245ms)\n`;
    output += `>>> Tokens used: 156\n`;
  }

  if (code.includes("torch.cuda")) {
    output += `>>> CUDA available: True\n`;
    output += `>>> GPU: NVIDIA RTX 4090\n`;
    output += `>>> Memory: 24GB\n`;
  }

  if (code.includes("FastAPI") || code.includes("@app.")) {
    output += `>>> FastAPI server initialized\n`;
    output += `>>> Endpoints registered\n`;
    output += `>>> Docs available at: /docs\n`;
  }

  if (code.includes("locust") || code.includes("HttpUser")) {
    output += `>>> Load test configuration ready\n`;
    output += `>>> Users: 100, Spawn rate: 10/s\n`;
  }

  // Add any print statements found
  if (prints.length > 0) {
    output += prints.map(p => `>>> ${p}`).join('\n') + '\n';
  }

  // If we have specific output, return it
  if (output.trim()) {
    return {
      output: output.trim(),
      isError: false
    };
  }

  // Default output for code that runs but doesn't match patterns
  if (language === "yaml") {
    return {
      output: `Configuration parsed successfully.\nAll fields validated.`,
      isError: false
    };
  }

  if (language === "typescript" || language === "javascript") {
    return {
      output: `> Script executed successfully\n> No errors encountered`,
      isError: false
    };
  }

  return {
    output: `Code executed successfully.\n${lines.length} statement(s) processed.\nNo output to display.`,
    isError: false
  };
}
