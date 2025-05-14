"use client"

import { useState } from "react"
import { Copy, RefreshCw, Plus, Trash2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

type Circle = {
  size: number
  x: number
  y: number
  color: string
  blur: number
}

// Predefined gradient backgrounds with colored blurred circles
const presetGradients = [
  {
    name: "Aqua Sunrise",
    background:
      "linear-gradient(135deg, #c4f5f5 0%, #c4f5f5 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #ffefd5 70%, #ffefd5 100%)",
    circles: [
      { size: 150, x: 15, y: 20, color: "#7fdbff", blur: 40 },
      { size: 200, x: 70, y: 60, color: "#ffdc73", blur: 60 },
      { size: 100, x: 40, y: 80, color: "#ff9eb5", blur: 30 },
    ],
  },
  {
    name: "Lavender Dreams",
    background:
      "linear-gradient(135deg, #e6e6fa 0%, #e6e6fa 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #ffdab9 70%, #ffdab9 100%)",
    circles: [
      { size: 180, x: 20, y: 30, color: "#b19cd9", blur: 50 },
      { size: 120, x: 65, y: 20, color: "#ffb347", blur: 40 },
      { size: 150, x: 50, y: 70, color: "#ff6b6b", blur: 45 },
    ],
  },
  {
    name: "Mint Breeze",
    background:
      "linear-gradient(135deg, #98fb98 0%, #98fb98 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #fffacd 70%, #fffacd 100%)",
    circles: [
      { size: 200, x: 10, y: 40, color: "#00d084", blur: 60 },
      { size: 150, x: 60, y: 30, color: "#fcf6bd", blur: 45 },
      { size: 120, x: 30, y: 70, color: "#a0ced9", blur: 35 },
    ],
  },
  {
    name: "Ocean Sunset",
    background:
      "linear-gradient(135deg, #87ceeb 0%, #87ceeb 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #ffb6c1 70%, #ffb6c1 100%)",
    circles: [
      { size: 170, x: 25, y: 20, color: "#0099ff", blur: 50 },
      { size: 130, x: 70, y: 40, color: "#ff6b6b", blur: 40 },
      { size: 180, x: 40, y: 75, color: "#ffd166", blur: 55 },
    ],
  },
  {
    name: "Peach Glow",
    background:
      "linear-gradient(135deg, #ffdab9 0%, #ffdab9 30%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.3) 60%, #e0ffff 70%, #e0ffff 100%)",
    circles: [
      { size: 160, x: 15, y: 30, color: "#ff9a8b", blur: 45 },
      { size: 190, x: 60, y: 20, color: "#98d8c8", blur: 55 },
      { size: 140, x: 35, y: 65, color: "#ffb347", blur: 40 },
    ],
  },
]

export default function ColoredCircleGradients() {
  const [color1, setColor1] = useState("#c4f5f5")
  const [color2, setColor2] = useState("#ffefd5")
  const [blurAmount, setBlurAmount] = useState(20)
  const [angle, setAngle] = useState(135)
  const [stripeWidth, setStripeWidth] = useState(10)
  const [circles, setCircles] = useState<Circle[]>([
    { size: 150, x: 20, y: 20, color: "#7fdbff", blur: 40 },
    { size: 200, x: 70, y: 60, color: "#ffdc73", blur: 60 },
    { size: 100, x: 40, y: 80, color: "#ff9eb5", blur: 30 },
  ])
  const [copied, setCopied] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null)

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
    // Generate a random color
    const randomColor = () => {
      const letters = "0123456789ABCDEF"
      let color = "#"
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }

    setCircles([
      ...circles,
      {
        size: 150,
        x: Math.floor(Math.random() * 80) + 10,
        y: Math.floor(Math.random() * 80) + 10,
        color: randomColor(),
        blur: 40,
      },
    ])
  }

  // Function to remove a circle
  const removeCircle = (index: number) => {
    setCircles(circles.filter((_, i) => i !== index))
  }

  // Function to update a circle property
  const updateCircle = (index: number, property: keyof Circle, value: any) => {
    const updatedCircles = [...circles]
    updatedCircles[index][property] = value
    setCircles(updatedCircles)
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

    // Also randomize circle colors
    const updatedCircles = circles.map((circle) => ({
      ...circle,
      color: randomColor(),
    }))
    setCircles(updatedCircles)
  }

  // Load a preset gradient
  const loadPreset = (index: number) => {
    const preset = presetGradients[index]
    setSelectedPreset(index)

    // Extract colors from the gradient string
    const bgColors = preset.background.match(/#[a-f0-9]{6}/gi)
    if (bgColors && bgColors.length >= 2) {
      setColor1(bgColors[0])
      setColor2(bgColors[1])
    }

    setCircles([...preset.circles])
  }

  // Generate the complete CSS for the gradient with circles
  const generateCompleteCSS = () => {
    let css = `.gradient-background {
  position: relative;
  width: 100%;
  height: 100%;
  background: ${gradientCSS.replace(/\s+/g, " ")};
  overflow: hidden;
}\n`

    circles.forEach((circle, index) => {
      css += `
.circle-${index + 1} {
  position: absolute;
  width: ${circle.size}px;
  height: ${circle.size}px;
  left: ${circle.x}%;
  top: ${circle.y}%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: ${circle.color};
  filter: blur(${circle.blur}px);
  opacity: 0.7;
}\n`
    })

    return css
  }

  // Generate the HTML structure
  const generateHTML = () => {
    let html = `<div class="gradient-background">\n`

    circles.forEach((_, index) => {
      html += `  <div class="circle-${index + 1}"></div>\n`
    })

    html += `</div>`

    return html
  }

  // Copy CSS to clipboard
  const copyCSS = () => {
    const css = generateCompleteCSS()
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Colored Circle Gradients</h1>
      <p className="text-center mb-8">Create gradients with blurred diagonal stripes and colored blurred circles.</p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        {presetGradients.map((preset, index) => (
          <Card
            key={index}
            className={`overflow-hidden cursor-pointer transition-all ${selectedPreset === index ? "ring-2 ring-primary" : ""}`}
            onClick={() => loadPreset(index)}
          >
            <div className="w-full h-24 relative" style={{ background: preset.background }}>
              {preset.circles.map((circle, circleIndex) => (
                <div
                  key={circleIndex}
                  className="absolute rounded-full"
                  style={{
                    width: `${circle.size / 2}px`,
                    height: `${circle.size / 2}px`,
                    left: `${circle.x}%`,
                    top: `${circle.y}%`,
                    transform: "translate(-50%, -50%)",
                    backgroundColor: circle.color,
                    filter: `blur(${circle.blur / 3}px)`,
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
            <div className="p-2 text-center bg-white text-xs font-medium truncate">{preset.name}</div>
          </Card>
        ))}
      </div>

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
                          <Label>Color</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="color"
                              value={circle.color}
                              onChange={(e) => updateCircle(index, "color", e.target.value)}
                              className="w-12 h-10 p-1"
                            />
                            <Input
                              type="text"
                              value={circle.color}
                              onChange={(e) => updateCircle(index, "color", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Blur: {circle.blur}px</Label>
                          <Slider
                            value={[circle.blur]}
                            min={0}
                            max={100}
                            step={5}
                            onValueChange={(value) => updateCircle(index, "blur", value[0])}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden flex flex-col">
            <div className="text-center p-4 bg-gray-50 border-b">
              <h3 className="font-medium">Preview</h3>
            </div>
            <div className="h-[300px] relative" style={{ background: gradientCSS }}>
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
                    backgroundColor: circle.color,
                    filter: `blur(${circle.blur}px)`,
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">CSS Code</h3>
              <Button variant="outline" size="sm" onClick={copyCSS} className="flex items-center gap-2">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy CSS"}
              </Button>
            </div>

            <Textarea className="font-mono text-sm h-[200px] resize-none" readOnly value={generateCompleteCSS()} />

            <div className="mt-4">
              <h4 className="font-medium mb-2">HTML Structure</h4>
              <Textarea className="font-mono text-sm h-[100px] resize-none" readOnly value={generateHTML()} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
