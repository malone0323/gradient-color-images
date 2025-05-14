"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Define 10 different gradient combinations with blurred diagonal stripes and circles
const circleGradients = [
  {
    name: "Aqua Bubbles",
    background:
      "linear-gradient(135deg, #c4f5f5 0%, #c4f5f5 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #ffefd5 70%, #ffefd5 100%)",
    circles: [
      { size: 150, x: 15, y: 20, color: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)" },
      { size: 200, x: 70, y: 60, color: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)" },
      { size: 100, x: 40, y: 80, color: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)" },
    ],
  },
  {
    name: "Lavender Orbs",
    background:
      "linear-gradient(135deg, #e6e6fa 0%, #e6e6fa 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #ffdab9 70%, #ffdab9 100%)",
    circles: [
      { size: 180, x: 20, y: 30, color: "radial-gradient(circle, rgba(230,230,250,0.9) 0%, rgba(230,230,250,0) 70%)" },
      { size: 120, x: 65, y: 20, color: "radial-gradient(circle, rgba(255,218,185,0.8) 0%, rgba(255,218,185,0) 70%)" },
      { size: 150, x: 50, y: 70, color: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)" },
    ],
  },
  {
    name: "Mint Spheres",
    background:
      "linear-gradient(135deg, #98fb98 0%, #98fb98 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #fffacd 70%, #fffacd 100%)",
    circles: [
      { size: 200, x: 10, y: 40, color: "radial-gradient(circle, rgba(152,251,152,0.8) 0%, rgba(152,251,152,0) 70%)" },
      { size: 150, x: 60, y: 30, color: "radial-gradient(circle, rgba(255,250,205,0.7) 0%, rgba(255,250,205,0) 70%)" },
      { size: 120, x: 30, y: 70, color: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)" },
    ],
  },
  {
    name: "Sky Circles",
    background:
      "linear-gradient(135deg, #87ceeb 0%, #87ceeb 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #ffb6c1 70%, #ffb6c1 100%)",
    circles: [
      { size: 170, x: 25, y: 20, color: "radial-gradient(circle, rgba(135,206,235,0.9) 0%, rgba(135,206,235,0) 70%)" },
      { size: 130, x: 70, y: 40, color: "radial-gradient(circle, rgba(255,182,193,0.8) 0%, rgba(255,182,193,0) 70%)" },
      { size: 180, x: 40, y: 75, color: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)" },
    ],
  },
  {
    name: "Peach Bubbles",
    background:
      "linear-gradient(135deg, #ffdab9 0%, #ffdab9 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #e0ffff 70%, #e0ffff 100%)",
    circles: [
      { size: 160, x: 15, y: 30, color: "radial-gradient(circle, rgba(255,218,185,0.8) 0%, rgba(255,218,185,0) 70%)" },
      { size: 190, x: 60, y: 20, color: "radial-gradient(circle, rgba(224,255,255,0.7) 0%, rgba(224,255,255,0) 70%)" },
      { size: 140, x: 35, y: 65, color: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)" },
    ],
  },
  {
    name: "Lilac Globes",
    background:
      "linear-gradient(135deg, #dcd0ff 0%, #dcd0ff 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #ffefd5 70%, #ffefd5 100%)",
    circles: [
      { size: 200, x: 20, y: 25, color: "radial-gradient(circle, rgba(220,208,255,0.9) 0%, rgba(220,208,255,0) 70%)" },
      { size: 150, x: 65, y: 35, color: "radial-gradient(circle, rgba(255,239,213,0.8) 0%, rgba(255,239,213,0) 70%)" },
      { size: 120, x: 45, y: 70, color: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)" },
    ],
  },
  {
    name: "Coral Spheres",
    background:
      "linear-gradient(135deg, #f08080 0%, #f08080 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #e0ffff 70%, #e0ffff 100%)",
    circles: [
      { size: 180, x: 10, y: 20, color: "radial-gradient(circle, rgba(240,128,128,0.8) 0%, rgba(240,128,128,0) 70%)" },
      { size: 140, x: 60, y: 30, color: "radial-gradient(circle, rgba(224,255,255,0.7) 0%, rgba(224,255,255,0) 70%)" },
      { size: 160, x: 35, y: 75, color: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)" },
    ],
  },
  {
    name: "Sage Bubbles",
    background:
      "linear-gradient(135deg, #d0f0c0 0%, #d0f0c0 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #faf0e6 70%, #faf0e6 100%)",
    circles: [
      { size: 170, x: 25, y: 15, color: "radial-gradient(circle, rgba(208,240,192,0.9) 0%, rgba(208,240,192,0) 70%)" },
      { size: 130, x: 70, y: 25, color: "radial-gradient(circle, rgba(250,240,230,0.8) 0%, rgba(250,240,230,0) 70%)" },
      { size: 190, x: 40, y: 65, color: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)" },
    ],
  },
  {
    name: "Blueberry Orbs",
    background:
      "linear-gradient(135deg, #add8e6 0%, #add8e6 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #fff8dc 70%, #fff8dc 100%)",
    circles: [
      { size: 160, x: 15, y: 25, color: "radial-gradient(circle, rgba(173,216,230,0.8) 0%, rgba(173,216,230,0) 70%)" },
      { size: 200, x: 65, y: 35, color: "radial-gradient(circle, rgba(255,248,220,0.7) 0%, rgba(255,248,220,0) 70%)" },
      { size: 140, x: 30, y: 70, color: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)" },
    ],
  },
  {
    name: "Rose Bubbles",
    background:
      "linear-gradient(135deg, #ffb6c1 0%, #ffb6c1 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #f0f8ff 70%, #f0f8ff 100%)",
    circles: [
      { size: 180, x: 20, y: 20, color: "radial-gradient(circle, rgba(255,182,193,0.9) 0%, rgba(255,182,193,0) 70%)" },
      { size: 150, x: 70, y: 30, color: "radial-gradient(circle, rgba(240,248,255,0.8) 0%, rgba(240,248,255,0) 70%)" },
      { size: 120, x: 45, y: 75, color: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)" },
    ],
  },
]

