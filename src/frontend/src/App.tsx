import { Toaster } from "@/components/ui/sonner";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { DashboardPage } from "./pages/DashboardPage";
import { LandingPage } from "./pages/LandingPage";

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center animate-pulse-glow">
          <span className="text-primary font-display font-bold text-sm tracking-wider">
            MS
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();

  const isAuthenticated = !!identity;

  if (isInitializing) {
    return <LoadingScreen />;
  }

  return (
    <>
      {isAuthenticated ? <DashboardPage /> : <LandingPage />}
      <Toaster position="bottom-right" theme="dark" richColors />
    </>
  );
}
