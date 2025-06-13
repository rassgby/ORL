"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ThemeToggle } from "@/components/theme-toggle"
import { Upload, Phone, User, Mail, Lock, Calendar, FileText, Building, CheckCircle, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get("type")
  const [userType, setUserType] = useState(typeParam === "doctor" ? "doctor" : "patient")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    if (typeParam === "doctor" || typeParam === "patient") {
      setUserType(typeParam)
    }
  }, [typeParam])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      {/* Header fixe */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-blue-100 dark:border-slate-800">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium hidden sm:inline">Retour</span>
            </Link>
            <div className="h-6 w-px bg-blue-200 dark:bg-slate-700 hidden sm:block" />
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 dark:bg-blue-500 rounded-lg p-1.5">
                <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Logo" className="rounded" />
              </div>
              <span className="text-lg font-bold text-blue-700 dark:text-blue-400">MediScan ORL</span>
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-md mx-auto">
          <Card className="border-blue-100 dark:border-slate-800 shadow-xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
            <CardHeader className="space-y-2 text-center pb-4">
              <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                Créer un compte
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Inscrivez-vous pour accéder à notre plateforme de détection ORL
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-4 sm:px-6">
              <Tabs defaultValue={userType} className="w-full" onValueChange={setUserType}>
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-blue-50 dark:bg-slate-800">
                  <TabsTrigger 
                    value="patient" 
                    className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300"
                  >
                    Patient
                  </TabsTrigger>
                  <TabsTrigger 
                    value="doctor" 
                    className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300"
                  >
                    Médecin
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="patient" className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="patient-first-name" className="flex items-center gap-2 text-sm font-medium">
                        <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        Prénom
                      </Label>
                      <Input 
                        id="patient-first-name" 
                        className="h-11 text-base border-blue-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-last-name" className="flex items-center gap-2 text-sm font-medium">
                        <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        Nom
                      </Label>
                      <Input 
                        id="patient-last-name" 
                        className="h-11 text-base border-blue-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patient-phone" className="flex items-center gap-2 text-sm font-medium">
                      <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Téléphone
                    </Label>
                    <Input 
                      id="patient-phone" 
                      type="tel" 
                      placeholder="+33 6 12 34 56 78" 
                      className="h-11 text-base border-blue-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patient-email" className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Email
                    </Label>
                    <Input 
                      id="patient-email" 
                      type="email" 
                      placeholder="exemple@email.com" 
                      className="h-11 text-base border-blue-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patient-password" className="flex items-center gap-2 text-sm font-medium">
                      <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Mot de passe
                    </Label>
                    <Input 
                      id="patient-password" 
                      type="password" 
                      className="h-11 text-base border-blue-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patient-confirm-password" className="flex items-center gap-2 text-sm font-medium">
                      <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Confirmer le mot de passe
                    </Label>
                    <Input 
                      id="patient-confirm-password" 
                      type="password" 
                      className="h-11 text-base border-blue-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patient-dob" className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Date de naissance
                    </Label>
                    <Input 
                      id="patient-dob" 
                      type="date" 
                      className="h-11 text-base border-blue-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500" 
                    />
                  </div>

                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox 
                      id="patient-terms" 
                      className="mt-1 border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" 
                    />
                    <label
                      htmlFor="patient-terms"
                      className="text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                    >
                      J&apos;accepte les{" "}
                      <Link href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
                        conditions d&apos;utilisation
                      </Link>
                    </label>
                  </div>
                </TabsContent>

                <TabsContent value="doctor" className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="doctor-first-name" className="flex items-center gap-2 text-sm font-medium">
                        <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        Prénom
                      </Label>
                      <Input 
                        id="doctor-first-name" 
                        className="h-11 text-base border-blue-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor-last-name" className="flex items-center gap-2 text-sm font-medium">
                        <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        Nom
                      </Label>
                      <Input 
                        id="doctor-last-name" 
                        className="h-11 text-base border-blue-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor-phone" className="flex items-center gap-2 text-sm font-medium">
                      <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Téléphone
                    </Label>
                    <Input 
                      id="doctor-phone" 
                      type="tel" 
                      placeholder="+33 6 12 34 56 78" 
                      className="h-11 text-base border-blue-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor-email" className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Email professionnel
                    </Label>
                    <Input 
                      id="doctor-email" 
                      type="email" 
                      placeholder="docteur@hopital.fr" 
                      className="h-11 text-base border-blue-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor-password" className="flex items-center gap-2 text-sm font-medium">
                      <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Mot de passe
                    </Label>
                    <Input 
                      id="doctor-password" 
                      type="password" 
                      className="h-11 text-base border-blue-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor-confirm-password" className="flex items-center gap-2 text-sm font-medium">
                      <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Confirmer le mot de passe
                    </Label>
                    <Input 
                      id="doctor-confirm-password" 
                      type="password" 
                      className="h-11 text-base border-blue-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor-specialty" className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Spécialité
                    </Label>
                    <Select>
                      <SelectTrigger 
                        id="doctor-specialty" 
                        className="h-11 text-base border-blue-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500"
                      >
                        <SelectValue placeholder="Sélectionnez votre spécialité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="orl">ORL</SelectItem>
                        <SelectItem value="audiologist">Audiologiste</SelectItem>
                        <SelectItem value="phoniatre">Phoniatre</SelectItem>
                        <SelectItem value="other">Autre spécialité</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor-hospital" className="flex items-center gap-2 text-sm font-medium">
                      <Building className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Établissement
                    </Label>
                    <Input
                      id="doctor-hospital"
                      placeholder="Nom de l'hôpital ou de la clinique"
                      className="h-11 text-base border-blue-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor-license" className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Numéro de licence
                    </Label>
                    <Input 
                      id="doctor-license" 
                      className="h-11 text-base border-blue-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500" 
                    />
                  </div>

                  {/* Upload section */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Upload className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Carte professionnelle *
                    </Label>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Téléchargez votre carte professionnelle pour vérification
                    </p>

                    <div className="border-2 border-dashed border-blue-200 dark:border-slate-700 rounded-lg p-4 transition-colors hover:border-blue-300 dark:hover:border-slate-600">
                      <div className="text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-slate-800 mb-3">
                          <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>

                        {selectedFile ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">Fichier sélectionné</span>
                            </div>
                            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium break-all px-2">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedFile(null)}
                              className="mt-2 text-xs h-8"
                            >
                              Changer
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                              Glissez votre carte ici
                            </p>
                            <p className="text-xs text-slate-500">ou cliquez pour sélectionner</p>
                            <div className="text-xs text-slate-500 space-y-1">
                              <div>JPG, PNG, PDF • Max 5MB</div>
                            </div>
                          </div>
                        )}

                        <input
                          id="doctor-card-upload"
                          type="file"
                          className="hidden"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleFileChange}
                          required
                        />

                        {!selectedFile && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-3 w-full h-9 text-sm border-blue-200 hover:border-blue-300 dark:border-slate-700 dark:hover:border-slate-600"
                            onClick={() => document.getElementById("doctor-card-upload")?.click()}
                          >
                            Sélectionner un fichier
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-slate-800/50 rounded-lg p-3">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-slate-700">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">!</span>
                          </div>
                        </div>
                        <div className="text-xs">
                          <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                            Important
                          </p>
                          <ul className="text-blue-700 dark:text-blue-400 space-y-0.5">
                            <li>• Carte lisible et non expirée</li>
                            <li>• Informations correspondantes</li>
                            <li>• Vérification sous 24-48h</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox 
                      id="doctor-terms" 
                      className="mt-1 border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" 
                    />
                    <label
                      htmlFor="doctor-terms"
                      className="text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                    >
                      J&apos;accepte les{" "}
                      <Link href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
                        conditions d&apos;utilisation
                      </Link>
                    </label>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter className="flex flex-col px-4 sm:px-6 pt-4">
              <Button className="w-full h-11 text-base bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 font-medium">
                S&apos;inscrire
              </Button>
              <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
                Vous avez déjà un compte?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline">
                  Se connecter
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}