"use client"

import { useState } from "react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Calendar,
  Download,
  Eye,
  Search,
  Filter,
  Camera,
  Mic,
  Video,
  User,
  Clock,
  CheckCircle,
  Info,
  Bell,
} from "lucide-react"

export default function PatientHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const analysisHistory = [
    {
      id: 1,
      type: "image",
      title: "Analyse de l'oreille droite",
      date: "2024-01-10",
      time: "14:30",
      doctor: "Dr. Martin Dubois",
      result: "Otite moyenne aiguë",
      confidence: 85,
      status: "completed",
      severity: "moderate",
    },
    {
      id: 2,
      type: "audio",
      title: "Test vocal - Enrouement",
      date: "2024-01-05",
      time: "10:15",
      doctor: "Dr. Sophie Laurent",
      result: "Laryngite chronique",
      confidence: 78,
      status: "reviewed",
      severity: "mild",
    },
    {
      id: 3,
      type: "video",
      title: "Examen de la gorge",
      date: "2023-12-28",
      time: "16:45",
      doctor: "Dr. Pierre Moreau",
      result: "Pharyngite virale",
      confidence: 92,
      status: "completed",
      severity: "mild",
    },
    {
      id: 4,
      type: "image",
      title: "Contrôle post-traitement",
      date: "2023-12-15",
      time: "11:20",
      doctor: "Dr. Marie Leroy",
      result: "Guérison complète",
      confidence: 95,
      status: "completed",
      severity: "normal",
    },
  ]

  const consultationHistory = [
    {
      id: 1,
      doctor: "Dr. Martin Dubois",
      specialty: "ORL",
      date: "2024-01-08",
      time: "16:00",
      type: "Suivi post-opératoire",
      diagnosis: "Récupération normale après tympanoplastie",
      prescription: "Gouttes auriculaires - 7 jours",
      nextAppointment: "2024-02-08",
    },
    {
      id: 2,
      doctor: "Dr. Sophie Laurent",
      specialty: "Audiologie",
      date: "2023-12-20",
      time: "11:30",
      type: "Test auditif complet",
      diagnosis: "Perte auditive légère haute fréquence",
      prescription: "Protection auditive recommandée",
      nextAppointment: "2024-06-20",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Camera className="h-4 w-4" />
      case "audio":
        return <Mic className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
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
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "reviewed":
        return <Eye className="h-4 w-4 text-blue-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Info className="h-4 w-4 text-gray-600" />
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
            <h1 className="text-lg font-semibold text-orl-blue-700 dark:text-orl-blue-400">Mon Historique</h1>
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
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback className="bg-orl-blue-200 text-orl-blue-700 dark:bg-orl-blue-900 dark:text-orl-blue-300">
                JP
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

          <Tabs defaultValue="analyses" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="analyses" className="text-sm">
                Analyses IA
              </TabsTrigger>
              <TabsTrigger value="consultations" className="text-sm">
                Consultations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analyses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-orl-blue-600" />
                    Historique des analyses IA
                  </CardTitle>
                  <CardDescription>Toutes vos analyses effectuées avec l'intelligence artificielle</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisHistory.map((analysis) => (
                    <div key={analysis.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="p-2 bg-orl-blue-100 dark:bg-orl-blue-900/20 rounded-lg flex-shrink-0">
                            {getTypeIcon(analysis.type)}
                          </div>
                          <div className="space-y-1 min-w-0 flex-1">
                            <h3 className="font-medium">{analysis.title}</h3>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="h-3 w-3 flex-shrink-0" />
                              <span>{new Date(analysis.date).toLocaleDateString("fr-FR")}</span>
                              <Clock className="h-3 w-3 ml-2 flex-shrink-0" />
                              <span>{analysis.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-3 w-3 flex-shrink-0" />
                              <span>{analysis.doctor}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {getStatusIcon(analysis.status)}
                          {getSeverityBadge(analysis.severity)}
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                          <span className="text-sm font-medium">Résultat:</span>
                          <Badge variant="outline">Confiance: {analysis.confidence}%</Badge>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{analysis.result}</p>
                      </div>

                      <div className="flex flex-col md:flex-row gap-2">
                        <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir détails
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="consultations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-orl-blue-600" />
                    Historique des consultations
                  </CardTitle>
                  <CardDescription>Vos consultations avec les professionnels de santé</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {consultationHistory.map((consultation) => (
                    <div key={consultation.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <Avatar className="h-10 w-10 flex-shrink-0">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={consultation.doctor} />
                            <AvatarFallback className="bg-orl-blue-200 text-orl-blue-700 dark:bg-orl-blue-900 dark:text-orl-blue-300 text-xs">
                              {consultation.doctor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1 min-w-0 flex-1">
                            <h3 className="font-medium">{consultation.doctor}</h3>
                            <Badge variant="outline" className="text-xs">
                              {consultation.specialty}
                            </Badge>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="h-3 w-3 flex-shrink-0" />
                              <span>{new Date(consultation.date).toLocaleDateString("fr-FR")}</span>
                              <Clock className="h-3 w-3 ml-2 flex-shrink-0" />
                              <span>{consultation.time}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          {consultation.type}
                        </Badge>
                      </div>

                      <div className="grid gap-3">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <h4 className="text-sm font-medium mb-1">Diagnostic:</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{consultation.diagnosis}</p>
                        </div>

                        {consultation.prescription && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                            <h4 className="text-sm font-medium mb-1">Prescription:</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300">{consultation.prescription}</p>
                          </div>
                        )}

                        {consultation.nextAppointment && (
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                            <h4 className="text-sm font-medium mb-1">Prochain rendez-vous:</h4>
                            <p className="text-sm text-green-700 dark:text-green-300">
                              {new Date(consultation.nextAppointment).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col md:flex-row gap-2">
                        <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir détails
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger rapport
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
