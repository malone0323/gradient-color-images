"use client"

import { useState } from "react"
import { Download, RefreshCw, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Circle = {
  size: number
  x: number
  y: number
  opacity: number
}

export default function CircleGradientGenerator() {
  const [color1, setColor1] = useState("#c4f5f5")
  const [color2, setColor2] = useState("#ffefd5")
  const [blurAmount, setBlurAmount] = useState(20)
  const [angle, setAngle] = useState(135)
  const [stripeWidth, setStripeWidth] = useState(10)
  const [circles, setCircles] = useState<Circle[]>([
    { size: 150, x: 20, y: 20, opacity: 0.8 },
    { size: 200, x: 70, y: 60, opacity: 0.6 },
    { size: 100, x: 40, y: 80, opacity: 0.7 },
  ])

  // Generate the gradient CSS with maximum blur
  const generateGradientCSS = () => {
    // Calculate positions based on blur amount and stripe width
    const startFade = 50 - stripeWidth / 2 - blurAmount
    const startWhite = 50 - stripeWidth / 2
    const endWhite = 50 + stripeWidth / 2
    const endFade = 50 + stripeWidth / 2 + blurAmount

    return `linear-gradient(${angle}deg, 
      ${color1} 0%, 
      ${color1} ${startFade}%, 
      rgba(255,255,255,0.3) ${startWhite}%, 
      rgba(255,255,255,0.9) 50%, 
      rgba(255,255,255,0.3) ${endWhite}%, 
      ${color2} ${endFade}%, 
      ${color2} 100%)`
  }

  const gradientCSS = generateGradientCSS()

  // Function to add a new circle
  const addCircle = () => {
    setCircles([
      ...circles,
      {
        size: 150,
        x: Math.floor(Math.random() * 80) + 10,
        y: Math.floor(Math.random() * 80) + 10,
        opacity: 0.7,
      },
    ])
  }

  // Function to remove a circle
  const removeCircle = (index: number) => {
    setCircles(circles.filter((_, i) => i !== index))
  }

  // Function to update a circle property
  const updateCircle = (index: number, property: keyof Circle, value: number) => {
    const updatedCircles = [...circles]
    updatedCircles[index][property] = value
    setCircles(updatedCircles)
  }

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
      tempDiv.style.position = "relative"
      document.body.appendChild(tempDiv)

      // Add circles to the div
      circles.forEach((circle) => {
        const circleDiv = document.createElement("div")
        circleDiv.style.position = "absolute"
        circleDiv.style.width = `${circle.size * (canvas.width / 100)}px`
        circleDiv.style.height = `${circle.size * (canvas.width / 100)}px`
        circleDiv.style.left = `${circle.x}%`
        circleDiv.style.top = `${circle.y}%`
        circleDiv.style.background = `radial-gradient(circle, rgba(255,255,255,${circle.opacity}) 0%, rgba(255,255,255,0) 70%)`
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
            a.download = `custom-circle-gradient.png`
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
      <h1 className="text-3xl font-bold mb-6 text-center">Circle Featured Gradient Generator</h1>
      <p className="text-center mb-8">Create your own gradient with blurred diagonal stripe and decorative circles.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Tabs defaultValue="gradient">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="gradient">Gradient Settings</TabsTrigger>
              <TabsTrigger value="circles">Circle Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="gradient">
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
                    <Label>Blur Amount: {blurAmount}%</Label>
                    <Slider
                      value={[blurAmount]}
                      min={5}
                      max={40}
                      step={1}
                      onValueChange={(value) => setBlurAmount(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Angle: {angle}°</Label>
                    <Slider value={[angle]} min={0} max={360} step={1} onValueChange={(value) => setAngle(value[0])} />
                  </div>

                  <Button onClick={generateRandomColors} className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Random Colors
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="circles">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Circle Settings</h2>
                  <Button onClick={addCircle} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Circle
                  </Button>
                </div>

                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                  {circles.map((circle, index) => (
                    <Card key={index} className="p-4 relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => removeCircle(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <h3 className="font-medium mb-3">Circle {index + 1}</h3>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Size: {circle.size}px</Label>
                          <Slider
                            value={[circle.size]}
                            min={50}
                            max={300}
                            step={10}
                            onValueChange={(value) => updateCircle(index, "size", value[0])}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>X Position: {circle.x}%</Label>
                          <Slider
                            value={[circle.x]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(value) => updateCircle(index, "x", value[0])}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Y Position: {circle.y}%</Label>
                          <Slider
                            value={[circle.y]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(value) => updateCircle(index, "y", value[0])}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Opacity: {circle.opacity.toFixed(1)}</Label>
                          <Slider
                            value={[circle.opacity * 10]}
                            min={1}
                            max={10}
                            step={1}
                            onValueChange={(value) => updateCircle(index, "opacity", value[0] / 10)}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <Button onClick={downloadGradient} className="w-full mt-4">
            <Download className="mr-2 h-4 w-4" />
            Download Gradient
          </Button>
        </div>

        <div>
          <Card className="overflow-hidden h-full flex flex-col">
            <div className="text-center p-4 bg-gray-50 border-b">
              <h3 className="font-medium">Preview</h3>
            </div>
            <div className="flex-1 min-h-[500px] relative" style={{ background: gradientCSS }}>
              {circles.map((circle, index) => (
                <div
                  key={index}
                  className="absolute rounded-full"
                  style={{
                    width: `${circle.size}px`,
                    height: `${circle.size}px`,
                    left: `${circle.x}%`,
                    top: `${circle.y}%`,
                    transform: "translate(-50%, -50%)",
                    background: `radial-gradient(circle, rgba(255,255,255,${circle.opacity}) 0%, rgba(255,255,255,0) 70%)`,
                  }}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
