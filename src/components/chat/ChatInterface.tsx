'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { MessageInput } from './MessageInput';
import { useChatStore } from '@/store/chatStore';
import { Skeleton } from '@/components/ui/skeleton';

export function ChatInterface() {
  const { currentChatroom, isTyping, loadOlderMessages } = useChatStore();
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChatroom?.messages, isTyping]);

  // Handle infinite scroll for older messages
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = event.currentTarget;
    
    if (scrollTop === 0 && !isLoadingOlder && currentChatroom) {
      setIsLoadingOlder(true);
      loadOlderMessages(currentChatroom.id);
      
      // Simulate loading delay
      setTimeout(() => {
        setIsLoadingOlder(false);
      }, 1000);
    }
  };

  if (!currentChatroom) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center">
            <span className="text-2xl">💬</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">No chatroom selected</h3>
            <p className="text-muted-foreground">
              Choose a chatroom from the sidebar to start chatting
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 w-full">
      {/* Chat Header */}
      <div className="border-b bg-background p-4 shrink-0">
        <h2 className="text-lg font-semibold truncate">{currentChatroom.title}</h2>
        <p className="text-sm text-muted-foreground">
          {currentChatroom.messages.length} messages
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ScrollArea
          ref={scrollAreaRef}
          className="h-full w-full"
          onScrollCapture={handleScroll}
        >
          <div className="space-y-1 p-2">
            {isLoadingOlder && (
              <div className="p-4 space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {currentChatroom.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {isTyping && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Message Input */}
      <div className="shrink-0">
        <MessageInput chatroomId={currentChatroom.id} />
      </div>
    </div>
  );
}
