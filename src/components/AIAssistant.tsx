import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from 'lucide-react';

interface AIAssistantProps {
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-[500px] h-[500px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>AI Assistant</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {/* Chat messages will go here */}
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-lg">
                <p>Hello! How can I help you today?</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="relative">
              <Input placeholder="Ask something..." />
              <Button size="sm" className="absolute right-1 top-1/2 -translate-y-1/2">
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;
