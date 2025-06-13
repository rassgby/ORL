"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Stethoscope,
  Brain,
  Activity,
  Menu,
  X,
} from "lucide-react";
import { HomeThemeToggle } from "@/components/home-theme-toggle";
import { HomeThemeProvider } from "@/components/home-theme-provider";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <HomeThemeProvider
      attribute="class"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="flex flex-col min-h-screen">
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-orl-blue-100 dark:border-orl-blue-900/50 shadow-sm"
              : "bg-transparent"
          }`}
        >
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <Link
              href="/"
              className="flex items-center gap-2 transition-transform hover:scale-105"
            >
              <div className="bg-orl-blue-600 dark:bg-orl-blue-500 rounded-lg p-1">
                <Image
                  src="/placeholder.svg?height=30&width=30"
                  width={30}
                  height={30}
                  alt="Logo"
                  className="rounded-lg"
                />
              </div>
              <span className="text-lg md:text-xl font-bold text-orl-blue-700 dark:text-orl-blue-400">
                MediScan ORL
              </span>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex gap-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-sm font-medium hover:text-orl-blue-600 dark:hover:text-orl-blue-400 transition-colors relative group"
              >
                Fonctionnalités
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orl-blue-600 dark:bg-orl-blue-400 transition-all group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-sm font-medium hover:text-orl-blue-600 dark:hover:text-orl-blue-400 transition-colors relative group"
              >
                Comment ça marche
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orl-blue-600 dark:bg-orl-blue-400 transition-all group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-sm font-medium hover:text-orl-blue-600 dark:hover:text-orl-blue-400 transition-colors relative group"
              >
                Témoignages
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orl-blue-600 dark:bg-orl-blue-400 transition-all group-hover:w-full"></span>
              </button>
            </nav>

            {/* Actions Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <HomeThemeToggle />
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-orl-blue-200 hover:border-orl-blue-300 dark:border-orl-blue-800 dark:hover:border-orl-blue-700 transition-all hover:scale-105"
                >
                  Connexion
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-orl-blue-600 hover:bg-orl-blue-700 dark:bg-orl-blue-600 dark:hover:bg-orl-blue-500 transition-all hover:scale-105">
                  Inscription
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <HomeThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative"
              >
                <Menu
                  className={`h-5 w-5 transition-all ${
                    isMobileMenuOpen
                      ? "rotate-90 opacity-0"
                      : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`h-5 w-5 absolute transition-all ${
                    isMobileMenuOpen
                      ? "rotate-0 opacity-100"
                      : "-rotate-90 opacity-0"
                  }`}
                />
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-white dark:bg-gray-950 border-t border-orl-blue-100 dark:border-orl-blue-900/50 px-4 py-6 space-y-4">
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left text-base font-medium hover:text-orl-blue-600 dark:hover:text-orl-blue-400 transition-colors py-3"
              >
                Fonctionnalités
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block w-full text-left text-base font-medium hover:text-orl-blue-600 dark:hover:text-orl-blue-400 transition-colors py-3"
              >
                Comment ça marche
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block w-full text-left text-base font-medium hover:text-orl-blue-600 dark:hover:text-orl-blue-400 transition-colors py-3"
              >
                Témoignages
              </button>
              <div className="pt-4 space-y-3 border-t border-orl-blue-100 dark:border-orl-blue-900/50">
                <Link href="/login" className="block">
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base border-orl-blue-200 hover:border-orl-blue-300 dark:border-orl-blue-800 dark:hover:border-orl-blue-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Connexion
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button
                    className="w-full h-12 text-base bg-orl-blue-600 hover:bg-orl-blue-700 dark:bg-orl-blue-600 dark:hover:bg-orl-blue-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Inscription
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 pt-16">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-orl-blue-50 to-orl-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-orl-blue-950 z-0"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-no-repeat bg-cover opacity-10 z-0"></div>
            <div className="container px-4 md:px-6 relative z-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="inline-flex items-center rounded-full border border-orl-blue-200 bg-white px-3 py-1 text-sm text-orl-blue-700 dark:border-orl-blue-800 dark:bg-gray-900 dark:text-orl-blue-400 mb-4 w-fit animate-pulse">
                    <span className="flex h-2 w-2 rounded-full bg-orl-blue-600 dark:bg-orl-blue-400 mr-2"></span>
                    Intelligence Artificielle pour la Santé
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none text-orl-blue-900 dark:text-white">
                      Détection intelligente des maladies ORL
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground text-base md:text-xl">
                      Notre technologie d&apos;intelligence artificielle aide à
                      détecter rapidement les maladies ORL pour un diagnostic
                      précoce et un traitement efficace.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row mt-4">
                    <Link href="/register?type=patient">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto h-12 text-base bg-orl-blue-600 hover:bg-orl-blue-700 dark:bg-orl-blue-600 dark:hover:bg-orl-blue-500 group transition-all hover:scale-105"
                      >
                        Je suis un patient
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Link href="/register?type=doctor">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto h-12 text-base border-orl-blue-200 hover:border-orl-blue-300 dark:border-orl-blue-800 dark:hover:border-orl-blue-700 group transition-all hover:scale-105"
                      >
                        Je suis un médecin
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-900 bg-orl-blue-100 dark:bg-orl-blue-900 flex items-center justify-center text-xs font-medium text-orl-blue-700 dark:text-orl-blue-300"
                        >
                          {i}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-orl-blue-700 dark:text-orl-blue-400">
                        +1000
                      </span>{" "}
                      professionnels de santé nous font confiance
                    </div>
                  </div>
                </div>
                <div className="relative order-first lg:order-last">
                  <div className="absolute inset-0 bg-orl-blue-100 dark:bg-orl-blue-900/30 rounded-3xl -rotate-3 transform"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-orl-blue-200 to-transparent dark:from-orl-blue-800/30 dark:to-transparent rounded-3xl rotate-3 transform"></div>
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    width={400}
                    height={400}
                    alt="Détection ORL"
                    className="relative z-10 mx-auto aspect-square overflow-hidden rounded-2xl object-cover object-center w-full max-w-sm lg:max-w-none shadow-lg"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 rounded-lg p-3 md:p-4 shadow-lg z-20 border border-orl-blue-100 dark:border-orl-blue-900">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-orl-blue-100 dark:bg-orl-blue-900/50 flex items-center justify-center">
                        <Activity className="h-4 w-4 md:h-5 md:w-5 text-orl-blue-700 dark:text-orl-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-medium text-orl-blue-800 dark:text-orl-blue-300">
                          Précision IA
                        </p>
                        <p className="text-xs text-muted-foreground">
                          98% de fiabilité
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-6 md:py-8 border-y border-orl-blue-100 dark:border-orl-blue-900/50 bg-white dark:bg-gray-950">
            <div className="container px-4 md:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-center justify-items-center">
                <div className="flex flex-col md:flex-row items-center gap-2 text-muted-foreground text-center md:text-left">
                  <Shield className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="text-xs md:text-sm font-medium">
                    Données sécurisées
                  </span>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 text-muted-foreground text-center md:text-left">
                  <Stethoscope className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="text-xs md:text-sm font-medium">
                    Validé par des médecins
                  </span>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 text-muted-foreground text-center md:text-left">
                  <Brain className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="text-xs md:text-sm font-medium">
                    IA de pointe
                  </span>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 text-muted-foreground text-center md:text-left">
                  <Star className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="text-xs md:text-sm font-medium">
                    Service 5 étoiles
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section
            id="features"
            className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-orl-blue-100 dark:bg-orl-blue-900/50 px-3 py-1 text-sm text-orl-blue-700 dark:text-orl-blue-300">
                    Fonctionnalités
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tighter md:text-4xl/tight text-orl-blue-900 dark:text-white">
                    Une solution complète pour les professionnels et les
                    patients
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Notre plateforme offre des outils avancés pour la détection
                    et le suivi des maladies ORL
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
                {[
                  {
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 18a24.5 24.5 0 0 1 0-12"></path>
                        <path d="M7 16.5a18.5 18.5 0 0 1 0-9"></path>
                        <path d="M11.5 15a13 13 0 0 1 0-6"></path>
                        <path d="M16 13.5a7.5 7.5 0 0 1 0-3"></path>
                        <path d="M20.5 12.5a1.5 1.5 0 0 1 0-1"></path>
                      </svg>
                    ),
                    title: "Détection IA",
                    description:
                      "Analyse d'images et de symptômes pour une détection précise des maladies ORL",
                    features: [
                      "Analyse d'images médicales",
                      "Détection des symptômes",
                      "Résultats en quelques minutes",
                    ],
                  },
                  {
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    ),
                    title: "Suivi médical",
                    description:
                      "Communication directe entre patients et médecins pour un suivi personnalisé",
                    features: [
                      "Messagerie sécurisée",
                      "Historique médical complet",
                      "Notifications de suivi",
                    ],
                  },
                  {
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="4"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" x2="16" y1="2" y2="6"></line>
                        <line x1="8" x2="8" y1="2" y2="6"></line>
                        <line x1="3" x2="21" y1="10" y2="10"></line>
                        <path d="M8 14h.01"></path>
                        <path d="M12 14h.01"></path>
                        <path d="M16 14h.01"></path>
                        <path d="M8 18h.01"></path>
                        <path d="M12 18h.01"></path>
                        <path d="M16 18h.01"></path>
                      </svg>
                    ),
                    title: "Rendez-vous",
                    description:
                      "Planification facile de consultations et suivi des rendez-vous médicaux",
                    features: [
                      "Prise de rendez-vous en ligne",
                      "Rappels automatiques",
                      "Gestion des disponibilités",
                    ],
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group flex flex-col items-center space-y-2 border rounded-lg p-4 md:p-6 shadow-sm card-hover bg-white dark:bg-gray-900 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orl-blue-50 to-transparent dark:from-orl-blue-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="p-3 rounded-full bg-orl-blue-100 dark:bg-orl-blue-900/50 text-orl-blue-700 dark:text-orl-blue-300 relative z-10">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-orl-blue-800 dark:text-orl-blue-300 relative z-10 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-center text-muted-foreground relative z-10 text-sm md:text-base">
                      {feature.description}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-left w-full relative z-10">
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-orl-blue-600 dark:text-orl-blue-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="how-it-works"
            className="w-full py-12 md:py-24 lg:py-32 bg-orl-blue-50 dark:bg-gray-900"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-orl-blue-100 dark:bg-orl-blue-900/50 px-3 py-1 text-sm text-orl-blue-700 dark:text-orl-blue-300">
                    Comment ça marche
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tighter md:text-4xl/tight text-orl-blue-900 dark:text-white">
                    Un processus simple et efficace
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Notre technologie d&apos;IA analyse vos symptômes et images
                    pour une détection rapide
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {[
                  {
                    step: "1",
                    title: "Créez votre compte",
                    description:
                      "Inscrivez-vous en tant que patient ou médecin pour accéder à nos services",
                  },
                  {
                    step: "2",
                    title: "Soumettez vos données",
                    description:
                      "Téléchargez des images ou décrivez vos symptômes pour analyse",
                  },
                  {
                    step: "3",
                    title: "Obtenez des résultats",
                    description:
                      "Recevez une analyse détaillée et des recommandations médicales",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center text-center"
                  >
                    {index < 2 && (
                      <div className="absolute left-1/2 top-10 h-[calc(100%-40px)] w-px -translate-x-1/2 bg-orl-blue-200 dark:bg-orl-blue-800 md:left-auto md:right-0 md:top-1/2 md:h-px md:w-[calc(100%-40px)] md:-translate-y-1/2 md:translate-x-0 hidden md:block"></div>
                    )}
                    <div className="relative z-10 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white dark:bg-gray-950 shadow-md border-2 border-orl-blue-200 dark:border-orl-blue-800">
                      <span className="text-xl md:text-2xl font-bold text-orl-blue-600 dark:text-orl-blue-400">
                        {item.step}
                      </span>
                    </div>
                    <div className="mt-4 md:mt-6">
                      <h3 className="text-lg md:text-xl font-bold text-orl-blue-800 dark:text-orl-blue-300">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm md:text-base text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="testimonials"
            className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-orl-blue-100 dark:bg-orl-blue-900/50 px-3 py-1 text-sm text-orl-blue-700 dark:text-orl-blue-300">
                    Témoignages
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tighter md:text-4xl/tight text-orl-blue-900 dark:text-white">
                    Ce que disent nos utilisateurs
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Découvrez les expériences de nos patients et médecins
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
                {[
                  {
                    name: "Dr. Martin Dupont",
                    role: "ORL, Hôpital Central",
                    avatar: "DM",
                    rating: 5,
                    testimonial:
                      "Cette plateforme a révolutionné ma pratique. Je peux désormais analyser rapidement les cas et offrir un diagnostic plus précis à mes patients.",
                  },
                  {
                    name: "Sophie Martin",
                    role: "Patiente",
                    avatar: "SM",
                    rating: 5,
                    testimonial:
                      "Grâce à MediScan ORL, j'ai pu obtenir un diagnostic rapide pour mon problème d'audition. Le processus était simple et les résultats très précis.",
                  },
                  {
                    name: "Dr. Thomas Bernard",
                    role: "Audiologiste",
                    avatar: "TB",
                    rating: 4,
                    testimonial:
                      "Un outil indispensable pour tout professionnel ORL. L'interface est intuitive et les résultats sont fiables. Je le recommande à tous mes collègues.",
                  },
                ].map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 rounded-lg border p-4 md:p-6 shadow-sm card-hover bg-white dark:bg-gray-900"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-orl-blue-100 dark:border-orl-blue-900">
                        <AvatarFallback className="bg-orl-blue-200 text-orl-blue-700 dark:bg-orl-blue-900 dark:text-orl-blue-300 text-sm md:text-base">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm md:text-base">
                          {testimonial.name}
                        </p>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-orl-blue-500 dark:text-orl-blue-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "fill-current" : ""
                          }`}
                        />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground text-sm md:text-base">
                      "{testimonial.testimonial}"
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-orl-blue-600 dark:bg-orl-blue-900 text-white">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tighter md:text-4xl/tight">
                      Prêt à améliorer votre santé ORL?
                    </h2>
                    <p className="text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-orl-blue-100">
                      Rejoignez notre plateforme dès aujourd'hui et bénéficiez
                      d'une détection précoce des maladies ORL grâce à notre
                      technologie d'intelligence artificielle.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link href="/register">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto h-12 text-base bg-white text-orl-blue-700 hover:bg-orl-blue-50 dark:bg-gray-950 dark:text-orl-blue-300 dark:hover:bg-gray-900"
                      >
                        Créer un compte
                      </Button>
                    </Link>
                    <button onClick={() => scrollToSection("features")}>
                      <a
                        href="/plus-d-info"
                        className="inline-flex items-center justify-center w-full sm:w-auto h-12 text-base border border-white text-white hover:bg-white/10 dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300/10 rounded-md px-4"
                      >
                        En savoir plus
                      </a>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center order-first lg:order-last">
                  <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-sm lg:max-w-none">
                    <div className="grid gap-4 md:gap-8">
                      <div className="overflow-hidden rounded-lg bg-white/10 dark:bg-gray-950/30 aspect-square">
                        <Image
                          src="/placeholder.svg?height=150&width=150"
                          width={150}
                          height={150}
                          alt="Feature 1"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden rounded-lg bg-white/10 dark:bg-gray-950/30 aspect-square">
                        <Image
                          src="/placeholder.svg?height=150&width=150"
                          width={150}
                          height={150}
                          alt="Feature 2"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:gap-8">
                      <div className="overflow-hidden rounded-lg bg-white/10 dark:bg-gray-950/30 aspect-square">
                        <Image
                          src="/placeholder.svg?height=150&width=150"
                          width={150}
                          height={150}
                          alt="Feature 3"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden rounded-lg bg-white/10 dark:bg-gray-950/30 aspect-square">
                        <Image
                          src="/placeholder.svg?height=150&width=150"
                          width={150}
                          height={150}
                          alt="Feature 4"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="border-t bg-white dark:bg-gray-950">
          <div className="container flex flex-col gap-4 py-8 md:py-12 px-4 md:px-6 md:flex-row md:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="bg-orl-blue-600 dark:bg-orl-blue-500 rounded-lg p-1">
                  <Image
                    src="/placeholder.svg?height=22&width=22"
                    width={22}
                    height={22}
                    alt="Logo"
                    className="rounded-lg"
                  />
                </div>
                <span className="text-lg font-bold text-orl-blue-700 dark:text-orl-blue-400">
                  MediScan ORL
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2025 MediScan ORL. Tous droits réservés.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium text-orl-blue-800 dark:text-orl-blue-300">
                  Plateforme
                </h3>
                <nav className="flex flex-col gap-2">
                  <Link
                    href="#"
                    className="text-sm hover:text-orl-blue-600 dark:hover:text-orl-blue-400"
                  >
                    À propos
                  </Link>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-sm hover:text-orl-blue-600 dark:hover:text-orl-blue-400 text-left"
                  >
                    Fonctionnalités
                  </button>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="text-sm hover:text-orl-blue-600 dark:hover:text-orl-blue-400 text-left"
                  >
                    Témoignages
                  </button>
                </nav>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium text-orl-blue-800 dark:text-orl-blue-300">
                  Légal
                </h3>
                <nav className="flex flex-col gap-2">
                  <Link
                    href="#"
                    className="text-sm hover:text-orl-blue-600 dark:hover:text-orl-blue-400"
                  >
                    Confidentialité
                  </Link>
                  <Link
                    href="#"
                    className="text-sm hover:text-orl-blue-600 dark:hover:text-orl-blue-400"
                  >
                    Conditions
                  </Link>
                  <Link
                    href="#"
                    className="text-sm hover:text-orl-blue-600 dark:hover:text-orl-blue-400"
                  >
                    Contact
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </HomeThemeProvider>
  );
}

// Composant Avatar pour les témoignages
type AvatarProps = {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function Avatar({ className, children, ...props }: AvatarProps) {
  return (
    <div
      className={`relative flex shrink-0 overflow-hidden rounded-full ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
}

type AvatarFallbackProps = {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function AvatarFallback({
  className,
  children,
  ...props
}: AvatarFallbackProps) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
}
