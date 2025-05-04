
import { MessageCircle, BookOpen, BarChart4, Heart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import FeatureCard from '@/components/home/FeatureCard';
import QuoteDisplay from '@/components/home/QuoteDisplay';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      title: "AI Chat",
      description: "Talk to an empathetic AI companion about your feelings, thoughts, and experiences.",
      icon: <MessageCircle className="h-6 w-6 text-white" />,
      path: "/chat",
      color: "bg-haven-purple"
    },
    {
      title: "Journal",
      description: "Write down your thoughts and emotions to track your mental well-being over time.",
      icon: <BookOpen className="h-6 w-6 text-white" />,
      path: "/journal",
      color: "bg-cyan-500"
    },
    {
      title: "Mood Tracker",
      description: "Log your daily mood and identify patterns to better understand your mental health.",
      icon: <BarChart4 className="h-6 w-6 text-white" />,
      path: "/mood",
      color: "bg-emerald-500"
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-8">
          <Heart className="text-haven-purple h-16 w-16 mx-auto animate-pulse-gentle" />
          <h1 className="text-4xl font-bold">
            Welcome to MindHaven
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered mental health companion. A safe space for emotional support and self-reflection.
          </p>
          <div>
            <Button onClick={() => navigate('/chat')} size="lg" className="rounded-full px-8">
              Start a Conversation
            </Button>
          </div>
        </section>
        
        {/* Quote Section */}
        <section>
          <QuoteDisplay />
        </section>
        
        {/* Features Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">How MindHaven Can Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                path={feature.path}
                color={feature.color}
              />
            ))}
          </div>
        </section>
        
        {/* About Section */}
        <section className="bg-secondary rounded-lg p-6 md:p-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Your Privacy Matters</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            MindHaven is designed with your privacy in mind. Your conversations and journal entries stay private, giving you a safe space to explore your thoughts and feelings without judgment.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
