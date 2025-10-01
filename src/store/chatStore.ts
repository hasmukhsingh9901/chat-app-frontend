import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Chatroom, Message, ChatStore } from '@/types/chat';

// Generate dummy AI responses
const generateAIResponse = (): string => {
  const responses = [
    "That's an interesting question! Let me think about that...",
    "I understand what you're asking. Here's my perspective on that topic.",
    "Great question! Based on my knowledge, I'd say that...",
    "I can help you with that. Let me provide some insights...",
    "That's a fascinating topic! Here's what I think...",
    "I appreciate you sharing that with me. My thoughts on this are...",
    "That's a complex question. Let me break it down for you...",
    "I can see why you'd be curious about that. Here's my take...",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chatrooms: [],
      currentChatroom: null,
      isLoading: false,
      isTyping: false,

      createChatroom: (title: string) => {
        const newChatroom: Chatroom = {
          id: Date.now().toString(),
          title,
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state) => ({
          chatrooms: [newChatroom, ...state.chatrooms],
        }));
      },

      deleteChatroom: (id: string) => {
        set((state) => ({
          chatrooms: state.chatrooms.filter(room => room.id !== id),
          currentChatroom: state.currentChatroom?.id === id ? null : state.currentChatroom,
        }));
      },

      setCurrentChatroom: (chatroom: Chatroom | null) => {
        set({ currentChatroom: chatroom });
      },

      addMessage: (chatroomId: string, messageData: Omit<Message, 'id' | 'timestamp'>) => {
        const message: Message = {
          ...messageData,
          id: Date.now().toString(),
          timestamp: new Date(),
        };

        set((state) => ({
          chatrooms: state.chatrooms.map(room =>
            room.id === chatroomId
              ? {
                  ...room,
                  messages: [...room.messages, message],
                  updatedAt: new Date(),
                }
              : room
          ),
          currentChatroom: state.currentChatroom?.id === chatroomId
            ? {
                ...state.currentChatroom,
                messages: [...state.currentChatroom.messages, message],
                updatedAt: new Date(),
              }
            : state.currentChatroom,
        }));
      },

      loadOlderMessages: (chatroomId: string) => {
        // Simulate loading older messages
        const dummyMessages: Message[] = Array.from({ length: 10 }, (_, i) => ({
          id: `old-${Date.now()}-${i}`,
          content: `This is an older message ${i + 1}`,
          type: Math.random() > 0.5 ? 'user' : 'ai',
          timestamp: new Date(Date.now() - (i + 1) * 60000),
        }));

        set((state) => ({
          chatrooms: state.chatrooms.map(room =>
            room.id === chatroomId
              ? {
                  ...room,
                  messages: [...dummyMessages, ...room.messages],
                }
              : room
          ),
        }));
      },

      setTyping: (typing: boolean) => {
        set({ isTyping: typing });
      },

      generateAIResponse: async (chatroomId: string) => {
        const { setTyping, addMessage } = get();
        
        setTyping(true);
        
        // Simulate AI thinking delay
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
        
        setTyping(false);
        
        const aiResponse = generateAIResponse();
        addMessage(chatroomId, {
          content: aiResponse,
          type: 'ai',
        });
      },
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        chatrooms: state.chatrooms,
      }),
    }
  )
);
