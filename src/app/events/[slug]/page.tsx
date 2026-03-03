import { getEvents, getEventBySlug } from "@/lib/events";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <Link href="/timeline" className="text-purple-400 hover:text-purple-300 transition-colors">
            ← Back to Timeline
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <article className="bg-slate-800 rounded-lg p-8">
          <div className="mb-6">
            <time className="text-slate-400 text-sm">
              {new Date(event.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
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
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {event.title}
          </h1>
          
          {event.media && event.media.type === "image" && (
            <div className="mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={event.media.url} 
                alt={event.media.alt || event.title}
                className="w-full rounded-lg"
              />
            </div>
          )}
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-slate-300 mb-6">{event.summary}</p>
            
            {event.content && (
              <div className="text-slate-200 space-y-4">
                {event.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
          
          {event.references && event.references.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">References</h2>
              <ul className="space-y-2">
                {event.references.map((ref, idx) => (
                  <li key={idx}>
                    <a 
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      {ref.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
