const BASE_URL = "https://voter-aware-backend.vercel.app"
import * as SecureStore from "expo-secure-store";




/**
 * Sign up with email
 */
export async function signUpWithEmail({
  fullName,
  email,
  password,
}: SignUpData): Promise<ApiResponse> {

  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: fullName, email, password }),
  });

  const data = await res.json()
  console.log("signUpWithEmail response data:", data)

  if (!res.ok) {
    throw new Error(data?.message || "Signup failed")
  }


  await SecureStore.setItemAsync("session", data.token)

  return {
    user: data.user,
    token: data.token,
  }
}

/**
 * Sign in with email
 */
export async function signInWithEmail({
  email,
  password,
}: SignInData) {

  const res = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.message || "Signin failed")
  }


  await SecureStore.setItemAsync("session", data.token)

  return {
    user: data.user,
    token: data.token,
  }
}



