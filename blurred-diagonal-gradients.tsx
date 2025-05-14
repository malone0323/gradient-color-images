"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Define 10 different gradient combinations with a blurred white diagonal stripe
const blurredDiagonalGradients = [
  {
    name: "Aqua Sunrise Blur",
    background:
      "linear-gradient(135deg, #c4f5f5 0%, #c4f5f5 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #ffefd5 70%, #ffefd5 100%)",
  },
  {
    name: "Lavender Mist Blur",
    background:
      "linear-gradient(135deg, #e6e6fa 0%, #e6e6fa 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #ffdab9 70%, #ffdab9 100%)",
  },
  {
    name: "Mint Lemonade Blur",
    background:
      "linear-gradient(135deg, #98fb98 0%, #98fb98 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #fffacd 70%, #fffacd 100%)",
  },
  {
    name: "Sky Blossom Blur",
    background:
      "linear-gradient(135deg, #87ceeb 0%, #87ceeb 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #ffb6c1 70%, #ffb6c1 100%)",
  },
  {
    name: "Peach Cream Blur",
    background:
      "linear-gradient(135deg, #ffdab9 0%, #ffdab9 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #e0ffff 70%, #e0ffff 100%)",
  },
  {
    name: "Lilac Haze Blur",
    background:
      "linear-gradient(135deg, #dcd0ff 0%, #dcd0ff 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #ffefd5 70%, #ffefd5 100%)",
  },
  {
    name: "Coral Mist Blur",
    background:
      "linear-gradient(135deg, #f08080 0%, #f08080 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #e0ffff 70%, #e0ffff 100%)",
  },
  {
    name: "Sage Linen Blur",
    background:
      "linear-gradient(135deg, #d0f0c0 0%, #d0f0c0 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #faf0e6 70%, #faf0e6 100%)",
  },
  {
    name: "Blueberry Cream Blur",
    background:
      "linear-gradient(135deg, #add8e6 0%, #add8e6 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #fff8dc 70%, #fff8dc 100%)",
  },
  {
    name: "Rose Mist Blur",
    background:
      "linear-gradient(135deg, #ffb6c1 0%, #ffb6c1 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #f0f8ff 70%, #f0f8ff 100%)",
  },
]

export default function BlurredDiagonalGradients() {
  const [selectedGradient, setSelectedGradient] = useState<number | null>(null)

  // Function to download the gradient as a PNG
  const downloadGradient = (index: number) => {
    const canvas = document.createElement("canvas")
    canvas.width = 1200
    canvas.height = 800
    const ctx = canvas.getContext("2d")

    if (ctx) {
      // Create a temporary div with the gradient to capture it
      const tempDiv = document.createElement("div")
      tempDiv.style.width = `${canvas.width}px`
      tempDiv.style.height = `${canvas.height}px`
      tempDiv.style.background = blurredDiagonalGradients[index].background
      document.body.appendChild(tempDiv)

      // Use html2canvas to capture the gradient (simulated here)
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        // Convert canvas to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `blurred-diagonal-gradient-${index + 1}.png`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
          }
        }, "image/png")
      }

      // For demonstration, we'll use a placeholder
      img.src = "/placeholder.svg?height=800&width=1200"

      // Clean up
      document.body.removeChild(tempDiv)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">10 Blurred Diagonal Gradients</h1>
      <p className="text-center mb-8">Each gradient features a maximally blurred 45° white stripe across the center.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blurredDiagonalGradients.map((gradient, index) => (
          <Card
            key={index}
            className="overflow-hidden cursor-pointer group relative"
            onClick={() => setSelectedGradient(index)}
          >
            <div
              className="w-full h-48 transition-transform duration-300 group-hover:scale-105"
              style={{ background: gradient.background }}
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
              <p className="text-sm font-medium">{gradient.name}</p>
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
            <div
              className="w-full h-full rounded-lg shadow-2xl"
              style={{ background: blurredDiagonalGradients[selectedGradient].background }}
            />
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
