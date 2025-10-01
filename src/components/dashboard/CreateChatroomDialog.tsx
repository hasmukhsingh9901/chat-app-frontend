'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '@/hooks/useChat';
import { useCreateChatroomForm } from '@/hooks/useFormValidation';
import { CreateChatroomFormData } from '@/types/forms';

interface CreateChatroomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateChatroomDialog({ open, onOpenChange }: CreateChatroomDialogProps) {
  const [isCreating, setIsCreating] = useState(false);
  const { createChatroom } = useChat();

  const onSubmit = async (data: CreateChatroomFormData) => {
    setIsCreating(true);
    
    try {
      createChatroom(data.title);
      reset();
      onOpenChange(false);
    } catch (error) {
      // Error is already handled in the hook
    } finally {
      setIsCreating(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useCreateChatroomForm(onSubmit);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      reset();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Chatroom</DialogTitle>
          <DialogDescription>
            Give your chatroom a name to start chatting with Gemini.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              {...register('title')}
              placeholder="Enter chatroom title..."
              disabled={isCreating}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating}
            >
              {isCreating ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
