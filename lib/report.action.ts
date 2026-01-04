const BASE_URL = "https://voter-aware-backend.vercel.app/"

export async function submitReport({
  description,
  reason,
  image,
}: {
  description: string
  reason: string
  image?: any
}) {
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
    credentials: "include",
    body: formData, 
  })

  if (!res.ok) {
    throw new Error("Failed to submit report")
  }

  return res.json()
}
