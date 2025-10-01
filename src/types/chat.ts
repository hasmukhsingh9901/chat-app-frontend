export interface Message {
  id: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: Date;
  imageUrl?: string;
}

export interface Chatroom {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatState {
  chatrooms: Chatroom[];
  currentChatroom: Chatroom | null;
  isLoading: boolean;
  isTyping: boolean;
}

export interface ChatStore extends ChatState {
  createChatroom: (title: string) => void;
  deleteChatroom: (id: string) => void;
  setCurrentChatroom: (chatroom: Chatroom | null) => void;
  addMessage: (chatroomId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  loadOlderMessages: (chatroomId: string) => void;
  setTyping: (typing: boolean) => void;
  generateAIResponse: (chatroomId: string) => void;
}
