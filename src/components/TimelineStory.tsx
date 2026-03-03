"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

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

function TimelineEvent({ event, index }: { event: TimelineData['events'][0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="border-l-4 border-purple-500 pl-6 pb-8 relative group"
    >
      {/* Timeline dot */}
      <div className="absolute left-[-8px] top-0 w-4 h-4 bg-purple-500 rounded-full group-hover:scale-150 group-hover:bg-purple-400 transition-all duration-300 shadow-lg shadow-purple-500/50" />
      
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-24 text-slate-400 font-mono text-sm">
          {event.start_date.year}
          {event.start_date.month && `-${event.start_date.month.padStart(2, '0')}`}
          {event.start_date.day && `-${event.start_date.day.padStart(2, '0')}`}
        </div>
        <motion.div
          className="flex-1 bg-slate-700/50 rounded-lg p-6 backdrop-blur-sm border border-slate-600/50 transition-all duration-300 hover:bg-slate-700/70 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
            {event.text.headline}
          </h3>
          {event.media && (
            <div className="mb-4 overflow-hidden rounded-lg">
              {/* Using img instead of next/image because media URLs may be external */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={event.media.url} 
                alt={event.media.alt || event.text.headline}
                className="rounded-lg max-w-md transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}
          <div 
            className="text-slate-300 prose prose-invert max-w-none"
          >
            {event.text.text}
          </div>
          <a 
            href={`/events/${event.unique_id}`}
            className="inline-block mt-4 text-purple-400 hover:text-purple-300 font-medium transition-all duration-300 hover:translate-x-2"
          >
            Read more →
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
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
        <motion.div
          className="text-white text-xl"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading timeline...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-900/20 border border-red-700 rounded-lg p-6 text-white"
      >
        <h2 className="text-xl font-bold mb-2">Error Loading Timeline</h2>
        <p>{error}</p>
        <p className="mt-4 text-sm text-slate-300">
          The timeline.json file may not be generated yet. Run <code className="bg-slate-800 px-2 py-1 rounded">npm run build-timeline</code> to generate it.
        </p>
      </motion.div>
    );
  }

  if (!timelineData || timelineData.events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-6 text-white"
      >
        <h2 className="text-xl font-bold mb-2">No Events Found</h2>
        <p>Add event files to the <code className="bg-slate-800 px-2 py-1 rounded">content/events/</code> directory to populate the timeline.</p>
      </motion.div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 border border-slate-700/50">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {timelineData.title.text.headline}
        </h1>
        <p className="text-xl text-slate-300">
          {timelineData.title.text.text}
        </p>
      </motion.div>

      <div className="space-y-8 relative">
        {/* Timeline progress indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-purple-600 to-transparent opacity-30" />
        
        {timelineData.events.map((event, index) => (
          <TimelineEvent key={event.unique_id} event={event} index={index} />
        ))}
      </div>
    </div>
  );
}
