"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Upload, Brain, Search, AlertCircle, CheckCircle, Info, FileText, Camera } from "lucide-react"
import { DoctorSidebar } from "@/components/doctor-sidebar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea as TextareaComponent } from "@/components/ui/textarea"
import { Progress as ProgressComponent } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAIAnalysis } from "@/hooks/use-ai-analysis"
import { fileToBase64 } from "@/lib/image-utils"
import type { AnalysisResult } from "@/types/ai-analysis"

export default function AIScanPage() {
  const [activeTab, setActiveTab] = useState("image-analysis")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { analyzeImage, analyzeSymptoms, isAnalyzing, error } = useAIAnalysis()
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Reset analysis state
      setAnalysisResult(null)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    try {
      const imageData = await fileToBase64(selectedFile)

      const result = await analyzeImage({
        imageData,
        imageType: "ear", // Could be made dynamic based on selection
        notes: document.getElementById("notes")?.value || undefined,
      })

      if (result) {
        setAnalysisResult(result)
      }
    } catch (error) {
      console.error("Error during analysis:", error)
    }
  }

  const handleSymptomAnalysis = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)

    const result = await analyzeSymptoms({
      patientName: formData.get("patient-name") as string,
      age: Number.parseInt(formData.get("patient-age") as string),
      gender: formData.get("patient-gender") as "male" | "female" | "other",
      symptoms: [], // Would need to collect from checkboxes
      description: formData.get("symptoms-description") as string,
      duration: Number.parseInt(formData.get("symptom-duration") as string),
      durationUnit: "days",
      area: formData.get("symptom-area") as "ear" | "throat" | "nose" | "sinus" | "multiple",
      medicalHistory: formData.get("medical-history") as string,
    })

    if (result) {
      setAnalysisResult(result)
    }
  }

  const resetAnalysis = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setAnalysisResult(null)
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DoctorSidebar />

      <div className="flex-1 ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-lg font-semibold text-orl-blue-800 dark:text-orl-blue-300">Analyse IA</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-600"></span>
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dr. Martin" />
              <AvatarFallback>DM</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="grid flex-1 items-start gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center">
            <div className="flex items-center gap-2 bg-orl-blue-50 dark:bg-orl-blue-900/20 px-3 py-1 rounded-full">
              <Brain className="h-4 w-4 text-orl-blue-600 dark:text-orl-blue-400" />
              <span className="text-sm font-medium text-orl-blue-700 dark:text-orl-blue-300">
                Intelligence Artificielle pour la détection ORL
              </span>
            </div>
          </div>

          <Tabs defaultValue="image-analysis" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="image-analysis">Analyse d&apos;images</TabsTrigger>
              <TabsTrigger value="symptom-analysis">Analyse de symptômes</TabsTrigger>
              <TabsTrigger value="history">Historique des analyses</TabsTrigger>
            </TabsList>

            <TabsContent value="image-analysis" className="space-y-4">
              <Card className="border-orl-blue-100 dark:border-orl-blue-900/50">
                <CardHeader>
                  <CardTitle className="text-orl-blue-800 dark:text-orl-blue-300">
                    Analyse d&apos;images médicales
                  </CardTitle>
                  <CardDescription>
                    Téléchargez une image médicale pour une analyse par notre IA spécialisée en ORL
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      {!previewUrl ? (
                        <div
                          className="rounded-lg border-2 border-dashed border-orl-blue-200 dark:border-orl-blue-800 p-12 text-center hover:border-orl-blue-300 dark:hover:border-orl-blue-700 transition-colors"
                          onClick={() => document.getElementById("image-upload")?.click()}
                        >
                          <div className="flex flex-col items-center gap-2 cursor-pointer">
                            <div className="p-3 rounded-full bg-orl-blue-100 dark:bg-orl-blue-900/50">
                              <Upload className="h-8 w-8 text-orl-blue-600 dark:text-orl-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-orl-blue-800 dark:text-orl-blue-300">
                              Télécharger une image
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Glissez-déposez ou cliquez pour sélectionner
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">Formats acceptés: JPG, PNG, DICOM</p>
                            <input
                              id="image-upload"
                              type="file"
                              className="hidden"
                              accept="image/jpeg,image/png,image/dicom"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="relative rounded-lg overflow-hidden border border-orl-blue-200 dark:border-orl-blue-800">
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="Image à analyser"
                              className="w-full h-auto max-h-[300px] object-contain"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 rounded-full"
                              onClick={resetAnalysis}
                            >
                              <span className="sr-only">Supprimer</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-x"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="image-type">Type d&apos;image</Label>
                              <span className="text-xs text-muted-foreground">{selectedFile?.name}</span>
                            </div>
                            <Select defaultValue="ear">
                              <SelectTrigger id="image-type">
                                <SelectValue placeholder="Sélectionnez le type d'image" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ear">Oreille</SelectItem>
                                <SelectItem value="throat">Gorge</SelectItem>
                                <SelectItem value="nose">Nez</SelectItem>
                                <SelectItem value="sinus">Sinus</SelectItem>
                                <SelectItem value="other">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="patient-id">ID du patient (optionnel)</Label>
                            <Input id="patient-id" placeholder="Entrez l'ID du patient" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="notes">Notes (optionnel)</Label>
                            <TextareaComponent id="notes" placeholder="Ajoutez des notes ou contexte" />
                          </div>

                          <Button
                            className="w-full bg-orl-blue-600 hover:bg-orl-blue-700 dark:bg-orl-blue-600 dark:hover:bg-orl-blue-500"
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                          >
                            {isAnalyzing ? (
                              <>
                                <Brain className="mr-2 h-4 w-4 animate-pulse" />
                                Analyse en cours...
                              </>
                            ) : (
                              <>
                                <Brain className="mr-2 h-4 w-4" />
                                Analyser l&apos;image
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {isAnalyzing ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-4 p-6 border rounded-lg">
                          <div className="w-16 h-16 rounded-full bg-orl-blue-100 dark:bg-orl-blue-900/50 flex items-center justify-center">
                            <Brain className="h-8 w-8 text-orl-blue-600 dark:text-orl-blue-400 animate-pulse" />
                          </div>
                          <h3 className="text-lg font-semibold text-orl-blue-800 dark:text-orl-blue-300">
                            Analyse en cours
                          </h3>
                          <div className="w-full space-y-2">
                            <ProgressComponent value={0} className="w-full" />
                            <p className="text-center text-sm text-muted-foreground">
                              0% - Détection des caractéristiques...
                            </p>
                          </div>
                        </div>
                      ) : analysisResult ? (
                        <div className="h-full border rounded-lg overflow-hidden">
                          <div className="bg-orl-blue-50 dark:bg-orl-blue-900/20 p-4 border-b border-orl-blue-100 dark:border-orl-blue-900/50">
                            <h3 className="text-lg font-semibold text-orl-blue-800 dark:text-orl-blue-300">
                              Résultats de l&apos;analyse
                            </h3>
                          </div>
                          <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Condition détectée</p>
                                <p className="text-xl font-semibold text-orl-blue-800 dark:text-orl-blue-300">
                                  {analysisResult.condition}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-right">
                                  <p className="text-sm text-muted-foreground">Confiance</p>
                                  <p className="font-semibold text-orl-blue-800 dark:text-orl-blue-300">
                                    {analysisResult.confidence}%
                                  </p>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <AlertCircle
                                  className={cn(
                                    "h-5 w-5",
                                    analysisResult.severity === "low"
                                      ? "text-green-600 dark:text-green-400"
                                      : analysisResult.severity === "medium"
                                        ? "text-amber-600 dark:text-amber-400"
                                        : "text-red-600 dark:text-red-400",
                                  )}
                                />
                                <p className="font-medium">
                                  Sévérité:{" "}
                                  {analysisResult.severity === "low"
                                    ? "Faible"
                                    : analysisResult.severity === "medium"
                                      ? "Moyenne"
                                      : "Élevée"}
                                </p>
                              </div>

                              <div className="pl-7">
                                <Badge
                                  className={cn(
                                    analysisResult.severity === "low"
                                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                      : analysisResult.severity === "medium"
                                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                                  )}
                                >
                                  {analysisResult.severity === "low"
                                    ? "Traitement simple"
                                    : analysisResult.severity === "medium"
                                      ? "Nécessite attention"
                                      : "Intervention urgente"}
                                </Badge>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <p className="font-medium flex items-center gap-2">
                                <Info className="h-5 w-5 text-orl-blue-600 dark:text-orl-blue-400" />
                                Recommandations
                              </p>
                              <ul className="space-y-1 pl-7">
                                {analysisResult.recommendations.map((rec, index) => (
                                  <li key={index} className="text-sm flex items-start gap-2">
                                    <span className="text-orl-blue-600 dark:text-orl-blue-400">•</span>
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="pt-4 flex flex-col gap-2">
                              <Button className="bg-orl-blue-600 hover:bg-orl-blue-700 dark:bg-orl-blue-600 dark:hover:bg-orl-blue-500">
                                <FileText className="mr-2 h-4 w-4" />
                                Générer un rapport
                              </Button>
                              <Button variant="outline">Nouvelle analyse</Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center space-y-4 p-6 border rounded-lg border-dashed">
                          <div className="w-16 h-16 rounded-full bg-orl-blue-100 dark:bg-orl-blue-900/50 flex items-center justify-center">
                            <Brain className="h-8 w-8 text-orl-blue-600 dark:text-orl-blue-400" />
                          </div>
                          <div className="text-center space-y-2">
                            <h3 className="text-lg font-semibold text-orl-blue-800 dark:text-orl-blue-300">
                              Prêt pour l&apos;analyse
                            </h3>
                            <p className="text-sm text-muted-foreground max-w-xs">
                              Téléchargez une image pour commencer l&apos;analyse IA et obtenir un diagnostic rapide
                            </p>
                          </div>
                          <div className="grid grid-cols-3 gap-4 w-full mt-4">
                            <div className="col-span-1 p-3 border rounded-lg text-center">
                              <div className="text-2xl font-bold text-orl-blue-700 dark:text-orl-blue-400">98%</div>
                              <p className="text-xs text-muted-foreground">Précision</p>
                            </div>
                            <div className="col-span-1 p-3 border rounded-lg text-center">
                              <div className="text-2xl font-bold text-orl-blue-700 dark:text-orl-blue-400">&lt;30s</div>
                              <p className="text-xs text-muted-foreground">Temps d&apos;analyse</p>
                            </div>
                            <div className="col-span-1 p-3 border rounded-lg text-center">
                              <div className="text-2xl font-bold text-orl-blue-700 dark:text-orl-blue-400">24/7</div>
                              <p className="text-xs text-muted-foreground">Disponibilité</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="symptom-analysis" className="space-y-4">
              <Card className="border-orl-blue-100 dark:border-orl-blue-900/50">
                <CardHeader>
                  <CardTitle className="text-orl-blue-800 dark:text-orl-blue-300">Analyse de symptômes</CardTitle>
                  <CardDescription>
                    Décrivez les symptômes du patient pour obtenir une analyse par notre IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSymptomAnalysis} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="patient-name">Nom du patient</Label>
                          <Input id="patient-name" placeholder="Nom du patient" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="patient-age">Âge</Label>
                          <Input id="patient-age" type="number" placeholder="Âge du patient" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="patient-gender">Genre</Label>
                          <Select defaultValue="female">
                            <SelectTrigger id="patient-gender">
                              <SelectValue placeholder="Sélectionnez le genre" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Homme</SelectItem>
                              <SelectItem value="female">Femme</SelectItem>
                              <SelectItem value="other">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="symptom-duration">Durée des symptômes</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <Input id="symptom-duration" type="number" placeholder="Durée" />
                            <Select defaultValue="days">
                              <SelectTrigger>
                                <SelectValue placeholder="Unité" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hours">Heures</SelectItem>
                                <SelectItem value="days">Jours</SelectItem>
                                <SelectItem value="weeks">Semaines</SelectItem>
                                <SelectItem value="months">Mois</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="symptom-area">Zone concernée</Label>
                          <Select defaultValue="ear">
                            <SelectTrigger id="symptom-area">
                              <SelectValue placeholder="Sélectionnez la zone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ear">Oreille</SelectItem>
                              <SelectItem value="throat">Gorge</SelectItem>
                              <SelectItem value="nose">Nez</SelectItem>
                              <SelectItem value="sinus">Sinus</SelectItem>
                              <SelectItem value="multiple">Plusieurs zones</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="symptoms-description">Description des symptômes</Label>
                          <TextareaComponent
                            id="symptoms-description"
                            placeholder="Décrivez en détail les symptômes du patient..."
                            className="min-h-[150px]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Symptômes principaux</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="symptom-pain" />
                              <label htmlFor="symptom-pain" className="text-sm">
                                Douleur
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="symptom-fever" />
                              <label htmlFor="symptom-fever" className="text-sm">
                                Fièvre
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="symptom-discharge" />
                              <label htmlFor="symptom-discharge" className="text-sm">
                                Écoulement
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="symptom-hearing-loss" />
                              <label htmlFor="symptom-hearing-loss" className="text-sm">
                                Perte auditive
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="symptom-congestion" />
                              <label htmlFor="symptom-congestion" className="text-sm">
                                Congestion
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="symptom-dizziness" />
                              <label htmlFor="symptom-dizziness" className="text-sm">
                                Vertiges
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="medical-history">Antécédents médicaux pertinents</Label>
                          <TextareaComponent id="medical-history" placeholder="Antécédents médicaux pertinents..." />
                        </div>

                        <Button
                          type="submit"
                          className="w-full mt-4 bg-orl-blue-600 hover:bg-orl-blue-700 dark:bg-orl-blue-600 dark:hover:bg-orl-blue-500"
                        >
                          <Brain className="mr-2 h-4 w-4" />
                          Analyser les symptômes
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card className="border-orl-blue-100 dark:border-orl-blue-900/50">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle className="text-orl-blue-800 dark:text-orl-blue-300">
                      Historique des analyses IA
                    </CardTitle>
                    <CardDescription>Consultez l&apos;historique des analyses effectuées par l&apos;IA</CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Rechercher..." className="pl-8 w-[200px]" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Filtrer par" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les types</SelectItem>
                        <SelectItem value="image">Analyses d&apos;images</SelectItem>
                        <SelectItem value="symptom">Analyses de symptômes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: "A-12345",
                        type: "image",
                        date: "13 juin 2025, 14:30",
                        patient: "Marie Dubois",
                        condition: "Otite moyenne aiguë",
                        confidence: 92,
                        severity: "medium",
                      },
                      {
                        id: "A-12344",
                        type: "symptom",
                        date: "13 juin 2025, 11:15",
                        patient: "Thomas Bernard",
                        condition: "Pharyngite aiguë",
                        confidence: 87,
                        severity: "low",
                      },
                      {
                        id: "A-12343",
                        type: "image",
                        date: "12 juin 2025, 16:45",
                        patient: "Sophie Martin",
                        condition: "Sinusite chronique",
                        confidence: 94,
                        severity: "high",
                      },
                      {
                        id: "A-12342",
                        type: "image",
                        date: "12 juin 2025, 09:20",
                        patient: "Pierre Leroy",
                        condition: "Tympanosclérose",
                        confidence: 89,
                        severity: "low",
                      },
                      {
                        id: "A-12341",
                        type: "symptom",
                        date: "11 juin 2025, 15:10",
                        patient: "Lucie Petit",
                        condition: "Rhinite allergique",
                        confidence: 91,
                        severity: "medium",
                      },
                    ].map((analysis) => (
                      <div
                        key={analysis.id}
                        className="flex items-center justify-between rounded-lg border p-4 card-hover"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-full",
                              analysis.type === "image"
                                ? "bg-orl-blue-100 text-orl-blue-700 dark:bg-orl-blue-900/50 dark:text-orl-blue-300"
                                : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
                            )}
                          >
                            {analysis.type === "image" ? (
                              <Camera className="h-5 w-5" />
                            ) : (
                              <FileText className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">
                                {analysis.patient} - {analysis.condition}
                              </p>
                              <Badge
                                variant="outline"
                                className={cn(
                                  analysis.severity === "low"
                                    ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30"
                                    : analysis.severity === "medium"
                                      ? "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30"
                                      : "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30",
                                )}
                              >
                                {analysis.severity === "low"
                                  ? "Faible"
                                  : analysis.severity === "medium"
                                    ? "Moyenne"
                                    : "Élevée"}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span>{analysis.date}</span>
                              <span className="mx-1">•</span>
                              <span>ID: {analysis.id}</span>
                              <span className="mx-1">•</span>
                              <span>Confiance: {analysis.confidence}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Voir le rapport
                          </Button>
                          <Button
                            size="sm"
                            className="bg-orl-blue-600 hover:bg-orl-blue-700 dark:bg-orl-blue-600 dark:hover:bg-orl-blue-500"
                          >
                            Détails
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full items-center justify-center gap-2">
                    <Button variant="outline" size="sm">
                      Précédent
                    </Button>
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Suivant
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}

function Checkbox({ id, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      id={id}
      className="h-4 w-4 rounded border-gray-300 text-orl-blue-600 focus:ring-orl-blue-500"
      {...props}
    />
  )
}

function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

function Progress({
  value = 0,
  className,
  ...props
}: { value?: number; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-orl-blue-100 dark:bg-orl-blue-900/50",
        className,
      )}
      {...props}
    >
      <div className="h-full bg-orl-blue-600 dark:bg-orl-blue-400 transition-all" style={{ width: `${value}%` }} />
    </div>
  )
}
