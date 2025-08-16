import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from 'lucide-react';

interface AIAssistantProps {
  onClose: () => void;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemini-1.5-flash-latest");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Available Gemini models
  const availableModels = [
    { value: "gemini-1.5-flash-latest", label: "Gemini 1.5 Flash (Fast)" },
    { value: "gemini-1.5-pro-latest", label: "Gemini 1.5 Pro (Advanced)" },
    { value: "gemini-1.0-pro-latest", label: "Gemini 1.0 Pro (Legacy)" },
    { value: "gemini-pro", label: "Gemini Pro (Stable)" }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const apiBase = (import.meta as any)?.env?.VITE_API_BASE_URL || "http://localhost:3001";
      const response = await fetch(`${apiBase}/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage.content,
          model: selectedModel
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data?.text || "I didn't understand that. Could you try again?";
      
      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I'm having trouble connecting. Please try again later." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-[500px] h-[500px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>AI Assistant</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <div className="px-6 pb-2">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select AI Model" />
            </SelectTrigger>
            <SelectContent>
              {availableModels.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardContent className="flex-grow flex flex-col">
          <div className="flex-grow overflow-y-auto p-4 space-y-4" style={{ maxHeight: 350 }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]" 
                    : "bg-muted p-3 rounded-lg max-w-[80%]"
                }>
                  <p className="break-words">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <p>Thinking...</p>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="p-4 border-t">
            <div className="relative">
              <Input
                placeholder="Ask something..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                disabled={loading}
              />
              <Button
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
              >
                {loading ? "..." : "Send"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;