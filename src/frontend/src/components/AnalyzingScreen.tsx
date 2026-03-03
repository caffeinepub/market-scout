import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface AnalyzingScreenProps {
  company: string;
  onComplete: () => void;
}

export function AnalyzingScreen({ company, onComplete }: AnalyzingScreenProps) {
  const [activeDot, setActiveDot] = useState(0);
  const totalDots = 7;

  // Cycle through dots
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((d) => (d + 1) % totalDots);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Auto-complete after 2.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="analyzing"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{ background: "#0a0d14" }}
      >
        {/* Radar rings */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Outer ring */}
          <motion.div
            className="absolute w-28 h-28 rounded-full border border-cyan-500/20"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          {/* Mid ring — rotating gradient stroke */}
          <motion.div
            className="absolute w-20 h-20 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 70%, rgba(34,211,238,0.6) 100%)",
              maskImage: "radial-gradient(transparent 60%, black 61%)",
              WebkitMaskImage: "radial-gradient(transparent 60%, black 61%)",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          {/* Inner green arc */}
          <motion.div
            className="absolute w-16 h-16 rounded-full"
            style={{
              background:
                "conic-gradient(from 180deg, transparent 60%, rgba(52,211,153,0.5) 100%)",
              maskImage: "radial-gradient(transparent 58%, black 59%)",
              WebkitMaskImage: "radial-gradient(transparent 58%, black 59%)",
            }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 2.4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          {/* Center dot */}
          <motion.div
            className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_3px_rgba(34,211,238,0.5)]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Company name */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white font-display font-bold text-2xl mb-2 tracking-wide"
        >
          Analyzing {company}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-slate-400 text-sm mb-8"
        >
          Scanning recent updates...
        </motion.p>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {["d0", "d1", "d2", "d3", "d4", "d5", "d6"].map((dotId, i) => (
            <motion.span
              key={dotId}
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor:
                  i <= activeDot
                    ? "rgba(34,211,238,0.9)"
                    : "rgba(100,116,139,0.3)",
                scale: i === activeDot ? 1.3 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
