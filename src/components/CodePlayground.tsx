import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Copy, Check, Terminal, AlertCircle } from "lucide-react";

interface CodePlaygroundProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  code: string;
  language: string;
}

export const CodePlayground = ({ open, onOpenChange, code, language }: CodePlaygroundProps) => {
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);

    // Simulate code execution with realistic output
    setTimeout(() => {
      const outputs = getSimulatedOutput(code, language);
      setOutput(outputs);
      setIsRunning(false);
    }, 1500);
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
              <span className="text-sm font-medium text-foreground">Code</span>
              <div className="flex items-center gap-2">
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
            <pre className="p-4 bg-background/80 overflow-x-auto max-h-[300px]">
              <code className="text-sm font-mono text-muted-foreground whitespace-pre">
                {code}
              </code>
            </pre>
          </div>

          {/* Output area */}
          <div className="rounded-xl overflow-hidden border border-border/50">
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border/50">
              <Terminal className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Output</span>
            </div>
            <div className="p-4 bg-background/50 min-h-[120px] max-h-[200px] overflow-auto">
              {isRunning ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Executing code...</span>
                </div>
              ) : output ? (
                <pre className="text-sm font-mono text-success whitespace-pre-wrap">{output}</pre>
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
              For real execution, copy the code and run it in your local Python/JavaScript environment 
              or use an online IDE like Google Colab, Replit, or CodeSandbox.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

function getSimulatedOutput(code: string, language: string): string {
  // Generate realistic output based on code patterns
  if (code.includes("LinearRegression")) {
    return `>>> model = LinearRegression()
>>> model.fit(X, y)
LinearRegression()
>>> prediction = model.predict([[5]])
>>> print(prediction)
[10.0]`;
  }
  
  if (code.includes("pd.read_csv")) {
    return `>>> data = pd.read_csv('customer_data.csv')
>>> print(data.head())
   id  name          email       signup_date
0   1  John  john@email.com      2024-01-15
1   2  Jane  jane@email.com      2024-01-16
2   3  Bob   bob@email.com       2024-01-17

>>> print(data.info())
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 1000 entries, 0 to 999
Data columns (total 4 columns)`;
  }

  if (code.includes("train_test_split")) {
    return `>>> X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2)
>>> print(f"Training samples: {len(X_train)}")
Training samples: 800
>>> print(f"Testing samples: {len(X_test)}")
Testing samples: 200`;
  }

  if (code.includes("RandomForestClassifier")) {
    return `>>> rf_model = RandomForestClassifier(n_estimators=100)
>>> rf_model.fit(X_train, y_train)
RandomForestClassifier(n_estimators=100)
>>> print("Model training complete!")
Model training complete!`;
  }

  if (code.includes("accuracy_score")) {
    return `>>> predictions = model.predict(X_test)
>>> accuracy = accuracy_score(y_test, predictions)
>>> print(f"Accuracy: {accuracy:.2%}")
Accuracy: 87.50%

>>> print(classification_report(y_test, predictions))
              precision    recall  f1-score   support
     Class 0       0.85      0.90      0.87       100
     Class 1       0.88      0.82      0.85       100
    accuracy                           0.88       200`;
  }

  if (code.includes("tiktoken")) {
    return `>>> text = "Hello, how are you today?"
>>> tokens = enc.encode(text)
>>> print(f"Text: {text}")
Text: Hello, how are you today?
>>> print(f"Tokens: {tokens}")
Tokens: [9906, 11, 1268, 527, 499, 3432, 30]
>>> print(f"Token count: {len(tokens)}")
Token count: 7`;
  }

  if (code.includes("openai.ChatCompletion")) {
    return `>>> response = openai.ChatCompletion.create(...)
>>> print(response.choices[0].message.content)
"An API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate with each other."`;
  }

  if (code.includes("torch.cuda")) {
    return `>>> print(f"CUDA available: {torch.cuda.is_available()}")
CUDA available: True
>>> print(f"GPU count: {torch.cuda.device_count()}")
GPU count: 1
>>> print(f"GPU name: {torch.cuda.get_device_name(0)}")
GPU name: NVIDIA RTX 4090`;
  }

  if (code.includes("locust")) {
    return `[2024-01-20 10:30:00] Starting Locust...
[2024-01-20 10:30:01] Spawning 100 users at 10 users/second
[2024-01-20 10:30:11] All users spawned
[2024-01-20 10:31:00] Statistics:
  Requests: 2,847
  Failures: 12 (0.42%)
  Median response time: 245ms
  95th percentile: 890ms`;
  }

  if (code.includes("FastAPI")) {
    return `INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000

OpenAPI docs available at: http://localhost:8000/docs`;
  }

  if (language === "yaml") {
    return `horizontalpodautoscaler.autoscaling/ai-model-hpa created
Deployment ai-model-deployment configured for autoscaling
  Min replicas: 2
  Max replicas: 10
  Target CPU utilization: 70%`;
  }

  if (language === "typescript" || language === "javascript") {
    return `> AIClient initialized successfully
> API Key: sk-...xxxx (hidden)
> Base URL: https://api.example.com/v1
> Ready to make predictions`;
  }

  return `Code executed successfully.
Output varies based on your environment and data.`;
}
