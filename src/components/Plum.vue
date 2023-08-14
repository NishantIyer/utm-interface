<template>
  <div class="background">
    <canvas ref="el" :width="size.width" :height="size.height" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useWindowSize } from '@vueuse/core'

const el = ref<HTMLCanvasElement | null>(null)
const size = reactive(useWindowSize())

let dots: Dot[] = []
const interactiveRadius = 50
const interactiveRadiusSquared = interactiveRadius * interactiveRadius

interface Dot {
  x: number
  y: number
  radius: number
  color: string
  dx: number
  dy: number
  originalRadius: number
  intrusion: boolean 
}

function createDot(): Dot {
  const x = Math.random() * size.width
  const y = Math.random() * size.height
  const radius = Math.random() * 3 + 1
  const originalRadius = radius
  const color = getRandomLightColor() 
  const dx = (Math.random() - 0.5) * 2
  const dy = (Math.random() - 0.5) * 2

  return { x, y, radius, color, dx, dy, originalRadius, intrusion: false }
}

function getRandomLightColor(): string {
  const darkThemeColors = ['#37306B', '#66347F', '#9E4784', '#D27685']
  const index = Math.floor(Math.random() * darkThemeColors.length)
  const darkColor = darkThemeColors[index]
  const lightColor = lightenColor(darkColor, 30) 
  return lightColor
}

function lightenColor(color: string, percentage: number): string {
  const amount = Math.round(2.55 * percentage)
  const [r, g, b] = color.match(/\w\w/g)!.map((x) => parseInt(x, 16))
  const lighterColor = '#' + [r + amount, g + amount, b + amount].map((x) => x.toString(16).padStart(2, '0')).join('')
  return lighterColor
}

function updateDots(): void {
  dots.forEach((dot) => {
    dot.x += dot.dx
    dot.y += dot.dy

    if (dot.x + dot.radius > size.width || dot.x - dot.radius < 0) {
      dot.dx = -dot.dx
    }

    if (dot.y + dot.radius > size.height || dot.y - dot.radius < 0) {
      dot.dy = -dot.dy
    }
  })
}

function drawDots(ctx: CanvasRenderingContext2D): void {
  ctx.clearRect(0, 0, size.width, size.height)
  dots.forEach((dot) => {
    ctx.beginPath()
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)

    if (dot.intrusion) {
      ctx.fillStyle = '#FF0000' 
      ctx.shadowColor = '#E74C3C' 
    } else {
      ctx.fillStyle = dot.color
      ctx.shadowColor = dot.color
    }
    ctx.shadowBlur = dot.radius * 2

    ctx.fill()
  })
}

function handleMouseMove(event: MouseEvent): void {
  const mouseX = event.pageX
  const mouseY = event.pageY

  dots.forEach((dot) => {
    const distanceSquared = (mouseX - dot.x) ** 2 + (mouseY - dot.y) ** 2
    if (distanceSquared < interactiveRadiusSquared && dot.radius < dot.originalRadius * 2) {
      dot.radius += 0.5
      disruptDot(dot)
    } else if (dot.radius > dot.originalRadius) {
      dot.radius -= 0.5
    }
  })
}

function handleTouchMove(event: TouchEvent): void {
  const touch = event.touches[0]
  const touchX = touch.pageX
  const touchY = touch.pageY

  dots.forEach((dot) => {
    const distanceSquared = (touchX - dot.x) ** 2 + (touchY - dot.y) ** 2
    if (distanceSquared < interactiveRadiusSquared && dot.radius < dot.originalRadius * 2) {
      dot.radius += 0.5
      disruptDot(dot)
    } else if (dot.radius > dot.originalRadius) {
      dot.radius -= 0.5
    }
  })
}

function disruptDot(dot: Dot): void {
  dot.dx = (Math.random() - 0.5) * 2
  dot.dy = (Math.random() - 0.5) * 2
}

// Check if intrusion is detected in the payload
function isDetectedIntrusion(payload: any[]): boolean {
  for (const item of payload) {
    if (item.intrusionAlert && item.intrusionAlert.BSSID && item.intrusionAlert.Timestamp) {
      return true
    }
  }
  return false
}

async function checkIntrusion(): Promise<void> {
  try {
    const response = await fetch('https://uml-api.vercel.app/api/scanResults')
    const payload = await response.json()
    const intrusionDetected = isDetectedIntrusion(payload)
    dots.forEach((dot) => {
      dot.intrusion = intrusionDetected
    })

    if (intrusionDetected) {
      flashIntrusionDots()
      // Add more visual effects or actions for intrusion detection here
    }
  } catch (error) {
    console.error('Error fetching intrusion data:', error)
  }
}

function flashIntrusionDots(): void {
  // Add visual effects for intrusion alert, e.g., flash the dots or change their colors
  dots.forEach((dot) => {
    if (dot.intrusion) {
      dot.radius += 2; // Increase the radius of intrusion dots
      dot.color = '#FF0000'; // Change color to red for intrusion dots
      dot.shadowColor = '#E74C3C'; // Enhance shadow effect for intrusion dots
    }
  });

  // After a short interval, revert the intrusion dots back to their original state
  setTimeout(() => {
    dots.forEach((dot) => {
      if (dot.intrusion) {
        dot.radius = dot.originalRadius; // Reset the radius of intrusion dots
        dot.color = getRandomLightColor(); // Reset the color of intrusion dots
        dot.shadowColor = dot.color; // Reset shadow effect for intrusion dots
      }
    });
  }, 500); // Adjust the interval as desired for the duration of the visual effect
}

onMounted(() => {
  const canvas = el.value!
  const ctx = canvas.getContext('2d')!
  canvas.width = size.width
  canvas.height = size.height

  for (let i = 0; i < 50; i++) {
    dots.push(createDot())
  }

  const animation = () => {
    updateDots()
    drawDots(ctx)
    requestAnimationFrame(animation)
  }

  animation()

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('touchmove', handleTouchMove, { passive: true })

  // Check intrusion from the API every 5 seconds and update dots' intrusion status
  checkIntrusion();
  setInterval(checkIntrusion, 5000);
})
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
  background-color: #000000; /* Dark background color */
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
}

/* Optional styles to make the canvas more prominent */
canvas {
  border: 2px solid #ffffff; /* White border around the canvas */
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2); /* Light shadow effect */
  opacity: 0.7; /* Reduce opacity to make it blend with the background */
}
</style>
