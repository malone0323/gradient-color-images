"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Define 10 different gradient combinations
const gradients = [
  // Similar to the provided image
  "linear-gradient(to right, #c4f5f5, #ffefd5)",
  // Other pastel combinations
  "linear-gradient(to right, #e0f7fa, #fff8e1)",
  "linear-gradient(to right, #e1f5fe, #f3e5f5)",
  "linear-gradient(to right, #e8f5e9, #fff3e0)",
  "linear-gradient(to right, #f1f8e9, #e0f2f1)",
  "linear-gradient(to right, #f3e5f5, #e8eaf6)",
  "linear-gradient(to right, #e8eaf6, #e0f7fa)",
  "linear-gradient(to right, #ffebee, #e8f5e9)",
  "linear-gradient(to right, #e0f2f1, #ede7f6)",
  "linear-gradient(to right, #fce4ec, #f1f8e9)",
]

export default function GradientBackgrounds() {
  const [selectedGradient, setSelectedGradient] = useState<number | null>(null)

  // Function to download the gradient as a PNG
  const downloadGradient = (index: number) => {
    const canvas = document.createElement("canvas")
    canvas.width = 1200
    canvas.height = 800
    const ctx = canvas.getContext("2d")

    if (ctx) {
      // Create a gradient on the canvas
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)

      // Extract colors from the gradient string
      const gradientStr = gradients[index]
      const colors = gradientStr.match(/#[a-f0-9]{6}/gi)

      if (colors && colors.length >= 2) {
        gradient.addColorStop(0, colors[0])
        gradient.addColorStop(1, colors[1])

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Convert canvas to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `gradient-${index + 1}.png`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
          }
        }, "image/png")
      }
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">10 Pastel Gradient Backgrounds</h1>
      <p className="text-center mb-8">
        Click on any gradient to see it in full size. Click the download button to save it as a PNG.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gradients.map((gradient, index) => (
          <Card
            key={index}
            className="overflow-hidden cursor-pointer group relative"
            onClick={() => setSelectedGradient(index)}
          >
            <div
              className="w-full h-48 transition-transform duration-300 group-hover:scale-105"
              style={{ background: gradient }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="secondary"
                size="sm"
                className="shadow-lg"
                onClick={(e) => {
                  e.stopPropagation()
                  downloadGradient(index)
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="p-3 text-center bg-white">
              <p className="text-sm font-medium">Gradient {index + 1}</p>
            </div>
          </Card>
        ))}
      </div>

      {selectedGradient !== null && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedGradient(null)}
        >
          <div className="relative max-w-4xl w-full h-[80vh] m-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-full h-full rounded-lg shadow-2xl" style={{ background: gradients[selectedGradient] }} />
            <Button className="absolute top-4 right-4" onClick={() => downloadGradient(selectedGradient)}>
              <Download className="mr-2 h-4 w-4" />
              Download PNG
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
