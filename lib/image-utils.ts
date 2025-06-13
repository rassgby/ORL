export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"]

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Format de fichier non supporté. Utilisez JPG, PNG ou WEBP." }
  }

  if (file.size > maxSize) {
    return { valid: false, error: "Le fichier est trop volumineux. Taille maximale: 10MB." }
  }

  return { valid: true }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      // Remove data:image/jpeg;base64, prefix
      const base64 = result.split(",")[1]
      resolve(base64)
    }
    reader.onerror = (error) => reject(error)
  })
}

export function compressImage(file: File, maxWidth = 1024, quality = 0.8): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!
    const img = new Image()

    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      canvas.toBlob(
        (blob) => {
          const compressedFile = new File([blob!], file.name, {
            type: file.type,
            lastModified: Date.now(),
          })
          resolve(compressedFile)
        },
        file.type,
        quality,
      )
    }

    img.src = URL.createObjectURL(file)
  })
}
