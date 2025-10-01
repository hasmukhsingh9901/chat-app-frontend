'use client';

import { useState } from 'react';
import { Send, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChat } from '@/hooks/useChat';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useResponsive } from '@/hooks/useResponsive';

interface MessageInputProps {
  chatroomId: string;
}

export function MessageInput({ chatroomId }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const { sendMessage } = useChat();
  const { isMobile } = useResponsive();
  const {
    imagePreview,
    fileInputRef,
    handleImageUpload,
    removeImage,
    triggerFileInput,
  } = useImageUpload();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() && !imagePreview) return;

    const messageContent = message.trim() || 'Image shared';
    
    try {
      await sendMessage(chatroomId, messageContent, imagePreview || undefined);
      
      // Clear input
      setMessage('');
      removeImage();
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  return (
    <div className="border-t bg-background p-3 sm:p-4">
      {imagePreview && (
        <div className="mb-3 relative inline-block">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-24 sm:max-w-32 h-24 sm:h-32 object-cover rounded-md"
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={removeImage}
            className="absolute -top-2 -right-2 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <div className="flex-1 relative min-w-0">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="min-h-[40px] max-h-32 resize-none pr-12 w-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={triggerFileInput}
            className="absolute right-1 top-1 h-8 w-8 p-0 shrink-0"
          >
            <Image className="h-4 w-4" />
          </Button>
        </div>
        
        <Button
          type="submit"
          disabled={!message.trim() && !imagePreview}
          className="h-10 px-3 shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
