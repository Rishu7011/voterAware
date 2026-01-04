import { useEffect } from "react"
import { router, useSegments } from "expo-router"
import { useAuth } from "@/lib/context/AuthContext"

export function useAuthGuard() {
  const { user, loading } = useAuth()
  const segments = useSegments()

  useEffect(() => {
    if (loading) return

    const firstSegment = segments[0]

    const inAuthGroup = firstSegment === "(auth)"
    const inTabsGroup = firstSegment === "(tabs)"

    // Logged in → block auth pages
    if (user && inAuthGroup) {
      router.replace("/(tabs)")
    }

    // Logged out → block tabs
    if (!user && inTabsGroup) {
      router.replace("/SignIn")
    }
  }, [user, loading, segments])
}
