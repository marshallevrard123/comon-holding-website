import { useState, useEffect } from 'react'

// Cache module-level pour éviter de retraiter les mêmes images
const processed = {}

/**
 * Affiche un logo en supprimant automatiquement les pixels blancs/quasi-blancs du fond.
 * Utilise canvas + BFS flood-fill depuis les coins de l'image.
 * Si le logo n'a pas de fond blanc (logoDark), l'image est affichée telle quelle.
 */
export default function TransparentLogo({ src, alt, className, style, skipProcess = false }) {
  const [finalSrc, setFinalSrc] = useState(processed[src] || null)

  useEffect(() => {
    if (!src || skipProcess) { setFinalSrc(src); return }
    if (processed[src]) { setFinalSrc(processed[src]); return }

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width  = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      try {
        const { width, height } = canvas
        const imageData = ctx.getImageData(0, 0, width, height)
        const d = imageData.data
        const visited = new Uint8Array(width * height)
        const THRESHOLD = 235 // seuil : pixels ≥ 235 sur R,G,B = quasi-blanc

        const isWhite = idx4 =>
          d[idx4] >= THRESHOLD && d[idx4 + 1] >= THRESHOLD && d[idx4 + 2] >= THRESHOLD

        // BFS depuis les quatre coins
        const queue = []
        const push = pixel => {
          if (!visited[pixel] && isWhite(pixel * 4)) {
            visited[pixel] = 1
            queue.push(pixel)
          }
        }
        push(0)
        push(width - 1)
        push(width * (height - 1))
        push(width * height - 1)

        while (queue.length > 0) {
          const p = queue.pop()
          d[p * 4 + 3] = 0            // rendre transparent
          const x = p % width
          const y = (p / width) | 0
          if (x > 0)          push(p - 1)
          if (x < width - 1)  push(p + 1)
          if (y > 0)          push(p - width)
          if (y < height - 1) push(p + width)
        }

        ctx.putImageData(imageData, 0, 0)
        const dataUrl = canvas.toDataURL('image/png')
        processed[src] = dataUrl
        setFinalSrc(dataUrl)
      } catch {
        // CORS ou autre erreur → fallback image originale
        processed[src] = src
        setFinalSrc(src)
      }
    }
    img.onerror = () => { processed[src] = src; setFinalSrc(src) }
    img.src = src
  }, [src, skipProcess])

  return (
    <img
      src={finalSrc || src}
      alt={alt}
      className={className}
      style={{
        ...style,
        opacity: finalSrc ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    />
  )
}
