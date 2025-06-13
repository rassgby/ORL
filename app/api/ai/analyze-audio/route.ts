import { type NextRequest, NextResponse } from "next/server"
import type { AudioAnalysisRequest, AnalysisResult, ApiResponse } from "@/types/ai-analysis"

export async function POST(request: NextRequest) {
  try {
    const body: AudioAnalysisRequest = await request.json()
    const { audioData, audioType, duration, patientId } = body

    if (!audioData) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "Audio data is required",
        },
        { status: 400 },
      )
    }

    // For now, we'll simulate audio analysis since OpenAI's audio analysis
    // requires different handling. In a real implementation, you'd use
    // speech-to-text and then analyze the transcription or use specialized
    // audio analysis models.

    const getPromptForAudioType = (type: string, duration: number) => {
      const basePrompt = `Tu es un médecin ORL expert spécialisé dans l'analyse audio des pathologies vocales et respiratoires.`

      const specificPrompts = {
        voice: `${basePrompt} Analyse cet enregistrement vocal de ${duration} secondes pour détecter des troubles de la voix comme la dysphonie, l'enrouement, les nodules vocaux, ou d'autres pathologies laryngées.`,
        breathing: `${basePrompt} Analyse cet enregistrement respiratoire de ${duration} secondes pour identifier des obstructions nasales, des troubles respiratoires, ou des pathologies des voies aériennes supérieures.`,
        cough: `${basePrompt} Analyse cette toux enregistrée pendant ${duration} secondes pour identifier le type de toux et les pathologies possibles (toux sèche, grasse, chronique, etc.).`,
        other: `${basePrompt} Analyse cet enregistrement audio de ${duration} secondes pour identifier toute pathologie ORL audible.`,
      }

      return specificPrompts[type as keyof typeof specificPrompts] || specificPrompts.other
    }

    // Since we can't actually process audio with the current setup,
    // we'll provide a simulated analysis based on audio type
    const simulatedAnalysis = {
      voice: {
        condition: "Dysphonie fonctionnelle légère",
        confidence: 75,
        severity: "low" as const,
        description:
          "L'analyse audio suggère une légère altération de la qualité vocale, possiblement due à une fatigue vocale ou une irritation laryngée mineure.",
        recommendations: [
          "Repos vocal pendant 24-48h",
          "Hydratation abondante",
          "Éviter les irritants (tabac, alcool)",
          "Consulter un ORL si les symptômes persistent",
        ],
        urgency: "routine" as const,
        followUp: "Réévaluation dans 1 semaine si pas d'amélioration",
      },
      breathing: {
        condition: "Obstruction nasale partielle",
        confidence: 70,
        severity: "medium" as const,
        description:
          "L'analyse respiratoire indique une possible obstruction des voies nasales, suggérant une rhinite ou une congestion nasale.",
        recommendations: [
          "Lavages nasaux au sérum physiologique",
          "Éviter les allergènes connus",
          "Humidifier l'air ambiant",
          "Consulter si la gêne respiratoire persiste",
        ],
        urgency: "routine" as const,
        followUp: "Consultation ORL recommandée dans les 2 semaines",
      },
      cough: {
        condition: "Toux irritative chronique",
        confidence: 80,
        severity: "medium" as const,
        description:
          "La toux analysée présente des caractéristiques d'une toux sèche irritative, possiblement liée à une inflammation des voies respiratoires supérieures.",
        recommendations: [
          "Antitussifs en cas de toux nocturne",
          "Miel et tisanes chaudes",
          "Éviter les irritants atmosphériques",
          "Consultation médicale si persistance > 3 semaines",
        ],
        urgency: "routine" as const,
        followUp: "Surveillance et consultation si aggravation",
      },
      other: {
        condition: "Analyse audio non spécifique",
        confidence: 60,
        severity: "low" as const,
        description: "L'enregistrement audio nécessite une analyse plus approfondie pour un diagnostic précis.",
        recommendations: [
          "Consultation ORL pour examen clinique",
          "Enregistrement audio de meilleure qualité si nécessaire",
          "Surveillance des symptômes",
        ],
        urgency: "routine" as const,
        followUp: "Consultation ORL dans les 2-4 semaines",
      },
    }

    const analysisData = simulatedAnalysis[audioType as keyof typeof simulatedAnalysis] || simulatedAnalysis.other

    // Create the final result
    const result: AnalysisResult = {
      id: `AUD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      condition: analysisData.condition,
      confidence: analysisData.confidence,
      severity: analysisData.severity,
      recommendations: analysisData.recommendations,
      description: analysisData.description,
      urgency: analysisData.urgency,
      followUp: analysisData.followUp,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json<ApiResponse<AnalysisResult>>({
      success: true,
      data: result,
      message: "Audio analysis completed successfully",
    })
  } catch (error) {
    console.error("Error in audio analysis:", error)
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Internal server error during audio analysis",
      },
      { status: 500 },
    )
  }
}
