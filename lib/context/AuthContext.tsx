import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import * as SecureStore from "expo-secure-store"

const BASE_URL = "https://voter-aware-backend.vercel.app"

type User = {
  id: string
  email: string
  name?: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  refreshSession: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  /**
   * Restore & validate session on app start
   */
  const loadSession = async () => {
    try {
      const token = await SecureStore.getItemAsync("session")
      console.log("loadSession found token:", token)

      if (!token) {
        setUser(null)
        return
      }

      const res = await fetch(`${BASE_URL}/api/me`, {
        method: "GET",
        headers: {
          Cookie: token,
        },
      })

      if (!res.ok) {
        throw new Error("Invalid session")
      }

      const data = await res.json()
      setUser(data.user || null)
    } catch {
      await SecureStore.deleteItemAsync("session")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Logout
   */
  const logout = async () => {
    try {
      const token = await SecureStore.getItemAsync("session")
      console.log("logout called, current token:", token)
      
      if (token) {
        await fetch(`${BASE_URL}/auth/signout`, {
          method: "POST",
          headers: {
            Cookie: token,
          },
        })
      }
    } finally {
      await SecureStore.deleteItemAsync("session")
      setUser(null)
    }
  }

  useEffect(() => {
    loadSession()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshSession: loadSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return ctx
}

