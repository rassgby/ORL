import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { ImageAnalysisRequest, AnalysisResult, ApiResponse } from "@/types/ai-analysis"

export async function POST(request: NextRequest) {
  try {
    const body: ImageAnalysisRequest = await request.json()
    const { imageData, imageType, patientId, notes } = body

    if (!imageData) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "Image data is required",
        },
        { status: 400 },
      )
    }

    // Construct the prompt based on image type
    const getPromptForImageType = (type: string) => {
      const basePrompt = `Tu es un médecin ORL expert spécialisé dans l'analyse d'images médicales. Analyse cette image médicale de ${type} et fournis un diagnostic préliminaire.`

      const specificPrompts = {
        ear: `${basePrompt} Recherche des signes d'otite, de perforation tympanique, de cérumen, d'inflammation, ou d'autres pathologies auriculaires.`,
        throat: `${basePrompt} Examine la gorge pour détecter des signes d'inflammation, d'infection, d'amygdalite, de pharyngite, ou d'autres pathologies pharyngées.`,
        nose: `${basePrompt} Analyse les voies nasales pour identifier une rhinite, une sinusite, des polypes, une déviation septale, ou d'autres pathologies nasales.`,
        sinus: `${basePrompt} Examine les sinus pour détecter une sinusite, des obstructions, des inflammations, ou d'autres pathologies sinusiennes.`,
        other: `${basePrompt} Analyse cette image ORL et identifie toute pathologie visible.`,
      }

      return specificPrompts[type as keyof typeof specificPrompts] || specificPrompts.other
    }

    const prompt = `${getPromptForImageType(imageType)}

${notes ? `Notes du patient/médecin: ${notes}` : ""}

Réponds UNIQUEMENT au format JSON suivant (sans markdown ni backticks):
{
  "condition": "Nom de la condition détectée",
  "confidence": nombre entre 0 et 100,
  "severity": "low" | "medium" | "high",
  "description": "Description détaillée de ce qui est observé",
  "recommendations": ["recommandation 1", "recommandation 2", "recommandation 3"],
  "urgency": "routine" | "urgent" | "emergency",
  "followUp": "Instructions de suivi"
}`

    // Generate analysis using AI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image",
              image: `data:image/jpeg;base64,${imageData}`,
            },
          ],
        },
      ],
      temperature: 0.3, // Lower temperature for more consistent medical analysis
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
      id: `IMG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      condition: analysisData.condition,
      confidence: Math.min(Math.max(analysisData.confidence, 0), 100), // Ensure 0-100 range
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
      message: "Image analysis completed successfully",
    })
  } catch (error) {
    console.error("Error in image analysis:", error)
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Internal server error during image analysis",
      },
      { status: 500 },
    )
  }
}
