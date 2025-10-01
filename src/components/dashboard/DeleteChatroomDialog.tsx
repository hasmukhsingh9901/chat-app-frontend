'use client';

import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useChatStore } from '@/store/chatStore';
import { toast } from 'sonner';
import { Chatroom } from '@/types/chat';

interface DeleteChatroomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chatroom: Chatroom | null;
}

export function DeleteChatroomDialog({ open, onOpenChange, chatroom }: DeleteChatroomDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteChatroom } = useChatStore();

  const handleDelete = async () => {
    if (!chatroom) return;
    
    setIsDeleting(true);
    
    try {
      deleteChatroom(chatroom.id);
      toast.success('Chatroom deleted successfully!');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to delete chatroom. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Chatroom</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{chatroom?.title}&quot;? This action cannot be undone.
            All messages in this chatroom will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
