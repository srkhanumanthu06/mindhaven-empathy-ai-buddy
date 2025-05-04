
import { toast } from "@/components/ui/sonner";

// Message types
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// OpenAI API types
interface ChatCompletionRequest {
  model: string;
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
  temperature?: number;
  max_tokens?: number;
}

interface ChatCompletionResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

// API key management - in a real app, this should be handled securely through a backend
let apiKey: string | null = localStorage.getItem('openai_api_key');

export const setApiKey = (key: string): void => {
  apiKey = key;
  localStorage.setItem('openai_api_key', key);
};

export const getApiKey = (): string | null => {
  return apiKey;
};

export const clearApiKey = (): void => {
  apiKey = null;
  localStorage.removeItem('openai_api_key');
};

// API client for interacting with the AI service
export const fetchAiResponse = async (messages: Message[]): Promise<string> => {
  if (!apiKey) {
    throw new Error('API key is not set');
  }

  try {
    // Convert our app's messages format to the OpenAI format
    const formattedMessages = [
      {
        role: 'system',
        content: "You are a supportive and empathetic mental health companion called MindHaven. You provide thoughtful, compassionate responses to users' concerns. Be warm and encouraging, but don't provide medical advice or diagnoses. When appropriate, suggest healthy coping mechanisms or mindfulness techniques."
      },
      ...messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant' as 'system' | 'user' | 'assistant',
        content: msg.text
      }))
    ];

    const requestBody: ChatCompletionRequest = {
      model: 'gpt-4o-mini', // Using a current model
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 500
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get AI response');
    }

    const data = await response.json() as ChatCompletionResponse;
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI API error:', error);
    throw error;
  }
};
