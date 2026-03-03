import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            📱 AppSec Through Time
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-3xl mx-auto">
            An educational, interactive timeline that teaches the key historical 
            developments in application security
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/timeline" 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Start the Story
            </Link>
            <Link 
              href="/chapters" 
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              View Chapters
            </Link>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-2xl font-bold mb-3">📚 Guided Learning</h3>
            <p className="text-slate-200">
              Navigate a linear narrative from the foundations of AppSec to modern practices
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-2xl font-bold mb-3">🔍 Credible Sources</h3>
            <p className="text-slate-200">
              Every claim backed by references and primary sources
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-2xl font-bold mb-3">⚡ Fast & Simple</h3>
            <p className="text-slate-200">
              Instant loading, minimal friction, mobile-friendly design
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
