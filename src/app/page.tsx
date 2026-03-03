"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <AnimatedBackground />
      <main className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            📱 AppSec Through Time
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-slate-200 mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            An educational, interactive timeline that teaches the key historical 
            developments in application security
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center"
            variants={itemVariants}
          >
            <Link 
              href="/timeline" 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
            >
              Start the Story
            </Link>
            <Link 
              href="/chapters" 
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-500/50"
            >
              View Chapters
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-xl hover:border-purple-400/50"
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-2xl font-bold mb-3">📚 Guided Learning</h3>
            <p className="text-slate-200">
              Navigate a linear narrative from the foundations of AppSec to modern practices
            </p>
          </motion.div>
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-xl hover:border-purple-400/50"
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-2xl font-bold mb-3">🔍 Credible Sources</h3>
            <p className="text-slate-200">
              Every claim backed by references and primary sources
            </p>
          </motion.div>
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-xl hover:border-purple-400/50"
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-2xl font-bold mb-3">⚡ Fast & Simple</h3>
            <p className="text-slate-200">
              Instant loading, minimal friction, mobile-friendly design
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
