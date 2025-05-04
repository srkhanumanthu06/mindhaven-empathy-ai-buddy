
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const quotes = [
  {
    text: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman"
  },
  {
    text: "Self-care is how you take your power back.",
    author: "Lalah Delia"
  },
  {
    text: "Mental health problems don't define who you are. They are something you experience.",
    author: "Mental Health Foundation"
  },
  {
    text: "There is hope, even when your brain tells you there isn't.",
    author: "John Green"
  },
  {
    text: "You are not your illness. You have an individual story to tell. You have a name, a history, a personality.",
    author: "Julian Seifter"
  }
];

const QuoteDisplay = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prevIndex => (prevIndex + 1) % quotes.length);
    }, 15000); // Change quote every 15 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Card className="bg-gradient-to-br from-haven-purple/10 to-haven-soft-blue/30 border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <Quote className="text-haven-purple h-6 w-6 flex-shrink-0 mt-1" />
          <div>
            <p className="text-lg font-medium italic">"{quotes[quoteIndex].text}"</p>
            <p className="text-sm text-muted-foreground mt-2">— {quotes[quoteIndex].author}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteDisplay;
