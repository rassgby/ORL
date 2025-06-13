import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { SymptomAnalysisRequest, AnalysisResult, ApiResponse } from "@/types/ai-analysis"

export async function POST(request: NextRequest) {
  try {
    const body: SymptomAnalysisRequest = await request.json()
    const { patientName, age, gender, symptoms, description, duration, durationUnit, area, medicalHistory } = body

    if (!symptoms || symptoms.length === 0 || !description) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "Symptoms and description are required",
        },
        { status: 400 },
      )
    }

    const prompt = `Tu es un médecin ORL expert. Analyse les symptômes suivants et fournis un diagnostic préliminaire.

INFORMATIONS PATIENT:
- Âge: ${age} ans
- Genre: ${gender}
- Zone concernée: ${area}

SYMPTÔMES:
- Symptômes principaux: ${symptoms.join(", ")}
- Durée: ${duration} ${durationUnit}
- Description détaillée: ${description}
${medicalHistory ? `- Antécédents médicaux: ${medicalHistory}` : ""}

Analyse ces symptômes ORL et fournis un diagnostic différentiel avec les pathologies les plus probables.

Réponds UNIQUEMENT au format JSON suivant (sans markdown ni backticks):
{
  "condition": "Diagnostic le plus probable",
  "confidence": nombre entre 0 et 100,
  "severity": "low" | "medium" | "high",
  "description": "Explication détaillée du diagnostic et des symptômes",
  "recommendations": ["recommandation 1", "recommandation 2", "recommandation 3"],
  "urgency": "routine" | "urgent" | "emergency",
  "followUp": "Instructions de suivi et délai recommandé"
}`

    // Generate analysis using AI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.3,
    })

    // Parse the AI response
    let analysisData
    try {
      analysisData = JSON.parse(text)
    } catch (parseError) {
      console.error("Failed to parse AI response:", text)
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "Failed to parse AI analysis response",
        },
        { status: 500 },
      )
    }

    // Create the final result
    const result: AnalysisResult = {
      id: `SYM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      condition: analysisData.condition,
      confidence: Math.min(Math.max(analysisData.confidence, 0), 100),
      severity: analysisData.severity,
      recommendations: Array.isArray(analysisData.recommendations) ? analysisData.recommendations : [],
      description: analysisData.description,
      urgency: analysisData.urgency,
      followUp: analysisData.followUp,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json<ApiResponse<AnalysisResult>>({
      success: true,
      data: result,
      message: "Symptom analysis completed successfully",
    })
  } catch (error) {
    console.error("Error in symptom analysis:", error)
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Internal server error during symptom analysis",
      },
      { status: 500 },
    )
  }
}
