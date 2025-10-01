'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatroomList } from '@/components/dashboard/ChatroomList';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Header } from './Header';
import { useHydration } from '@/hooks/useHydration';

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mounted = useHydration();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <h1 className="text-lg font-semibold">Gemini Chat</h1>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden fixed top-16 left-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-8 w-8 p-0"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:relative
          top-14 left-0 z-40
          w-full max-w-sm sm:max-w-md lg:max-w-none lg:w-80 xl:w-96
          h-[calc(100vh-3.5rem)]
          transition-transform duration-300 ease-in-out
          lg:transition-none
          flex-shrink-0
        `}>
          <ChatroomList onChatroomSelect={() => setSidebarOpen(false)} />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}
