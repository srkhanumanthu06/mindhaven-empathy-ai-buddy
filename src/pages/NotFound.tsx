
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart, HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <Heart className="text-haven-purple h-16 w-16 mx-auto animate-pulse-gentle" />
        <h1 className="text-4xl font-bold">Oops!</h1>
        <p className="text-xl text-muted-foreground mb-4">
          We couldn't find the page you're looking for.
        </p>
        <Button 
          onClick={() => navigate('/')} 
          className="rounded-full px-8"
        >
          <HomeIcon className="mr-2 h-4 w-4" />
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
