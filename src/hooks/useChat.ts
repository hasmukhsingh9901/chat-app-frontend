import { useChatStore } from '@/store/chatStore';
import { toast } from 'sonner';

export const useChat = () => {
  const {
    chatrooms,
    currentChatroom,
    isLoading,
    isTyping,
    createChatroom: storeCreateChatroom,
    deleteChatroom: storeDeleteChatroom,
    setCurrentChatroom,
    addMessage,
    loadOlderMessages,
    setTyping,
    generateAIResponse,
  } = useChatStore();

  const createChatroom = (title: string) => {
    try {
      storeCreateChatroom(title);
      toast.success('Chatroom created successfully!');
    } catch (error) {
      toast.error('Failed to create chatroom. Please try again.');
      throw error;
    }
  };

  const deleteChatroom = (id: string) => {
    try {
      storeDeleteChatroom(id);
      toast.success('Chatroom deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete chatroom. Please try again.');
      throw error;
    }
  };

  const sendMessage = async (chatroomId: string, content: string, imageUrl?: string) => {
    try {
      // Add user message
      addMessage(chatroomId, {
        content,
        type: 'user',
        imageUrl,
      });

      // Generate AI response if there's text content
      if (content.trim()) {
        generateAIResponse(chatroomId);
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      throw error;
    }
  };

  const loadMoreMessages = async (chatroomId: string) => {
    try {
      loadOlderMessages(chatroomId);
    } catch (error) {
      toast.error('Failed to load older messages. Please try again.');
      throw error;
    }
  };

  return {
    chatrooms,
    currentChatroom,
    isLoading,
    isTyping,
    createChatroom,
    deleteChatroom,
    setCurrentChatroom,
    sendMessage,
    loadMoreMessages,
    setTyping,
  };
};
