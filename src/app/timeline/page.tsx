"use client";

import TimelineStory from "@/components/TimelineStory";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <motion.header
        className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50 backdrop-blur-sm bg-slate-800/80"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-white text-xl font-bold hover:text-purple-400 transition-all duration-300 hover:scale-105"
          >
            📱 AppSec Through Time
          </Link>
          <Link
            href="/chapters"
            className="text-slate-300 hover:text-white transition-all duration-300 hover:scale-105"
          >
            View Chapters
          </Link>
        </div>
      </motion.header>
      <main className="container mx-auto px-4 py-8">
        <TimelineStory />
      </main>
      <ScrollToTop />
    </div>
  );
}
