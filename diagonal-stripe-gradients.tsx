"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Define 10 different gradient combinations with a white diagonal stripe
const diagonalStripeGradients = [
  {
    name: "Aqua Sunrise",
    background: "linear-gradient(135deg, #c4f5f5 0%, #c4f5f5 42%, white 45%, white 55%, #ffefd5 58%, #ffefd5 100%)",
  },
  {
    name: "Lavender Mist",
    background: "linear-gradient(135deg, #e6e6fa 0%, #e6e6fa 42%, white 45%, white 55%, #ffdab9 58%, #ffdab9 100%)",
  },
  {
    name: "Mint Lemonade",
    background: "linear-gradient(135deg, #98fb98 0%, #98fb98 42%, white 45%, white 55%, #fffacd 58%, #fffacd 100%)",
  },
  {
    name: "Sky Blossom",
    background: "linear-gradient(135deg, #87ceeb 0%, #87ceeb 42%, white 45%, white 55%, #ffb6c1 58%, #ffb6c1 100%)",
  },
  {
    name: "Peach Cream",
    background: "linear-gradient(135deg, #ffdab9 0%, #ffdab9 42%, white 45%, white 55%, #e0ffff 58%, #e0ffff 100%)",
  },
  {
    name: "Lilac Haze",
    background: "linear-gradient(135deg, #dcd0ff 0%, #dcd0ff 42%, white 45%, white 55%, #ffefd5 58%, #ffefd5 100%)",
  },
  {
    name: "Coral Mist",
    background: "linear-gradient(135deg, #f08080 0%, #f08080 42%, white 45%, white 55%, #e0ffff 58%, #e0ffff 100%)",
  },
  {
    name: "Sage Linen",
    background: "linear-gradient(135deg, #d0f0c0 0%, #d0f0c0 42%, white 45%, white 55%, #faf0e6 58%, #faf0e6 100%)",
  },
  {
    name: "Blueberry Cream",
    background: "linear-gradient(135deg, #add8e6 0%, #add8e6 42%, white 45%, white 55%, #fff8dc 58%, #fff8dc 100%)",
  },
  {
    name: "Rose Mist",
    background: "linear-gradient(135deg, #ffb6c1 0%, #ffb6c1 42%, white 45%, white 55%, #f0f8ff 58%, #f0f8ff 100%)",
  },
]

export default function DiagonalStripeGradients() {
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
      tempDiv.style.background = diagonalStripeGradients[index].background
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
            a.download = `diagonal-gradient-${index + 1}.png`
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
      <h1 className="text-3xl font-bold mb-6 text-center">10 Diagonal Stripe Gradients</h1>
      <p className="text-center mb-8">
        Each gradient features a 45° white stripe across the center. Click on any gradient to see it in full size.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {diagonalStripeGradients.map((gradient, index) => (
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
              style={{ background: diagonalStripeGradients[selectedGradient].background }}
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
