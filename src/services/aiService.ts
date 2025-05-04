
import { toast } from "@/components/ui/sonner";

// Message types
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Hugging Face API types
interface HuggingFaceRequest {
  inputs: string;
  parameters?: {
    max_new_tokens?: number;
    temperature?: number;
    top_p?: number;
    repetition_penalty?: number;
  };
  options?: {
    use_cache?: boolean;
    wait_for_model?: boolean;
  };
}

// API key management - in a real app, this should be handled securely through a backend
let apiKey: string | null = localStorage.getItem('huggingface_api_key') || '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';

export const setApiKey = (key: string): void => {
  apiKey = key;
  localStorage.setItem('huggingface_api_key', key);
};

export const getApiKey = (): string | null => {
  return apiKey;
};

export const clearApiKey = (): void => {
  apiKey = null;
  localStorage.removeItem('huggingface_api_key');
};

// API client for interacting with the AI service
export const fetchAiResponse = async (messages: Message[]): Promise<string> => {
  if (!apiKey) {
    throw new Error('API key is not set');
  }

  try {
    // Format the conversation history for the model
    const conversation = messages.map(msg => 
      `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`
    ).join('\n');
    
    const userPrompt = `${conversation}\nAssistant:`;

    const requestBody: HuggingFaceRequest = {
      inputs: userPrompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        top_p: 0.9,
        repetition_penalty: 1.2
      },
      options: {
        use_cache: true,
        wait_for_model: true
      }
    };

    // Using the Mistral model from Hugging Face
    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get AI response');
    }

    const data = await response.json();
    
    // Extract the AI generated text from the response
    let aiText = '';
    if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
      // Extract just the assistant's response after the prompt
      const fullText = data[0].generated_text;
      aiText = fullText.substring(userPrompt.length).trim();
    } else {
      aiText = "I'm sorry, I couldn't generate a proper response.";
    }

    return aiText;
  } catch (error) {
    console.error('AI API error:', error);
    throw error;
  }
};
