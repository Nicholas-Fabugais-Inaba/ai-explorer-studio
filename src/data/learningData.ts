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
    duration: "30 min",
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
    duration: "45 min",
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
    duration: "40 min",
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
    duration: "35 min",
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
    duration: "50 min",
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
    duration: "60 min",
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
  visual?: "network" | "data-flow" | "layers";
}

export const fundamentalsConcepts: ConceptCard[] = [
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

# Your data
X = [[1], [2], [3], [4]]  # Features
y = [2, 4, 6, 8]          # What we want to predict

# Create and train model
model = LinearRegression()
model.fit(X, y)

# Make prediction
prediction = model.predict([[5]])
print(prediction)  # Output: [10]`,
    language: "python",
  },
  {
    id: "neural-networks",
    title: "Neural Networks Explained",
    content: "Neural networks are inspired by the human brain. They consist of:\n\n• **Input Layer**: Receives your data\n• **Hidden Layers**: Process and find patterns\n• **Output Layer**: Produces the result\n\nEach connection has a 'weight' that gets adjusted during training. When the network sees many examples, it learns which weights produce the best predictions.",
    visual: "network",
  },
];
