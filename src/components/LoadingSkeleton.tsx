"use client";

import { motion } from "framer-motion";

export default function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="border-l-4 border-slate-700 pl-6 pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-24">
              <div className="h-4 bg-slate-700 rounded animate-pulse" />
            </div>
            <div className="flex-1 bg-slate-700/50 rounded-lg p-6 space-y-3">
              <div className="h-8 bg-slate-600 rounded w-3/4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-slate-600 rounded animate-pulse" />
                <div className="h-4 bg-slate-600 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-slate-600 rounded w-4/6 animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
