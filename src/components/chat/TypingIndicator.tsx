'use client';

import { Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function TypingIndicator() {
  return (
    <div className="flex gap-3 p-4">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className="bg-secondary">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="bg-muted rounded-lg px-3 py-2 text-sm inline-block">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Gemini is typing</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
