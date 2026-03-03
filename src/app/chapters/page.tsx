import Link from "next/link";
import { getEvents } from "@/lib/events";

export default async function ChaptersPage() {
  const events = await getEvents();
  
  // Group events by decade
  const eventsByDecade = events.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear();
    const decade = Math.floor(year / 10) * 10;
    const decadeLabel = `${decade}s`;
    
    if (!acc[decadeLabel]) {
      acc[decadeLabel] = [];
    }
    acc[decadeLabel].push(event);
    return acc;
  }, {} as Record<string, typeof events>);

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold hover:text-purple-400 transition-colors">
            📱 AppSec Through Time
          </Link>
          <Link 
            href="/timeline" 
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            View Timeline
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Chapters
        </h1>
        <p className="text-xl text-slate-300 mb-12 max-w-3xl">
          Explore the history of application security organized by era
        </p>
        
        <div className="space-y-12">
          {Object.entries(eventsByDecade).sort().map(([decade, decadeEvents]) => (
            <div key={decade} className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-3xl font-bold text-white mb-6">{decade}</h2>
              <div className="space-y-4">
                {decadeEvents.map((event) => (
                  <Link
                    key={event.slug}
                    href={`/events/${event.slug}`}
                    className="block bg-slate-700 hover:bg-slate-600 rounded-lg p-4 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                      <span className="text-sm text-slate-400 whitespace-nowrap ml-4">
                        {new Date(event.date).getFullYear()}
                      </span>
                    </div>
                    <p className="text-slate-300">{event.summary}</p>
                    {event.tags && event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {event.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="text-xs bg-purple-600/30 text-purple-300 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
