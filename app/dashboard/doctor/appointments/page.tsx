"use client"

import { useState } from "react"
import { DoctorSidebar } from "@/components/doctor-sidebar"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  Phone,
  Video,
  Plus,
  Bell,
  Filter,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function DoctorAppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const todayAppointments = [
    {
      id: 1,
      patient: "Marie Dubois",
      time: "09:00",
      duration: 30,
      type: "Consultation ORL",
      status: "confirmed",
      isVideo: false,
      phone: "+33 6 12 34 56 78",
      notes: "Suivi otite chronique",
      isNew: false,
    },
    {
      id: 2,
      patient: "Jean Martin",
      time: "09:30",
      duration: 45,
      type: "Première consultation",
      status: "confirmed",
      isVideo: false,
      phone: "+33 6 23 45 67 89",
      notes: "Problèmes auditifs",
      isNew: true,
    },
    {
      id: 3,
      patient: "Sophie Laurent",
      time: "10:30",
      duration: 20,
      type: "Téléconsultation",
      status: "pending",
      isVideo: true,
      phone: "+33 6 34 56 78 90",
      notes: "Suivi laryngite",
      isNew: false,
    },
    {
      id: 4,
      patient: "Pierre Moreau",
      time: "11:00",
      duration: 30,
      type: "Contrôle post-opératoire",
      status: "confirmed",
      isVideo: false,
      phone: "+33 6 45 67 89 01",
      notes: "Suivi tympanoplastie",
      isNew: false,
    },
  ]

  const upcomingAppointments = [
    {
      id: 5,
      patient: "Anne Leroy",
      date: "2024-01-16",
      time: "14:00",
      type: "Consultation",
      status: "confirmed",
      isVideo: false,
    },
    {
      id: 6,
      patient: "Marc Petit",
      date: "2024-01-17",
      time: "10:30",
      type: "Suivi",
      status: "pending",
      isVideo: true,
    },
    {
      id: 7,
      patient: "Claire Durand",
      date: "2024-01-18",
      time: "15:30",
      type: "Première consultation",
      status: "confirmed",
      isVideo: false,
    },
  ]

  const availableSlots = [
    { time: "14:00", available: true },
    { time: "14:30", available: false },
    { time: "15:00", available: true },
    { time: "15:30", available: true },
    { time: "16:00", available: false },
    { time: "16:30", available: true },
    { time: "17:00", available: true },
    { time: "17:30", available: false },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Confirmé</Badge>
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">En attente</Badge>
        )
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Terminé</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Annulé</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTimeSlotColor = (time: string) => {
    const hour = Number.parseInt(time.split(":")[0])
    if (hour < 12)
      return "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300"
    if (hour < 17)
      return "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300"
    return "bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300"
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
            <h1 className="text-lg font-semibold text-orl-blue-700 dark:text-orl-blue-400">Mes Rendez-vous</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Nouveau RDV</span>
              <span className="md:hidden">RDV</span>
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
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Planning principal */}
            <div className="lg:col-span-3 space-y-4">
              <Tabs defaultValue="today" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="today" className="text-xs md:text-sm">
                    Aujourd&apos;hui
                  </TabsTrigger>
                  <TabsTrigger value="upcoming" className="text-xs md:text-sm">
                    À venir
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="text-xs md:text-sm">
                    Calendrier
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="today" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-orl-blue-600" />
                            Aujourd&apos;hui - {new Date().toLocaleDateString("fr-FR")}
                          </CardTitle>
                          <CardDescription>Vos rendez-vous du jour</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filtrer
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {todayAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className={`border rounded-lg p-4 space-y-4 ${getTimeSlotColor(appointment.time)}`}
                        >
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                                <div className="text-lg font-bold">{appointment.time}</div>
                                <div className="text-xs text-muted-foreground">{appointment.duration}min</div>
                              </div>
                              <Avatar className="h-12 w-12 flex-shrink-0">
                                <AvatarImage src="/placeholder.svg?height=48&width=48" alt={appointment.patient} />
                                <AvatarFallback className="bg-orl-blue-200 text-orl-blue-700 dark:bg-orl-blue-900 dark:text-orl-blue-300">
                                  {appointment.patient
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-1 flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="font-medium">{appointment.patient}</h3>
                                  {appointment.isNew && (
                                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs">
                                      Nouveau
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.type}</p>
                                <p className="text-xs text-muted-foreground">{appointment.notes}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Phone className="h-3 w-3" />
                                  <span>{appointment.phone}</span>
                                  {appointment.isVideo && (
                                    <>
                                      <Video className="h-3 w-3 ml-2 text-blue-500" />
                                      <span className="text-blue-500">Téléconsultation</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              {getStatusBadge(appointment.status)}
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row gap-2">
                            {appointment.isVideo && (
                              <Button size="sm" className="flex-1 md:flex-none">
                                <Video className="h-4 w-4 mr-2" />
                                Démarrer consultation
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                              <Phone className="h-4 w-4 mr-2" />
                              Appeler
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Marquer terminé
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="upcoming" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-orl-blue-600" />
                        Rendez-vous à venir
                      </CardTitle>
                      <CardDescription>Vos prochains rendez-vous</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <Avatar className="h-10 w-10 flex-shrink-0">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={appointment.patient} />
                                <AvatarFallback className="bg-orl-blue-200 text-orl-blue-700 dark:bg-orl-blue-900 dark:text-orl-blue-300">
                                  {appointment.patient
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-1 flex-1 min-w-0">
                                <h3 className="font-medium">{appointment.patient}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.type}</p>
                                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(appointment.date).toLocaleDateString("fr-FR")}</span>
                                  <Clock className="h-3 w-3 ml-2" />
                                  <span>{appointment.time}</span>
                                  {appointment.isVideo && (
                                    <>
                                      <Video className="h-3 w-3 ml-2 text-blue-500" />
                                      <span className="text-blue-500">Téléconsultation</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex-shrink-0">{getStatusBadge(appointment.status)}</div>
                          </div>

                          <div className="flex flex-col md:flex-row gap-2">
                            <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                              Modifier
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                              Annuler
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="calendar" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Vue calendrier</CardTitle>
                      <CardDescription>Planifiez et gérez vos rendez-vous</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-muted-foreground">Vue calendrier en développement</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar droite */}
            <div className="space-y-4">
              {/* Créneaux disponibles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orl-blue-600" />
                    Créneaux libres
                  </CardTitle>
                  <CardDescription>Cet après-midi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={slot.available ? "outline" : "secondary"}
                        size="sm"
                        disabled={!slot.available}
                        className="text-xs h-10"
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Statistiques du jour */}
              <Card>
                <CardHeader>
                  <CardTitle>Aujourd&apos;hui</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total RDV</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Terminés</span>
                    <span className="font-medium text-green-600">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Restants</span>
                    <span className="font-medium text-blue-600">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Téléconsultations</span>
                    <span className="font-medium text-purple-600">2</span>
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
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau RDV
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Voir planning
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Urgences
                  </Button>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-orl-blue-600" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                    <p className="text-xs font-medium text-yellow-800 dark:text-yellow-300">RDV 15:30 confirmé</p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">Sophie Laurent</p>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <p className="text-xs font-medium text-blue-800 dark:text-blue-300">Nouvelle demande RDV</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Marc Petit - Demain 10h</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
