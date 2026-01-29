# AI Academy

An interactive educational platform designed to make artificial intelligence and machine learning accessible to everyone—from complete beginners to those looking to deepen their technical knowledge.

🌐 **Live Demo**: [AI Academy](https://id-preview--fa87f1c1-780e-4580-8454-d7d176024120.lovable.app)

## ✨ Features

### 📚 Comprehensive Learning Modules
- **AI Fundamentals** - Core concepts, history, and types of AI (8 min)
- **Machine Learning Models** - Supervised, unsupervised, and reinforcement learning (10 min)
- **Large Language Models** - Transformer architecture, tokenization, and prompt engineering (12 min)
- **AI Infrastructure** - Deployment, scaling, and MLOps best practices (10 min)
- **Security & Reliability** - Input validation, stress testing, and safety measures (10 min)
- **Real-World Integration** - Production deployment and API integration patterns (15 min)

### 💻 Interactive Code Playground
A mini-IDE experience where you can:
- Edit code examples directly in the browser
- Run code and see simulated output in real-time
- Experiment with Python and TypeScript examples
- Copy your edited code for use in external environments
- Learn from realistic error messages and debugging

### 🤖 AI Tutor Assistant
An intelligent chatbot that:
- Understands all platform content and curriculum
- Explains concepts in depth when asked
- Provides code examples on demand
- Remembers conversation context within sessions
- Recommends external resources for further learning

### 🎨 Modern, Accessible Design
- Dark theme with "Electric Cyan" accent colors
- Smooth animations and transitions
- Responsive design for all devices
- Accessibility-focused interface

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase Edge Functions
- **AI**: Lovable AI Gateway (GPT-4 powered tutor)
- **State Management**: TanStack Query

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Nicholas-Fabugais-Inaba/ai-academy.git

# Navigate to project directory
cd ai-academy

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## 📖 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui base components
│   ├── AIChatbot.tsx   # AI tutor assistant
│   ├── CodePlayground.tsx  # Interactive code editor
│   ├── ConceptViewer.tsx   # Module content viewer
│   └── ...
├── data/
│   └── learningData.ts # Curriculum content
├── pages/
│   └── Index.tsx       # Main application page
└── integrations/
    └── supabase/       # Backend integration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📬 Contact

**Nicholas Fabugais-Inaba**

- LinkedIn: [nicholas-fabugais-inaba](https://www.linkedin.com/in/nicholas-fabugais-inaba/)
- GitHub: [Nicholas-Fabugais-Inaba](https://github.com/Nicholas-Fabugais-Inaba)
- Instagram: [@nicholas.fi](https://www.instagram.com/nicholas.fi)
- Email: nfabugaisinaba@gmail.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using [Lovable](https://lovable.dev)
