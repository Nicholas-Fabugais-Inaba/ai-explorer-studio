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

  // REMOVED: Python syntax checking for control statements
  // The simple regex-based approach was causing false positives for:
  // - Keywords inside comments (e.g., "# Check for missing values")
  // - Keywords inside strings (e.g., 'prompt = """...with context..."""')
  // - Keywords that are part of longer words
  // A proper syntax check would require a full Python parser, which is
  // beyond the scope of this simulated environment.

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

  // Generate a hash of the code to detect changes
  const codeHash = code.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);

  // Extract numeric values from the code for dynamic output
  const numbers = code.match(/\d+\.?\d*/g) || [];
  const hasNumbers = numbers.length > 0;
  
  // Check for data arrays - detect if X or Y data exists (handles both nested [[1],[2]] and flat [1,2] formats)
  const xMatch = code.match(/[xX]\s*=\s*\[\s*([^\]]*(?:\[[^\]]*\][^\]]*)*)\s*\]/);
  const yMatch = code.match(/[yY]\s*=\s*\[\s*([^\]]*)\s*\]/);
  const hasXData = xMatch && xMatch[1].trim().length > 0 && xMatch[1].trim() !== '';
  const hasYData = yMatch && yMatch[1].trim().length > 0 && yMatch[1].trim() !== '';

  // Build contextual output based on what's in the code
  const lines = code.split('\n').filter(line => line.trim() && !line.trim().startsWith('#') && !line.trim().startsWith('//'));
  let output = "";

  // LinearRegression specific handling
  if (code.includes("LinearRegression")) {
    if (!hasXData && !hasYData) {
      return {
        output: `ValueError: Empty dataset provided.\n  X and Y arrays contain no data points.\n  Please provide training data.`,
        isError: true
      };
    }
    
    if (!hasXData) {
      return {
        output: `ValueError: X array is empty or undefined.\n  Cannot fit model without input features.`,
        isError: true
      };
    }
    
    if (!hasYData) {
      return {
        output: `ValueError: Y array is empty or undefined.\n  Cannot fit model without target values.`,
        isError: true
      };
    }

    // Calculate dynamic coefficients based on actual data
    // Handle both nested [[1],[2],[3]] and flat [1,2,3] formats
    let xValues: number[] = [];
    if (xMatch) {
      const xContent = xMatch[1];
      // Check if it's nested array format [[1],[2],[3]]
      const nestedMatch = xContent.match(/\[(\d+\.?\d*)\]/g);
      if (nestedMatch) {
        xValues = nestedMatch.map(m => parseFloat(m.replace(/[\[\]]/g, ''))).filter(n => !isNaN(n));
      } else {
        // Flat format [1,2,3]
        xValues = xContent.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      }
    }
    const yValues = yMatch ? yMatch[1].split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)) : [];
    
    if (xValues.length !== yValues.length) {
      return {
        output: `ValueError: X and Y have different lengths.\n  X has ${xValues.length} samples, Y has ${yValues.length} samples.`,
        isError: true
      };
    }

    if (xValues.length < 2) {
      return {
        output: `ValueError: Insufficient data.\n  At least 2 data points required, got ${xValues.length}.`,
        isError: true
      };
    }

    // Simple linear regression calculation
    const n = xValues.length;
    const sumX = xValues.reduce((a, b) => a + b, 0);
    const sumY = yValues.reduce((a, b) => a + b, 0);
    const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
    const sumXX = xValues.reduce((sum, x) => sum + x * x, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    output += `>>> LinearRegression model trained successfully\n`;
    output += `>>> Samples: ${n}\n`;
    output += `>>> Coefficient: [${slope.toFixed(4)}]\n`;
    output += `>>> Intercept: ${intercept.toFixed(4)}\n`;
    
    if (code.includes("predict")) {
      const predictMatch = code.match(/predict\s*\(\s*\[\s*\[?\s*(\d+\.?\d*)/);
      if (predictMatch) {
        const predictValue = parseFloat(predictMatch[1]);
        const prediction = slope * predictValue + intercept;
        output += `>>> Prediction for X=${predictValue}: ${prediction.toFixed(4)}\n`;
      } else {
        output += `>>> Prediction ready (call with input value)\n`;
      }
    }
  }
  
  // DataFrame handling
  if (code.includes("pd.read_csv")) {
    const csvMatch = code.match(/pd\.read_csv\s*\(\s*["']([^"']+)["']\s*\)/);
    const filename = csvMatch ? csvMatch[1] : "data.csv";
    const rowCount = 100 + Math.abs(codeHash % 900);
    output += `>>> Loaded ${filename}\n`;
    output += `>>> DataFrame shape: (${rowCount}, 4)\n`;
    if (code.includes(".head()")) {
      output += `>>> Showing first 5 rows:\n   id  col_a  col_b  col_c\n0   1   0.23   1.45   True\n1   2   0.67   2.31   False\n`;
    }
  }

  // Train/test split
  if (code.includes("train_test_split")) {
    const testSizeMatch = code.match(/test_size\s*=\s*(0?\.\d+)/);
    const testSize = testSizeMatch ? parseFloat(testSizeMatch[1]) : 0.2;
    const totalSamples = 1000;
    const testSamples = Math.round(totalSamples * testSize);
    const trainSamples = totalSamples - testSamples;
    output += `>>> Data split complete\n`;
    output += `>>> Training samples: ${trainSamples}\n`;
    output += `>>> Testing samples: ${testSamples}\n`;
  }

  // RandomForest handling
  if (code.includes("RandomForestClassifier") || code.includes("RandomForestRegressor")) {
    const nEstMatch = code.match(/n_estimators\s*=\s*(\d+)/);
    const nEstimators = nEstMatch ? parseInt(nEstMatch[1]) : 100;
    output += `>>> RandomForest model initialized\n`;
    if (code.includes(".fit(")) {
      output += `>>> Model training complete (${nEstimators} trees)\n`;
    }
  }

  // Accuracy metrics
  if (code.includes("accuracy_score") || code.includes("classification_report")) {
    const accuracy = 0.75 + (Math.abs(codeHash % 25) / 100);
    output += `>>> Model Evaluation:\n`;
    output += `>>> Accuracy: ${(accuracy * 100).toFixed(2)}%\n`;
    output += `>>> Precision: ${(accuracy - 0.02).toFixed(2)}\n`;
    output += `>>> Recall: ${(accuracy - 0.04).toFixed(2)}\n`;
  }

  // Tokenization
  if (code.includes("tiktoken") || (code.includes("encode") && code.includes("encoding"))) {
    const textMatch = code.match(/encode\s*\(\s*["']([^"']*)["']\s*\)/);
    const text = textMatch ? textMatch[1] : "Hello, how are you today?";
    const tokenCount = Math.max(1, Math.ceil(text.length / 4));
    output += `>>> Tokenization complete\n`;
    output += `>>> Input: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"\n`;
    output += `>>> Token count: ${tokenCount}\n`;
  }

  // OpenAI API
  if (code.includes("openai") && (code.includes("ChatCompletion") || code.includes("chat.completions"))) {
    const modelMatch = code.match(/model\s*=\s*["']([^"']+)["']/);
    const model = modelMatch ? modelMatch[1] : "gpt-4";
    output += `>>> OpenAI API request sent\n`;
    output += `>>> Model: ${model}\n`;
    output += `>>> Response received (${150 + Math.abs(codeHash % 200)}ms)\n`;
    output += `>>> Tokens used: ${100 + Math.abs(codeHash % 200)}\n`;
  }

  // CUDA check
  if (code.includes("torch.cuda")) {
    output += `>>> CUDA available: True\n`;
    output += `>>> GPU: NVIDIA RTX 4090\n`;
    output += `>>> Memory: 24GB\n`;
  }

  // FastAPI
  if (code.includes("FastAPI") || code.includes("@app.")) {
    const endpointCount = (code.match(/@app\.(get|post|put|delete)/g) || []).length;
    output += `>>> FastAPI server initialized\n`;
    output += `>>> Endpoints registered: ${Math.max(1, endpointCount)}\n`;
    output += `>>> Docs available at: /docs\n`;
  }

  // Locust
  if (code.includes("locust") || code.includes("HttpUser")) {
    const usersMatch = code.match(/users\s*=\s*(\d+)/i);
    const users = usersMatch ? parseInt(usersMatch[1]) : 100;
    output += `>>> Load test configuration ready\n`;
    output += `>>> Users: ${users}, Spawn rate: 10/s\n`;
  }

  // Handle print statements - extract and display
  const printMatches = [...code.matchAll(/print\s*\(\s*(?:f)?["']([^"']*?)["']\s*\)/g)];
  const consoleLogs = [...code.matchAll(/console\.log\s*\(\s*["'`]([^"'`]*?)["'`]\s*\)/g)];
  
  for (const match of printMatches) {
    let printOutput = match[1];
    // Handle f-string variables
    printOutput = printOutput.replace(/\{([^}]+)\}/g, (_, varName) => {
      if (varName.includes("accuracy")) return (0.75 + Math.abs(codeHash % 25) / 100).toFixed(2);
      if (varName.includes("len")) return String(50 + Math.abs(codeHash % 50));
      if (varName.includes("count")) return String(1 + Math.abs(codeHash % 10));
      return `[${varName}]`;
    });
    output += `>>> ${printOutput}\n`;
  }
  
  for (const match of consoleLogs) {
    output += `> ${match[1]}\n`;
  }

  // If we have output, return it
  if (output.trim()) {
    return {
      output: output.trim(),
      isError: false
    };
  }

  // Default output for code that runs but doesn't match patterns
  if (language === "yaml") {
    return {
      output: `Configuration parsed successfully.\nAll fields validated.\nHash: ${Math.abs(codeHash).toString(16)}`,
      isError: false
    };
  }

  if (language === "typescript" || language === "javascript") {
    return {
      output: `> Script executed successfully\n> ${lines.length} statement(s) processed\n> Execution ID: ${Math.abs(codeHash).toString(16)}`,
      isError: false
    };
  }

  return {
    output: `Code executed successfully.\n${lines.length} statement(s) processed.\nExecution ID: ${Math.abs(codeHash).toString(16)}`,
    isError: false
  };
}
