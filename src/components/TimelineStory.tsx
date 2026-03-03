"use client";

import { useEffect, useState } from "react";

interface TimelineData {
  title: {
    text: {
      headline: string;
      text: string;
    };
  };
  events: Array<{
    start_date: {
      year: string;
      month?: string;
      day?: string;
    };
    text: {
      headline: string;
      text: string;
    };
    media?: {
      url: string;
      alt?: string;
    };
    unique_id: string;
  }>;
}

export default function TimelineStory() {
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/timeline.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load timeline data");
        }
        return res.json();
      })
      .then((data) => {
        setTimelineData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading timeline:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white text-xl">Loading timeline...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Error Loading Timeline</h2>
        <p>{error}</p>
        <p className="mt-4 text-sm text-slate-300">
          The timeline.json file may not be generated yet. Run <code className="bg-slate-800 px-2 py-1 rounded">npm run build-timeline</code> to generate it.
        </p>
      </div>
    );
  }

  if (!timelineData || timelineData.events.length === 0) {
    return (
      <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-2">No Events Found</h2>
        <p>Add event files to the <code className="bg-slate-800 px-2 py-1 rounded">content/events/</code> directory to populate the timeline.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          {timelineData.title.text.headline}
        </h1>
        <p className="text-xl text-slate-300">
          {timelineData.title.text.text}
        </p>
      </div>

      <div className="space-y-8">
        {timelineData.events.map((event, index) => (
          <div 
            key={event.unique_id}
            className="border-l-4 border-purple-500 pl-6 pb-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-24 text-slate-400 font-mono text-sm">
                {event.start_date.year}
                {event.start_date.month && `-${event.start_date.month.padStart(2, '0')}`}
                {event.start_date.day && `-${event.start_date.day.padStart(2, '0')}`}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {event.text.headline}
                </h3>
                {event.media && (
                  <div className="mb-4">
                    <img 
                      src={event.media.url} 
                      alt={event.media.alt || event.text.headline}
                      className="rounded-lg max-w-md"
                    />
                  </div>
                )}
                <div 
                  className="text-slate-300 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: event.text.text }}
                />
                <a 
                  href={`/events/${event.unique_id}`}
                  className="inline-block mt-4 text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  Read more →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
