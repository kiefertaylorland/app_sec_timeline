"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Event {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags?: string[];
}

export default function ChaptersPage() {
  const [eventsByDecade, setEventsByDecade] = useState<Record<string, Event[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events from the API
    fetch('/api/events')
      .then(res => res.json())
      .then(events => {
        // Group events by decade
        const grouped = events.reduce((acc: Record<string, Event[]>, event: Event) => {
          const year = new Date(event.date).getFullYear();
          const decade = Math.floor(year / 10) * 10;
          const decadeLabel = `${decade}s`;
          
          if (!acc[decadeLabel]) {
            acc[decadeLabel] = [];
          }
          acc[decadeLabel].push(event);
          return acc;
        }, {});
        
        setEventsByDecade(grouped);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50 backdrop-blur-sm bg-slate-800/80">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold hover:text-purple-400 transition-all duration-300 hover:scale-105">
            📱 AppSec Through Time
          </Link>
          <Link 
            href="/timeline" 
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
          >
            View Timeline
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Chapters
          </h1>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl">
            Explore the history of application security organized by era
          </p>
        </motion.div>
        
        {loading ? (
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
              Loading chapters...
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(eventsByDecade).sort().map(([decade, decadeEvents]) => (
              <motion.div
                key={decade}
                className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50"
                variants={itemVariants}
              >
                <h2 className="text-3xl font-bold text-white mb-6">{decade}</h2>
                <div className="space-y-4">
                  {decadeEvents.map((event, idx) => (
                    <motion.div
                      key={event.slug}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Link
                        href={`/events/${event.slug}`}
                        className="block bg-slate-700/50 hover:bg-slate-600/70 rounded-lg p-4 transition-all duration-300 border border-slate-600/50 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                            {event.title}
                          </h3>
                          <span className="text-sm text-slate-400 whitespace-nowrap ml-4 font-mono">
                            {new Date(event.date).getFullYear()}
                          </span>
                        </div>
                        <p className="text-slate-300 group-hover:text-slate-200 transition-colors">
                          {event.summary}
                        </p>
                        {event.tags && event.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {event.tags.map((tag) => (
                              <span 
                                key={tag}
                                className="text-xs bg-purple-600/30 text-purple-300 px-2 py-1 rounded hover:bg-purple-600/50 transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
