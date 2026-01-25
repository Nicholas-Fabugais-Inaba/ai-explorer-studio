import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Cloud, Shield, Database, Code2, Zap, Globe, Lock } from "lucide-react";

export const InfrastructureOverview = () => {
  const components = [
    {
      icon: Server,
      title: "Compute Resources",
      description: "GPUs for training, CPUs for inference. Understanding when you need what.",
      items: ["NVIDIA GPUs (A100, H100)", "Cloud TPUs", "CPU clusters for smaller models"],
    },
    {
      icon: Database,
      title: "Data Storage",
      description: "Where your training data and models live. Crucial for scale.",
      items: ["Object storage (S3, GCS)", "Vector databases", "Model registries"],
    },
    {
      icon: Cloud,
      title: "Cloud Platforms",
      description: "Major providers offering AI infrastructure as a service.",
      items: ["AWS SageMaker", "Google Vertex AI", "Azure ML", "Hugging Face"],
    },
    {
      icon: Globe,
      title: "API & Integration",
      description: "How to expose your models to the world safely.",
      items: ["REST APIs", "GraphQL", "Streaming responses", "WebSocket connections"],
    },
    {
      icon: Shield,
      title: "Security",
      description: "Protecting your models, data, and users from threats.",
      items: ["Input validation", "Rate limiting", "Model encryption", "Access control"],
    },
    {
      icon: Lock,
      title: "Monitoring & Testing",
      description: "Keeping your AI systems reliable and performant.",
      items: ["Load testing", "Drift detection", "Logging & observability", "A/B testing"],
    },
  ];

  return (
    <section className="py-24 bg-gradient-hero">
      <div className="container px-6">
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-4">Infrastructure</Badge>
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Building Robust AI Systems
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understanding the infrastructure behind AI helps you build systems that scale reliably 
            and remain secure under stress.
          </p>
        </div>

        {/* Architecture Diagram */}
        <Card variant="elevated" className="mb-12 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">Typical AI System Architecture</span>
            </div>
            <div className="bg-background/50 rounded-xl p-6 overflow-x-auto">
              <div className="min-w-[600px]">
                <svg viewBox="0 0 800 200" className="w-full h-40">
                  {/* User */}
                  <g transform="translate(30, 80)">
                    <rect x="0" y="0" width="80" height="50" rx="8" className="fill-secondary stroke-border" strokeWidth="2" />
                    <text x="40" y="30" textAnchor="middle" className="fill-foreground text-sm font-medium">User</text>
                  </g>

                  {/* Arrow */}
                  <line x1="120" y1="105" x2="180" y2="105" className="stroke-muted-foreground" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* API Gateway */}
                  <g transform="translate(190, 60)">
                    <rect x="0" y="0" width="100" height="90" rx="8" className="fill-primary/20 stroke-primary" strokeWidth="2" />
                    <text x="50" y="30" textAnchor="middle" className="fill-primary text-xs font-medium">API Gateway</text>
                    <text x="50" y="50" textAnchor="middle" className="fill-muted-foreground text-xs">Auth & Rate</text>
                    <text x="50" y="65" textAnchor="middle" className="fill-muted-foreground text-xs">Limiting</text>
                  </g>

                  {/* Arrow */}
                  <line x1="300" y1="105" x2="360" y2="105" className="stroke-muted-foreground" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Model Service */}
                  <g transform="translate(370, 50)">
                    <rect x="0" y="0" width="120" height="110" rx="8" className="fill-accent/20 stroke-accent" strokeWidth="2" />
                    <text x="60" y="25" textAnchor="middle" className="fill-accent text-xs font-medium">Model Service</text>
                    <rect x="15" y="40" width="90" height="25" rx="4" className="fill-background/50 stroke-border" />
                    <text x="60" y="57" textAnchor="middle" className="fill-muted-foreground text-xs">Inference</text>
                    <rect x="15" y="75" width="90" height="25" rx="4" className="fill-background/50 stroke-border" />
                    <text x="60" y="92" textAnchor="middle" className="fill-muted-foreground text-xs">Pre/Post Process</text>
                  </g>

                  {/* Arrow */}
                  <line x1="500" y1="105" x2="560" y2="105" className="stroke-muted-foreground" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Data Layer */}
                  <g transform="translate(570, 60)">
                    <rect x="0" y="0" width="100" height="90" rx="8" className="fill-success/20 stroke-success" strokeWidth="2" />
                    <text x="50" y="25" textAnchor="middle" className="fill-success text-xs font-medium">Data Layer</text>
                    <text x="50" y="50" textAnchor="middle" className="fill-muted-foreground text-xs">Model Storage</text>
                    <text x="50" y="70" textAnchor="middle" className="fill-muted-foreground text-xs">Vector DB</text>
                    <text x="50" y="85" textAnchor="middle" className="fill-muted-foreground text-xs">Cache</text>
                  </g>

                  {/* Monitoring at bottom */}
                  <g transform="translate(190, 170)">
                    <rect x="0" y="0" width="480" height="30" rx="4" className="fill-secondary/50 stroke-border" strokeDasharray="4" />
                    <text x="240" y="20" textAnchor="middle" className="fill-muted-foreground text-xs">Monitoring, Logging & Observability Layer</text>
                  </g>

                  {/* Arrow marker definition */}
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" className="fill-muted-foreground" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Component Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component) => {
            const Icon = component.icon;
            return (
              <Card key={component.title} variant="interactive">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{component.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{component.description}</p>
                  <ul className="space-y-1.5">
                    {component.items.map((item) => (
                      <li key={item} className="text-xs text-muted-foreground flex items-center gap-2">
                        <Zap className="w-3 h-3 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
