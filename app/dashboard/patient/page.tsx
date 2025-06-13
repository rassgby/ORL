"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Calendar, FileText, MessageSquare, Upload, Activity, ChevronRight } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 z-40 h-screen w-64">
        <PatientSidebar />
      </div>

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <MobileSidebar>
            <PatientSidebar />
          </MobileSidebar>
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-lg font-semibold text-orl-blue-800 dark:text-orl-blue-300">Tableau de bord patient</h1>
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

        <main className="grid flex-1 items-start gap-4 p-4 md:gap-8 md:p-6">
          <Tabs defaultValue="overview" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="overview" className="text-xs md:text-sm">
                Vue d&apos;ensemble
              </TabsTrigger>
              <TabsTrigger value="detection" className="text-xs md:text-sm">
                Détection
              </TabsTrigger>
              <TabsTrigger value="appointments" className="text-xs md:text-sm">
                RDV
              </TabsTrigger>
              <TabsTrigger value="history" className="text-xs md:text-sm">
                Historique
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <Card className="border-orl-blue-100 dark:border-orl-blue-900/50 card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Analyses récentes</CardTitle>
                    <Activity className="h-4 w-4 text-orl-blue-600 dark:text-orl-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">+1 depuis le mois dernier</p>
                  </CardContent>
                </Card>
                <Card className="border-orl-blue-100 dark:border-orl-blue-900/50 card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">RDV à venir</CardTitle>
                    <Calendar className="h-4 w-4 text-orl-blue-600 dark:text-orl-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">Prochain: 15 juin 2025</p>
                  </CardContent>
                </Card>
                <Card className="border-orl-blue-100 dark:border-orl-blue-900/50 card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Messages non lus</CardTitle>
                    <MessageSquare className="h-4 w-4 text-orl-blue-600 dark:text-orl-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">+3 nouveaux messages</p>
                  </CardContent>
                </Card>
                <Card className="border-orl-blue-100 dark:border-orl-blue-900/50 card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Résultats en attente</CardTitle>
                    <FileText className="h-4 w-4 text-orl-blue-600 dark:text-orl-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1</div>
                    <p className="text-xs text-muted-foreground">En cours d&apos;analyse</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 lg:grid-cols-7">
                <Card className="lg:col-span-4 border-orl-blue-100 dark:border-orl-blue-900/50 card-hover">
                  <CardHeader>
                    <CardTitle className="text-orl-blue-800 dark:text-orl-blue-300">Rendez-vous à venir</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 rounded-lg border p-3 card-hover">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orl-blue-100 text-orl-blue-700 dark:bg-orl-blue-900/50 dark:text-orl-blue-300 flex-shrink-0">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Consultation ORL</p>
                        <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-1">
                          <p>Dr. Martin Dupont</p>
                          <span className="hidden md:inline">•</span>
                          <p>15 juin 2025, 14:30</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="self-start md:self-center text-orl-blue-600 hover:text-orl-blue-700 hover:bg-orl-blue-50 dark:text-orl-blue-400 dark:hover:text-orl-blue-300 dark:hover:bg-orl-blue-900/30"
                      >
                        Détails
                      </Button>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 rounded-lg border p-3 card-hover">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orl-blue-100 text-orl-blue-700 dark:bg-orl-blue-900/50 dark:text-orl-blue-300 flex-shrink-0">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Suivi audiologique</p>
                        <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-1">
                          <p>Dr. Sophie Laurent</p>
                          <span className="hidden md:inline">•</span>
                          <p>22 juin 2025, 10:00</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="self-start md:self-center text-orl-blue-600 hover:text-orl-blue-700 hover:bg-orl-blue-50 dark:text-orl-blue-400 dark:hover:text-orl-blue-300 dark:hover:bg-orl-blue-900/30"
                      >
                        Détails
                      </Button>
                    </div>
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

                <Card className="lg:col-span-3 border-orl-blue-100 dark:border-orl-blue-900/50 card-hover">
                  <CardHeader>
                    <CardTitle className="text-orl-blue-800 dark:text-orl-blue-300">Derniers résultats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 rounded-lg border p-3 card-hover">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 flex-shrink-0">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <p className="text-sm font-medium">Analyse auditive</p>
                        <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-1">
                          <p>10 juin 2025</p>
                          <span className="hidden md:inline">•</span>
                          <Badge
                            variant="outline"
                            className="text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30"
                          >
                            Normal
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-shrink-0 text-orl-blue-600 hover:text-orl-blue-700 hover:bg-orl-blue-50 dark:text-orl-blue-400 dark:hover:text-orl-blue-300 dark:hover:bg-orl-blue-900/30"
                      >
                        Voir
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-3 card-hover">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 flex-shrink-0">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <p className="text-sm font-medium">Analyse nasale</p>
                        <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-1">
                          <p>5 juin 2025</p>
                          <span className="hidden md:inline">•</span>
                          <Badge
                            variant="outline"
                            className="text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30"
                          >
                            Attention requise
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-shrink-0 text-orl-blue-600 hover:text-orl-blue-700 hover:bg-orl-blue-50 dark:text-orl-blue-400 dark:hover:text-orl-blue-300 dark:hover:bg-orl-blue-900/30"
                      >
                        Voir
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-orl-blue-200 hover:border-orl-blue-300 hover:bg-orl-blue-50 text-orl-blue-700 dark:border-orl-blue-800 dark:hover:border-orl-blue-700 dark:hover:bg-orl-blue-900/30 dark:text-orl-blue-400"
                    >
                      Voir tout l&apos;historique
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="detection" className="space-y-4">
              <Card className="border-orl-blue-100 dark:border-orl-blue-900/50">
                <CardHeader>
                  <CardTitle className="text-orl-blue-800 dark:text-orl-blue-300">Détection de maladies ORL</CardTitle>
                  <CardDescription>
                    Téléchargez une image ou décrivez vos symptômes pour une analyse par IA
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                      <div className="rounded-lg border-2 border-dashed border-orl-blue-200 dark:border-orl-blue-800 p-8 md:p-12 text-center hover:border-orl-blue-300 dark:hover:border-orl-blue-700 transition-colors">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-8 w-8 md:h-10 md:w-10 text-orl-blue-600 dark:text-orl-blue-400" />
                          <h3 className="text-lg font-semibold text-orl-blue-800 dark:text-orl-blue-300">
                            Télécharger une image
                          </h3>
                          <p className="text-sm text-muted-foreground">Glissez-déposez ou cliquez pour sélectionner</p>
                          <Button className="mt-4 w-full md:w-auto bg-orl-blue-600 hover:bg-orl-blue-700 dark:bg-orl-blue-600 dark:hover:bg-orl-blue-500">
                            Sélectionner un fichier
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4 md:p-6 card-hover">
                        <h3 className="mb-4 text-lg font-semibold text-orl-blue-800 dark:text-orl-blue-300">
                          Décrire vos symptômes
                        </h3>
                        <textarea
                          className="min-h-[120px] md:min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orl-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Décrivez vos symptômes en détail (douleur, durée, localisation, etc.)"
                        ></textarea>
                        <Button className="mt-4 w-full bg-orl-blue-600 hover:bg-orl-blue-700 dark:bg-orl-blue-600 dark:hover:bg-orl-blue-500">
                          Analyser les symptômes
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-4">
              <Card className="border-orl-blue-100 dark:border-orl-blue-900/50">
                <CardHeader className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="grid gap-2 flex-1">
                    <CardTitle className="text-orl-blue-800 dark:text-orl-blue-300">Mes rendez-vous</CardTitle>
                    <CardDescription>Gérez vos rendez-vous médicaux</CardDescription>
                  </div>
                  <Button className="w-full md:w-auto bg-orl-blue-600 hover:bg-orl-blue-700 dark:bg-orl-blue-600 dark:hover:bg-orl-blue-500">
                    Nouveau rendez-vous
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Consultation ORL",
                        date: "15 juin 2025, 14:30",
                        doctor: "Dr. Martin Dupont",
                        hospital: "ORL, Hôpital Central",
                        status: "À venir",
                        statusColor:
                          "bg-orl-blue-100 text-orl-blue-700 hover:bg-orl-blue-200 dark:bg-orl-blue-900/50 dark:text-orl-blue-300 dark:hover:bg-orl-blue-900/70",
                      },
                      {
                        title: "Suivi audiologique",
                        date: "22 juin 2025, 10:00",
                        doctor: "Dr. Sophie Laurent",
                        hospital: "Audiologiste, Centre Médical Est",
                        status: "À venir",
                        statusColor:
                          "bg-orl-blue-100 text-orl-blue-700 hover:bg-orl-blue-200 dark:bg-orl-blue-900/50 dark:text-orl-blue-300 dark:hover:bg-orl-blue-900/70",
                      },
                      {
                        title: "Examen de la gorge",
                        date: "28 mai 2025, 11:15",
                        doctor: "Dr. Jean Petit",
                        hospital: "ORL, Clinique du Sud",
                        status: "Terminé",
                        statusColor: "text-gray-600 dark:text-gray-400",
                      },
                    ].map((appointment, index) => (
                      <div key={index} className="rounded-lg border p-4 card-hover">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="grid gap-1 flex-1">
                            <h3 className="font-semibold text-orl-blue-800 dark:text-orl-blue-300">
                              {appointment.title}
                            </h3>
                            <div className="flex flex-col md:flex-row md:items-center text-sm text-muted-foreground gap-1">
                              <Calendar className="mr-1 h-4 w-4 md:hidden" />
                              <p>{appointment.date}</p>
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
                            <Badge className={appointment.statusColor}>{appointment.status}</Badge>
                            {appointment.status === "À venir" && (
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 md:flex-none border-orl-blue-200 hover:border-orl-blue-300 hover:bg-orl-blue-50 text-orl-blue-700 dark:border-orl-blue-800 dark:hover:border-orl-blue-700 dark:hover:bg-orl-blue-900/30 dark:text-orl-blue-400"
                                >
                                  Modifier
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="flex-1 md:flex-none text-red-500 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                                >
                                  Annuler
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-4">
                          <Avatar className="h-8 w-8 md:h-10 md:w-10">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={appointment.doctor} />
                            <AvatarFallback className="bg-orl-blue-200 text-orl-blue-700 dark:bg-orl-blue-900 dark:text-orl-blue-300 text-xs">
                              {appointment.doctor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{appointment.doctor}</p>
                            <p className="text-xs md:text-sm text-muted-foreground">{appointment.hospital}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card className="border-orl-blue-100 dark:border-orl-blue-900/50">
                <CardHeader>
                  <CardTitle className="text-orl-blue-800 dark:text-orl-blue-300">Historique médical</CardTitle>
                  <CardDescription>Consultez votre historique d&apos;analyses et de diagnostics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Analyse auditive",
                        date: "10 juin 2025",
                        status: "Normal",
                        statusColor: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30",
                        iconColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                      },
                      {
                        title: "Analyse nasale",
                        date: "5 juin 2025",
                        status: "Attention requise",
                        statusColor: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30",
                        iconColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                      },
                      {
                        title: "Analyse de la gorge",
                        date: "28 mai 2025",
                        status: "Traitement requis",
                        statusColor: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30",
                        iconColor: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                      },
                      {
                        title: "Suivi audiologique",
                        date: "15 mai 2025",
                        status: "Normal",
                        statusColor: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30",
                        iconColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border p-4 card-hover">
                        <div className="flex items-center gap-4">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${item.iconColor}`}>
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={item.statusColor}>
                            {item.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-orl-blue-600 hover:text-orl-blue-700 hover:bg-orl-blue-50 dark:text-orl-blue-400 dark:hover:text-orl-blue-300 dark:hover:bg-orl-blue-900/30"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-orl-blue-200 hover:border-orl-blue-300 hover:bg-orl-blue-50 text-orl-blue-700 dark:border-orl-blue-800 dark:hover:border-orl-blue-700 dark:hover:bg-orl-blue-900/30 dark:text-orl-blue-400"
                  >
                    Charger plus d&apos;historique
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
