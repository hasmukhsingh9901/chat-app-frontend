export interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

export interface User {
  id: string;
  phone: string;
  countryCode: string;
  isAuthenticated: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthStore extends AuthState {
  login: (phone: string, countryCode: string) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}
