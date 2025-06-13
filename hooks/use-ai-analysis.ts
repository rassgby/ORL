"use client"

import { useState } from "react"
import type {
  ImageAnalysisRequest,
  SymptomAnalysisRequest,
  AudioAnalysisRequest,
  AnalysisResult,
  ApiResponse,
} from "@/types/ai-analysis"

export function useAIAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeImage = async (request: ImageAnalysisRequest): Promise<AnalysisResult | null> => {
    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/analyze-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      const result: ApiResponse<AnalysisResult> = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Analysis failed")
      }

      return result.data || null
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(errorMessage)
      return null
    } finally {
      setIsAnalyzing(false)
    }
  }

  const analyzeSymptoms = async (request: SymptomAnalysisRequest): Promise<AnalysisResult | null> => {
    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/analyze-symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      const result: ApiResponse<AnalysisResult> = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Analysis failed")
      }

      return result.data || null
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(errorMessage)
      return null
    } finally {
      setIsAnalyzing(false)
    }
  }

  const analyzeAudio = async (request: AudioAnalysisRequest): Promise<AnalysisResult | null> => {
    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/analyze-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      const result: ApiResponse<AnalysisResult> = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Analysis failed")
      }

      return result.data || null
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(errorMessage)
      return null
    } finally {
      setIsAnalyzing(false)
    }
  }

  return {
    analyzeImage,
    analyzeSymptoms,
    analyzeAudio,
    isAnalyzing,
    error,
  }
}
