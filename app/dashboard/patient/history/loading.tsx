import { PatientSidebar } from "@/components/patient-sidebar"
import { Skeleton } from "@/components/ui/skeleton"

export default function HistoryLoading() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <PatientSidebar />
      <div className="flex-1 ml-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white dark:bg-gray-950 px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Skeleton className="h-6 w-36" />
          <div className="ml-auto flex gap-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </header>
        <main className="flex-1 space-y-6 p-6">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
