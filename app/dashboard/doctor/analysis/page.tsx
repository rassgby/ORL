"use client"

import { useState } from "react"
import { DoctorSidebar } from "@/components/doctor-sidebar"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  AlertTriangle,
  Clock,
  Camera,
  Mic,
  FileText,
  User,
  Calendar,
  Bell,
  Download,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react"

export default function DoctorAnalysisPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const analyses = [
    {
      id: 1,
      patient: "Marie Dubois",
      type: "image",
      title: "Analyse de l'oreille droite",
      date: "2024-01-10",
      time: "14:30",
      result: "Otite moyenne aiguë",
      confidence: 85,
      status: "pending",
      severity: "moderate",
      description: "Inflammation visible du tympan avec présence de liquide dans l'oreille moyenne.",
      recommendations: ["Prescription d'antibiotiques", "Suivi dans 7 jours", "Éviter l'exposition à l'eau"],
    },
    {
      id: 2,
      patient: "Jean Martin",
      type: "audio",
      title: "Test vocal - Enrouement",
      date: "2024-01-08",
      time: "10:15",
      result: "Laryngite chronique",
      confidence: 78,
      status: "reviewed",
      severity: "mild",
      description: "Altération de la voix suggérant une inflammation chronique des cordes vocales.",
      recommendations: ["Repos vocal", "Hydratation importante", "Consultation phoniatre"],
    },
    {
      id: 3,
      patient: "Sophie Laurent",
      type: "symptoms",
      title: "Analyse symptômes nasaux",
      date: "2024-01-05",
      time: "16:45",
      result: "Rhinite allergique",
      confidence: 92,
      status: "urgent",
      severity: "mild",
      description: "Symptômes compatibles avec une rhinite allergique saisonnière.",
      recommendations: ["Antihistaminiques", "Éviter les allergènes", "Tests allergologiques"],
    },
    {
      id: 4,
      patient: "Pierre Moreau",
      type: "image",
      title: "Contrôle post-traitement",
      date: "2024-01-03",
      time: "11:20",
      result: "Guérison complète",
      confidence: 95,
      status: "approved",
      severity: "normal",
      description: "Évolution favorable, aucun signe d'inflammation résiduelle.",
      recommendations: ["Poursuite du traitement", "Contrôle dans 1 mois"],
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Camera className="h-4 w-4" />
      case "audio":
        return <Mic className="h-4 w-4" />
      case "symptoms":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">En attente</Badge>
        )
      case "reviewed":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Examiné</Badge>
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Validé</Badge>
      case "urgent":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Urgent</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "normal":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Normal</Badge>
      case "mild":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Léger</Badge>
      case "moderate":
        return (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">Modéré</Badge>
        )
      case "severe":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Sévère</Badge>
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "urgent":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Eye className="h-4 w-4 text-blue-600" />
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600"
    if (confidence >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 z-40 h-screen w-64">
        <DoctorSidebar />
      </div>

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white dark:bg-gray-950 px-4 md:px-6">
          <MobileSidebar>
            <DoctorSidebar />
          </MobileSidebar>
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-lg font-semibold text-orl-blue-700 dark:text-orl-blue-400">Analyses IA</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-600"></span>
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Doctor" />
              <AvatarFallback className="bg-orl-blue-200 text-orl-blue-700 dark:bg-orl-blue-900 dark:text-orl-blue-300">
                MD
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-4 md:p-6">
          {/* Mobile Search */}
          <div className="md:hidden space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {/* Liste des analyses */}
            <div className="lg:col-span-3 space-y-4">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all" className="text-xs md:text-sm">
                    Toutes
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="text-xs md:text-sm">
                    En attente
                  </TabsTrigger>
                  <TabsTrigger value="urgent" className="text-xs md:text-sm">
                    Urgentes
                  </TabsTrigger>
                  <TabsTrigger value="approved" className="text-xs md:text-sm">
                    Validées
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4 mt-4">
                  {analyses.map((analysis) => (
                    <Card key={analysis.id} className="border-orl-blue-100 dark:border-orl-blue-900/50">
                      <CardContent className="p-4 md:p-6">
                        <div className="space-y-4">
                          {/* En-tête */}
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="p-2 bg-orl-blue-100 dark:bg-orl-blue-900/20 rounded-lg flex-shrink-0">
                                {getTypeIcon(analysis.type)}
                              </div>
                              <div className="space-y-1 flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="font-medium">{analysis.title}</h3>
                                  {getStatusIcon(analysis.status)}
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                  <User className="h-3 w-3" />
                                  <span>{analysis.patient}</span>
                                  <Calendar className="h-3 w-3 ml-2" />
                                  <span>{new Date(analysis.date).toLocaleDateString("fr-FR")}</span>
                                  <Clock className="h-3 w-3 ml-2" />
                                  <span>{analysis.time}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              {getStatusBadge(analysis.status)}
                              {getSeverityBadge(analysis.severity)}
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Résultat */}
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                              <h4 className="font-medium">Diagnostic IA:</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Confiance:</span>
                                <span className={`font-medium ${getConfidenceColor(analysis.confidence)}`}>
                                  {analysis.confidence}%
                                </span>
                              </div>
                            </div>
                            <p className="text-sm font-medium text-orl-blue-800 dark:text-orl-blue-300 mb-2">
                              {analysis.result}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{analysis.description}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Niveau de confiance</span>
                                <span className={getConfidenceColor(analysis.confidence)}>{analysis.confidence}%</span>
                              </div>
                              <Progress value={analysis.confidence} className="h-2" />
                            </div>
                          </div>

                          {/* Recommandations */}
                          {analysis.recommendations && analysis.recommendations.length > 0 && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                              <h4 className="font-medium mb-2">Recommandations IA:</h4>
                              <ul className="text-sm space-y-1">
                                {analysis.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="text-orl-blue-600 mt-1">•</span>
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex flex-col md:flex-row gap-2 pt-2">
                            <Button size="sm" className="flex-1 md:flex-none">
                              <Eye className="h-4 w-4 mr-2" />
                              Examiner en détail
                            </Button>
                            {analysis.status === "pending" && (
                              <>
                                <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Valider
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                                  <AlertTriangle className="h-4 w-4 mr-2" />
                                  Marquer urgent
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contacter patient
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                              <Download className="h-4 w-4 mr-2" />
                              Télécharger
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="pending" className="space-y-4 mt-4">
                  {analyses
                    .filter((a) => a.status === "pending")
                    .map((analysis) => (
                      <Card key={analysis.id} className="border-yellow-200 dark:border-yellow-800">
                        <CardContent className="p-4 md:p-6">
                          <div className="text-center py-4">
                            <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Analyses en attente de validation</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>

                <TabsContent value="urgent" className="space-y-4 mt-4">
                  {analyses
                    .filter((a) => a.status === "urgent")
                    .map((analysis) => (
                      <Card key={analysis.id} className="border-red-200 dark:border-red-800">
                        <CardContent className="p-4 md:p-6">
                          <div className="text-center py-4">
                            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Analyses urgentes nécessitant attention immédiate
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>

                <TabsContent value="approved" className="space-y-4 mt-4">
                  {analyses
                    .filter((a) => a.status === "approved")
                    .map((analysis) => (
                      <Card key={analysis.id} className="border-green-200 dark:border-green-800">
                        <CardContent className="p-4 md:p-6">
                          <div className="text-center py-4">
                            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Analyses validées et traitées</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar droite */}
            <div className="space-y-4">
              {/* Statistiques */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-orl-blue-600" />
                    Statistiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total analyses</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>En attente</span>
                      <span className="font-medium text-yellow-600">12</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Urgentes</span>
                      <span className="font-medium text-red-600">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Validées</span>
                      <span className="font-medium text-green-600">141</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Types d'analyses */}
              <Card>
                <CardHeader>
                  <CardTitle>Types d&apos;analyses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Images</span>
                    </div>
                    <Badge variant="outline">89</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Mic className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Audio</span>
                    </div>
                    <Badge variant="outline">34</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">Symptômes</span>
                    </div>
                    <Badge variant="outline">33</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Actions rapides */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Voir en attente
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Cas urgents
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export rapport
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
