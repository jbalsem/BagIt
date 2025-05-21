"use client"

import { useEffect, useRef } from "react"

export function BlobBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Blob parameters
    const blobs = [
      {
        x: canvas.width * 0.2,
        y: canvas.height * 0.2,
        radius: Math.min(canvas.width, canvas.height) * 0.15,
        color: "#A259FF20", // Electric Purple with opacity
      },
      {
        x: canvas.width * 0.8,
        y: canvas.height * 0.7,
        radius: Math.min(canvas.width, canvas.height) * 0.2,
        color: "#FF66B320", // Hot Pink with opacity
      },
      {
        x: canvas.width * 0.7,
        y: canvas.height * 0.3,
        radius: Math.min(canvas.width, canvas.height) * 0.1,
        color: "#C3FF9330", // Neon Lime with opacity
      },
    ]

    // Animation variables
    let angle = 0
    const speed = 0.002

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw blobs
      blobs.forEach((blob, index) => {
        const offsetX = Math.sin(angle + index) * blob.radius * 0.2
        const offsetY = Math.cos(angle + index * 2) * blob.radius * 0.2

        // Draw blob
        ctx.beginPath()
        ctx.filter = "blur(70px)"
        ctx.fillStyle = blob.color
        ctx.ellipse(blob.x + offsetX, blob.y + offsetY, blob.radius, blob.radius * 1.2, 0, 0, Math.PI * 2)
        ctx.fill()
      })

      angle += speed
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}
