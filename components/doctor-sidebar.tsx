"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Home,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  User,
  LogOut,
  Users,
  Brain,
  BarChart2,
  History,
  HelpCircle,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface DoctorSidebarProps {
  className?: string
}

export function DoctorSidebar({ className }: DoctorSidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path)
  }

  const navItems = [
    {
      title: "Tableau de bord",
      href: "/dashboard/doctor",
      icon: Home,
      active: pathname === "/dashboard/doctor",
    },
    {
      title: "Patients",
      href: "/dashboard/doctor/patients",
      icon: Users,
      active: isActive("/dashboard/doctor/patients"),
    },
    {
      title: "Analyses IA",
      href: "/dashboard/doctor/ai-scan",
      icon: Brain,
      active: isActive("/dashboard/doctor/ai-scan"),
      badge: "Nouveau",
    },
    {
      title: "Rendez-vous",
      href: "/dashboard/doctor/appointments",
      icon: Calendar,
      active: isActive("/dashboard/doctor/appointments"),
    },
    {
      title: "Analyses",
      href: "/dashboard/doctor/analysis",
      icon: FileText,
      active: isActive("/dashboard/doctor/analysis"),
      badge: "7",
    },
    {
      title: "Messages",
      href: "/dashboard/doctor/messages",
      icon: MessageSquare,
      active: isActive("/dashboard/doctor/messages"),
      badge: "12",
    },
    {
      title: "Historique",
      href: "/dashboard/doctor/history",
      icon: History,
      active: isActive("/dashboard/doctor/history"),
    },
    {
      title: "Statistiques",
      href: "/dashboard/doctor/statistics",
      icon: BarChart2,
      active: isActive("/dashboard/doctor/statistics"),
    },
  ]

  const bottomNavItems = [
    {
      title: "Profil",
      href: "/dashboard/doctor/profile",
      icon: User,
      active: isActive("/dashboard/doctor/profile"),
    },
    {
      title: "Paramètres",
      href: "/dashboard/doctor/settings",
      icon: Settings,
      active: isActive("/dashboard/doctor/settings"),
    },
    {
      title: "Aide",
      href: "/dashboard/doctor/help",
      icon: HelpCircle,
      active: isActive("/dashboard/doctor/help"),
    },
  ]

  return (
    <div className={cn("flex h-full w-64 flex-col bg-white dark:bg-gray-950 border-r", className)}>
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="bg-orl-blue-600 dark:bg-orl-blue-500 rounded-lg p-1">
            <Image src="/placeholder.svg?height=22&width=22" width={22} height={22} alt="Logo" className="rounded-lg" />
          </div>
          <span className="text-orl-blue-700 dark:text-orl-blue-400">MediScan ORL</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <div className="px-3 py-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Rechercher..."
              className="w-full rounded-md border border-input bg-background pl-8 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orl-blue-500 focus-visible:ring-offset-2"
            />
          </div>
        </div>

        <nav className="grid items-start px-2 text-sm font-medium mt-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("nav-link", item.active ? "nav-link-active" : "nav-link-inactive")}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
              {item.badge && (
                <div
                  className={cn(
                    "ml-auto flex h-5 w-5 items-center justify-center rounded-full text-xs",
                    typeof item.badge === "number" || !isNaN(Number(item.badge))
                      ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                      : "bg-orl-blue-100 dark:bg-orl-blue-900/50 text-orl-blue-600 dark:text-orl-blue-400",
                  )}
                >
                  {item.badge}
                </div>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <div className="flex flex-col gap-1 py-2">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("nav-link", item.active ? "nav-link-active" : "nav-link-inactive")}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </div>
        <Link
          href="/logout"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Link>
      </div>
    </div>
  )
}
