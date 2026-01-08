const BASE_URL = "https://voter-aware-backend.vercel.app"
import * as SecureStore from "expo-secure-store"

export async function submitReport({
  description,
  reason,
  image,
}: {
  description: string
  reason: string
  image?: any
}) {
  const token = await SecureStore.getItemAsync("session")
  if (!token) {
    throw new Error("User not authenticated")
  }
  const formData = new FormData()

  formData.append("description", description)
  formData.append("reason", reason)

  if (image) {
    formData.append("image", {
      uri: image.uri,
      type: image.mimeType || "image/jpeg",
      name: image.name || "report.jpg",
    } as any)
  }

  const res = await fetch(`${BASE_URL}/report/submit`, {
    method: "POST",
    headers: {
      Cookie: token,
    },
    body: formData,
  })

  if (!res.ok) {
    throw new Error("Failed to submit report")
  }

  return res.json()
}
