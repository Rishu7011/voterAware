const BASE_URL = "http://192.168.1.5:3000"

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
    body: formData, // ❗ NO headers
  })

  if (!res.ok) {
    throw new Error("Failed to submit report")
  }

  return res.json()
}
