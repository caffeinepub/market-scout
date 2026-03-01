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
  ChevronDown,
  LogOut,
  Settings,
  ShieldAlert,
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
              aria-label={`${newCount} new updates`}
              aria-expanded={notifOpen}
              aria-haspopup="true"
            >
              <Bell size={15} />
              {newCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                  {newCount > 9 ? "9+" : newCount}
                </span>
              )}
            </button>

            {/* Notification dropdown panel */}
            {notifOpen && (
              <div
                className="absolute right-0 top-full mt-2 z-[9999] w-72 bg-popover border border-border rounded-xl shadow-xl p-4"
                aria-label="Notifications"
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-sm text-foreground">
                    Notifications
                  </span>
                  <button
                    type="button"
                    onClick={onNotifToggle}
                    className="w-6 h-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                    aria-label="Close notifications"
                  >
                    <X size={13} />
                  </button>
                </div>

                <div className="h-px bg-border mb-3" />

                {/* Notification items */}
                <div className="flex flex-col gap-3">
                  {newCount > 0 && (
                    <>
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bell size={12} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground leading-relaxed">
                            You have{" "}
                            <span className="text-primary font-semibold">
                              {newCount}
                            </span>{" "}
                            new market update
                            {newCount !== 1 ? "s" : ""} since your last visit.
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            Just now
                          </p>
                        </div>
                      </div>
                      <div className="h-px bg-border/60" />
                    </>
                  )}

                  {/* Static welcome item */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-muted/40 border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bell size={12} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground leading-relaxed">
                        Welcome to Market Scout. Stay up to date with the latest
                        market intelligence.
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Today
                      </p>
                    </div>
                  </div>
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
  const [notifOpen, setNotifOpen] = useState(false);

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
      />

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
          <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
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
              <div className="flex flex-col items-center justify-center py-24 rounded-xl border border-border bg-card/50">
                <div className="w-12 h-12 rounded-xl border border-border bg-muted/20 flex items-center justify-center mb-4">
                  <Activity size={20} className="text-muted-foreground" />
                </div>
                <p className="font-display font-semibold text-foreground mb-1">
                  No updates in {activeCategory}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activeCategory === "All"
                    ? "Check back soon for market intelligence updates."
                    : "Try another category or check back later."}
                </p>
                {activeCategory !== "All" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-border text-muted-foreground hover:text-foreground"
                    onClick={() => setActiveCategory("All")}
                  >
                    View all categories
                  </Button>
                )}
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

      {/* Footer */}
      <footer className="border-t border-border/50 py-4 px-6 text-center">
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
