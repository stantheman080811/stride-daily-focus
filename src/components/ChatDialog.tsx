
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGoal: (goal: {
    title: string;
    tasks: { id: string; description: string; completed: boolean }[];
  }) => void;
}

const ChatDialog: React.FC<ChatDialogProps> = ({ isOpen, onClose, onCreateGoal }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: "Hi there! I'm Stride AI. What goal would you like to work on?" }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory([...chatHistory, { role: 'user', content: message }]);
    
    // Simple AI response simulation
    setTimeout(() => {
      let aiResponse = "I'll help you create a plan for that goal. ";
      
      // Simulate asking about timeframe if first message
      if (chatHistory.length <= 1) {
        aiResponse += "What timeframe do you want to achieve it in?";
      } else if (chatHistory.length === 3) {
        // Simulate creating a goal after second exchange
        aiResponse += "Great! I've created a plan for you. Would you like to see it?";
      } else if (chatHistory.length >= 5) {
        // Create a sample goal and close dialog
        onCreateGoal({
          title: chatHistory[1].content.substring(0, 15) + "...",
          tasks: [
            { id: '1', description: "First step towards your goal", completed: false },
            { id: '2', description: "Second step towards your goal", completed: false },
            { id: '3', description: "Third step towards your goal", completed: false },
          ]
        });
        onClose();
        return;
      }
      
      setChatHistory(prev => [...prev, { role: 'ai', content: aiResponse }]);
    }, 1000);
    
    // Clear input
    setMessage('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chat with Stride AI</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 max-h-[50vh] overflow-y-auto p-4">
          {chatHistory.map((msg, i) => (
            <div 
              key={i}
              className={`p-3 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-stride-action text-white self-end' 
                  : 'bg-gray-100 self-start'
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <div className="flex items-end space-x-2">
          <Textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Tell me about your goal..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
