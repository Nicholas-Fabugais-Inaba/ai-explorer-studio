import { Brain, Zap, Shield, Code2, Database, Cloud } from "lucide-react";

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  color: string;
  progress?: number;
}

export const learningModules: LearningModule[] = [
  {
    id: "fundamentals",
    title: "AI Fundamentals",
    description: "Understand what AI really is, how machines learn, and the core concepts behind intelligent systems.",
    icon: Brain,
    duration: "8 min",
    difficulty: "Beginner",
    topics: ["What is AI?", "Types of AI", "Machine Learning Basics", "Neural Networks Intro"],
    color: "primary",
    progress: 0,
  },
  {
    id: "ml-models",
    title: "Building ML Models",
    description: "Learn the step-by-step process of creating machine learning models from data to deployment.",
    icon: Zap,
    duration: "12 min",
    difficulty: "Beginner",
    topics: ["Data Collection", "Data Preprocessing", "Model Training", "Model Evaluation"],
    color: "accent",
    progress: 0,
  },
  {
    id: "llm-basics",
    title: "Understanding LLMs",
    description: "Explore how Large Language Models work and how to integrate them into your applications.",
    icon: Code2,
    duration: "10 min",
    difficulty: "Intermediate",
    topics: ["Tokenization", "Transformers", "Prompting", "API Integration"],
    color: "success",
    progress: 0,
  },
  {
    id: "infrastructure",
    title: "AI Infrastructure",
    description: "Learn about the infrastructure needed to run AI systems reliably at scale.",
    icon: Database,
    duration: "10 min",
    difficulty: "Intermediate",
    topics: ["Compute Requirements", "GPU vs CPU", "Cloud Services", "Scaling Strategies"],
    color: "primary",
    progress: 0,
  },
  {
    id: "security",
    title: "AI Security & Testing",
    description: "Master stress testing, security considerations, and building robust AI systems.",
    icon: Shield,
    duration: "12 min",
    difficulty: "Advanced",
    topics: ["Security Threats", "Stress Testing", "Input Validation", "Monitoring"],
    color: "accent",
    progress: 0,
  },
  {
    id: "integration",
    title: "Real-World Integration",
    description: "Put it all together and learn to integrate AI into existing systems and workflows.",
    icon: Cloud,
    duration: "15 min",
    difficulty: "Advanced",
    topics: ["API Design", "Wrappers & SDKs", "Best Practices", "Case Studies"],
    color: "success",
    progress: 0,
  },
];

export interface ConceptCard {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
  language?: string;
  visual?: "network" | "data-flow" | "layers" | "pipeline" | "transformer" | "infrastructure" | "security" | "integration";
}

