import { useEffect } from "react"
import { router, useSegments } from "expo-router"
import { useAuth } from "@/lib/context/AuthContext"

const PROTECTED_ROUTES = ["report"]

export function useAuthGuard() {
  const { user, loading } = useAuth()
  const segments = useSegments()

  useEffect(() => {
    if (loading) return

    const firstSegment = segments[0]

    const inAuthGroup = firstSegment === "(auth)"
    const isProtectedRoute = PROTECTED_ROUTES.includes(firstSegment)

    // 🚫 Not logged in → block protected routes
    if (!user && isProtectedRoute) {
      router.replace("/SignIn")
      return
    }

    // ✅ Logged in → block auth screens
    if (user && inAuthGroup) {
      router.replace("/(tabs)")
      return
    }
  }, [user, loading, segments])
}
