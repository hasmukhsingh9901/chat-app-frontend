'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Search, Plus, Trash2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useChatStore } from '@/store/chatStore';
import { useAuthStore } from '@/store/authStore';
import { CreateChatroomDialog } from './CreateChatroomDialog';
import { DeleteChatroomDialog } from './DeleteChatroomDialog';
import { Chatroom } from '@/types';

interface ChatroomListProps {
  onChatroomSelect?: () => void;
}

export function ChatroomList({ onChatroomSelect }: ChatroomListProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedChatroom, setSelectedChatroom] = useState<Chatroom | null>(null);
  
  const { chatrooms, setCurrentChatroom } = useChatStore();
  const { user } = useAuthStore();

  const filteredChatrooms = chatrooms.filter(chatroom =>
    chatroom.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatroomClick = (chatroom: Chatroom) => {
    setCurrentChatroom(chatroom);
    onChatroomSelect?.();
  };

  const handleDeleteClick = (chatroom: Chatroom, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedChatroom(chatroom);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="w-full h-full border-r bg-background flex flex-col">
      <div className="p-3 sm:p-4 border-b flex-shrink-0">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h1 className="text-lg sm:text-xl font-semibold">Chatrooms</h1>
          <Button
            size="sm"
            onClick={() => setCreateDialogOpen(true)}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chatrooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {filteredChatrooms.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            {searchQuery ? 'No chatrooms found' : 'No chatrooms yet. Create one to get started!'}
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {filteredChatrooms.map((chatroom) => (
              <Card
                key={chatroom.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleChatroomClick(chatroom)}
              >
                <CardHeader className="pb-2 p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm truncate">
                        {chatroom.title}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {format(chatroom.updatedAt, 'MMM d, h:mm a')}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDeleteClick(chatroom, e)}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive shrink-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 p-3 sm:p-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-3 w-3 text-muted-foreground shrink-0" />
                    <Badge variant="secondary" className="text-xs">
                      {chatroom.messages.length} messages
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <CreateChatroomDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      <DeleteChatroomDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        chatroom={selectedChatroom}
      />
    </div>
  );
}
