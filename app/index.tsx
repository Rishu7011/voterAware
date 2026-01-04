import { Link, Redirect } from "expo-router"
import { ActivityIndicator, View } from "react-native"
import { useAuth } from "@/lib/context/AuthContext"

export default function Index() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <>
        <View>
          <Link href={"/report" as any}>report</Link>
          <Link href={"/SignIn" as any}>SignIn</Link>
          <Link href={"/SignUp" as any}>SignUp</Link>


        </View>
      </>
    )
  }

  if (user) {
    return <Redirect href="/(tabs)" />
  }

  return <Redirect href="/SignIn" />
}
