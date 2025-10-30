import { LoadingSkeleton } from "@/components/ui";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <div className="animate-pulse">
            <div className="h-10 w-48 bg-muted rounded-lg mb-4"></div>
            <div className="h-14 bg-muted rounded-lg"></div>
          </div>
        </div>
      </header>
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <LoadingSkeleton text="جاري الاعداد..." />
      </main>
    </div>
  );
}
