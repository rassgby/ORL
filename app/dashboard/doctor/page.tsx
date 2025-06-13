"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { DoctorSidebar } from "@/components/doctor-sidebar"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Users, Calendar, Activity, Clock, AlertTriangle, FileText, Bell } from "lucide-react"

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const todayStats = {
    patients: 12,
    appointments: 8,
    analyses: 15,
    urgent: 2,
  }

  const recentAnalyses = [
    {
      id: 1,
      patient: "Marie Dubois",
      type: "Analyse auditive",
      result: "Perte auditive légère",
      confidence: 85,
      status: "pending",
      time: "14:30",
    },
    {
      id: 2,
      patient: "Jean Martin",
      type: "Analyse nasale",
      result: "Rhinite allergique",
      confidence: 92,
      status: "reviewed",
      time: "13:15",
    },
    {
      id: 3,
      patient: "Sophie Laurent",
      type: "Analyse vocale",
      result: "Laryngite chronique",
      confidence: 78,
      status: "urgent",
      time: "12:45",
    },
  ]

  const upcomingAppointments = [
    {
      id: 1,
      patient: "Pierre Moreau",
      time: "15:30",
      type: "Consultation ORL",
      duration: "30 min",
      isNew: false,
    },
    {
      id: 2,
      patient: "Anne Leroy",
      time: "16:00",
      type: "Suivi post-opératoire",
      duration: "20 min",
      isNew: false,
    },
    {
      id: 3,
      patient: "Marc Petit",
      time: "16:30",
      type: "Première consultation",
      duration: "45 min",
      isNew: true,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">En attente</Badge>
        )
      case "reviewed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Validé</Badge>
      case "urgent":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Urgent</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 z-40 h-screen w-64">
        <DoctorSidebar />
      </div>

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <MobileSidebar>
            <DoctorSidebar />
          </MobileSidebar>
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-lg font-semibold text-orl-blue-800 dark:text-orl-blue-300">Tableau de bord médecin</h1>
          </div>
          <div className="flex items-center gap-2">
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

        <main className="grid flex-1 items-start gap-4 p-4 md:gap-8 md:p-6">
          <Tabs defaultValue="overview" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="overview" className="text-xs md:text-sm">
                Vue d&apos;ensemble
              </TabsTrigger>
              <TabsTrigger value="patients" className="text-xs md:text-sm">
                Patients
              </TabsTrigger>
              <TabsTrigger value="analyses" className="text-xs md:text-sm">
                Analyses
              </TabsTrigger>
              <TabsTrigger value="statistics" className="text-xs md:text-sm">
                Statistiques
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Stats Cards */}
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <Card className="border-orl-blue-100 dark:border-orl-blue-900/50 card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Patients aujourd&apos;hui</CardTitle>
                    <Users className="h-4 w-4 text-orl-blue-600 dark:text-orl-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{todayStats.patients}</div>
                    <p className="text-xs text-muted-foreground">+2 depuis hier</p>
                  </CardContent>
                </Card>
                <Card className="border-orl-blue-100 dark:border-orl-blue-900/50 card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">RDV restants</CardTitle>
                    <Calendar className="h-4 w-4 text-orl-blue-600 dark:text-orl-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{todayStats.appointments}</div>
                    <p className="text-xs text-muted-foreground">Prochain: 15:30</p>
                  </CardContent>
                </Card>
                <Card className="border-orl-blue-100 dark:border-orl-blue-900/50 card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Analyses IA</CardTitle>
                    <Activity className="h-4 w-4 text-orl-blue-600 dark:text-orl-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{todayStats.analyses}</div>
                    <p className="text-xs text-muted-foreground">+5 depuis hier</p>
                  </CardContent>
                </Card>
                <Card className="border-orl-blue-100 dark:border-orl-blue-900/50 card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cas urgents</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{todayStats.urgent}</div>
                    <p className="text-xs text-muted-foreground">Nécessitent attention</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 lg:grid-cols-7">
                {/* Prochains rendez-vous */}
                <Card className="lg:col-span-4 border-orl-blue-100 dark:border-orl-blue-900/50 card-hover">
                  <CardHeader>
                    <CardTitle className="text-orl-blue-800 dark:text-orl-blue-300">Prochains rendez-vous</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex flex-col md:flex-row md:items-center gap-4 rounded-lg border p-3 card-hover"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orl-blue-100 text-orl-blue-700 dark:bg-orl-blue-900/50 dark:text-orl-blue-300 flex-shrink-0">
                            <Clock className="h-5 w-5" />
                          </div>
                          <div className="flex-1 space-y-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-medium">{appointment.patient}</p>
                              {appointment.isNew && (
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs">
                                  Nouveau
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-1">
                              <p>{appointment.time}</p>
                              <span className="hidden md:inline">•</span>
                              <p>{appointment.type}</p>
                              <span className="hidden md:inline">•</span>
                              <p>{appointment.duration}</p>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="self-start md:self-center text-orl-blue-600 hover:text-orl-blue-700 hover:bg-orl-blue-50 dark:text-orl-blue-400 dark:hover:text-orl-blue-300 dark:hover:bg-orl-blue-900/30"
                        >
                          Voir détails
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-orl-blue-200 hover:border-orl-blue-300 hover:bg-orl-blue-50 text-orl-blue-700 dark:border-orl-blue-800 dark:hover:border-orl-blue-700 dark:hover:bg-orl-blue-900/30 dark:text-orl-blue-400"
                    >
                      Voir tous les rendez-vous
                    </Button>
                  </CardFooter>
                </Card>

                {/* Analyses récentes */}
                <Card className="lg:col-span-3 border-orl-blue-100 dark:border-orl-blue-900/50 card-hover">
                  <CardHeader>
                    <CardTitle className="text-orl-blue-800 dark:text-orl-blue-300">Analyses récentes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentAnalyses.map((analysis) => (
                      <div key={analysis.id} className="flex items-center gap-4 rounded-lg border p-3 card-hover">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orl-blue-100 text-orl-blue-700 dark:bg-orl-blue-900/50 dark:text-orl-blue-300 flex-shrink-0">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1 min-w-0">
                          <p className="text-sm font-medium">{analysis.patient}</p>
                          <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-1">
                            <p>{analysis.type}</p>
                            <span className="hidden md:inline">•</span>
                            <p>{analysis.time}</p>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{analysis.result}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {getStatusBadge(analysis.status)}
                          <span className="text-xs text-muted-foreground">{analysis.confidence}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-orl-blue-200 hover:border-orl-blue-300 hover:bg-orl-blue-50 text-orl-blue-700 dark:border-orl-blue-800 dark:hover:border-orl-blue-700 dark:hover:bg-orl-blue-900/30 dark:text-orl-blue-400"
                    >
                      Voir toutes les analyses
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="patients" className="space-y-4">
              <Card className="border-orl-blue-100 dark:border-orl-blue-900/50">
                <CardHeader className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="grid gap-2 flex-1">
                    <CardTitle className="text-orl-blue-800 dark:text-orl-blue-300">Mes patients</CardTitle>
                    <CardDescription>Gérez vos patients et leurs dossiers médicaux</CardDescription>
                  </div>
                  <Button className="w-full md:w-auto bg-orl-blue-600 hover:bg-orl-blue-700 dark:bg-orl-blue-600 dark:hover:bg-orl-blue-500">
                    Nouveau patient
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-muted-foreground">Accédez à la page patients pour voir la liste complète</p>
                    <Button variant="outline" className="mt-4">
                      Voir tous les patients
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analyses" className="space-y-4">
              <Card className="border-orl-blue-100 dark:border-orl-blue-900/50">
                <CardHeader className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="grid gap-2 flex-1">
                    <CardTitle className="text-orl-blue-800 dark:text-orl-blue-300">Analyses IA</CardTitle>
                    <CardDescription>Consultez et validez les analyses effectuées par l&apos;IA</CardDescription>
                  </div>
                  <Button className="w-full md:w-auto bg-orl-blue-600 hover:bg-orl-blue-700 dark:bg-orl-blue-600 dark:hover:bg-orl-blue-500">
                    Nouvelle analyse
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-muted-foreground">Accédez à la page analyses pour voir toutes les analyses</p>
                    <Button variant="outline" className="mt-4">
                      Voir toutes les analyses
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="statistics" className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <Card className="border-orl-blue-100 dark:border-orl-blue-900/50">
                  <CardHeader>
                    <CardTitle className="text-orl-blue-800 dark:text-orl-blue-300">Activité mensuelle</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Consultations</span>
                        <span className="text-sm font-medium">156</span>
                      </div>
                      <Progress value={78} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Analyses IA</span>
                        <span className="text-sm font-medium">89</span>
                      </div>
                      <Progress value={65} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Nouveaux patients</span>
                        <span className="text-sm font-medium">23</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orl-blue-100 dark:border-orl-blue-900/50">
                  <CardHeader>
                    <CardTitle className="text-orl-blue-800 dark:text-orl-blue-300">
                      Répartition des diagnostics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Otites", percentage: 35, color: "bg-blue-500" },
                        { name: "Rhinites", percentage: 28, color: "bg-green-500" },
                        { name: "Laryngites", percentage: 20, color: "bg-yellow-500" },
                        { name: "Autres", percentage: 17, color: "bg-gray-500" },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{item.name}</span>
                            <span>{item.percentage}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${item.color} transition-all duration-300`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
