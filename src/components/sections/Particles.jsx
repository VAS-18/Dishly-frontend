"use client"
import { Particles } from "@/components/ui/particles"

export function ParticlesDemo() {
const color = "#000000"

  return (
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={1000}
        color={color}
        refresh
      />
  )
}
