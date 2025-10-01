  import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, login, logout, setLoading } = useAuthStore();

  const handleLogin = async (phone: string, countryCode: string) => {
    setLoading(true);
    
    try {
      await login(phone, countryCode);
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
  };
};
