
import { useState } from 'react';
import { Heart, Menu, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/chat" },
    { name: "Journal", path: "/journal" },
    { name: "Mood Tracker", path: "/mood" },
  ];

  return (
    <header className="py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2" onClick={() => navigate("/")} role="button">
        <Heart className="text-haven-purple h-6 w-6 animate-pulse-gentle" />
        <h1 className="text-xl font-semibold">MindHaven</h1>
      </div>
      
      <div className="md:flex hidden items-center gap-8">
        {menuItems.map((item) => (
          <Button 
            key={item.path} 
            variant="ghost" 
            onClick={() => navigate(item.path)}
            className="font-medium"
          >
            {item.name}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme} 
          className="rounded-full"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col gap-4 mt-8">
              {menuItems.map((item) => (
                <Button 
                  key={item.path} 
                  variant="ghost" 
                  onClick={() => navigate(item.path)}
                  className="justify-start font-medium"
                >
                  {item.name}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
