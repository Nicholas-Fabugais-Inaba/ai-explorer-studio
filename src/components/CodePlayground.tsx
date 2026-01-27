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

  // Generate realistic output based on code patterns
  if (code.includes("LinearRegression")) {
    return {
      output: `>>> model = LinearRegression()
>>> model.fit(X, y)
LinearRegression()
>>> prediction = model.predict([[5]])
>>> print(prediction)
[10.0]`,
      isError: false
    };
  }
  
  if (code.includes("pd.read_csv")) {
    return {
      output: `>>> data = pd.read_csv('customer_data.csv')
>>> print(data.head())
   id  name          email       signup_date
0   1  John  john@email.com      2024-01-15
1   2  Jane  jane@email.com      2024-01-16
2   3  Bob   bob@email.com       2024-01-17

>>> print(data.info())
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 1000 entries, 0 to 999
Data columns (total 4 columns)`,
      isError: false
    };
  }

  if (code.includes("train_test_split")) {
    return {
      output: `>>> X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2)
>>> print(f"Training samples: {len(X_train)}")
Training samples: 800
>>> print(f"Testing samples: {len(X_test)}")
Testing samples: 200`,
      isError: false
    };
  }

  if (code.includes("RandomForestClassifier")) {
    return {
      output: `>>> rf_model = RandomForestClassifier(n_estimators=100)
>>> rf_model.fit(X_train, y_train)
RandomForestClassifier(n_estimators=100)
>>> print("Model training complete!")
Model training complete!`,
      isError: false
    };
  }

  if (code.includes("accuracy_score")) {
    return {
      output: `>>> predictions = model.predict(X_test)
>>> accuracy = accuracy_score(y_test, predictions)
>>> print(f"Accuracy: {accuracy:.2%}")
Accuracy: 87.50%

>>> print(classification_report(y_test, predictions))
              precision    recall  f1-score   support
     Class 0       0.85      0.90      0.87       100
     Class 1       0.88      0.82      0.85       100
    accuracy                           0.88       200`,
      isError: false
    };
  }

  if (code.includes("tiktoken")) {
    return {
      output: `>>> text = "Hello, how are you today?"
>>> tokens = enc.encode(text)
>>> print(f"Text: {text}")
Text: Hello, how are you today?
>>> print(f"Tokens: {tokens}")
Tokens: [9906, 11, 1268, 527, 499, 3432, 30]
>>> print(f"Token count: {len(tokens)}")
Token count: 7`,
      isError: false
    };
  }

  if (code.includes("openai.ChatCompletion") || code.includes("openai.api_key")) {
    return {
      output: `>>> response = openai.ChatCompletion.create(...)
>>> print(response.choices[0].message.content)
"An API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate with each other."`,
      isError: false
    };
  }

  if (code.includes("torch.cuda")) {
    return {
      output: `>>> print(f"CUDA available: {torch.cuda.is_available()}")
CUDA available: True
>>> print(f"GPU count: {torch.cuda.device_count()}")
GPU count: 1
>>> print(f"GPU name: {torch.cuda.get_device_name(0)}")
GPU name: NVIDIA RTX 4090`,
      isError: false
    };
  }

  if (code.includes("locust")) {
    return {
      output: `[2024-01-20 10:30:00] Starting Locust...
[2024-01-20 10:30:01] Spawning 100 users at 10 users/second
[2024-01-20 10:30:11] All users spawned
[2024-01-20 10:31:00] Statistics:
  Requests: 2,847
  Failures: 12 (0.42%)
  Median response time: 245ms
  95th percentile: 890ms`,
      isError: false
    };
  }

  if (code.includes("FastAPI")) {
    return {
      output: `INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000

OpenAPI docs available at: http://localhost:8000/docs`,
      isError: false
    };
  }

  if (language === "yaml") {
    return {
      output: `horizontalpodautoscaler.autoscaling/ai-model-hpa created
Deployment ai-model-deployment configured for autoscaling
  Min replicas: 2
  Max replicas: 10
  Target CPU utilization: 70%`,
      isError: false
    };
  }

  if (language === "typescript" || language === "javascript") {
    return {
      output: `> AIClient initialized successfully
> API Key: sk-...xxxx (hidden)
> Base URL: https://api.example.com/v1
> Ready to make predictions`,
      isError: false
    };
  }

  if (code.includes("print")) {
    return {
      output: `Code executed successfully.\n>>> Output displayed above`,
      isError: false
    };
  }

  return {
    output: `Code executed successfully.
Output varies based on your environment and data.`,
    isError: false
  };
}
