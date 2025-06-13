"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function HomeThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider defaultTheme="light" forcedTheme="light" {...props}>
      {children}
    </NextThemesProvider>
  )
}
