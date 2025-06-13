"use client"

import { useState } from "react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Phone, Video, Plus, User, Bell } from "lucide-react"

export default function PatientAppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Martin Dubois",
      specialty: "ORL",
      date: "2024-01-15",
      time: "14:30",
      type: "Consultation",
      location: "Cabinet médical - 123 Rue de la Santé",
      status: "confirmed",
      isVideo: false,
    },
    {
      id: 2,
      doctor: "Dr. Sophie Laurent",
      specialty: "Audiologie",
      date: "2024-01-22",
      time: "10:00",
      type: "Test auditif",
      location: "Téléconsultation",
      status: "pending",
      isVideo: true,
    },
  ]

  const pastAppointments = [
    {
      id: 3,
      doctor: "Dr. Pierre Moreau",
      specialty: "ORL",
      date: "2024-01-08",
      time: "16:00",
      type: "Suivi post-opératoire",
      location: "Hôpital Central",
      status: "completed",
      isVideo: false,
    },
    {
      id: 4,
      doctor: "Dr. Marie Leroy",
      specialty: "Phoniatrie",
      date: "2023-12-20",
      time: "11:30",
      type: "Rééducation vocale",
      location: "Centre de rééducation",
      status: "completed",
      isVideo: false,
    },
  ]

  const availableSlots = [
    { time: "09:00", available: true },
    { time: "09:30", available: false },
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: false },
    { time: "11:30", available: true },
    { time: "14:00", available: true },
    { time: "14:30", available: false },
    { time: "15:00", available: true },
    { time: "15:30", available: true },
    { time: "16:00", available: true },
    { time: "16:30", available: false },
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
      default:
        return <Badge variant="secondary">{status}</Badge>
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
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback className="bg-orl-blue-200 text-orl-blue-700 dark:bg-orl-blue-900 dark:text-orl-blue-300">
                JP
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-4 md:p-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Prochains rendez-vous */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orl-blue-600" />
                    Prochains rendez-vous
                  </CardTitle>
                  <CardDescription>Vos rendez-vous à venir avec les professionnels de santé</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                            <span className="font-medium">{appointment.doctor}</span>
                            <Badge variant="outline">{appointment.specialty}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.type}</p>
                        </div>
                        <div className="flex-shrink-0">{getStatusBadge(appointment.status)}</div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span>{new Date(appointment.date).toLocaleDateString("fr-FR")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          {appointment.isVideo ? (
                            <Video className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                          )}
                          <span className="text-xs break-words">{appointment.location}</span>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-2 pt-2">
                        {appointment.isVideo && (
                          <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                            <Video className="h-4 w-4 mr-2" />
                            Rejoindre
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                          <Phone className="h-4 w-4 mr-2" />
                          Contacter
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                          Modifier
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Historique */}
              <Card>
                <CardHeader>
                  <CardTitle>Historique des rendez-vous</CardTitle>
                  <CardDescription>Vos rendez-vous passés</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pastAppointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4 space-y-3 opacity-75">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                            <span className="font-medium">{appointment.doctor}</span>
                            <Badge variant="outline">{appointment.specialty}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.type}</p>
                        </div>
                        <div className="flex-shrink-0">{getStatusBadge(appointment.status)}</div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span>{new Date(appointment.date).toLocaleDateString("fr-FR")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs break-words">{appointment.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Prendre un nouveau rendez-vous */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-orl-blue-600" />
                    Nouveau rendez-vous
                  </CardTitle>
                  <CardDescription>Planifiez votre prochain rendez-vous</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Spécialité</label>
                    <select className="w-full p-3 border rounded-md text-base">
                      <option>ORL</option>
                      <option>Audiologie</option>
                      <option>Phoniatrie</option>
                      <option>Chirurgie ORL</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type de consultation</label>
                    <select className="w-full p-3 border rounded-md text-base">
                      <option>Consultation générale</option>
                      <option>Suivi</option>
                      <option>Urgence</option>
                      <option>Téléconsultation</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date souhaitée</label>
                    <input
                      type="date"
                      className="w-full p-3 border rounded-md text-base"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <Button className="w-full h-12 text-base">Rechercher des créneaux</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Créneaux disponibles</CardTitle>
                  <CardDescription>Aujourd'hui - {new Date().toLocaleDateString("fr-FR")}</CardDescription>
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
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
