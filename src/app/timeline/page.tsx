import TimelineStory from "@/components/TimelineStory";
import Link from "next/link";

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold hover:text-purple-400 transition-colors">
            📱 AppSec Through Time
          </Link>
          <Link 
            href="/chapters" 
            className="text-slate-300 hover:text-white transition-colors"
          >
            View Chapters
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <TimelineStory />
      </main>
    </div>
  );
}
