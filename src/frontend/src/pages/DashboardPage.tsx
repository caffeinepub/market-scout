import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Activity,
  Bell,
  Briefcase,
  CalendarCheck,
  ChevronDown,
  LogOut,
  Settings,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { MarketUpdate } from "../backend.d";
import { UpdateCard, UpdateCardSkeleton } from "../components/UpdateCard";
import { UpdateDetailPanel } from "../components/UpdateDetailPanel";
import { UserPrefsModal } from "../components/UserPrefsModal";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetNewUpdatesCount,
  useGetUpdates,
  useIsAdmin,
  useRecordVisit,
} from "../hooks/useQueries";
import { CATEGORIES, type Category } from "../utils/formatters";
import { AdminPage } from "./AdminPage";
import { JobsPage, suggestedCompanies } from "./JobsPage";

type MainView = "feed" | "jobs";

// ─── Header ──────────────────────────────────────────────────────────────────

interface HeaderProps {
  newCount: number;
  isAdmin: boolean;
  onPrefsClick: () => void;
  onAdminClick: () => void;
  onLogout: () => void;
  principalShort: string;
  notifOpen: boolean;
  onNotifToggle: () => void;
  notifRead: boolean;
  onMarkAllRead: () => void;
}

function Header({
  newCount,
  isAdmin,
  onPrefsClick,
  onAdminClick,
  onLogout,
  principalShort,
  notifOpen,
  onNotifToggle,
  notifRead,
  onMarkAllRead,
}: HeaderProps) {
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!notifOpen) return;
    function handleOutsideClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        onNotifToggle();
      }
    }
    // Defer listener registration so the opening click doesn't immediately close the panel
    const timer = setTimeout(() => {
      document.addEventListener("click", handleOutsideClick);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [notifOpen, onNotifToggle]);

  return (
    <header
      className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md overflow-visible"
      style={{ overflow: "visible" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between overflow-visible">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-primary/20 border border-primary/30 flex items-center justify-center glow-primary">
            <span className="text-primary font-display font-bold text-xs tracking-wider">
              MS
            </span>
          </div>
          <span className="font-display font-semibold text-foreground tracking-wide text-sm hidden sm:block">
            Market Scout
          </span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onAdminClick}
              className="text-muted-foreground hover:text-foreground text-xs hidden sm:flex items-center gap-1.5"
            >
              <ShieldAlert size={13} />
              Admin
            </Button>
          )}

          {/* Notification bell */}
          <div ref={notifRef} className="relative">
            <button
              type="button"
              onClick={onNotifToggle}
              className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
              aria-label={
                notifRead ? "No new notifications" : "2 new notifications"
              }
              aria-expanded={notifOpen}
              aria-haspopup="true"
            >
              <Bell size={15} />
              {!notifRead && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                  {newCount > 0 ? (newCount > 9 ? "9+" : newCount) : 2}
                </span>
              )}
            </button>

            {/* Notification dropdown panel */}
            {notifOpen && (
              <div
                className="absolute right-0 top-full mt-2 z-[9999] w-80 bg-popover border border-border rounded-xl shadow-xl overflow-hidden"
                aria-label="Notifications"
              >
                {/* Panel header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">
                      Notifications
                    </span>
                    {!notifRead && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-[10px] font-bold">
                        2 new
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={onNotifToggle}
                    className="w-6 h-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                    aria-label="Close notifications"
                  >
                    <X size={13} />
                  </button>
                </div>

                {/* Notification items */}
                <div className="max-h-72 overflow-y-auto">
                  {/* Item 1 — Weekly tracking active */}
                  <div className="flex items-start gap-3 px-4 py-3 border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CalendarCheck size={12} className="text-emerald-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground leading-tight mb-0.5">
                        Weekly tracking active
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Your tracked companies will be checked every Monday.
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 mt-1.5">
                        Just now
                      </p>
                    </div>
                  </div>

                  {/* Item 2 — New feature */}
                  <div className="flex items-start gap-3 px-4 py-3 border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles size={12} className="text-amber-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground leading-tight mb-0.5">
                        New feature
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        You can now track up to 10 companies at once.
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 mt-1.5">
                        2h ago
                      </p>
                    </div>
                  </div>

                  {/* Item 3 — Welcome */}
                  <div className="flex items-start gap-3 px-4 py-3 hover:bg-muted/20 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bell size={12} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground leading-tight mb-0.5">
                        Welcome to Market Scout
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Start by searching for a company to track.
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 mt-1.5">
                        Today
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer — Mark all as read */}
                <div className="border-t border-border px-4 py-2.5">
                  <button
                    type="button"
                    onClick={onMarkAllRead}
                    className="w-full text-center text-xs font-medium text-primary hover:text-primary/80 transition-colors py-1 rounded-md hover:bg-primary/5"
                  >
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 h-9 px-2"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <span className="text-primary text-[10px] font-bold">
                    {principalShort.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <ChevronDown size={12} className="hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-popover border-border"
            >
              <div className="px-2 py-1.5 text-xs text-muted-foreground border-b border-border mb-1">
                {principalShort}
              </div>
              {isAdmin && (
                <DropdownMenuItem
                  onClick={onAdminClick}
                  className="text-foreground cursor-pointer sm:hidden"
                >
                  <ShieldAlert size={13} className="mr-2 text-primary" />
                  Admin Panel
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={onPrefsClick}
                className="text-foreground cursor-pointer"
              >
                <Settings size={13} className="mr-2 text-muted-foreground" />
                Preferences
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onLogout}
                className="text-destructive cursor-pointer"
              >
                <LogOut size={13} className="mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

// ─── Main Nav Tabs ────────────────────────────────────────────────────────────

interface MainNavTabsProps {
  active: MainView;
  onChange: (v: MainView) => void;
  jobCount: number;
}

function MainNavTabs({ active, onChange, jobCount }: MainNavTabsProps) {
  return (
    <div className="border-b border-border bg-background/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-0">
          {/* Feed tab */}
          <button
            type="button"
            onClick={() => onChange("feed")}
            className={`relative flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${
              active === "feed"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/80"
            }`}
            aria-pressed={active === "feed"}
          >
            <Activity size={14} />
            <span>Feed</span>
            {active === "feed" && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
              />
            )}
          </button>

          {/* Jobs tab */}
          <button
            type="button"
            onClick={() => onChange("jobs")}
            className={`relative flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${
              active === "jobs"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/80"
            }`}
            aria-pressed={active === "jobs"}
          >
            <Briefcase size={14} />
            <span>Jobs</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                active === "jobs"
                  ? "bg-primary/20 text-primary"
                  : "bg-muted/40 text-muted-foreground"
              }`}
            >
              {jobCount}
            </span>
            {active === "jobs" && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Category Tabs ────────────────────────────────────────────────────────────

interface CategoryTabsProps {
  active: Category;
  onChange: (c: Category) => void;
}

function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
      {CATEGORIES.map((cat) => (
        <button
          type="button"
          key={cat}
          onClick={() => onChange(cat)}
          className={`
            flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200
            ${
              active === cat
                ? "bg-primary/15 border border-primary/40 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"
            }
          `}
          aria-pressed={active === cat}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export function DashboardPage() {
  const { identity, clear } = useInternetIdentity();
  const { data: updates, isLoading } = useGetUpdates();
  const { data: newCountRaw } = useGetNewUpdatesCount();
  const { data: isAdminVal } = useIsAdmin();
  const recordVisit = useRecordVisit();

  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedUpdate, setSelectedUpdate] = useState<MarketUpdate | null>(
    null,
  );
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [mainView, setMainView] = useState<MainView>("feed");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifRead, setNotifRead] = useState(false);

  const newCount = newCountRaw ? Number(newCountRaw) : 0;
  const isAdmin = isAdminVal ?? false;

  const principalShort = identity
    ? (() => {
        const p = identity.getPrincipal().toString();
        return p.length > 12 ? `${p.slice(0, 6)}...${p.slice(-4)}` : p;
      })()
    : "User";

  // Record visit on mount - mutate is stable per React Query docs
  // biome-ignore lint/correctness/useExhaustiveDependencies: recordVisit.mutate is stable
  useEffect(() => {
    recordVisit.mutate();
  }, []);

  const handleLogout = () => {
    clear();
    toast.success("Signed out successfully");
  };

  const handleMarkAllRead = () => {
    setNotifRead(true);
    setNotifOpen(false);
  };

  // Filter updates by category
  const filtered = updates
    ? activeCategory === "All"
      ? updates
      : updates.filter((u) => u.category === activeCategory)
    : [];

  const sorted = [...filtered].sort((a, b) =>
    Number(b.publishedAt - a.publishedAt),
  );

  if (showAdmin) {
    return <AdminPage onBack={() => setShowAdmin(false)} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        newCount={newCount}
        isAdmin={isAdmin}
        onPrefsClick={() => setPrefsOpen(true)}
        onAdminClick={() => setShowAdmin(true)}
        onLogout={handleLogout}
        principalShort={principalShort}
        notifOpen={notifOpen}
        onNotifToggle={() => setNotifOpen((o) => !o)}
        notifRead={notifRead}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* Main nav tabs — Feed / Jobs */}
      <MainNavTabs
        active={mainView}
        onChange={setMainView}
        jobCount={suggestedCompanies.length * 2}
      />

      {/* Jobs view */}
      {mainView === "jobs" ? (
        <div className="flex-1">
          <JobsPage embedded />
        </div>
      ) : (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
          {/* Page title */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-1">
              <Activity size={14} className="text-primary" />
              <h1 className="font-display font-bold text-lg text-foreground">
                Market Intelligence Feed
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              {newCount > 0 ? (
                <>
                  <span className="text-primary font-semibold">
                    {newCount} new
                  </span>{" "}
                  update
                  {newCount !== 1 ? "s" : ""} since your last visit
                </>
              ) : (
                "Your weekly market intelligence digest"
              )}
            </p>
          </motion.div>

          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <CategoryTabs
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </motion.div>

          {/* Updates grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["s1", "s2", "s3", "s4", "s5", "s6"].map((id) => (
                    <UpdateCardSkeleton key={id} />
                  ))}
                </div>
              ) : sorted.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-border bg-card/50">
                  <div className="w-12 h-12 rounded-xl border border-border bg-muted/20 flex items-center justify-center mb-4">
                    <Activity size={20} className="text-muted-foreground" />
                  </div>
                  <p className="font-display font-semibold text-foreground mb-1">
                    No updates in {activeCategory}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    {activeCategory === "All"
                      ? "Check back soon for market intelligence updates."
                      : "Try another category or check back later."}
                  </p>
                  {activeCategory !== "All" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border text-muted-foreground hover:text-foreground mb-6"
                      onClick={() => setActiveCategory("All")}
                    >
                      View all categories
                    </Button>
                  )}
                  {/* Job Openings teaser */}
                  <div className="w-full max-w-2xl px-4">
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Briefcase size={14} className="text-primary" />
                        <span className="font-display font-semibold text-sm text-foreground">
                          While you wait — explore job openings
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {suggestedCompanies.map((company) => (
                          <button
                            key={company}
                            type="button"
                            className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/10 transition-colors cursor-pointer"
                            onClick={() => setMainView("jobs")}
                          >
                            {company}
                          </button>
                        ))}
                      </div>
                      <Button
                        size="sm"
                        className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 font-semibold text-xs tracking-wide"
                        onClick={() => setMainView("jobs")}
                      >
                        <Briefcase size={12} className="mr-1.5" />
                        Browse All Jobs
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sorted.map((update, i) => (
                    <UpdateCard
                      key={update.id.toString()}
                      update={update}
                      onClick={setSelectedUpdate}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-border/50 py-4 px-6 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()}.{" "}
          <a
            href="https://Dreamcrafter.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with love using Dreamcrafter
          </a>
        </p>
      </footer>

      {/* Detail Panel */}
      <UpdateDetailPanel
        update={selectedUpdate}
        onClose={() => setSelectedUpdate(null)}
      />

      {/* Preferences Modal */}
      <UserPrefsModal open={prefsOpen} onClose={() => setPrefsOpen(false)} />
    </div>
  );
}
