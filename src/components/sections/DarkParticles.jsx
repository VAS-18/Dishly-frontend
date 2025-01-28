"use client"
import { Particles } from "@/components/ui/particles"

export function DarkParticlesDemo() {
  const color = "#ffffff"

  return (
    <Particles
      className="absolute inset-0"
      quantity={100}
      ease={80}
      color={color}
      refresh
    />
  )
}
