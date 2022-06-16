import { createContext, ReactNode, useContext, useState } from "react";
import api from "../api";

interface AuthContextData {
  signInWithGoogle: (accessToken: string) => void;
  getLoading(): boolean;
  getToken(): string;
  getUser(): UserType | undefined;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

type UserType = {
  email: string;
  first_name: string;
  picture: string;
}

type LoginResponse = UserType & {
  token: string;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthContextProviderProps) {

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState<UserType>();

  async function signInWithGoogle(accessToken: string) {

    setLoading(true);

    await api.post('api-token-auth/', {
      access_token: accessToken
    })
      .then((response: { data: LoginResponse }) => {
        setUser(response.data)
        setToken(response.data.token)
        api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
      })
      .catch(error => {
        alert('Erro ao logar:' + error)
      })

    setLoading(false);
  }

  const getLoading = () => {
    return loading;
  }

  const getToken = () => {
    return token;
  }

  const getUser = () => {
    return user;
  }

  const store = {
    signInWithGoogle,
    getLoading,
    getToken,
    getUser
  }

  return (
    <AuthContext.Provider value={store}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}