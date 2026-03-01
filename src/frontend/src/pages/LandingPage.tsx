import { Button } from "@/components/ui/button";
import { BarChart2, Bell, Shield, TrendingUp, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

// Animated grid background
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid lines */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="oklch(0.72 0.19 210)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated scan line */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.19_210)] to-transparent opacity-30 scan-line"
        style={{ top: 0 }}
      />

      {/* Glowing orbs */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full blur-[120px] bg-[oklch(0.72_0.19_210/0.12)]" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full blur-[100px] bg-[oklch(0.65_0.22_245/0.1)]" />
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full blur-[90px] bg-[oklch(0.62_0.2_295/0.08)]" />

      {/* Chart decorative lines */}
      <svg
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 w-full opacity-[0.08]"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          points="0,250 120,200 240,220 360,140 480,180 600,100 720,130 840,80 960,120 1080,60 1200,90 1320,40 1440,70"
          fill="none"
          stroke="oklch(0.72 0.19 210)"
          strokeWidth="2"
          className="pulse-line"
        />
        <polyline
          points="0,270 120,240 240,260 360,200 480,230 600,170 720,200 840,160 960,190 1080,140 1200,170 1320,120 1440,150"
          fill="none"
          stroke="oklch(0.65 0.22 245)"
          strokeWidth="1.5"
          style={{ animationDelay: "1s" }}
          className="pulse-line"
        />
      </svg>
    </div>
  );
}

const features = [
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    desc: "Track shifts across Tech, Finance, Health, Energy, and Crypto.",
  },
  {
    icon: Zap,
    title: "Weekly Digest",
    desc: "Curated updates delivered to your feed every week.",
  },
  {
    icon: BarChart2,
    title: "Category Filters",
    desc: "Follow only the sectors that matter to your portfolio.",
  },
  {
    icon: Shield,
    title: "Verified Sources",
    desc: "Every update reviewed before publishing to the feed.",
  },
];

export function LandingPage() {
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();

  return (
    <div className="relative min-h-screen flex flex-col bg-background overflow-hidden">
      <GridBackground />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/20 border border-primary/30 flex items-center justify-center glow-primary">
            <span className="text-primary font-display font-bold text-xs tracking-wider">
              MS
            </span>
          </div>
          <span className="font-display font-semibold text-foreground tracking-wide text-sm">
            Market Scout
          </span>
        </div>
        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-border/50 text-muted-foreground opacity-50 cursor-not-allowed"
          disabled
          aria-label="Notifications (login required)"
        >
          <Bell size={16} />
        </button>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Intelligence Platform
          </div>

          <h1 className="font-display font-bold leading-[0.95] tracking-tight mb-6">
            <span className="block text-5xl sm:text-7xl text-foreground">
              KNOW WHAT <span className="text-gradient">CHANGED</span>
            </span>
            <span className="block text-4xl sm:text-6xl mt-2 text-foreground">
              <span className="text-gradient">THIS WEEK</span> — WITHOUT
            </span>
            <span className="block text-4xl sm:text-6xl text-muted-foreground/70 mt-1">
              SEARCHING
            </span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Market Scout aggregates key market intelligence across sectors so
            you see what moved — without digging through dozens of sources.
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-sm mx-auto"
        >
          <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm shadow-card p-8">
            <div className="text-center mb-6">
              <h2 className="font-display font-semibold text-xl text-foreground mb-1">
                Get Started
              </h2>
              <p className="text-muted-foreground text-sm">
                Sign in with Internet Identity to access your feed
              </p>
            </div>

            <Button
              onClick={login}
              disabled={isLoggingIn || isInitializing}
              className="w-full bg-primary/90 hover:bg-primary text-primary-foreground font-semibold tracking-wide glow-primary-hover transition-all duration-200"
              size="lg"
            >
              {isLoggingIn ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Connecting...
                </span>
              ) : isInitializing ? (
                "Initializing..."
              ) : (
                "Sign in with Internet Identity"
              )}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-card text-muted-foreground">or</span>
              </div>
            </div>

            <Button
              onClick={login}
              disabled={isLoggingIn || isInitializing}
              variant="outline"
              size="lg"
              className="w-full border-border text-foreground hover:bg-muted/40 hover:border-primary/40 font-semibold tracking-wide transition-all duration-200"
            >
              {isLoggingIn ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
                  Connecting...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-2">
              New? Internet Identity will guide you through setup.
            </p>

            <p className="text-center text-xs text-muted-foreground mt-4">
              Secured by the Internet Computer Protocol
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4"
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-lg border border-border/50 bg-card/40 p-4 text-center hover:border-primary/30 transition-colors"
              >
                <div className="w-8 h-8 mx-auto mb-3 rounded bg-primary/10 flex items-center justify-center">
                  <Icon size={16} className="text-primary" />
                </div>
                <p className="text-xs font-semibold text-foreground mb-1">
                  {f.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-4 px-6 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
