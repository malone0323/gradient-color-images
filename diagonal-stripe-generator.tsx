"use client"

import { useState } from "react"
import { Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function DiagonalStripeGenerator() {
  const [color1, setColor1] = useState("#c4f5f5")
  const [color2, setColor2] = useState("#ffefd5")
  const [stripeWidth, setStripeWidth] = useState(10)
  const [angle, setAngle] = useState(135)

  // Generate the gradient CSS
  const generateGradientCSS = () => {
    return `linear-gradient(${angle}deg, ${color1} 0%, ${color1} ${50 - stripeWidth / 2}%, white ${50 - stripeWidth / 2}%, white ${50 + stripeWidth / 2}%, ${color2} ${50 + stripeWidth / 2}%, ${color2} 100%)`
  }

  const gradientCSS = generateGradientCSS()

  // Function to download the gradient as a PNG
  const downloadGradient = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 1200
    canvas.height = 800
    const ctx = canvas.getContext("2d")

    if (ctx) {
      // Create a temporary div with the gradient to capture it
      const tempDiv = document.createElement("div")
      tempDiv.style.width = `${canvas.width}px`
      tempDiv.style.height = `${canvas.height}px`
      tempDiv.style.background = gradientCSS
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
            a.download = `custom-diagonal-gradient.png`
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

  // Generate random colors
  const generateRandomColors = () => {
    const randomColor = () => {
      const letters = "0123456789ABCDEF"
      let color = "#"
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }

    setColor1(randomColor())
    setColor2(randomColor())
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Custom Diagonal Stripe Generator</h1>
      <p className="text-center mb-8">
        Create your own diagonal stripe gradient by adjusting the colors and settings below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Gradient Settings</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="color1">First Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="color1"
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color2">Second Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="color2"
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Stripe Width: {stripeWidth}%</Label>
                <Slider
                  value={[stripeWidth]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={(value) => setStripeWidth(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label>Angle: {angle}°</Label>
                <Slider value={[angle]} min={0} max={360} step={1} onValueChange={(value) => setAngle(value[0])} />
              </div>

              <div className="flex gap-4">
                <Button onClick={generateRandomColors} className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Random Colors
                </Button>
                <Button onClick={downloadGradient} className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>

              <div className="pt-4">
                <Label>CSS Code:</Label>
                <div className="mt-2 p-3 bg-gray-100 rounded-md overflow-x-auto">
                  <code className="text-sm">{gradientCSS}</code>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="overflow-hidden h-full flex flex-col">
            <div className="text-center p-4 bg-gray-50 border-b">
              <h3 className="font-medium">Preview</h3>
            </div>
            <div className="flex-1 min-h-[400px]" style={{ background: gradientCSS }} />
          </Card>
        </div>
      </div>
    </div>
  )
}
