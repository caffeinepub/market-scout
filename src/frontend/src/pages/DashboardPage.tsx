import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  CalendarCheck,
  ChevronDown,
  LogOut,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin, useRecordVisit } from "../hooks/useQueries";
import { AdminPage } from "./AdminPage";
import { JobsPage } from "./JobsPage";

// ─── Header ──────────────────────────────────────────────────────────────────

interface HeaderProps {
  isAdmin: boolean;
  onAdminClick: () => void;
  onLogout: () => void;
  principalShort: string;
  displayName: string;
  notifOpen: boolean;
  onNotifToggle: () => void;
  notifRead: boolean;
  onMarkAllRead: () => void;
}

function Header({
  isAdmin,
  onAdminClick,
  onLogout,
  principalShort,
  displayName,
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
                  2
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
                    {displayName.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground hidden sm:block max-w-[120px] truncate">
                  {displayName}
                </span>
                <ChevronDown size={12} className="hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-popover border-border"
            >
              <div className="px-2 py-1.5 border-b border-border mb-1">
                <p className="text-xs font-semibold text-foreground truncate">
                  {displayName}
                </p>
                <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                  {principalShort}
                </p>
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

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export function DashboardPage() {
  const { identity, clear } = useInternetIdentity();
  const { data: isAdminVal } = useIsAdmin();
  const recordVisit = useRecordVisit();

  const [showAdmin, setShowAdmin] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifRead, setNotifRead] = useState(false);

  const isAdmin = isAdminVal ?? false;

  const principalShort = identity
    ? (() => {
        const p = identity.getPrincipal().toString();
        return p.length > 12 ? `${p.slice(0, 6)}...${p.slice(-4)}` : p;
      })()
    : "User";

  // Try to get a friendly display name from session storage (set during sign-up/sign-in)
  const displayName = (() => {
    try {
      const storedEmail = sessionStorage.getItem("ms_user_email");
      const storedName = sessionStorage.getItem("ms_user_name");
      if (storedName) return storedName;
      if (storedEmail) return storedEmail;
    } catch {}
    return principalShort;
  })();

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

  if (showAdmin) {
    return <AdminPage onBack={() => setShowAdmin(false)} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        isAdmin={isAdmin}
        onAdminClick={() => setShowAdmin(true)}
        onLogout={handleLogout}
        principalShort={principalShort}
        displayName={displayName}
        notifOpen={notifOpen}
        onNotifToggle={() => setNotifOpen((o) => !o)}
        notifRead={notifRead}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* Jobs — only view */}
      <div className="flex-1 flex flex-col">
        <JobsPage embedded />
      </div>

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
    </div>
  );
}
