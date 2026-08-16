import { Link } from 'react-router-dom';
import { 
  BrainCircuit, 
  Activity, 
  Users, 
  RefreshCw, 
  Box, 
  CheckCircle2, 
  BookOpen, 
  PlayCircle, 
  Trophy, 
  Share2 
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 text-center">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-sm font-medium">
            <BrainCircuit className="w-4 h-4" />
            Master Industrial Prompt Engineering
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
          Learn to Engineer<br />
          <span className="text-primary">AI Prompts Like a Pro</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          An interactive platform to learn foundational and advanced prompt engineering 
          methodologies with real-time AI feedback.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            to="/register" 
            className="px-8 py-3 bg-dark text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            Start Learning Free &rarr;
          </Link>
          <Link 
            to="/playground" 
            className="px-8 py-3 bg-white text-gray-900 border border-gray-200 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Try Playground
          </Link>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="features" className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AI Prompt Hub?</h2>
            <p className="text-gray-600">Everything you need to master prompt engineering.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Activity className="w-6 h-6 text-blue-500" />}
              title="AI-Powered Evaluation"
              description="Get real-time feedback from advanced AI models. Receive scores (0-100), error breakdowns, and optimization suggestions instantly."
              color="bg-blue-100"
            />
            <FeatureCard 
              icon={<Box className="w-6 h-6 text-emerald-500" />}
              title="Hands-On Practice"
              description="Learn through interactive modules covering Zero-Shot, Few-Shot, Role-play, and Chain-of-Thought techniques with practical exercises."
              color="bg-emerald-100"
            />
            <FeatureCard 
              icon={<PlayCircle className="w-6 h-6 text-purple-500" />}
              title="Interactive Playground"
              description="Experiment freely with system prompts, parameters, and variable inputs with instant AI diagnostics and suggestions."
              color="bg-purple-100"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Your journey to prompt engineering mastery.</p>
          </div>

          <div className="space-y-8">
            <Step icon={<CheckCircle2 />} title="Register & Access Dashboard" desc="Create your account and access your personalized learning dashboard to track progress and XP." index={1} />
            <Step icon={<BookOpen />} title="Complete Learning Modules" desc="Work through structured lessons on prompt engineering techniques with examples and exercises." index={2} />
            <Step icon={<PlayCircle />} title="Test in AI Playground" desc="Submit prompts for real-time evaluation. Get scores, feedback, and optimization suggestions from AI." index={3} />
            <Step icon={<RefreshCw />} title="Refine & Master Prompts" desc="Apply AI feedback to iterate, optimize, and master industrial-grade prompt engineering." index={4} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Master Prompt Engineering?</h2>
        <p className="text-gray-600 mb-8">Join thousands of learners improving their AI interaction skills.</p>
        <Link 
          to="/register" 
          className="inline-flex px-8 py-3 bg-dark text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
        >
          Start Learning Now &rarr;
        </Link>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const Step = ({ icon, title, desc, index }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
      {index}
    </div>
    <div>
      <h4 className="text-lg font-bold text-gray-900">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  </div>
);

export default LandingPage;
