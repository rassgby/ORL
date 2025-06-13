export interface ImageAnalysisRequest {
  imageData: string // Base64 encoded image
  imageType: "ear" | "throat" | "nose" | "sinus" | "other"
  patientId?: string
  notes?: string
}

export interface SymptomAnalysisRequest {
  patientName: string
  age: number
  gender: "male" | "female" | "other"
  symptoms: string[]
  description: string
  duration: number
  durationUnit: "hours" | "days" | "weeks" | "months"
  area: "ear" | "throat" | "nose" | "sinus" | "multiple"
  medicalHistory?: string
}

export interface AudioAnalysisRequest {
  audioData: string // Base64 encoded audio
  audioType: "voice" | "breathing" | "cough" | "other"
  duration: number
  patientId?: string
}

export interface AnalysisResult {
  id: string
  condition: string
  confidence: number
  severity: "low" | "medium" | "high"
  recommendations: string[]
  description: string
  urgency: "routine" | "urgent" | "emergency"
  followUp: string
  createdAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
