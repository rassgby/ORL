"use client"

import type React from "react"

import { useState, useRef } from "react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useAIAnalysis } from "@/hooks/use-ai-analysis"
import {
  Camera,
  Upload,
  Mic,
  MicOff,
  Play,
  Square,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  Bell,
  X,
  RotateCcw,
} from "lucide-react"

export default function PatientDetectionPage() {
  const [activeTab, setActiveTab] = useState("image")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [symptoms, setSymptoms] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const { analyzeImage, analyzeSymptoms, analyzeAudio, isLoading, error, result, clearResult } = useAIAnalysis()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleImageAnalysis = async () => {
    if (selectedFile) {
      await analyzeImage(selectedFile)
    }
  }

  const handleSymptomsAnalysis = async () => {
    if (symptoms.trim()) {
      await analyzeSymptoms(symptoms)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" })
        setAudioBlob(blob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error starting recording:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
    }
  }

  const handleAudioAnalysis = async () => {
    if (audioBlob) {
      await analyzeAudio(audioBlob)
    }
  }

  const clearFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const clearAudio = () => {
    setAudioBlob(null)
    setRecordingTime(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getResultIcon = (confidence: number) => {
    if (confidence >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />
    if (confidence >= 60) return <AlertCircle className="h-5 w-5 text-yellow-600" />
    return <AlertCircle className="h-5 w-5 text-red-600" />
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600"
    if (confidence >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Camera className="h-4 w-4" />
      case "symptoms":
        return <FileText className="h-4 w-4" />
      case "audio":
        return <Mic className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 z-40 h-screen w-64">
        <PatientSidebar />
      </div>

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white dark:bg-gray-950 px-4 md:px-6">
          <MobileSidebar>
            <PatientSidebar />
          </MobileSidebar>
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-lg font-semibold text-orl-blue-700 dark:text-orl-blue-400">Détection IA</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-600"></span>
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback className="bg-orl-blue-200 text-orl-blue-700 dark:bg-orl-blue-900 dark:text-orl-blue-300">
                JP
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-4 md:p-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="image" className="text-xs md:text-sm">
                    <Camera className="h-4 w-4 mr-1 md:mr-2" />
                    <span className="hidden md:inline">Image</span>
                  </TabsTrigger>
                  <TabsTrigger value="symptoms" className="text-xs md:text-sm">
                    <FileText className="h-4 w-4 mr-1 md:mr-2" />
                    <span className="hidden md:inline">Symptômes</span>
                  </TabsTrigger>
                  <TabsTrigger value="audio" className="text-xs md:text-sm">
                    <Mic className="h-4 w-4 mr-1 md:mr-2" />
                    <span className="hidden md:inline">Audio</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="image" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Camera className="h-5 w-5 text-orl-blue-600" />
                        Analyse d&apos;image
                      </CardTitle>
                      <CardDescription>Téléchargez une image de la zone ORL à analyser</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {!selectedFile ? (
                        <div
                          className="border-2 border-dashed border-orl-blue-200 dark:border-orl-blue-800 rounded-lg p-8 md:p-12 text-center hover:border-orl-blue-300 dark:hover:border-orl-blue-700 transition-colors cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <div className="flex flex-col items-center gap-4">
                            <Upload className="h-12 w-12 md:h-16 md:w-16 text-orl-blue-600 dark:text-orl-blue-400" />
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold text-orl-blue-800 dark:text-orl-blue-300">
                                Télécharger une image
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Glissez-déposez ou cliquez pour sélectionner
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Formats acceptés: JPG, PNG, WEBP (max 10MB)
                              </p>
                            </div>
                            <Button className="w-full md:w-auto">Sélectionner un fichier</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="relative">
                            <img
                              src={previewUrl || ""}
                              alt="Preview"
                              className="w-full max-h-64 md:max-h-96 object-contain rounded-lg border"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={clearFile}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex flex-col md:flex-row gap-2">
                            <Button onClick={handleImageAnalysis} disabled={isLoading} className="flex-1">
                              {isLoading ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              ) : (
                                <Camera className="h-4 w-4 mr-2" />
                              )}
                              Analyser l&apos;image
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              className="flex-1 md:flex-none"
                            >
                              <RotateCcw className="h-4 w-4 mr-2" />
                              Changer
                            </Button>
                          </div>
                        </div>
                      )}

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="symptoms" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-orl-blue-600" />
                        Analyse des symptômes
                      </CardTitle>
                      <CardDescription>Décrivez vos symptômes en détail pour une analyse personnalisée</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description des symptômes</label>
                        <textarea
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                          placeholder="Décrivez vos symptômes en détail (douleur, durée, localisation, intensité, facteurs déclenchants, etc.)"
                          className="min-h-[120px] md:min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orl-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <p className="text-xs text-muted-foreground">
                          Plus votre description est détaillée, plus l&apos;analyse sera précise.
                        </p>
                      </div>

                      <Button
                        onClick={handleSymptomsAnalysis}
                        disabled={isLoading || !symptoms.trim()}
                        className="w-full"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <FileText className="h-4 w-4 mr-2" />
                        )}
                        Analyser les symptômes
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="audio" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mic className="h-5 w-5 text-orl-blue-600" />
                        Analyse audio
                      </CardTitle>
                      <CardDescription>
                        Enregistrez votre voix pour analyser d&apos;éventuels problèmes vocaux
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {!audioBlob ? (
                        <div className="text-center space-y-4">
                          <div className="flex flex-col items-center gap-4 p-8 md:p-12 border-2 border-dashed border-orl-blue-200 dark:border-orl-blue-800 rounded-lg">
                            <div className="relative">
                              <div
                                className={`h-16 w-16 md:h-20 md:w-20 rounded-full flex items-center justify-center transition-colors ${
                                  isRecording
                                    ? "bg-red-100 text-red-600 animate-pulse"
                                    : "bg-orl-blue-100 text-orl-blue-600"
                                }`}
                              >
                                {isRecording ? (
                                  <MicOff className="h-8 w-8 md:h-10 md:w-10" />
                                ) : (
                                  <Mic className="h-8 w-8 md:h-10 md:w-10" />
                                )}
                              </div>
                              {isRecording && (
                                <div className="absolute -inset-2 border-2 border-red-300 rounded-full animate-ping"></div>
                              )}
                            </div>

                            {isRecording && (
                              <div className="text-center">
                                <div className="text-2xl font-mono font-bold text-red-600">
                                  {formatTime(recordingTime)}
                                </div>
                                <p className="text-sm text-muted-foreground">Enregistrement en cours...</p>
                              </div>
                            )}

                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold text-orl-blue-800 dark:text-orl-blue-300">
                                {isRecording ? "Enregistrement..." : "Enregistrer votre voix"}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {isRecording
                                  ? "Parlez clairement dans votre microphone"
                                  : "Cliquez pour commencer l'enregistrement"}
                              </p>
                            </div>

                            <Button
                              onClick={isRecording ? stopRecording : startRecording}
                              variant={isRecording ? "destructive" : "default"}
                              size="lg"
                              className="w-full md:w-auto"
                            >
                              {isRecording ? (
                                <>
                                  <Square className="h-4 w-4 mr-2" />
                                  Arrêter l&apos;enregistrement
                                </>
                              ) : (
                                <>
                                  <Mic className="h-4 w-4 mr-2" />
                                  Commencer l&apos;enregistrement
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Enregistrement audio</span>
                              <span className="text-sm text-muted-foreground">{formatTime(recordingTime)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Play className="h-4 w-4" />
                              </Button>
                              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                <div className="h-2 bg-orl-blue-600 rounded-full w-0"></div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row gap-2">
                            <Button onClick={handleAudioAnalysis} disabled={isLoading} className="flex-1">
                              {isLoading ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              ) : (
                                <Mic className="h-4 w-4 mr-2" />
                              )}
                              Analyser l&apos;audio
                            </Button>
                            <Button variant="outline" onClick={clearAudio} className="flex-1 md:flex-none">
                              <RotateCcw className="h-4 w-4 mr-2" />
                              Nouvel enregistrement
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Résultats */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-orl-blue-600" />
                    Résultats de l&apos;analyse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orl-blue-600" />
                      <p className="text-sm text-muted-foreground">Analyse en cours...</p>
                      <Progress value={33} className="mt-4" />
                    </div>
                  ) : result ? (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        {getResultIcon(result.confidence)}
                        <div className="flex-1">
                          <h3 className="font-medium">{result.diagnosis}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{result.description}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Niveau de confiance</span>
                          <span className={getConfidenceColor(result.confidence)}>{result.confidence}%</span>
                        </div>
                        <Progress value={result.confidence} className="h-2" />
                      </div>

                      {result.recommendations && result.recommendations.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Recommandations:</h4>
                          <ul className="text-sm space-y-1">
                            {result.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-orl-blue-600 mt-1">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex flex-col gap-2 pt-2">
                        <Button size="sm" className="w-full">
                          Prendre rendez-vous
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          Sauvegarder le résultat
                        </Button>
                        <Button size="sm" variant="ghost" onClick={clearResult} className="w-full">
                          Nouvelle analyse
                        </Button>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="text-center py-8">
                      <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
                      <p className="text-sm text-red-600 mb-4">{error}</p>
                      <Button size="sm" variant="outline" onClick={clearResult}>
                        Réessayer
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Sélectionnez un type d&apos;analyse pour commencer
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Historique récent */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Analyses récentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      type: "image",
                      result: "Otite moyenne",
                      date: "Il y a 2 jours",
                      confidence: 85,
                    },
                    {
                      type: "symptoms",
                      result: "Rhinite allergique",
                      date: "Il y a 1 semaine",
                      confidence: 78,
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg border">
                      <div className="p-1 bg-orl-blue-100 dark:bg-orl-blue-900/20 rounded">
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.result}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.confidence}%
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