export const moduleConceptsMap: Record<string, ConceptCard[]> = {
  fundamentals: [
    {
      id: "what-is-ai",
      title: "What is AI?",
      content: "Artificial Intelligence is the simulation of human intelligence by machines. At its core, AI systems learn patterns from data and use those patterns to make predictions or decisions. Think of it like teaching a child to recognize cats - you show them many pictures, and eventually they can identify cats they've never seen before.",
    },
    {
      id: "types-of-ai",
      title: "Types of AI",
      content: "AI comes in different forms:\n\n• **Machine Learning (ML)**: Systems that learn from data without explicit programming\n• **Deep Learning**: Neural networks with many layers, great for images and text\n• **Large Language Models (LLMs)**: Specialized deep learning for understanding and generating text\n• **Computer Vision**: AI that understands images and videos\n• **Reinforcement Learning**: AI that learns by trial and error",
    },
    {
      id: "how-ml-works",
      title: "How Machine Learning Works",
      content: "Machine learning follows a simple cycle:\n\n1. **Collect Data** - Gather examples of what you want to predict\n2. **Prepare Data** - Clean and format your data\n3. **Choose a Model** - Select an algorithm suited to your problem\n4. **Train** - Feed data to the model so it learns patterns\n5. **Evaluate** - Test the model on new data\n6. **Deploy** - Use the model in your application",
      codeExample: `# Simple ML in Python
from sklearn.linear_model import LinearRegression

# Your data (simple format)
X = [1, 2, 3, 4]  # Features (input values)
y = [2, 4, 6, 8]  # Target (what we predict)

# Create and train model
model = LinearRegression()
model.fit(X, y)

# Make prediction
prediction = model.predict([[5]])
print(f"Prediction for X=5: {prediction[0]}")`,
      language: "python",
    },
    {
      id: "neural-networks",
      title: "Neural Networks Explained",
      content: "Neural networks are inspired by the human brain. They consist of:\n\n• **Input Layer**: Receives your data\n• **Hidden Layers**: Process and find patterns\n• **Output Layer**: Produces the result\n\nEach connection has a 'weight' that gets adjusted during training. When the network sees many examples, it learns which weights produce the best predictions.",
      visual: "network",
    },
  ],
  "ml-models": [
    {
      id: "data-collection",
      title: "Step 1: Data Collection",
      content: "Every ML project starts with data. The quality of your model depends entirely on the quality of your data.\n\n• **Structured Data**: Tables, spreadsheets, databases (customer records, sales data)\n• **Unstructured Data**: Images, text, audio, video\n• **Labeled Data**: Data with known answers for supervised learning\n• **Unlabeled Data**: Raw data without labels for unsupervised learning\n\nThe golden rule: garbage in, garbage out. Spend 80% of your time on data quality.",
      codeExample: `import pandas as pd

# Load structured data
data = pd.read_csv('customer_data.csv')

# Quick data inspection
print(data.head())         # First 5 rows
print(data.info())         # Column types & missing values
print(data.describe())     # Statistical summary

# Check for missing values
print(data.isnull().sum())`,
      language: "python",
    },
    {
      id: "data-preprocessing",
      title: "Step 2: Data Preprocessing",
      content: "Raw data is messy. Preprocessing transforms it into a format your model can understand:\n\n1. **Handle Missing Values**: Fill with averages, or remove rows\n2. **Normalize/Scale**: Bring all features to similar ranges (0-1 or -1 to 1)\n3. **Encode Categories**: Convert text labels to numbers\n4. **Feature Engineering**: Create new features from existing ones\n5. **Split Data**: Divide into training (80%) and testing (20%) sets",
      codeExample: `from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split

# Handle missing values
data.fillna(data.mean(), inplace=True)

# Encode categorical variables
le = LabelEncoder()
data['category'] = le.fit_transform(data['category'])

# Scale numerical features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split into train/test
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)`,
      language: "python",
    },
    {
      id: "model-training",
      title: "Step 3: Model Training",
      content: "Training is where the magic happens. The model learns patterns from your data:\n\n• **Forward Pass**: Data flows through the model, producing predictions\n• **Loss Calculation**: Measure how wrong the predictions are\n• **Backpropagation**: Calculate how to adjust weights to reduce error\n• **Optimization**: Update weights using gradient descent\n• **Iteration**: Repeat thousands or millions of times (epochs)",
      codeExample: `from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression

# Option 1: Random Forest
rf_model = RandomForestClassifier(n_estimators=100)
rf_model.fit(X_train, y_train)

# Option 2: Logistic Regression
lr_model = LogisticRegression()
lr_model.fit(X_train, y_train)

# Training complete! Models have learned patterns.`,
      language: "python",
      visual: "pipeline",
    },
    {
      id: "model-evaluation",
      title: "Step 4: Model Evaluation",
      content: "Never trust a model until you test it on unseen data:\n\n• **Accuracy**: % of correct predictions (can be misleading!)\n• **Precision**: Of all positive predictions, how many were correct?\n• **Recall**: Of all actual positives, how many did we find?\n• **F1 Score**: Balance between precision and recall\n• **Confusion Matrix**: Visual breakdown of predictions vs reality",
      codeExample: `from sklearn.metrics import accuracy_score, classification_report

# Make predictions on test data
predictions = model.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, predictions)
print(f"Accuracy: {accuracy:.2%}")

# Detailed report
print(classification_report(y_test, predictions))

# Output example:
#               precision    recall  f1-score
# Class 0          0.85      0.90      0.87
# Class 1          0.88      0.82      0.85`,
      language: "python",
    },
  ],
  "llm-basics": [
    {
      id: "tokenization",
      title: "Tokenization: Breaking Down Text",
      content: "LLMs don't read words like humans. They process 'tokens' - pieces of text:\n\n• **Word tokens**: 'Hello' → [Hello]\n• **Subword tokens**: 'unhappiness' → [un, happi, ness]\n• **Character tokens**: 'AI' → [A, I]\n\nMost modern LLMs use subword tokenization (BPE or SentencePiece). This balances vocabulary size with the ability to handle any text, including new words.",
      codeExample: `# Using tiktoken (OpenAI's tokenizer)
import tiktoken

enc = tiktoken.get_encoding("cl100k_base")

text = "Hello, how are you today?"
tokens = enc.encode(text)

print(f"Text: {text}")
print(f"Tokens: {tokens}")
print(f"Token count: {len(tokens)}")
# Tokens: [9906, 11, 1268, 527, 499, 3432, 30]

# Decode back
decoded = enc.decode(tokens)
print(f"Decoded: {decoded}")`,
      language: "python",
    },
    {
      id: "transformers",
      title: "The Transformer Architecture",
      content: "Transformers revolutionized AI in 2017. The key innovation: **Attention**\n\n• **Self-Attention**: Each word can 'look at' every other word in the sentence\n• **Multi-Head Attention**: Multiple attention patterns in parallel\n• **Positional Encoding**: Gives the model a sense of word order\n• **Feed-Forward Layers**: Process the attended information\n\nThis allows the model to understand context regardless of distance - 'The cat sat on the mat because it was tired' correctly links 'it' to 'cat'.",
      visual: "transformer",
    },
    {
      id: "prompting",
      title: "The Art of Prompting",
      content: "Prompting is how you communicate with LLMs. Better prompts = better results:\n\n1. **Be Specific**: 'Write a formal email' vs 'Write something'\n2. **Provide Context**: Include relevant background information\n3. **Use Examples**: Show the format you want (few-shot prompting)\n4. **Define the Role**: 'You are an expert Python developer...'\n5. **Set Constraints**: 'In 100 words or less...'",
      codeExample: `# Basic prompt
prompt = "What is machine learning?"

# Better prompt with context
prompt = """You are an AI teacher explaining concepts 
to beginners. Explain machine learning in simple terms 
with a real-world analogy. Keep it under 100 words."""

# Few-shot prompting
prompt = """Convert these sentences to formal English:

Casual: gonna grab some coffee
Formal: I am going to get some coffee.

Casual: wanna hang out later?
Formal: Would you like to spend time together later?

Casual: this is kinda cool
Formal:"""`,
      language: "python",
    },
    {
      id: "api-integration",
      title: "Integrating LLM APIs",
      content: "Most applications use LLMs via APIs. Here's what you need to know:\n\n• **API Keys**: Your authentication credentials (keep them secret!)\n• **Endpoints**: URLs where you send requests\n• **Rate Limits**: Max requests per minute/day\n• **Token Limits**: Max input + output tokens per request\n• **Costs**: Usually charged per 1K tokens ($0.001 - $0.06)",
      codeExample: `import openai

# Set your API key (use environment variables!)
openai.api_key = os.getenv("OPENAI_API_KEY")

# Make a completion request
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain APIs in one sentence."}
    ],
    max_tokens=100,
    temperature=0.7
)

print(response.choices[0].message.content)`,
      language: "python",
    },
  ],
  infrastructure: [
    {
      id: "compute-requirements",
      title: "Understanding Compute Needs",
      content: "AI models are hungry for computing power. Understanding your needs prevents over-spending:\n\n• **Training**: Requires massive compute (days/weeks on GPUs)\n• **Inference**: Running trained models is much cheaper\n• **Batch vs Real-time**: Batch processing is more efficient\n• **Model Size**: Larger models need more memory and compute\n\nRule of thumb: Start small, measure, then scale.",
      visual: "infrastructure",
    },
    {
      id: "gpu-vs-cpu",
      title: "GPU vs CPU: When to Use What",
      content: "CPUs and GPUs are built for different tasks:\n\n**CPU (Central Processing Unit)**\n• Great at sequential tasks\n• Handles complex logic well\n• Better for small models, preprocessing\n• Cheaper and more available\n\n**GPU (Graphics Processing Unit)**\n• Massive parallelism (thousands of cores)\n• Optimized for matrix operations\n• Essential for training deep learning\n• More expensive but much faster for AI",
      codeExample: `import torch

# Check if GPU is available
print(f"CUDA available: {torch.cuda.is_available()}")
print(f"GPU count: {torch.cuda.device_count()}")

# Move model to GPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

# Move data to GPU
inputs = inputs.to(device)
labels = labels.to(device)

# Training now happens on GPU (10-100x faster!)
outputs = model(inputs)`,
      language: "python",
    },
    {
      id: "cloud-services",
      title: "Cloud AI Services",
      content: "Major cloud providers offer AI infrastructure:\n\n**AWS**\n• SageMaker: End-to-end ML platform\n• EC2 P4/G5 instances: GPU compute\n• Bedrock: Managed LLM access\n\n**Google Cloud**\n• Vertex AI: Unified ML platform\n• TPUs: Custom AI accelerators\n• Cloud Run: Serverless deployment\n\n**Azure**\n• Azure ML: Complete ML lifecycle\n• OpenAI Service: GPT models\n• Cognitive Services: Pre-built AI",
      codeExample: `# Example: Deploy model on AWS SageMaker
import sagemaker
from sagemaker.pytorch import PyTorchModel

model = PyTorchModel(
    model_data='s3://bucket/model.tar.gz',
    role='arn:aws:iam::xxx:role/SageMakerRole',
    framework_version='2.0',
    py_version='py310'
)

# Deploy to endpoint
predictor = model.deploy(
    instance_type='ml.g4dn.xlarge',  # GPU instance
    initial_instance_count=1
)

# Now accessible via API!`,
      language: "python",
    },
    {
      id: "scaling-strategies",
      title: "Scaling Your AI System",
      content: "As usage grows, you need to scale intelligently:\n\n• **Horizontal Scaling**: Add more servers (load balance requests)\n• **Vertical Scaling**: Use bigger machines (more RAM/GPU)\n• **Auto-scaling**: Automatically adjust to traffic\n• **Model Optimization**: Quantization, pruning, distillation\n• **Caching**: Store frequent responses\n• **Batching**: Group requests for efficiency",
      codeExample: `# Kubernetes deployment with auto-scaling
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ai-model-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ai-model-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70`,
      language: "yaml",
    },
  ],
  security: [
    {
      id: "security-threats",
      title: "AI Security Threats",
      content: "AI systems face unique security challenges:\n\n• **Prompt Injection**: Malicious inputs that override system prompts\n• **Data Poisoning**: Corrupting training data to bias models\n• **Model Extraction**: Stealing model weights through API queries\n• **Adversarial Attacks**: Inputs designed to fool the model\n• **Privacy Leaks**: Models memorizing and revealing training data\n\nSecurity must be built in from day one, not added later.",
      visual: "security",
    },
    {
      id: "stress-testing",
      title: "Stress Testing AI Systems",
      content: "Before production, test your system's limits:\n\n1. **Load Testing**: Can it handle expected traffic?\n2. **Spike Testing**: What happens with sudden traffic bursts?\n3. **Endurance Testing**: Does performance degrade over time?\n4. **Edge Cases**: Unusual inputs, empty inputs, very long inputs\n5. **Failure Scenarios**: What if the model server goes down?",
      codeExample: `# Using locust for load testing
from locust import HttpUser, task, between

class AIModelUser(HttpUser):
    wait_time = between(1, 3)
    
    @task
    def predict(self):
        self.client.post("/api/predict", json={
            "text": "Test input for the model",
            "max_tokens": 100
        })
    
    @task
    def health_check(self):
        self.client.get("/health")

# Run: locust -f locustfile.py --users 100 --spawn-rate 10`,
      language: "python",
    },
    {
      id: "input-validation",
      title: "Input Validation & Sanitization",
      content: "Never trust user input. Always validate:\n\n• **Length Limits**: Prevent token bombing attacks\n• **Character Filtering**: Remove or escape dangerous characters\n• **Rate Limiting**: Prevent abuse and API exhaustion\n• **Content Filtering**: Block harmful or policy-violating content\n• **Schema Validation**: Ensure inputs match expected format",
      codeExample: `from pydantic import BaseModel, validator
from typing import Optional

class PredictionRequest(BaseModel):
    text: str
    max_tokens: int = 100
    temperature: float = 0.7
    
    @validator('text')
    def validate_text(cls, v):
        if len(v) > 10000:
            raise ValueError('Text too long (max 10000 chars)')
        if len(v) < 1:
            raise ValueError('Text cannot be empty')
        # Remove potential injection patterns
        dangerous = ['<|', '|>', 'IGNORE PREVIOUS']
        for d in dangerous:
            v = v.replace(d, '')
        return v
    
    @validator('max_tokens')
    def validate_tokens(cls, v):
        if v < 1 or v > 4000:
            raise ValueError('max_tokens must be 1-4000')
        return v`,
      language: "python",
    },
    {
      id: "monitoring",
      title: "Monitoring & Observability",
      content: "You can't secure what you can't see. Monitor everything:\n\n• **Latency**: Response times (p50, p95, p99)\n• **Error Rates**: Failed requests and their causes\n• **Token Usage**: Track costs and detect abuse\n• **Model Drift**: Is accuracy degrading over time?\n• **Anomaly Detection**: Unusual patterns in requests\n• **Audit Logs**: Who accessed what, when",
      codeExample: `import logging
from prometheus_client import Counter, Histogram
import time

# Metrics
REQUEST_COUNT = Counter('ai_requests_total', 'Total requests', ['status'])
REQUEST_LATENCY = Histogram('ai_request_latency_seconds', 'Request latency')

def predict(request):
    start_time = time.time()
    
    try:
        result = model.predict(request.text)
        REQUEST_COUNT.labels(status='success').inc()
        return result
    except Exception as e:
        REQUEST_COUNT.labels(status='error').inc()
        logging.error(f"Prediction failed: {e}")
        raise
    finally:
        latency = time.time() - start_time
        REQUEST_LATENCY.observe(latency)`,
      language: "python",
    },
  ],
  integration: [
    {
      id: "api-design",
      title: "Designing AI APIs",
      content: "A well-designed API makes your AI accessible and maintainable:\n\n• **RESTful Design**: Standard HTTP methods and status codes\n• **Versioning**: /v1/predict allows future breaking changes\n• **Clear Documentation**: OpenAPI/Swagger specs\n• **Consistent Responses**: Standard error formats\n• **Async Options**: For long-running predictions",
      codeExample: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="AI Prediction API", version="1.0.0")

class PredictRequest(BaseModel):
    text: str
    model: str = "default"

class PredictResponse(BaseModel):
    prediction: str
    confidence: float
    tokens_used: int

@app.post("/v1/predict", response_model=PredictResponse)
async def predict(request: PredictRequest):
    try:
        result = await model.generate(request.text)
        return PredictResponse(
            prediction=result.text,
            confidence=result.confidence,
            tokens_used=result.tokens
        )
    except ModelError as e:
        raise HTTPException(status_code=500, detail=str(e))`,
      language: "python",
    },
    {
      id: "wrappers-sdks",
      title: "Building Wrappers & SDKs",
      content: "Make your AI easy to use with client libraries:\n\n• **Language Support**: Python, JavaScript, Go, etc.\n• **Type Safety**: TypeScript types, Python type hints\n• **Error Handling**: Retry logic, timeout handling\n• **Authentication**: API key management\n• **Convenience Methods**: Common use-case shortcuts",
      codeExample: `// TypeScript SDK Example
class AIClient {
  private apiKey: string;
  private baseUrl: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.example.com/v1';
  }
  
  async predict(text: string, options?: PredictOptions): Promise<Prediction> {
    const response = await fetch(\`\${this.baseUrl}/predict\`, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${this.apiKey}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, ...options })
    });
    
    if (!response.ok) {
      throw new AIError(await response.text());
    }
    
    return response.json();
  }
}`,
      language: "typescript",
    },
    {
      id: "best-practices",
      title: "Integration Best Practices",
      content: "Follow these patterns for robust AI integration:\n\n1. **Graceful Degradation**: Fallback when AI is unavailable\n2. **Caching**: Cache identical requests\n3. **Timeouts**: Don't wait forever for responses\n4. **Circuit Breaker**: Stop calling failing services\n5. **Retry with Backoff**: Exponential delay between retries\n6. **Feature Flags**: Enable/disable AI features easily",
      codeExample: `import { CircuitBreaker } from 'opossum';

// Circuit breaker configuration
const breakerOptions = {
  timeout: 10000,      // 10 second timeout
  errorThresholdPercentage: 50,  // Open if 50% fail
  resetTimeout: 30000  // Try again after 30 seconds
};

const breaker = new CircuitBreaker(aiClient.predict, breakerOptions);

// Fallback when circuit is open
breaker.fallback(() => ({
  prediction: "AI service temporarily unavailable",
  isFallback: true
}));

// Use it
async function getPrediction(text: string) {
  return breaker.fire(text);
}`,
      language: "typescript",
    },
    {
      id: "case-studies",
      title: "Real-World Case Studies",
      content: "Learn from successful AI integrations:\n\n**GitHub Copilot**\n• Integrated directly into IDE\n• Context-aware suggestions\n• Streams responses for speed\n\n**Notion AI**\n• Seamless document integration\n• Multiple AI features (summarize, translate, write)\n• Pay-per-use model\n\n**Stripe Radar**\n• ML for fraud detection\n• Real-time, low-latency\n• Continuous model updates",
      visual: "integration",
    },
  ],
};

// For backwards compatibility
export const fundamentalsConcepts = moduleConceptsMap.fundamentals;