export default function CircleFeaturedGradients() {
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
      tempDiv.style.background = circleGradients[index].background
      tempDiv.style.position = "relative"
      document.body.appendChild(tempDiv)

      // Add circles to the div
      circleGradients[index].circles.forEach((circle) => {
        const circleDiv = document.createElement("div")
        circleDiv.style.position = "absolute"
        circleDiv.style.width = `${circle.size * (canvas.width / 100)}px`
        circleDiv.style.height = `${circle.size * (canvas.width / 100)}px`
        circleDiv.style.left = `${circle.x}%`
        circleDiv.style.top = `${circle.y}%`
        circleDiv.style.background = circle.color
        circleDiv.style.borderRadius = "50%"
        tempDiv.appendChild(circleDiv)
      })

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
            a.download = `circle-gradient-${index + 1}.png`
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
      <h1 className="text-3xl font-bold mb-6 text-center">10 Circle Featured Gradients</h1>
      <p className="text-center mb-8">
        Each gradient features a blurred diagonal stripe with decorative circular elements.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {circleGradients.map((gradient, index) => (
          <Card
            key={index}
            className="overflow-hidden cursor-pointer group relative"
            onClick={() => setSelectedGradient(index)}
          >
            <div
              className="w-full h-48 transition-transform duration-300 group-hover:scale-105 relative"
              style={{ background: gradient.background }}
            >
              {gradient.circles.map((circle, circleIndex) => (
                <div
                  key={circleIndex}
                  className="absolute rounded-full"
                  style={{
                    width: `${circle.size}px`,
                    height: `${circle.size}px`,
                    left: `${circle.x}%`,
                    top: `${circle.y}%`,
                    transform: "translate(-50%, -50%)",
                    background: circle.color,
                  }}
                />
              ))}
            </div>
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
              className="w-full h-full rounded-lg shadow-2xl relative"
              style={{ background: circleGradients[selectedGradient].background }}
            >
              {circleGradients[selectedGradient].circles.map((circle, circleIndex) => (
                <div
                  key={circleIndex}
                  className="absolute rounded-full"
                  style={{
                    width: `${circle.size * 2}px`,
                    height: `${circle.size * 2}px`,
                    left: `${circle.x}%`,
                    top: `${circle.y}%`,
                    transform: "translate(-50%, -50%)",
                    background: circle.color,
                  }}
                />
              ))}
            </div>
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
