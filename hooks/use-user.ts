"use client"

import { useState } from "react"

export function useUser() {
  // replace later with real auth logic
  const [user] = useState<{
    name: string
    image?: string
  } | null>(null)

  return { user }
}
