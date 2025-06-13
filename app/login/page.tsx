"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Phone, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const [userType, setUserType] = useState("patient")

  return (
    <div className="flex min-h-screen flex-col gradient-bg">
      <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
        <div className="absolute right-4 top-4 md:right-8 md:top-8">
          <ThemeToggle />
        </div>
        <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
          <div className="bg-orl-blue-600 dark:bg-orl-blue-500 rounded-lg p-1">
            <Image src="/placeholder.svg?height=28&width=28" width={28} height={28} alt="Logo" className="rounded-lg" />
          </div>
          <span className="text-lg md:text-xl font-bold text-orl-blue-700 dark:text-orl-blue-400">MediScan ORL</span>
        </Link>

        <Card className="w-full max-w-md border-orl-blue-100 dark:border-orl-blue-900 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl md:text-2xl font-bold text-orl-blue-800 dark:text-orl-blue-300">
              Connexion
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Entrez vos identifiants pour accéder à votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="patient" className="w-full" onValueChange={setUserType}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="patient" className="text-sm">
                  Patient
                </TabsTrigger>
                <TabsTrigger value="doctor" className="text-sm">
                  Médecin
                </TabsTrigger>
              </TabsList>
              <TabsContent value="patient" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-phone" className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-orl-blue-600 dark:text-orl-blue-400" />
                    Numéro de téléphone
                  </Label>
                  <Input id="patient-phone" type="tel" placeholder="+33 6 12 34 56 78" className="h-12 text-base" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="patient-password" className="flex items-center gap-2 text-sm">
                      <Lock className="h-4 w-4 text-orl-blue-600 dark:text-orl-blue-400" />
                      Mot de passe
                    </Label>
                    <Link
                      href="/reset-password"
                      className="text-xs text-orl-blue-600 hover:underline dark:text-orl-blue-400"
                    >
                      Mot de passe oublié?
                    </Link>
                  </div>
                  <Input id="patient-password" type="password" className="h-12 text-base" />
                </div>
              </TabsContent>
              <TabsContent value="doctor" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="doctor-email" className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-orl-blue-600 dark:text-orl-blue-400" />
                    Email professionnel
                  </Label>
                  <Input id="doctor-email" type="email" placeholder="docteur@hopital.fr" className="h-12 text-base" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="doctor-password" className="flex items-center gap-2 text-sm">
                      <Lock className="h-4 w-4 text-orl-blue-600 dark:text-orl-blue-400" />
                      Mot de passe
                    </Label>
                    <Link
                      href="/reset-password"
                      className="text-xs text-orl-blue-600 hover:underline dark:text-orl-blue-400"
                    >
                      Mot de passe oublié?
                    </Link>
                  </div>
                  <Input id="doctor-password" type="password" className="h-12 text-base" />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full h-12 text-base bg-orl-blue-600 hover:bg-orl-blue-700 dark:bg-orl-blue-600 dark:hover:bg-orl-blue-500">
              Se connecter
            </Button>
            <div className="mt-4 text-center text-sm">
              Vous n&apos;avez pas de compte?{" "}
              <Link
                href={`/register?type=${userType}`}
                className="text-orl-blue-600 hover:underline dark:text-orl-blue-400"
              >
                S&apos;inscrire
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
