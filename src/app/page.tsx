'use client';

import { useAuthStore } from '@/store/authStore';
import { AuthFlow } from '@/components/auth/AuthFlow';
import { Dashboard } from '@/components/layout/Dashboard';
import { useHydration } from '@/hooks/useHydration';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const mounted = useHydration();

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <AuthFlow />;
}