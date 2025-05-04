
import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
  color: string;
}

const FeatureCard = ({ title, description, icon, path, color }: FeatureCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="group transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <CardHeader>
        <div className={`rounded-full w-12 h-12 ${color} flex items-center justify-center mb-2`}>
          {icon}
        </div>
        <CardTitle className="group-hover:text-haven-purple transition-colors">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={() => navigate(path)}
          variant="outline" 
          className="w-full group-hover:bg-haven-purple group-hover:text-white transition-all"
        >
          Try {title}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
