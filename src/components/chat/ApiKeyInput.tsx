
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getApiKey, setApiKey, clearApiKey } from '@/services/aiService';
import { KeyRound, Save, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface ApiKeyInputProps {
  onApiKeySet: () => void;
}

const ApiKeyInput = ({ onApiKeySet }: ApiKeyInputProps) => {
  const [key, setKey] = useState<string>('');
  const [showInput, setShowInput] = useState<boolean>(!getApiKey());

  const handleSaveKey = () => {
    if (!key.trim() && !getApiKey()) {
      toast.error('Please enter a valid API key');
      return;
    }
    
    if (key.trim()) {
      setApiKey(key);
    }
    setShowInput(false);
    toast.success('API key saved successfully');
    onApiKeySet();
  };

  const handleClearKey = () => {
    clearApiKey();
    setKey('');
    setShowInput(true);
    toast.info('API key removed');
  };

  if (!showInput) {
    return (
      <div className="flex items-center justify-end gap-2 mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowInput(true)}
          className="gap-2"
        >
          <KeyRound className="h-4 w-4" />
          Change API Key
        </Button>
      </div>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Connect to AI</CardTitle>
        <CardDescription>
          Using Hugging Face's API for chat functionality.
          Your key is stored locally in your browser and never sent to our servers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter your Hugging Face API key"
            className="flex-1"
          />
          <Button onClick={handleSaveKey}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="destructive" onClick={handleClearKey}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>Default key is already set, or get a new one from <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noreferrer" className="underline">Hugging Face</a></p>
      </CardFooter>
    </Card>
  );
};

export default ApiKeyInput;
