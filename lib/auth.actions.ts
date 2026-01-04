const BASE_URL = "http://192.168.1.5:3000"



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
    credentials: "include", // send cookies
  });

  if (!res.ok) {
    throw new Error("Failed to sign up");
  }

  const data = await res.json();
  return data;
}

/**
 * Sign in with email
 */
export async function signInWithEmail({
  email,
  password,
}: SignInData): Promise<ApiResponse> {
  const res = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to sign in");
  }

  return res.json();
}

/**
 * Sign out
 */
export async function signOut(): Promise<ApiResponse> {
  const res = await fetch(`${BASE_URL}/auth/signout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to sign out");
  }

  return res.json();
}

/**
 * Get current authenticated session
 */
export async function getSession(): Promise<ApiResponse> {
  const res = await fetch(`${BASE_URL}/api/auth/ok`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  return res.json();
}
